function Graph() {
    var vertices = []; // 储存顶点
    var adjList = new Map(); //

    this.addVertex = function(v){
        vertices.push(v); //
        adjList.set(v, []); //
    };

    this.addEdge = function(v, w){
        adjList.get(v).push(w); //实现一个有向图，则行{5}就足够了
        adjList.get(w).push(v); //实现无向图，需要添加一条自w向v的边
    };

    this.toString = function(){
        var s = '';
        for (var i=0; i<vertices.length; i++){ //{10}
            s += vertices[i] + ' -> ';
            var neighbors = adjList.get(vertices[i]); //{11}
            for (var j=0; j<neighbors.length; j++){ //{12}
                s += neighbors[j] + ' ';
            }
            s += '\n'; //{13}
        }
        return s;
    };

    // 图的遍历
    // 算 法 数据结构 描 述
    // 深度优先搜索 栈 通过将顶点存入栈中（在第3章中学习过），顶点是沿着路径被探索的，存在新邻顶点就去访问
    // 广度优先搜索 队列 通过将顶点存入队列中（在第4章中学习过），最先入队列的顶点先被探索
    // 当要标注已经访问过的顶点时，我们用三种颜色来反映它们的状态。
    //  白色：表示该顶点还没有被访问。
    //  灰色：表示该顶点被访问过，但并未被探索过。
    //  黑色：表示该顶点被访问过且被完全探索过。
    // 这就是之前提到的务必访问每个顶点最多两次的原因。
    var initializeColor = function () {
        var color = [];
        for (let i = 0; i < vertices.length; i++) {
            color[vertices[i]] = 'white';
        }
        return color;
    }
    this.bfs = function(v, callback){
        var color = initializeColor(), //
            // queue = new Queue(); //
        queue = []; // 用数组模拟Queue
        queue.push(v); //

        while (queue.length){ //
            var u = queue.shift(), //
                neighbors = adjList.get(u); //
            // console.log('u', u);
            // console.log("neighbors",neighbors);
            color[u] = 'grey';
            for (var i=0; i<neighbors.length; i++){
                var w = neighbors[i];
                if (color[w] === 'white'){
                    color[w] = 'grey';
                    queue.push(w);
                }
            }
            color[u] = 'black';
            if (callback) {
                callback(u, neighbors);
            }
        }
    };

    // 使用BFS寻找最短路径
    // 。我们可以修改bfs方法以返回给我们一些信息：
    //  从v到u的距离d[u]；
    //  前溯点pred[u]，用来推导出从v到其他每个顶点u的最短路径。
    // 让我们来看看改进过的广度优先方法的实现：
    this.BFS = function(v){
        var color = initializeColor(),
            queue = [], // new Queue()
            d = [], // 从v到u的距离d
            pred = []; // 前溯点pred
        queue.push(v);
        for (var i=0; i<vertices.length; i++){ //
            d[vertices[i]] = 0; //
            pred[vertices[i]] = null; //
        }
        while (queue.length){
            var u = queue.shift(),
                neighbors = adjList.get(u);
            color[u] = 'grey';
            for (i=0; i<neighbors.length; i++){
                var w = neighbors[i];
                if (color[w] === 'white'){
                    color[w] = 'grey';
                    d[w] = d[u] + 1; //
                    pred[w] = u; //
                    queue.push(w);
                }
            }
            color[u] = 'black';
        }
        return { //
            distances: d,
            predecessors: pred
        };
    };


}


var graph = new Graph();
var myVertices = ['A','B','C','D','E','F','G','H','I','test']; //
for (var i=0; i<myVertices.length; i++){ //
    graph.addVertex(myVertices[i]);
}

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
graph.addEdge('A', 'test');
console.log(graph.toString());
console.log("\n");

graph.bfs(myVertices[0], function printNode(value, neighbors){
    console.log('Visited vertex: ' + value);
    console.log('vertex neighbors: ' + neighbors);
});
console.log("\n");

var shortestPathA = graph.BFS(myVertices[0]);
console.log(shortestPathA);
console.log("\n");

// 通过前溯点数组，我们可以用下面这段代码来构建从顶点A到其他顶点的路径：
// ?
var fromVertex = myVertices[0]; //
for (var i=1; i<myVertices.length; i++){ //{10}
    var toVertex = myVertices[i], //{11}
        path = []; //new Stack(); {12}
    for (var v=toVertex; v!== fromVertex;
         v=shortestPathA.predecessors[v]) { //{13}
        path.push(v); //{14}
    }
    path.push(fromVertex); //{15}
    var s = path.pop(); //{16}
    while (path.length){ //{17}
        s += ' - ' + path.pop(); //{18}
    }
    console.log(s); //{19}
}
console.log("\n");
// 我们用顶点A作为源顶点（行{9}）。对于每个其他顶点（除了顶点A——行{10}），我们会计
// 算顶点A到它的路径。我们从顶点数组得到toVertex（行{11}），然后会创建一个栈来存储路径
// 值（行{12}）。
// 接着，我们追溯toVertex到fromVertex的路径（行{13}）。变量v被赋值为其前溯点的值，
// 这样我们能够反向追溯这条路径。将变量v添加到栈中（行{14}）。最后，源顶点也会被添加到
// 栈中，以得到完整路径。
// 这之后，我们创建了一个s字符串，并将源顶点赋值给它（它是最后一个加入栈中的，所以
// 它是第一个被弹出的项 ——行{16}）。当栈是非空的，我们就从栈中移出一个项并将其拼接到字
// 符串s的后面（行{18}）。最后（行{19}）在控制台上输出路径。
