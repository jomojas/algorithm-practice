/**
 * 题目：移除链表元素 (Remove Linked List Elements)
 *
 * 新的输入格式（严格两行每个用例）：
 *  第一行：T                      ← 测试用例数量（整个输入第一行）
 *  接下来每个测试用例占两行：
 *    第一行：n val                 ← n 为数组长度（非负整数），val 为要删除的整数
 *    第二行：a1 a2 a3 ... an      ← n 个整数，用空格分隔；当 n == 0 时，第二行可以为空（但必须存在占位行）
 *
 * 输出格式：
 *  对每个测试用例，输出一行，使用 JSON 数组表示删除指定元素之后的链表节点值（例如 [1,2,3]）。
 *
 * 使用：
 *  Get-content input.txt | node solution.js
 *
 * 说明：
 *  - 该实现严格按照“每个用例两行”的格式读取第二行（即使第二行为空也会被消费），更符合大厂笔试的标准格式。
 *  - 对于提供元素少于 n 的情况，按实际提供数量处理；多于 n 的情况只取前 n 个。
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 *
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

  while (true) {
    line = await readline() // 可能返回: null (EOF) 或 "" (空行) 或 " 0 1" 等
    if (line === null || line === undefined) break // EOF -> 退出
    // 此处决定如何处理空行：通常跳过但继续循环
    if (line.trim() === '') continue // 跳过空行
    tokens.push(...line.trim().split(/\s+/))
  }
  main(tokens)

  rl.close()
})()

// 节点类
class ListNode {
  val
  next
  constructor(value) {
    this.val = value
    this.next = null
  }
}

// 根据数据构建链表
function constructList(nums, len) {
  if (len === 0) return null

  // 链条头
  const head = new ListNode(nums[0])
  // 临时节点，用于连接链表节点
  let temp = head
  for (let i = 1; i < len; i++) {
    const cur = new ListNode(nums[i])
    // 让上一个节点指向当前创建的新节点
    temp.next = cur
    temp = cur
  }

  return head
}

// 打印链表数据
function printList(head) {
  let nums = []
  let temp = head

  // 循环打印所有节点
  while (temp !== null) {
    nums.push(temp.val)
    temp = temp.next
  }

  console.log(nums.join(' '))
}

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

  // 每个测试案例进行处理
  for (let i = 0; i < T; i++) {
    const len = nextNum()
    const val = nextNum()
    const nums = getNums(len)

    // 根据数据创建链表且返回链表头节点
    const head = constructList(nums, len)
    // 核心函数
    const res = removeLinkNodes(head, val)
    // 打印链表节点数据
    printList(res)
  }
}

// 核心函数，递归方法，时间复杂度：O(n) 空间复杂度：O(n)
function removeLinkNodes(head, value) {
  if (head === null) return null

  /**
   * 此注释部分为本人所写递归，下面未注释部分是更简洁的递归实现
   * 如果当前头节点val等于value,则以其下一节点作为head返回
   *
   * if (head.val === value) {
   *     head = removeLinkNodes(head.next, value)
   * } else {
   *     head.next = removeLinkNodes(head.next, value)
   * }
   *
   */

  // 假设 removeElements() 返回后面完整的已经去掉val节点的子链表
  // 在当前递归层用当前节点接住后面的子链表
  // 随后判断当前层的node是否需要被删除，如果是，就返回
  // 也可以先判断是否需要删除当前node，但是这样条件语句会比较不好想
  head.next = removeLinkNodes(head.next, value)
  if (head.val == value) {
    return head.next
  }

  return head
}

/** 递归版本 */
// 核心函数，递归方法
// function removeLinkNodes(head, value) {
//   // 剔除链表头部所有val等于value的节点
//   while (head && head.val === value) {
//     head = head.next
//   }

//   // 递归出口
//   if (head === null) return null

//   // 递归调用，将当前节点（val不等于value）的下一节点作为头节点重新处理，为要得到处理完成后的子链表
//   head.next = removeLinkNodes(head.next, value)

//   return head
// }

/** 虚拟头节点方法，更简单易处理 */
// // 核心函数，使用虚拟头节点，将头节点作为普通节点处理
// function removeLinkNodes(head, value) {
//   // 虚拟头节点
//   let fakeHead = new ListNode(0)
//   // 虚拟头节点指向实际头节点
//   fakeHead.next = head

//   // 临时节点
//   let temp = fakeHead

//   // 剔除val等于value节点，直到链表末尾
//   while (temp.next) {
//     // 处理完下一个节点后，temp不移动，以下一个节点开始重新判断
//     if (temp.next.val === value) {
//       temp.next = temp.next.next
//       continue
//     }
//     // 下一节点val不等于value, temp移动
//     temp = temp.next
//   }

//   // 返回实际头节点
//   return fakeHead.next
// }

/** 自己版本简洁版 */
// // 核心函数，先处理头部节点，然后其他节点
// function removeLinkNodes(head, value) {
//   // 删除链表头部中等于value的节点
//   while (head !== null && head.val === value) {
//     head = head.next
//   }

//   if (head === null) return null

//   // 临时节点
//   let temp = head

//   // 剔除val等于value节点，直到链表末尾
//   while (temp.next) {
//     // 处理完下一个节点后，temp不移动，以下一个节点开始重新判断
//     if (temp.next.val === value) {
//       temp.next = temp.next.next
//       continue
//     }
//     // 下一节点val不等于value, temp移动
//     temp = temp.next
//   }

//   return head
// }

/** 自己初始版本 */
// // 核心函数，删除链表中指定元素的节点
// function removeLinkNodes(head, value) {
//   // 删除链表头部中等于value的节点
//   while (head !== null && head.val === value) {
//     head = head.next
//   }

//   if (head === null) return null

//   // 临时节点
//   let temp = head

//   /**
//    * 1. temp === null 最后一个节点val等于value
//    * 2. temp.next === null 最后一个节点val不等于value
//    */
//   while (temp !== null && temp.next !== null) {
//     // 如果下一个节点的val等于value，则将当前节点指向
//     while (temp.next !== null && temp.next.val === value) {
//       temp.next = temp.next.next
//     }
//     temp = temp.next
//   }

//   return head
// }
