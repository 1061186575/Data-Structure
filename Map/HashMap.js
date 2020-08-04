/**
 *  散列表HashTable类，也叫HashMap类
 */
/*
散列算法的作用是尽可能快地在数据结构中找到一个值。普通的Map需要遍历整个数据结构来找到它。
如果使用散列函数，就知道值的具体位置，因此能够快速检索到该值。
散列函数的作用是给定一个键值，然后返回值在表中的地址。
 */
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
    this.put = function(key, value) {
        var position = loseloseHashCode(key); //{5}
        // console.log(position + ' - ' + key); //{6}
        table[position] = value; //{7}
    };
    this.get = function (key) {
        return table[loseloseHashCode(key)];
    };
    // remove方法不需要像ArrayList类一样从table数组中将位置也移除。由于元素分布于整个数组范围内，
    // 一些位置会没有任何元素占据，并默认为undefined值。
    // 也不能将位置本身从数组中移除（会改变其他元素的位置），否则，
    // 当下次需要获得或移除一个元素的时候，这个元素不在用散列函数求出的位置上。
    this.remove = function(key) {
        table[loseloseHashCode(key)] = undefined;
    };
    // this.getTable = function () {
    //     return table;
    // };
    this.print = function() {
        for (var i = 0; i < table.length; ++i) { //{1}
            if (table[i] !== undefined) { //{2}
                console.log(i + ": " + table[i]);//{3}
            }
        }
    };


}


var hash = new HashTable();
// 有相同的散列值(key不一定相同)时后面的会覆盖前面的, 需要完善
hash.put('AAA', 'gandalf@email.com');
hash.put('AAA', 'johnsnow@email.com');
hash.put('AAA', 'tyrion@email.com');
hash.put('bbb', 'aaron@email.com');
hash.put('bbb', 'donnie@email.com');
hash.put('bbb', 'ana@email.com');
hash.put('BBB', 'jonathan@email.com');

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
