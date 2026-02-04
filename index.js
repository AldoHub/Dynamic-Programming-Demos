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


//https://www.youtube.com/watch?v=66hDgWottdA&t=30s 25:58