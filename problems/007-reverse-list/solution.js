/**
 *
 * 题目：反转链表 (Reverse Linked List)
 *
 * 给你单链表的头节点 head，请你反转链表，并返回反转后的链表。
 *
 * 要求：
 *  - 可以迭代或递归地反转链表
 *  - 返回反转后的链表头节点
 *  - 原链表的结构被修改（原地反转）
 *
 * 输入格式：
 *   第一行：T                   ← 测试用例数量
 *   接下来 T 行，每组测试用例：
 *     第一行：n                 ← 链表节点数量（n >= 0）
 *     第二行：a1 a2 a3 ... an   ← n 个整数，表示链表节点值（当 n=0 时，第二行为空或省略）
 *
 * 输出格式：
 *   每组测试用例输出一行：
 *     使用 JSON 数组格式表示反转后的链表节点值（例如 [5,4,3,2,1]）
 *
 * 示例：
 *   输入：
 *   链表: 1->2->3->4->5
 *   输出: [5,4,3,2,1]
 *   解释：反转后变为 5->4->3->2->1
 *
 *   输入：
 *   链表: 1->2
 *   输出: [2,1]
 *   解释：反转后变为 2->1
 *
 *   输入：
 *   链表: []
 *   输出: []
 *   解释：空链表反转仍为空
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1) 迭代版本，O(n) 递归版本
 *
 * 使用：
 *   node reverse_list.js < input.txt
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
    line = await readline()
    if (line === null || line === undefined) break
    if (line.trim() === '') continue
    else tokens.push(...line.trim().split(/\s+/))
  }
  main(tokens)

  rl.close()
})()

// 链表节点类
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

  const getNum = (len) => {
    let nums = []

    for (let i = 0; i < len; i++) {
      nums.push(nextNum())
    }

    return nums
  }

  // 获取T
  const T = nextNum()

  // 测试每个案例
  for (let i = 0; i < T; i++) {
    const len = nextNum()
    const nums = getNum(len)

    // 构建链表
    const head = constructList(nums, len)
    // printList(head)
    // 核心函数
    const res = reverseList(head)
    // 打印链表
    printList(res)
  }
}

// 核心函数 更简洁版本
function reverseList(head) {
  if (head === null || head.next === null) return head

  let prev = null
  let cur = head
  let temp

  while (cur) {
    temp = cur.next
    cur.next = prev
    prev = cur
    cur = temp
  }

  return prev
}

// // 核心函数
// function reverseList(head) {
//   if (head === null || head.next === null) return head
//   /**
//    * 0 -- 首次进入循环
//    * 1 -- tempA 在tempB 左边
//    * -1-- tampB 在tempA 左边
//    */
//   let flag = 0

//   let tempA = head
//   let tempB = null
//   let temp

//   while (flag === 0 || (tempA !== null && tempB !== null)) {
//     // 第一次进入循环或tempB在tempA左边
//     if (flag === 0 || flag === -1) {
//       temp = tempB
//       tempB = tempA.next
//       tempA.next = temp
//       flag = 1
//     }
//     // tempA在tempB左边
//     else if (flag === 1) {
//       temp = tempA
//       tempA = tempB.next
//       tempB.next = temp
//       flag = -1
//     }
//   }

//   return tempA === null ? tempB : tempA
// }
