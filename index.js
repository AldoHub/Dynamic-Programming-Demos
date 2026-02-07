/**--------------- RECURSION (TOP-DOWN - for problems were the order of computatios doesnt matter - partition problems like split a string into parts or divide array into groups ) --------------- */

/** Find the nuymber of options for climbing a stair with n amount for steps - time complexity O(2n) */
function climbStairs(n) {
     if (n === 1) return 1; //calcs the first step
     if (n === 2) return 2; //calcs the second step
     return climbStairs(n - 1) + climbStairs(n - 2); //calcs the third step and upcoming steps
}

/** Find the nuymber of options for climbing a stair with n amount for steps with MEMOIZATION- time complexity O(n) */
const memo =  {};
function climbStairsMemoization(n) {
    if(n in memo) return memo[n];
    if (n === 1) return 1;
    if (n === 2) return 2;

    const result = climbStairsMemoization(n - 1) + climbStairsMemoization(n - 2);
    memo[n] = result;
    return result;
}

/**--------------- TABULATION (BOTTOM-UP - for problems were the order of computations matters - like the Fibonacci sequence ) --------------- */

function climbStairsTabulation(n) {
    //use an array as memoization - will store the results of each step - we avoid recursion using tabulation
    const ways = [];
    ways[1] = 1;
    ways[2] = 2;
    for (let i = 3; i <= n; i++) {
        //the new cell will contain the value of the previous cell + the value of the next cell (last and previous to last cells)
        ways[i] = ways[i - 1] + ways[i - 2];
    }
    return ways[n];
}


//climbMin - each step has a cost adjacent to it - reach the top of the stair with the minimum cost

function climbMin(n) {
    const n = cost.length; //total number of steps
    
    //keep only the needed values for the processing
    let prev1 = cost[1];
    let prev2 = cost[2];
    
    //start from the second step and calculate the minimum cost for each step
    for (let i = 2; i < n; i++) {
        let currentPrice = Math.min(prev1, prev2) + cost[i];
        prev1 = prev2;
        prev2 = currentPrice;
    }

    return Math.min(prev1, prev2); //return the minimum cost for the last step

}

/**--------------- GRID PATTERN  --------------- */

//find all the unique paths on a grid from Top Left to Bottom Right
function uniquePaths(m, n) {
    let paths = []; // 2 dimensional array to store the paths

    for(let j= 0; j < n; j++){
        paths[0][j] = 1; //only 1 path from top left to the first cell
    }

    for(let i = 1; i < m; i++){
        paths[i][1] = 1; //only 1 path from top right to the first cell
    }

    for(let i = 1; i < m; i++){ //row loop
        //start from the second row and calculate the paths for each cell
        for(let j = 1; j < n; j++){ //column loop
            paths[i][j] = paths[i-1][j] + paths[i][j-1]; //add the paths from the previous cell to the current cell
        }
    }

    return paths[m-1][n-1]; //return the last cell

}

function uniquePatOptimized(m, n) {
    let row = new Array(n).fill(1); //create an array with the first row

    for(let i = 1; i < m; i++){ //row loop
        for(let j = 1; j < n; j++){ //column loop
            row[j] = row[j] + row[j-1]; //add the paths from the previous cell to the current cell
        }
    }

    return row[n-1]; //return the last cell

}


/**--------------- TWO SEQUENCES --------------- */

//find the length of the longest common subsequence between two sequences/strings
function longestCommonSubsequence(a, b) {
    let m = a.length; //length of the first sequence
    let n = b.length; //length of the second sequence

    let dp = [];

    
    for(let j = 0; j <= n + 1; i++){
        dp[0][j] = 0 //create an array with zeros for the first row
    }

    for(let i = 0; i <= m + 1; i++){
        dp[i][0] = 0 //create an array with zeros for the first column
    }

    for(let i = 1; i <= m; i++){
        for(let j = 1; j <= n; j++){
            if(a[i-1] === b[j-1]){
                dp[i][j] = dp[i-1][j-1] + 1; //add 1 to the previous cell if the characters are the same
            }else{
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]); //take the max of the previous cell and the current cell
            }
        }
    }

    return dp[m][n]; //return the last cell
}


function longestCommonSubsequenceOptimized(a, b) {
    let m = a.length; //length of the first sequence
    let n = b.length; //length of the second sequence

    let prev = new Array(m + 1).fill(0); //create an array with zeros for the first row
    let curr = new Array(m + 1).fill(0); //create an array with zeros for the first column
    
    for(let i = 1; i <= m; i++){
        for(let j = 1; j <= n; j++){
            if(a[i-1] === b[j-1]){
               curr[j] = prev[i-1] + 1; //add 1 to the previous cell if the characters are the same
            }else{
               curr[j] = Math.max(prev[i], curr[j-1]); //take the max of the previous cell and the current cell
            }
        }

        prev = curr; //swap the previous and current arrays for the next iteration
        curr = new Array(n + 1).fill(0); //create an array with zeros for the first column

    }

    return prev[n]; //return the last cell
}

/**--------------- INTERVAL DP --------------- */

function longestPalindromeSubSequenceOptimized(s) {
    let n = s.length;
    
    let prev = new Array(n + 1).fill(0); //create an array with zeros for the first row
    let curr = new Array(n + 1).fill(0); //create an array with zeros for the first column

    for(let i = n - 1; i >= 0; i--){
        curr[i] = 1;
        for(let j = i + 1; j < n; j++){
            if(s[i] === s[j]){
                curr[j] = prev[j-1] + 2; 
            }else{
                curr[j] = Math.max(prev[j], curr[j-1]);
            }
        }

        [prev, curr] = [curr, prev]; //swap the previous and current arrays for the next iteration

    }

    return prev[n-1]; //return the last cell

}


/**--------------- NON-CONSTANT TRANSITION - result depends on all the previous steps --------------- */

//find the length of the longest increasing subsequence
function lengthOfLIS(nums) {
    let n = nums.length;
    let dp = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);

}


/**--------------- KNAPSACK  --------------- */

function canPartition(nums) {
    let totalSum = nums.reduce((a, b) => a + b, 0);

    if(totalSum %2 !== 0) return false;

    let target = totalSum / 2;
    let dp = new Array(target + 1).fill(false);
    dp[0] = true;

    for(let num of nums){
        //fill the array from the right to the left to avoid using the values more than once
        for(let s = target - num; s >= 0; s--){
            if(dp[s]){
                dp[s + num] = true;
            }
        }
    }

    return dp[target];

}



//given an integer return true if its a power of four otherwise false
function isPowerOfFour(n) {
    if(n === 1) return true;
    if(n === 0) return false;
    if(n % 4 === 0) return true;

    return isPowerOfFour(n/4);
}

const n1 = 16;
const n2 = 5;
const n3 = 1;

console.log(isPowerOfFour(n1)); //true
console.log(isPowerOfFour(n2)); //false
console.log(isPowerOfFour(n3)); //true


//return 2 indexes within the array that sums the target value
function sumArrayValues(nums, target) {
    let map = new Map();

    for(let i = 0; i < nums.length; i++){
        let compliment = target-nums[i];

        if(map.has(compliment)){
            return [map.get(compliment), i];
        }else{
            map.set(nums[i], i);
        }
    }
}

console.log(sumArrayValues([1,2,3,4,5], 9)); //[4, 3]
console.log(sumArrayValues([1,2,3,4,5], 6)); //[2, 4]
console.log(sumArrayValues([1,2,3,4,5], 7)); //[1, 5]


/**--------------- TWO POINTS TECHNIQUE - place cursors on the far left and far right of the array and move them until they meet --------------- */

//given a integer x, return  true if x is palindrome otherwise false

function isPalindrome(x) {

    if(x < 0) return false;
    x = x.toString();

    let left = 0;
    let right = x.length - 1;

    while(left < right){
        if(x[left] !== x[right]) return false; // if the characters are not the same return false
        left++;
        right--;
    }

    return true;

}