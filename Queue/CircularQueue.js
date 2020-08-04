/**
 * 循环队列
 */
// 模拟的击鼓传花游戏：
// 在这个游戏中，孩子们围成一个圆圈，把花尽快地传递给旁边的人。某一时刻传花停止，
// 这个时候花在谁手里，谁就退出圆圈结束游戏。重复这个过程，直到只剩一个孩子（胜者）。
function Queue() {
    let items = [];
    this.enqueue = function(element){
        items.push(element);
    };
    this.dequeue = function(){
        return items.shift();
    };
    this.front = function(){
        return items[0];
    };
    this.isEmpty = function(){
        return items.length === 0;
    };
    this.size = function(){
        return items.length;
    };
    this.print = function(){
        console.log(items.toString());
    };
}

function hotPotato (nameList, num) {
    let queue = new Queue();
    for (let i = 0; i < nameList.length; i++) {
        queue.enqueue(nameList[i])
    }
    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) { // num是传花停止的条件
            // 模拟击鼓传花(如果你把花传给了旁边的人, 你被淘汰的威胁立刻就解除了)
            queue.enqueue(queue.dequeue()); // 把移除的元素加到末尾, 形成循环
        }
        let eliminated = queue.dequeue();  //花在谁手里, 谁就退出圆圈结束游戏
        console.log( eliminated + "在击鼓传花游戏中被淘汰。");
    }
    return queue.dequeue(); // 获胜者
}

let names = ['a','b','c','d','e','f','g'];
let num = Math.trunc(Math.random() * 20);
let winner = hotPotato(names, num);
console.log('获胜者是: ' + winner);
console.log("---循环队列---\n");

