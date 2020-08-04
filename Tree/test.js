function BinarySearchTree() {
    var Node = function(key){ //{1}
        this.key = key;
        this.left = null;
        this.right = null;
    };
    var root = null; //{2}


    this.insert = function(key){
        var newNode = new Node(key); //{1}
        if (root === null){ //{2}
            root = newNode;
        } else {
            insertNode(root,newNode); //{3}
        }
    };


    var insertNode = function(node, newNode){
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
