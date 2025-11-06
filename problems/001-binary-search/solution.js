/**
 * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果 target 存* 在返回下标，否则返回 -1
 *
 * 输入格式：
 * 第一行：T
 * 每组：
 *   第一行：n target
 *   第二行：数组元素
 *
 * 输出:
 * 每组一行：index | -1
 *
 * 时间复杂度：O(logn)
 * 空间复杂度：O(1)
 *
 * 二分查找使用条件：1. 数组为有序数组 2. 数组中没有重复元素
 */

'use strict'

const rl = require('readline').createInterface({
  input: process.stdin
})
let iter = rl[Symbol.asyncIterator]()
const readline = async () => (await iter.next()).value

void (async function () {
  let tokens = []
  let line
  while ((line = await readline())) {
    let t = line.trim().split(/\s+/)
    tokens.push(...t)
  }
  // 执行主函数
  main(tokens)

  rl.close()
})()

// main函数
function main(tokens) {
  let idx = 0
  const next = () => tokens[idx++]
  const nextNum = () => Number(next())

  function getNums(len) {
    const nums = []
    for (let i = 0; i < len; i++) {
      nums.push(nextNum()) // 正确！nextNum 已经返回 Number
    }
    return nums
  }

  // 读取T
  const T = nextNum()

  for (let i = 0; i < T; i++) {
    const len = nextNum()
    const target = nextNum()
    const nums = getNums(len)

    // 二元搜索找到target
    const res = binarySearch(nums, target)
    console.log(res)
  }
}

// 核心函数--1. 有效区间[left, right],即target所在区间为[left, right],while判断条件为left <= right
// function binarySearch(nums, target) {
//   let left = 0
//   let right = nums.length - 1  // 有效区间[left, right], 所以right初始化长度为nums.length-1
//   let mid = Math.floor(left + (right - left) / 2)
//   // left > right说明全部数组都已检查过
//   while (left <= right) {
//     mid = Math.floor(left + (right - left) / 2)
//     if (nums[mid] === target) {
//       return mid
//     } else if (nums[mid] > target) {
//       right = mid - 1
//     } else if (nums[mid] < target) {
//       left = mid + 1
//     }
//   }
//   return -1
// }

// 核心函数--2. 有效区间[left, right),即target所在区间为[left, right),while判断条件为left < right
function binarySearch(nums, target) {
  let left = 0
  let right = nums.length // 有效区间[left, right)，所以right初始化为nums.length
  // left = right说明全部数组都已检查过
  while (left < right) {
    let mid = Math.floor(left + (right - left) / 2)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      right = mid // 当前索引mid所在位置已经视为无效，则right占据有效区间右侧第一个无效位
    } else if (nums[mid] < target) {
      left = mid + 1
    }
  }
  return -1
}
