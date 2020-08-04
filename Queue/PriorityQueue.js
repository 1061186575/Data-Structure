
/**
 *  优先队列, 元素的添加和移除是基于优先级的。
 */
function PriorityQueue() {
    let items = [];
    function QueueElement (element, priority){
        this.element = element;
        this.priority = priority;
    }
    this.enqueue = function(element, priority){
        let queueElement = new QueueElement(element, priority);
        let added = false;
        for (let i=0; i<items.length; i++){
            if (queueElement.priority < items[i].priority){ // priority小的添加到前面
                items.splice(i,0,queueElement);
                added = true;
                break;
            }
        }
        if (!added){
            items.push(queueElement); // priority大的添加到后面
        }
    };
    this.print = function(){
        for (let i=0; i<items.length; i++){
            console.log(`${items[i].element} --- ${items[i].priority}`);
        }
    };
    // 其他方法和默认的Queue实现相同
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
}

let priorityQueue = new PriorityQueue();
priorityQueue.enqueue("aaa", 3);
priorityQueue.enqueue("bbb", 1);
priorityQueue.enqueue("ccc", 2);
priorityQueue.print();
console.log("---优先队列---\n");
