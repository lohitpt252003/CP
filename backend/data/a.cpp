#include <bits/stdc++.h>

using namespace std;

#define ll long long

int getRandom(int low, int high) {
    random_device rd;  // seed
    mt19937 gen(rd()); // Mersenne Twister engine
    uniform_int_distribution<> dist(low, high);
    return dist(gen);
}


int longestPalinSubseq(string A)
{
    vector<int> current(A.size() + 1), prev(A.size() + 1, 0);
    
    for (int ptr1 = 1; ptr1 <= A.size(); ptr1++)
    {
        for (int ptr2 = 1; ptr2 <= A.size(); ptr2++)
        {
            if (A[ptr1 - 1] == A[A.size() - ptr2])
                current[ptr2] = 1 + prev[ptr2 - 1];
            else
                current[ptr2] = max(current[ptr2 - 1], prev[ptr2]);
        }
        
        prev = current;
    }
    return current[A.size()];
}



int f(int n) {
    long long MOD = 1e9 + 7;
    vector<long long> F(4);
    F[0] = 0;
    F[1] = 1;
    F[2] = 2;
    F[3] = 3;
    // int n;
    // cin >> n;

    if (n < 4) {
        // cout << F[n] % MOD << endl;
        return F[n] % MOD;
    }

    vector<long long> dp(n + 1);
    for (int i = 0; i < 4; i++) dp[i] = F[i];

    for (int i = 4; i <= n; i++) {
        dp[i] = (((dp[i - 1] + dp[i - 2]) % MOD + dp[i - 3]) % MOD + dp[i - 4]) % MOD;
    }

    return dp[n] % MOD;
}


int main() {
    int t = 1;
    srand(time(NULL));

    vector<vector<ll>> arr;
    vector<int> nums;

    for (int i = 0 ; i < t; i++) {
        // int n = rand() % 1000000 + 1;
        int n = 1000000;
        nums.push_back(n);
    }

    // for (int i = 0; i < t; i++) {
    //     vector<ll> temp;
    //     for (int j = 0; j < nums[i]; j++) {
    //         ll x = rand() % 1000 + 1;
    //         int sign = rand() % 2;
    //         if (sign == 0)
    //             temp.push_back(x);
    //         else
    //             temp.push_back(-x);
    //     }
    //     arr.push_back(temp);
    // }

    vector<string> strings;

    // for (int i = 0; i < t; i++) {
    //     string s;
    //     int n = nums[i];
    //     for (int j = 0; j < n; j++) {
    //         char c = 'a' + rand() % 26;
    //         s += c;
    //     }
    //     strings.push_back(s);
    // }


    for (int i = 0; i < t; i++) {
        int n = nums[i];
        int pos = 0;
        string str = "";

        while (pos < n) {
            int lower = 1, high = min(n - pos, 4);
            int cur = getRandom(lower, high);
            char c = 'a' + rand() % 26;
            for (int j = 0; j < cur; j++) {
                str += c;
            }
            pos += cur;
        }
        if (pos == n) strings.push_back(str);
        else i--;
    }



    int i = 15;
    int ind = 0;
    for (auto a : nums) {
        // cout << "Test case " << i + 1 << ": ";
        string input = "problems/testcases/2/" + to_string(i + 1) + ".in";
        string output = "problems/testcases/2/" + to_string(i + 1) + ".out";
        cout << "=== Writing testcase " << i + 1 << " ===" << endl;
        cout << "Input file: " << input << ", Output file: " << output << endl;
        // cout << a.size() << endl << endl;
        cout << a << endl;
        ofstream inputFile(input);
        ofstream outputFile(output);
        if (inputFile.is_open() && outputFile.is_open()) {
            inputFile << a << endl;
            // for (int j = 0; j < a.size(); j++) {
            //     inputFile << a[j];
            // }
            inputFile << endl;
            
            int result = f(a);
            outputFile << result << endl;
            
            inputFile.close();
            outputFile.close();
            // if (a.size() != nums[ind]) {
            //     cout << "SIZE DIDN'T MATCH \n";
            //     return 0;
            // }
        }
        else {
            cout << "Error opening file(s) for test case " << i + 1 << endl;
        }
        // fstream input; 
        i++;
        ind++;
    }
}