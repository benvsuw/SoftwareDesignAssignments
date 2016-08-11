#include <iostream>
#include <vector>
#include <cmath>
#include <thread>
#include <atomic>

using namespace std;

atomic<bool> _threadsReady(false);
atomic_flag _gotPrime = ATOMIC_FLAG_INIT;
bool _isPrime = true;

void isPrime(int threadID, int potentialPrime) {
	while (!_threadsReady) { this_thread::yield(); }
	// get prime
	int maxTest = sqrt(abs(potentialPrime));
	for (int i=2; i<=maxTest; i++) {
		if (potentialPrime%i == 0) {
			_isPrime = false;
			break;
		}
	}
	if (!_gotPrime.test_and_set()) {
		cout << "Thread " << threadID << " finished! " << potentialPrime;
		if (_isPrime) cout << " is a prime.";
		else cout << " isn't a prime.";
		cout << endl;
	}
}

int main() {

	int num_threads = 300;
	int prime_to_test = 654323;

	vector<thread> threads;
	for (int i=0; i<num_threads; i++)
	{
		threads.push_back(thread(isPrime, i, prime_to_test));
	}
	_threadsReady = true;
	for (int i=0; i<num_threads; i++)
	{
		threads.at(i).join();
	}

	return 0;

}
