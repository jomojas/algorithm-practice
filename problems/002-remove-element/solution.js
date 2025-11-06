/**
 * 给定整数数组 nums 和整数 val，原地删除所有等于 val 的元素，返回删除后剩余元素的个数 k。
 * 要求：
 *  只使用 O(1) 额外空间（只能原地修改 nums）
 *  答案只看 nums[0…k-1] 是否正确，nums[k…] 的值不关心。
 *
 * 输入格式：
 *   第一行：T                   ← 测试用例数量
 *   接下来 2×T 行，每组测试用例：
 *     第 1 行：n val            ← 数组长度 n，要删除的元素 val
 *     第 2 行：n 个整数          ← 数组元素（用空格分隔）
 *
 * 输出:
 *   每组测试用例输出一行：
 *     k                         ← 删除 val 后，数组中剩余元素的个数
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
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
    const trimmed = line.trim()
    if (!trimmed) continue // 跳过空行和纯空格行
    tokens.push(...trimmed.split(/\s+/))
  }
  main(tokens)
  rl.close()
})()

function main(tokens) {
  let idx = 0
  const next = () => tokens[idx++]
  const nextNum = () => Number(next())

  // 获取T
  const T = nextNum()

  // 获取nums函数
  const getNums = (len) => {
    let nums = []
    for (let i = 0; i < len; i++) {
      nums.push(nextNum())
    }
    return nums
  }

  // 运行每个测试案例
  for (let i = 0; i < T; i++) {
    const len = nextNum()
    const val = nextNum()
    const nums = getNums(len)

    // 调用核心函数
    const result = removeElement(nums, val, len)
    console.log(result)
  }
}

// 核心函数
function removeElement(nums, val, len) {
  let i = 0

  // j === len说明跑完整个数组
  // 方法一：交换nums[i]，nums[j]的元素
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== val) {
      if (nums[i] === val) {
        let temp = nums[j]
        nums[j] = nums[i]
        nums[i] = temp
      }
      i++
    }
  }
  // 方法二：使用nums[j]覆盖nums[i]的元素，更简单方便
  // for (let j = 0; j < len; j++) {
  //   if (nums[j] !== val) {
  //     nums[i++] = nums[j]
  //   }
  // }
  return i
}

// 核心函数（暴力破解）(时间复杂度：O(n^2))
// function removeElement(nums, val, len) {
//   for (let j = 0; j < len; j++) {
//     if (nums[j] === val) {
//       for (let i = j + 1; i < len; i++) {
//         nums[i - 1] = nums[i]
//       }
//       j-- // 当前j所有右边元素向左移动一位，因此j也要向左移一位
//       len-- // 移除一位元素后，数组长度减小1
//     }
//   }
//   return len
// }
