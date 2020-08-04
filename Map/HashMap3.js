/**
 *  散列表完善之线性探查
 *  另一种解决冲突的方法是线性探查。当想向表中某个位置加入一个新元素的时候，如果索引
 *  为index的位置已经被占据了，就尝试index+1的位置。如果index+1的位置也被占据了，
 *  就尝试index+2的位置，以此类推。
 */


function HashTable() {
    var table = [];
    // var loseloseHashCode = function (key) {
    //     var hash = 0; //{1}
    //     for (var i = 0; i < key.length; i++) { //{2}
    //         hash += key.charCodeAt(i); //{3}
    //     }
    //     return hash % 37; //为了得到比较小的数值, 使用hash值和一个任意数做除法的余数
    // };
    /**
     *创建更好的散列函数:
      “lose lose”散列函数会产生太多的冲突。
     一个表现良好的散列函数是由几个方面构成的：
     插入和检索元素的时间（即性能），当然也包括较低的冲突可能性。
     * @param key
     * @returns {number}
     */
    var djb2HashCode = function (key) {
        var hash = 5381; // 大多数实现都使用质数5381
        for (var i = 0; i < key.length; i++) {
            hash = hash * 33 + key.charCodeAt(i); //hash与33相乘（用来当作一个魔力数）
        }
        return hash % 1013; // 另一个随机质数（比认为的散列表的大小要大————在本例中，认为散列表的大小为1000）相除的余数。
    };

    // this.put = function(key, value){ // 参考书版本(不严谨), 添加同名的key并没有覆盖, 也只能获取第一个同名的key
    //     var position = djb2HashCode(key); // {1}
    //     if (table[position] == undefined) { // {2}
    //         table[position] = new ValuePair(key, value); // {3}
    //     } else {
    //         var index = ++position; // {4}
    //         while (table[index] != undefined){ // {5}
    //             index++; // {6}
    //         }
    //         table[index] = new ValuePair(key, value); // {7}
    //     }
    // };
    this.put = function(key, value){
        var position = djb2HashCode(key); // {1}

        if (this.get(key) !== undefined) { // 如果key已经存在就覆盖
            if (table[position].key === key) { //{9}
                table[position].value = value; //{10}
            } else {
                let index = ++position;
                while (table[index] === undefined
                || table[index].key !== key){ //{11}
                    index++;
                }
                if (table[index].key === key) { //{12}
                    table[position].value = value; //{13}
                }
            }
        } else {
            if (table[position] == undefined) { // {2}
                table[position] = new ValuePair(key, value); // {3}
            } else {
                let index = ++position; // {4}
                while (table[index] != undefined){ // {5}
                    index++; // {6}
                }
                table[index] = new ValuePair(key, value); // {7}
            }
        }

    };
    this.get = function(key) {
        var position = djb2HashCode(key);
        if (table[position] !== undefined){ //{8}
            if (table[position].key === key) { //{9}
                return table[position].value; //{10}
            } else {
                var index = ++position;
                while (table[index] === undefined
                || table[index].key !== key){ //{11}
                    index++;
                }
                if (table[index].key === key) { //{12}
                    return table[index].value; //{13}
                }
            }
        }
        return undefined; //{14}
    };
    // remove方法和get方法基本相同, 不同的是查找到元素之后将其赋值为undefined, 然后返回true
    this.remove = function(key) {
        var position = djb2HashCode(key);
        if (table[position] !== undefined){ //{8}
            if (table[position].key === key) { //{9}
                table[position] = undefined;
                return true; //{10}
            } else {
                var index = ++position;
                while (table[index] === undefined
                || table[index].key !== key){ //{11}
                    index++;
                }
                if (table[index].key === key) { //{12}
                    table[index] = undefined;
                    return true; //{13}
                }
            }
        }
        return false; //{14}
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

