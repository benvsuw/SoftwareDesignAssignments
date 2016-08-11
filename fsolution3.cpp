#include <iostream>
#include <vector>
#include <cmath>
#include <thread>
#include <atomic>

using namespace std;

atomic<bool> _threadsReady(false);
atomic<bool> _isPrime(true);
atomic_flag _consoleFlag = ATOMIC_FLAG_INIT;

void isDivisibleBy(int threadID, int targetNumber, int start, int end)
{
	while (!_threadsReady) { this_thread::yield(); }
	int maxTest = sqrt(abs(targetNumber));
	for (int i=start; i<=end; i++) {
		if (targetNumber%i == 0) {
			_isPrime = false;
			while (_consoleFlag.test_and_set()) {};
			cout << i << " divides " << targetNumber << ". ";
			cout << endl;
			_consoleFlag.clear();
			break;
		}
	}
	while (!_consoleFlag.test_and_set()) { };
	cout << "Thread " << threadID << " finished! ";
	cout << endl;
	_consoleFlag.clear();
}

int main() {

	int num_threads = 10;
	int target = 654324;

	vector<thread> threads;
	for (int i=0; i<num_threads; i++)
	{
		int start = i*target/num_threads;
		int end = (i+1)*target/num_threads - 1;
		if (start < 2) start = 2;
		if (end < start) end = start;
		else if (end >= target) end = target-1;
		threads.push_back(thread(isDivisibleBy, i, target, start, end));
	}
	_threadsReady = true;
	for (int i=0; i<num_threads; i++)
	{
		threads.at(i).join();
	}
	while (!_consoleFlag.test_and_set()) { };
	if (_isPrime) cout << target << " is prime.";
	else cout << target << " isn't a prime.";
	cout << endl;
	_consoleFlag.clear();

	return 0;
}
