/*
 * main.cpp
 *
 *  Created on: 2016-04-03
 *      Author: Ben Vander Schaaf
 */
#include <iostream>
#include <thread>
#include <vector>
#include <mutex>
#include <condition_variable>

using namespace std;

mutex mx;
condition_variable cv;
int count=1;

// prints integers starting from start up to limit at stepSize frequency
void printValues(int start, int limit, int stepSize) {
	for (int i = start; i <= limit; i = i + stepSize) {
		unique_lock<mutex> mxlock(mx);
		while (((count-start)%stepSize) != 0) { cv.wait(mxlock); } // entry
		count++;
		cout << i << endl; // prints i'th number
		cv.notify_all(); // ~mxlock() unlocks
	}
}

int main() {

	int num_threads = 3;

	vector<thread> threads;
	for (int i=1; i<=num_threads; i++)
	{
		threads.push_back(thread(printValues,i, 60, num_threads));
	}
	for (int i=0; i<num_threads; i++)
	{
		threads.at(i).join();
	}

	return 0;
}
