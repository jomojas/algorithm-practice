/**
 * 给定一个含有 n 个正整数的数组和一个正整数 target，
 * 找出该数组中满足其总和大于等于 target 的长度最小的子数组 [numsl, numsl+1, ..., numsr-1, numsr]，
 * 并返回其长度。如果不存在符合条件的子数组，返回 0。
 *
 * 要求：
 *  使用滑动窗口技术
 *  所有元素都是正整数
 *  子数组必须是连续的
 *
 * 输入格式：
 *   第一行：T                   ← 测试用例数量
 *   接下来 2×T 行，每组测试用例：
 *     第 1 行：n target          ← 目标值 target，数组长度 n
 *     第 2 行：n 个正整数        ← 数组元素（用空格分隔）
 *
 * 输出:
 *   每组测试用例输出一行：
 *     一个整数                  ← 满足条件的最小子数组长度，不存在则返回 0
 *
 * 示例：
 *   输入：target = 7, nums = [2,3,1,2,4,3]
 *   输出：2
 *   解释：子数组 [4,3] 是该条件下的长度最小的子数组
 *
 *   输入：target = 4, nums = [1,4,4]
 *   输出：1
 *   解释：子数组 [4] 是该条件下的长度最小的子数组
 *
 *   输入：target = 11, nums = [1,1,1,1,1,1,1,1]
 *   输出：0
 *   解释：不存在符合条件的子数组
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */

'use strict'

const { get } = require('http')

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

  const getNums = (len) => {
    let nums = []

    for (let i = 0; i < len; i++) {
      nums.push(nextNum())
    }

    return nums
  }

  // 获取T
  const T = nextNum()

  // 运行每个测试案例
  for (let i = 0; i < T; i++) {
    const len = nextNum()
    const target = nextNum()
    const nums = getNums(len)

    // 核心函数
    const res = minimumSizeSubarraySum(nums, len, target)
    console.log(res)
  }
}

// 核心算法 双指针法（非暴力破解）
// 时间复杂度：O(n) [每个元素操作两次，进入窗口一次（加入sum）， 出窗口一次（从sum中减去）] 空间复杂度：O(1)
function minimumSizeSubarraySum(nums, len, target) {
  // 返回结果,初始化为超大值
  let count = 100000
  // 累积和
  let sum = 0
  // 子窗口大小
  let subLength = 0

  let i = 0
  for (let j = 0; j < len; j++) {
    sum += nums[j]

    while (sum >= target) {
      // 更新count
      subLength = j - i + 1
      count = count > subLength ? subLength : count

      sum -= nums[i++]
    }
  }

  return count === 100000 ? 0 : count
}

// 核心函数 暴力破解法 时间复杂度：O(nm) 空间复杂度：O(1)
// function minimumSizeSubarraySum(nums, len, target) {
//   // 返回结果,初始化为超大值
//   let count = 100000

//   for (let i = 0; i < len; i++) {
//     let tempSum = 0

//     let j = i
//     while (true) {
//       tempSum += nums[j]

//       // 1. 找到累积和大于等于target的区间退出循环
//       // 2. 没找到累积和大于等于target的区间但j超出数组长度退出循环
//       if (tempSum >= target) {
//         const subLength = j - i + 1
//         count = count > subLength ? subLength : count
//         break
//       } else if (j >= len) {
//         break
//       }

//       j++
//     }
//   }

//   return count === 100000 ? 0 : count
// }
