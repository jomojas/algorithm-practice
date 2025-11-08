/**
 * 给你一个正整数 n，生成一个包含 1 到 n² 所有元素，且元素按顺时针顺序螺旋排列的 n × n 正方形矩阵。
 *
 * 要求：
 *  按照顺时针螺旋顺序填充矩阵
 *  从矩阵的左上角开始，向右→向下→向左→向上循环填充
 *  数字从 1 开始递增到 n²
 *
 * 输入格式：
 *   第一行：T                   ← 测试用例数量
 *   接下来 T 行，每组测试用例：
 *     一个正整数 n              ← 矩阵的边长
 *
 * 输出:
 *   每组测试用例输出 n 行：
 *     每行 n 个整数             ← 螺旋排列的矩阵（用空格分隔）
 *
 * 示例：
 *   输入：n = 3
 *   输出：
 *   1 2 3
 *   8 9 4
 *   7 6 5
 *   解释：按顺时针螺旋顺序填充 3×3 矩阵
 *
 *   输入：n = 1
 *   输出：
 *   1
 *   解释：1×1 矩阵只有一个元素
 *
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(n^2)
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

  const getNums = (num) => {
    let nums = []

    for (let i = 1; i <= Math.pow(num, 2); i++) {
      nums.push(i)
    }

    return nums
  }

  // 获取T
  const T = nextNum()

  // 测试每个案例
  for (let i = 0; i < T; i++) {
    const num = nextNum()
    const nums = getNums(num)
    // console.log('nums', nums)

    // 核心函数
    const res = spiralMatrixII(num, nums)
    // 打印矩阵
    printMatrix(num, res)
  }
}

// 核心函数, 只传入num版本, 时间复杂度：O(n^2) 空间复杂度：O(n^2)
function spiralMatrixII(num) {
  let m = num - 1 // 每次循环索引移动的步数
  let count = 0 // 外层循环计数器，同时也是每次外层循环起始位置横纵坐标
  let number = 1 // 自增的填充数据
  // 结果矩阵
  let matrix = Array.from({ length: num }, () =>
    Array.from({ length: num }, () => 0)
  )
  // nums数组索引
  let k = 0

  while (m >= 0) {
    // 矩阵索引
    let i = count
    let j = count

    // 最内层只有一个元素的情况
    if (m === 0) {
      matrix[i][j] = number
    }

    // 上行：左-->右
    for (let p = 0; p < m; p++) {
      matrix[i][j] = number++
      j++
      k++
    }

    // 右列：上-->下
    for (let p = 0; p < m; p++) {
      matrix[i][j] = number++
      i++
      k++
    }

    // 下行：右-->左
    for (let p = 0; p < m; p++) {
      matrix[i][j] = number++
      j--
      k++
    }

    // 左列：下-->上
    for (let p = 0; p < m; p++) {
      matrix[i][j] = number++
      i--
      k++
    }

    // 层数减小
    m -= 2
    count++
  }

  return matrix
}

// 核心函数 时间复杂度：O(n^2) 空间复杂度：O(n^2 + n)-->O(n^2)
// function spiralMatrixII(num, nums) {
//   let m = num - 1 // 每次循环索引移动的步数
//   let count = 0 // 外层循环计数器，同时也是每次外层循环起始位置横纵坐标
//   // 结果矩阵
//   let matrix = Array.from({ length: num }, () =>
//     Array.from({ length: num }, () => 0)
//   )
//   // nums数组索引
//   let k = 0

//   while (m >= 0) {
//     // 矩阵索引
//     let i = count
//     let j = count

//     // 最内层只有一个元素的情况
//     if (m === 0) {
//       matrix[i][j] = nums[k]
//     }

//     // 上行：左-->右
//     for (let p = 0; p < m; p++) {
//       matrix[i][j] = nums[k]
//       j++
//       k++
//     }

//     // 右列：上-->下
//     for (let p = 0; p < m; p++) {
//       matrix[i][j] = nums[k]
//       i++
//       k++
//     }

//     // 下行：右-->左
//     for (let p = 0; p < m; p++) {
//       matrix[i][j] = nums[k]
//       j--
//       k++
//     }

//     // 左列：下-->上
//     for (let p = 0; p < m; p++) {
//       matrix[i][j] = nums[k]
//       i--
//       k++
//     }

//     // 层数减小
//     m -= 2
//     count++
//   }

//   return matrix
// }

// 打印函数
function printMatrix(dimension, matrix) {
  for (let i = 0; i < dimension; i++) {
    console.log(matrix[i].join(' '))
  }
}
