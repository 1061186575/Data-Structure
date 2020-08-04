/**
 *  散列表完善之分离链接(使用LinkedList)
 *  分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。它是解决冲突的
 *  最简单的方法，但是它在HashTable实例之外还需要额外的存储空间。
 */

/*
散列算法的作用是尽可能快地在数据结构中找到一个值。普通的Map需要遍历整个数据结构来找到它。
如果使用散列函数，就知道值的具体位置，因此能够快速检索到该值。
散列函数的作用是给定一个键值，然后返回值在表中的地址。
 */

// import LinkedList from '../LinkedList/LinkedList'
var LinkedList = require('../LinkedList/LinkedList');


function HashTable() {
    var table = [];
    //最常见的散列函数——“lose lose”散列函数，方法是简单地将每个键值中的每个字母的ASCII值相加。
    var loseloseHashCode = function (key) {
        var hash = 0; //{1}
        for (var i = 0; i < key.length; i++) { //{2}
            hash += key.charCodeAt(i); //{3}
        }
        return hash % 37; //为了得到比较小的数值, 使用hash值和一个任意数做除法的余数
    };
    // this.put = function(key, value){ // 参考书版本(不严谨), 添加同名的key并没有覆盖, 也只能获取第一个同名的key
    //     var position = loseloseHashCode(key);
    //     if (table[position] == undefined) { //{1}
    //         table[position] = new LinkedList();
    //     }
    //     table[position].append(new ValuePair(key, value)); //{2}
    // };
    this.put = function(key, value){
        var position = loseloseHashCode(key);
        // console.log('this.get(key)', this.get(key));

        if (this.get(key) !== undefined) { // 如果key已经存在就覆盖
            //遍历链表来寻找键/值
            var current = table[position].getHead(); //{4}
            while(current.next){ //{5}
                if (current.element.key === key){ //{6}
                    current.element.value = value;
                }
                current = current.next; //{8}
            }
            //检查元素在链表第一个或最后一个节点的情况
            if (current.element.key === key){ //{9}
                current.element.value = value;
            }
        } else {
            if (table[position] == undefined) { //{1}
                table[position] = new LinkedList();
            }
            table[position].append(new ValuePair(key, value)); //{2}
        }
    };

    this.get = function (key) {
        var position = loseloseHashCode(key);
        if (table[position] !== undefined){ //{3}
            //遍历链表来寻找键/值
            var current = table[position].getHead(); //{4}
            while(current.next){ //{5}
                if (current.element.key === key){ //{6}
                    return current.element.value; //{7}
                }
                current = current.next; //{8}
            }
            //检查元素在链表第一个或最后一个节点的情况
            if (current.element.key === key){ //{9}
                return current.element.value;
            }
        }
        return undefined; //{10}
    };

    this.remove = function(key){
        var position = loseloseHashCode(key);
        if (table[position] !== undefined){
            var current = table[position].getHead();
            while(current.next){
                if (current.element.key === key){ //{11}
                    table[position].remove(current.element); //{12}
                    if (table[position].isEmpty()){ //{13}
                        table[position] = undefined; //{14}
                    }
                    return true; //{15}
                }
                current = current.next;
            }
            // 检查是否为第一个或最后一个元素
            if (current.element.key === key){ //{16}
                table[position].remove(current.element);
                if (table[position].isEmpty()){
                    table[position] = undefined;
                }
                return true;
            }
        }
        return false; //{17}
    };
    this.print = function() {
        for (var i = 0; i < table.length; ++i) { //{1}
            if (table[i] !== undefined) { //{2}
                console.log(i + ": " + table[i]);//{3}
            }
        }
    };
    // 为了实现一个使用了分离链接的HashTable实例,
    // 需要一个新的辅助类来表示将要加入LinkedList实例的元素
    var ValuePair = function(key, value){
        this.key = key;
        this.value = value;
        this.toString = function() {
            return '[' + this.key + ' - ' + this.value + ']';
        }
    }


};


var hash = new HashTable();
hash.put('AAA', 'gandalf@email.com');
hash.put('AAA', 'johnsnow@email.com');
hash.put('AAA', 'tyrion@email.com');
hash.put('bbb', 'aaron@email.com');
hash.put('bbb', 'donnie@email.com');
hash.put('bbb', 'ana@email.com');
hash.put('BBB', 'jonathan@email.com');
hash.put('B', 'jamie@email.com');
hash.put('BBB', 'sue@email.com');

hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');
hash.put('Aaron', 'aaron@email.com');
hash.put('Donnie', 'donnie@email.com');
hash.put('Ana', 'ana@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Mindy', 'mindy@email.com');
hash.put('Paul', 'paul@email.com');
hash.put('Nathan', 'nathan@email.com');


console.log(hash.get('AAA'));



hash.print()
