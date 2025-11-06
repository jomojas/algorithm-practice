/**
 * 给定一个按非递减顺序排序的整数数组 nums，返回每个数字的平方组成的新数组，
 * 要求按非递减顺序排序。
 *
 * 要求：
 *  使用双指针技术，时间复杂度 O(n)
 *  不能使用内置排序函数
 *
 * 输入格式：
 *   第一行：T                   ← 测试用例数量
 *   接下来 T 行，每组测试用例：
 *     第 1 行：n                ← 数组长度 n
 *     第 2 行：n 个整数          ← 数组元素（用空格分隔，已按非递减顺序排序）
 *
 * 输出:
 *   每组测试用例输出一行：
 *     n 个整数                  ← 平方后按非递减顺序排列的数组（用空格分隔）
 *
 * 示例：
 *   输入：nums = [-4,-1,0,3,10]
 *   输出：[0,1,9,16,100]
 *   解释：平方后，数组变为 [16,1,0,9,100]
 *        排序后，数组变为 [0,1,9,16,100]
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
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
  main(tokens)
  rl.close()
})()

function main(tokens) {
  let idx = 0
  const next = () => tokens[idx++]
  const nextNum = () => Number(next())

  // 获取nums函数
  const getNums = (len) => {
    let nums = []
    for (let j = 0; j < len; j++) {
      nums.push(nextNum())
    }
    return nums
  }

  // 获取T
  const T = nextNum()

  // 运行每个测试案例
  for (let i = 0; i < T; i++) {
    const len = nextNum()
    const nums = getNums(len)

    // 核心函数调用
    const result = squareOfSortedArray(nums, len)
    console.log(result)
  }
}

// 核心函数--卡码网代码
function squareOfSortedArray(nums, len) {
  // 初始化固定长度的数组，每个元素的初始值为0
  let res = new Array(len).fill(0)

  for (let i = 0, j = len - 1, k = len - 1; i <= j; k--) {
    if (Math.pow(nums[j], 2) > Math.pow(nums[i], 2)) {
      res[k] = Math.pow(nums[j], 2)
      j--
    } else if (Math.pow(nums[j], 2) <= Math.pow(nums[i], 2)) {
      res[k] = Math.pow(nums[i], 2)
      i++
    }
  }
  return res
}

// 核心函数
// function squareOfSortedArray(nums, len) {
//   let j = 0
//   // 获取第一个非负数的索引
//   for (let k = 0; k < len; k++) {
//     if (nums[k] >= 0) {
//       j = k
//       break
//     }
//   }

//   // 最终数组
//   let res = []

//   let i = j - 1
//   let flag = -1 // 0 -- j = nums.length 退出   1 -- i < 0 退出
//   while (true) {
//     if (i < 0) {
//       flag = 1
//       break
//     }
//     if (j === len) {
//       flag = 0
//       break
//     }
//     if (Math.pow(nums[i], 2) <= Math.pow(nums[j], 2)) {
//       res.push(Math.pow(nums[i], 2))
//       i--
//     } else {
//       res.push(Math.pow(nums[j], 2))
//       j++
//     }
//   }

//   if (flag === 0) {
//     for (let k = i; k >= 0; k--) {
//       res.push(Math.pow(nums[k], 2))
//     }
//   } else if (flag === 1) {
//     for (let k = j; k < len; k++) {
//       res.push(Math.pow(nums[k], 2))
//     }
//   }
//   return res
// }
