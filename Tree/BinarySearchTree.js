/*

二叉搜索树（BST）是二叉树的一种，但是它只允许你在
左侧节点存储（比父节点）小的值，
在右侧节点存储（比父节点）大（或者等于）的值。


键是树相关的术语中对节点的称呼。


下面是将要在树类中实现的方法。
 insert(key)：向树中插入一个新的键。
 search(key)：在树中查找一个键，如果节点存在，则返回true；如果不存在，则返回
false。
 inOrderTraverse：通过中序遍历方式遍历所有节点。
 preOrderTraverse：通过先序遍历方式遍历所有节点。
 postOrderTraverse：通过后序遍历方式遍历所有节点。
 min：返回树中最小的值/键。
 max：返回树中最大的值/键。
 remove(key)：从树中移除某个键。

*/


function BinarySearchTree() {
    var Node = function(key){ //{1}
        this.key = key;
        this.left = null;
        this.right = null;
    };
    var root = null; //{2}

    this.insert = function (key) {
        var newNode = new Node(key);
        if (root === null) {
            root = newNode;
        } else {
            insertNode(root, newNode);
        }
    };

    function insertNode(node, newNode){
        if (newNode.key < node.key){ //{4}
            if (node.left === null){ //{5}
                node.left = newNode; //{6}
            } else {
                insertNode(node.left, newNode); //{7}
            }
        } else {
            if (node.right === null){ //{8}
                node.right = newNode; //{9}
            } else {
                insertNode(node.right, newNode); //{10}
            }
        }
    };


    /**
     * 中序遍历, 中序遍历是一种以上行顺序访问BST所有节点的遍历方式，也就是以从最小到最大的顺序访
     * 问所有节点。中序遍历的一种应用就是对树进行排序操作。
     */
    this.inOrderTraverse = function(callback){
        inOrderTraverseNode(root, callback); //{1}
    };
    var inOrderTraverseNode = function (node, callback) {
        if (node !== null) { //{2}
            inOrderTraverseNode(node.left, callback); //{3} callback传进去执行callback(node.key);
            callback(node.key); //{4}
            inOrderTraverseNode(node.right, callback); //{5}
        }
    };
    /**
     * 先序遍历是以优先于后代节点的顺序访问每个节点的。先序遍历的一种应用是打印一个结构化的文档。
     */
    this.preOrderTraverse = function(callback){
        preOrderTraverseNode(root, callback);
    };
    var preOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            callback(node.key); //{1} 先访问节点本身
            preOrderTraverseNode(node.left, callback); //{2}
            preOrderTraverseNode(node.right, callback); //{3}
        }
    };
    /**
     * 后序遍历则是先访问节点的后代节点，再访问节点本身。后序遍历的一种应用是计算一个目
     录和它的子目录中所有文件所占空间的大小。
     */
    this.postOrderTraverse = function(callback){
        postOrderTraverseNode(root, callback);
    };
    var postOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            postOrderTraverseNode(node.left, callback); //{1}
            postOrderTraverseNode(node.right, callback); //{2}
            callback(node.key); //{3}
        }
    };

    /**
     * 搜索最小值和最大值
     */
    this.min = function (node = root) {
        return minNode(node);
    };
    //minNode方法允许我们从树中任意一个节点开始寻找最小的键。我们可以使用它来找到一棵
    // 树或它的子树中最小的键。
    var minNode = function (node) {
        if (node){
            // 遍历树的左边（行{2}和行{3}）直到找到树的最下层（最左端）
            while (node && node.left !== null) { //{2}
                node = node.left; //{3}
            }
            return node.key;
        }
        return null; //{4}
    };
    // 以相似的方式，可以实现max方法：
    this.max = function() {
        return maxNode(root);
    };
    var maxNode = function (node) {
        if (node){
            while (node && node.right !== null) { //{5}
                node = node.right;
            }
            return node.key;
        }
        return null;
    };
    // 对于寻找最小值，总是沿着树的左边；而对于寻找最大值，总是沿着树的右边。

    // 搜索一个特定的值(判断有没有这个值)
    this.search = function (key) {
        return searchNode(root, key);
    };
    var searchNode = function(node, key){
        if (node === null){ //{2}
            return false;
        }
        if (key < node.key){ //{3}
            return searchNode(node.left, key); //{4}
        } else if (key > node.key){ //{5}
            return searchNode(node.right, key); //{6}
        } else {
            return true; //{7}
        }
    };

}


var tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
console.log("tree: ", tree);


tree.inOrderTraverse(function (value){
    console.log(value);
});

console.log(tree.search(12));

console.log(tree.search(1) ? 'Key 1 found.' : 'Key 1 not found.');
console.log(tree.search(8) ? 'Key 8 found.' : 'Key 8 not found.');
