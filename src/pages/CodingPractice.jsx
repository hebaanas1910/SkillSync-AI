import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";  // For Python syntax highlighting
import { motion } from "framer-motion";
import axios from "axios";
import ExportReport from "./ExportReport";
import ProgressRing from "./ProgressRing";

// Predefined coding questions
const realQuestions = [
  {
    question: "1. Two Sum - Return indices of two numbers that add up to target.",
    starterCode: `function twoSum(nums, target) {\n  // your code here\n}`,
    solution: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n}`,
    test: (fn) => JSON.stringify(fn([2, 7, 11, 15], 9)) === JSON.stringify([0, 1]),
    hint: "Use a hashmap to store indices of previously seen numbers.",
    complexity: "Time Complexity: O(n)",
    company: "Amazon",
    topic: "HashMap",
    difficulty: "Medium",
  },
  {
    question: "2. Reverse Integer - Given an integer, reverse the digits.",
    starterCode: `function reverse(x) {\n  // your code here\n}`,
    solution: `function reverse(x) {\n  const reversed = parseInt(x.toString().split('').reverse().join(''));\n  return x < 0 ? -reversed : reversed;\n}`,
    test: (fn) => fn(123) === 321 && fn(-123) === -321,
    hint: "Think about handling overflow when reversing.",
    complexity: "Time Complexity: O(log x)",
    company: "Google",
    topic: "Strings",
    difficulty: "Easy",
  },
  {
    question: "3. Longest Substring Without Repeating Characters.",
    starterCode: `function lengthOfLongestSubstring(s) {\n  // your code here\n}`,
    solution: `function lengthOfLongestSubstring(s) {\n  let set = new Set();\n  let maxLen = 0;\n  let left = 0;\n  for (let right = 0; right < s.length; right++) {\n    while (set.has(s[right])) {\n      set.delete(s[left]);\n      left++;\n    }\n    set.add(s[right]);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}`,
    test: (fn) => fn("abcabcbb") === 3 && fn("bbbbb") === 1,
    hint: "Use the sliding window technique.",
    complexity: "Time Complexity: O(n)",
    company: "Facebook",
    topic: "Strings",
    difficulty: "Medium",
  },
  {
    question: "4. Merge Two Sorted Lists.",
    starterCode: `function mergeTwoLists(l1, l2) {\n  // your code here\n}`,
    solution: `function mergeTwoLists(l1, l2) {\n  let dummy = new ListNode(0);\n  let p = dummy;\n  while (l1 && l2) {\n    if (l1.val < l2.val) {\n      p.next = l1;\n      l1 = l1.next;\n    } else {\n      p.next = l2;\n      l2 = l2.next;\n    }\n    p = p.next;\n  }\n  p.next = l1 || l2;\n  return dummy.next;\n}`,
    test: (fn) => JSON.stringify(fn([1, 2, 4], [1, 3, 4])) === JSON.stringify([1, 1, 2, 3, 4, 4]),
    hint: "Use a dummy node to simplify code.",
    complexity: "Time Complexity: O(m + n)",
    company: "Microsoft",
    topic: "Linked Lists",
    difficulty: "Medium",
  },
  {
    question: "5. Valid Parentheses.",
    starterCode: `function isValid(s) {\n  // your code here\n}`,
    solution: `function isValid(s) {\n  const stack = [];\n  for (let char of s) {\n    if (char === '(' || char === '[' || char === '{') {\n      stack.push(char);\n    } else {\n      if (stack.length === 0) return false;\n      let top = stack.pop();\n      if ((char === ')' && top !== '(') || (char === ']' && top !== '[') || (char === '}' && top !== '{')) {\n        return false;\n      }\n    }\n  }\n  return stack.length === 0;\n}`,
    test: (fn) => fn("()[]{}") === true && fn("(]") === false,
    hint: "Use a stack to track opening parentheses.",
    complexity: "Time Complexity: O(n)",
    company: "Amazon",
    topic: "Stacks",
    difficulty: "Easy",
  },
  {
    question: "6. Palindrome Number - Check if a number is a palindrome.",
    starterCode: `function isPalindrome(x) {\n  // your code here\n}`,
    solution: `function isPalindrome(x) {\n  if (x < 0) return false;\n  let original = x;\n  let reversed = 0;\n  while (x > 0) {\n    reversed = reversed * 10 + x % 10;\n    x = Math.floor(x / 10);\n  }\n  return original === reversed;\n}`,
    test: (fn) => fn(121) === true && fn(-121) === false,
    hint: "Try reversing the number and comparing it.",
    complexity: "Time Complexity: O(log x)",
    company: "Meta",
    topic: "Numbers",
    difficulty: "Easy",
  },
  {
    question: "7. Group Anagrams.",
    starterCode: `function groupAnagrams(strs) {\n  // your code here\n}`,
    solution: `function groupAnagrams(strs) {\n  const map = new Map();\n  for (let str of strs) {\n    let sorted = str.split('').sort().join('');\n    if (!map.has(sorted)) map.set(sorted, []);\n    map.get(sorted).push(str);\n  }\n  return [...map.values()];\n}`,
    test: (fn) => JSON.stringify(fn(["eat", "tea", "tan", "ate", "nat", "bat"])) === JSON.stringify([["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]),
    hint: "Use a hashmap to group anagrams.",
    complexity: "Time Complexity: O(nklogk)",
    company: "Google",
    topic: "Strings",
    difficulty: "Medium",
  },
  {
    question: "8. Climbing Stairs - Find the number of ways to reach the top of a staircase.",
    starterCode: `function climbStairs(n) {\n  // your code here\n}`,
    solution: `function climbStairs(n) {\n  if (n <= 2) return n;\n  let a = 1, b = 2;\n  for (let i = 3; i <= n; i++) {\n    let temp = a + b;\n    a = b;\n    b = temp;\n  }\n  return b;\n}`,
    test: (fn) => fn(2) === 2 && fn(3) === 3,
    hint: "This problem follows a Fibonacci-like pattern.",
    complexity: "Time Complexity: O(n)",
    company: "Amazon",
    topic: "Dynamic Programming",
    difficulty: "Medium",
  },
  {
    question: "9. Find Missing Number - Given an array of size n, find the missing number.",
    starterCode: `function findMissingNumber(nums) {\n  // your code here\n}`,
    solution: `function findMissingNumber(nums) {\n  let n = nums.length;\n  let totalSum = (n + 1) * (n + 2) / 2;\n  let actualSum = nums.reduce((a, b) => a + b, 0);\n  return totalSum - actualSum;\n}`,
    test: (fn) => fn([1, 2, 4, 5, 6]) === 3,
    hint: "Use the sum of the first n natural numbers.",
    complexity: "Time Complexity: O(n)",
    company: "Microsoft",
    topic: "Arrays",
    difficulty: "Easy",
  },
  {
    question: "10. Sum of Two Integers - Calculate the sum of two integers without using the '+' operator.",
    starterCode: `function getSum(a, b) {\n  // your code here\n}`,
    solution: `function getSum(a, b) {\n  while (b !== 0) {\n    let carry = a & b;\n    a = a ^ b;\n    b = carry << 1;\n  }\n  return a;\n}`,
    test: (fn) => fn(1, 2) === 3 && fn(-2, 3) === 1,
    hint: "Use bitwise operators.",
    complexity: "Time Complexity: O(1)",
    company: "Google",
    topic: "Bit Manipulation",
    difficulty: "Medium",
  },
  {
    question: "1. Merge Intervals - Given a collection of intervals, merge all overlapping intervals.",
    starterCode: `function merge(intervals) {\n  // your code here\n}`,
    solution: `function merge(intervals) {\n  intervals.sort((a, b) => a[0] - b[0]);\n  let result = [];\n  for (let i = 0; i < intervals.length; i++) {\n    if (result.length === 0 || result[result.length - 1][1] < intervals[i][0]) {\n      result.push(intervals[i]);\n    } else {\n      result[result.length - 1][1] = Math.max(result[result.length - 1][1], intervals[i][1]);\n    }\n  }\n  return result;\n}`,
    test: (fn) => JSON.stringify(fn([[1, 3], [2, 6], [8, 10], [15, 18]])) === JSON.stringify([[1, 6], [8, 10], [15, 18]]),
    hint: "Sort the intervals by start time.",
    complexity: "Time Complexity: O(n log n)",
    company: "Apple",
    topic: "Arrays",
    difficulty: "Medium",
  },
  {
    question: "2. Product of Array Except Self - Given an array of integers, return an array where each element is the product of all the numbers in the original array except the one at the current index.",
    starterCode: `function productExceptSelf(nums) {\n  // your code here\n}`,
    solution: `function productExceptSelf(nums) {\n  let left = new Array(nums.length).fill(1);\n  let right = new Array(nums.length).fill(1);\n  let result = [];\n  for (let i = 1; i < nums.length; i++) {\n    left[i] = left[i - 1] * nums[i - 1];\n  }\n  for (let i = nums.length - 2; i >= 0; i--) {\n    right[i] = right[i + 1] * nums[i + 1];\n  }\n  for (let i = 0; i < nums.length; i++) {\n    result.push(left[i] * right[i]);\n  }\n  return result;\n}`,
    test: (fn) => JSON.stringify(fn([1, 2, 3, 4])) === JSON.stringify([24, 12, 8, 6]),
    hint: "Use two arrays to store left and right products.",
    complexity: "Time Complexity: O(n)",
    company: "Google",
    topic: "Arrays",
    difficulty: "Medium",
  },
  {
    question: "3. Rotate Image - Rotate an n x n 2D matrix 90 degrees clockwise.",
    starterCode: `function rotate(matrix) {\n  // your code here\n}`,
    solution: `function rotate(matrix) {\n  const n = matrix.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = i; j < n; j++) {\n      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];\n    }\n  }\n  for (let i = 0; i < n; i++) {\n    matrix[i].reverse();\n  }\n}`,
    test: (fn) => JSON.stringify(fn([[1, 2, 3], [4, 5, 6], [7, 8, 9]])) === JSON.stringify([[7, 4, 1], [8, 5, 2], [9, 6, 3]]),
    hint: "Transpose the matrix first and then reverse each row.",
    complexity: "Time Complexity: O(n^2)",
    company: "Amazon",
    topic: "Matrix",
    difficulty: "Medium",
  },
  {
    question: "4. Container With Most Water - Given an array of integers representing heights of vertical lines, find two lines that together with the x-axis form a container that holds the most water.",
    starterCode: `function maxArea(height) {\n  // your code here\n}`,
    solution: `function maxArea(height) {\n  let left = 0, right = height.length - 1;\n  let maxArea = 0;\n  while (left < right) {\n    const area = Math.min(height[left], height[right]) * (right - left);\n    maxArea = Math.max(maxArea, area);\n    if (height[left] < height[right]) left++;\n    else right--;\n  }\n  return maxArea;\n}`,
    test: (fn) => fn([1, 8, 6, 2, 5, 4, 8, 3, 7]) === 49,
    hint: "Use two pointers to maximize the area.",
    complexity: "Time Complexity: O(n)",
    company: "Facebook",
    topic: "Two Pointers",
    difficulty: "Medium",
  },
  {
    question: "5. Longest Palindromic Substring - Given a string, find the longest palindromic substring.",
    starterCode: `function longestPalindrome(s) {\n  // your code here\n}`,
    solution: `function longestPalindrome(s) {\n  let start = 0, maxLength = 1;\n  for (let i = 0; i < s.length; i++) {\n    for (let j = i + 1; j < s.length; j++) {\n      let substring = s.slice(i, j + 1);\n      if (isPalindrome(substring) && substring.length > maxLength) {\n        start = i;\n        maxLength = substring.length;\n      }\n    }\n  }\n  return s.slice(start, start + maxLength);\n}\nfunction isPalindrome(str) {\n  return str === str.split('').reverse().join('');\n}`,
    test: (fn) => fn("babad") === "bab" || fn("babad") === "aba",
    hint: "Check for palindrome substrings starting from each index.",
    complexity: "Time Complexity: O(n^3)",
    company: "Google",
    topic: "Strings",
    difficulty: "Hard",
  },
  {
    question: "6. Find the Duplicate Number - Find the duplicate number in an array of n+1 integers where each integer is between 1 and n.",
    starterCode: `function findDuplicate(nums) {\n  // your code here\n}`,
    solution: `function findDuplicate(nums) {\n  let slow = nums[0], fast = nums[0];\n  do {\n    slow = nums[slow];\n    fast = nums[nums[fast]];\n  } while (slow !== fast);\n  let ptr1 = nums[0], ptr2 = slow;\n  while (ptr1 !== ptr2) {\n    ptr1 = nums[ptr1];\n    ptr2 = nums[ptr2];\n  }\n  return ptr1;\n}`,
    test: (fn) => fn([1, 3, 4, 2, 2]) === 2,
    hint: "Use Floyd’s Tortoise and Hare algorithm.",
    complexity: "Time Complexity: O(n)",
    company: "Microsoft",
    topic: "Linked Lists",
    difficulty: "Medium",
  },
  {
    question: "7. Find Peak Element - A peak element is an element that is greater than its neighbors. Find one such peak element.",
    starterCode: `function findPeakElement(nums) {\n  // your code here\n}`,
    solution: `function findPeakElement(nums) {\n  let left = 0, right = nums.length - 1;\n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] > nums[mid + 1]) right = mid;\n    else left = mid + 1;\n  }\n  return left;\n}`,
    test: (fn) => fn([1, 2, 3, 1]) === 2,
    hint: "Use binary search to find the peak element.",
    complexity: "Time Complexity: O(log n)",
    company: "Amazon",
    topic: "Binary Search",
    difficulty: "Medium",
  },
  {
    question: "8. Permutations - Given a collection of distinct integers, return all possible permutations.",
    starterCode: `function permute(nums) {\n  // your code here\n}`,
    solution: `function permute(nums) {\n  const result = [];\n  function backtrack(start) {\n    if (start === nums.length) {\n      result.push([...nums]);\n      return;\n    }\n    for (let i = start; i < nums.length; i++) {\n      [nums[start], nums[i]] = [nums[i], nums[start]];\n      backtrack(start + 1);\n      [nums[start], nums[i]] = [nums[i], nums[start]];\n    }\n  }\n  backtrack(0);\n  return result;\n}`,
    test: (fn) => JSON.stringify(fn([1, 2, 3])) === JSON.stringify([[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]),
    hint: "Use backtracking to generate permutations.",
    complexity: "Time Complexity: O(n!)",
    company: "Meta",
    topic: "Backtracking",
    difficulty: "Medium",
  },
  {
    question: "9. Valid Sudoku - Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated.",
    starterCode: `function isValidSudoku(board) {\n  // your code here\n}`,
    solution: `function isValidSudoku(board) {\n  for (let i = 0; i < 9; i++) {\n    const rowSet = new Set(), colSet = new Set(), blockSet = new Set();\n    for (let j = 0; j < 9; j++) {\n      if (board[i][j] !== '.' && rowSet.has(board[i][j])) return false;\n      rowSet.add(board[i][j]);\n      if (board[j][i] !== '.' && colSet.has(board[j][i])) return false;\n      colSet.add(board[j][i]);\n      const blockRow = 3 * Math.floor(i / 3), blockCol = 3 * Math.floor(j / 3);\n      if (board[blockRow + Math.floor(j / 3)][blockCol + j % 3] !== '.' && blockSet.has(board[blockRow + Math.floor(j / 3)][blockCol + j % 3])) return false;\n      blockSet.add(board[blockRow + Math.floor(j / 3)][blockCol + j % 3]);\n    }\n  }\n  return true;\n}`,
    test: (fn) => fn([["5", "3", ".", ".", "7", ".", ".", ".", "."],["6", ".", ".", "1", "9", "5", ".", ".", "."],[".", "9", "8", ".", ".", ".", ".", "6", "."]]) === true,
    hint: "Use sets to check rows, columns, and blocks.",
    complexity: "Time Complexity: O(1) due to fixed grid size.",
    company: "Google",
    topic: "2D Arrays",
    difficulty: "Hard",
  },
  {
    question: "10. Sudoku Solver - Write a program to solve a Sudoku puzzle.",
    starterCode: `function solveSudoku(board) {\n  // your code here\n}`,
    solution: `function solveSudoku(board) {\n  function isValid(board, row, col, num) {\n    for (let i = 0; i < 9; i++) {\n      if (board[row][i] === num || board[i][col] === num || board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] === num) {\n        return false;\n      }\n    }\n    return true;\n  }\n  function solve(board) {\n    for (let i = 0; i < 9; i++) {\n      for (let j = 0; j < 9; j++) {\n        if (board[i][j] === '.') {\n          for (let num = 1; num <= 9; num++) {\n            num = num.toString();\n            if (isValid(board, i, j, num)) {\n              board[i][j] = num;\n              if (solve(board)) return true;\n              board[i][j] = '.';\n            }\n          }\n          return false;\n        }\n      }\n    }\n    return true;\n  }\n  solve(board);\n}`,
    test: (fn) => JSON.stringify(fn([["5", "3", ".", ".", "7", ".", ".", ".", "."],["6", ".", ".", "1", "9", "5", ".", ".", "."],[".", "9", "8", ".", ".", ".", ".", "6", "."]])) === JSON.stringify([["5", "3", "4", "6", "7", "8", "9", "1", "2"], ["6", "7", "2", "1", "9", "5", "3", "4", "8"], ["1", "9", "8", "3", "4", "2", "5", "6", "7"]]),
    hint: "Use backtracking to try filling each empty cell.",
    complexity: "Time Complexity: O(9^2)",
    company: "Microsoft",
    topic: "Backtracking",
    difficulty: "Hard",
  },



  
  {
    question: "25. Maximum Subarray Sum - Find the contiguous subarray with the largest sum.",
    starterCode: `function maxSubArray(nums) {\n  // your code here\n}`,
    solution: `function maxSubArray(nums) {\n  let max = nums[0];\n  let current = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    current = Math.max(nums[i], current + nums[i]);\n    max = Math.max(max, current);\n  }\n  return max;\n}`,
    test: (fn) => fn([-2, 1, -3, 4, -1, 2, 1, -5, 4]) === 6,
    hint: "Use dynamic programming approach.",
    complexity: "Time Complexity: O(n)",
    company: "Meta",
    topic: "Dynamic Programming",
    difficulty: "Hard",
  },
];

const companies = ["All", "Amazon", "Google", "Meta", "Microsoft"];
const topics = ["All", "HashMap", "Arrays", "Strings", "Misc"];
const difficulties = ["All", "Easy", "Medium", "Hard"];
const languagesOptions = ["JavaScript", "Python", "Java"];

const CodingPractice = () => {
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [codes, setCodes] = useState([]);
  const [showSolutions, setShowSolutions] = useState([]);
  const [showHints, setShowHints] = useState([]);
  const [results, setResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(600);
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState("practice");
  const [xp, setXP] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  const startSession = () => {
    const selected = realQuestions
      .filter((q) => selectedCompany === "All" || q.company === selectedCompany)
      .filter((q) => selectedTopic === "All" || q.topic === selectedTopic)
      .filter((q) => selectedDifficulty === "All" || q.difficulty === selectedDifficulty)
      .slice(0, mode === "mock" ? 3 : mode === "contest" ? 10 : numQuestions);

    setQuestions(selected);
    setCodes(selected.map((q) => q.starterCode));
    setShowSolutions(selected.map(() => false));
    setShowHints(selected.map(() => false));
    setResults([]);
    setTimeLeft(mode === "mock" ? 1800 : mode === "contest" ? 900 : 600);
    setStarted(true);
    setSubmitted(false);
    setXP(0);
  };

  useEffect(() => {
    if (!started || submitted) return;
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, started, submitted]);

  const handleSubmit = async () => {
    const results = questions.map((q, i) => {
      try {
        const fn = new Function(`${codes[i]}; return ${q.solution.match(/function (\w+)/)[1]};`)();
        return q.test(fn);
      } catch (e) {
        return false;
      }
    });

    const score = results.filter(Boolean).length * 10;
    setResults(results);
    setSubmitted(true);
    setXP(score);

    const user = JSON.parse(localStorage.getItem("user"));
    if (mode === "mock" || mode === "contest") {
      await axios.post(`https://skillsync-ai-backend-2.onrender.com/api/submit-score`,{
        name: user?.name || "User",
        score,
        level: Math.floor(score / 30),
        timeTaken: mode === "mock" ? 1800 - timeLeft : 900 - timeLeft,
      });
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className={`${darkMode ? "bg-gradient-to-br from-gray-900 via-gray-950 to-black" : "bg-gradient-to-br from-gray-300 via-gray-400 to-white"} min-h-screen text-white p-6`}>
      <h1 className="text-4xl font-extrabold text-purple-300 mb-4 text-center drop-shadow-md">
        💻 SkillSync Coding Arena
      </h1>

      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={() => setMode("practice")}
          className={`px-4 py-2 rounded-full border ${mode === "practice" ? "bg-green-500 text-black" : "bg-gray-800 border-gray-600"}`}
        >
          Practice Mode
        </button>

        <button
          onClick={() => window.location.href = "/leaderboard"}
          className="px-4 py-2 rounded-full border border-yellow-400 bg-yellow-300 text-black"
        >
          🏆 Leaderboard
        </button>

        
      </div>

      {!started && (
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="p-2 bg-gray-800 border border-purple-600 rounded text-white"
          >
            {companies.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="p-2 bg-gray-800 border border-purple-600 rounded text-white"
          >
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="p-2 bg-gray-800 border border-purple-600 rounded text-white"
          >
            {difficulties.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="p-2 bg-gray-800 border border-purple-600 rounded text-white"
          >
            {languagesOptions.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>

          <input
            type="number"
            min={1}
            max={20}
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value) || 5)}
            className="w-20 p-2 bg-gray-800 border border-purple-600 rounded text-white"
          />

          <button
            onClick={startSession}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded shadow"
          >
            Start {mode === "mock" ? "Mock" : mode === "contest" ? "Contest" : "Practice"}
          </button>
        </div>
      )}

      {started && (
        <>
          <p className="text-center text-sm text-purple-400 mb-4">
            Time Left: <span className="font-bold text-lg">⏳ {formatTime(timeLeft)}</span>
          </p>

          <div className="flex justify-center mb-6">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg"
            >
              🚀 Submit My Answers
            </button>
          </div>
        </>
      )}

      {questions.map((q, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          className="mb-10 bg-white/5 p-6 rounded-xl border border-purple-700 shadow-md"
        >
          <h2 className="text-lg font-semibold text-purple-300 mb-2">Q{i + 1}. {q.question}</h2>

          <Editor
            value={codes[i]}
            onValueChange={(code) => {
              const newCodes = [...codes];
              newCodes[i] = code;
              setCodes(newCodes);
            }}
            highlight={(code) => highlight(code, languages[selectedLanguage.toLowerCase()])}
            padding={10}
            className="bg-black border border-purple-700 text-sm rounded-lg font-mono text-white"
            style={{ minHeight: "180px" }}
          />

          <div className="flex items-center gap-4 mt-4">
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
              onClick={() => {
                const updated = [...showSolutions];
                updated[i] = !updated[i];
                setShowSolutions(updated);
              }}
            >
              {showSolutions[i] ? "Hide Solution" : "Show Solution"}
            </button>

            <button
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-sm"
              onClick={() => {
                const updated = [...showHints];
                updated[i] = !updated[i];
                setShowHints(updated);
              }}
            >
              {showHints[i] ? "Hide Hint" : "Show Hint"}
            </button>

            {submitted && (
              <span
                className={`text-sm font-bold px-3 py-1 rounded-full shadow ${
                  results[i] ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {results[i] ? "✅ Correct" : "❌ Incorrect"}
              </span>
            )}
          </div>

          {showSolutions[i] && (
            <pre className="mt-4 bg-black p-4 rounded text-sm text-green-300 overflow-x-auto">
              {q.solution}
            </pre>
          )}

          {showHints[i] && <p className="mt-2 text-yellow-400 text-sm italic">💡 Hint: {q.hint}</p>}

          {submitted && <p className="mt-2 text-sm text-blue-300">🧠 {q.complexity}</p>}
        </motion.div>
      ))}

      {submitted && (
        <div className="text-center mt-10">
          <h2 className="text-2xl text-green-400 font-bold mb-2">🎯 Score: {xp}</h2>
          <ExportReport questions={questions} codes={codes} results={results} xp={xp} timeTaken={mode === "mock" ? 1800 - timeLeft : 900 - timeLeft} />
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 justify-center">
            {topics.slice(1).map((topic) => (
              <ProgressRing key={topic} label={topic} percent={Math.floor(Math.random() * 100)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodingPractice;
