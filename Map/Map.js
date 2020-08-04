/**
 * 模拟Map字典(es6已经有了)
 */

function Dictionary() {
    var items = {};
    this.has = function(key) {
        return key in items;
    };
    this.set = function(key, value) {
        items[key] = value; //{1}
    };
    this.delete= function(key) {
        if (this.has(key)) {
            delete items[key];
            return true;
        }
        return false;
    };
    this.get = function(key) {
        return this.has(key) ? items[key] : undefined;
    };
    this.values = function() {
        var values = [];
        for (var k in items) { //{1}
            if (this.has(k)) {
                values.push(items[k]); //{2}
            }
        }
        return values;
    };
    this.clear = function(){
        items = {};
    };
    this.size = function(){ //ECMAScript 5以上版本
        return Object.keys(items).length;
    };
    this.keys = function() {
        return Object.keys(items);
    };
    this.getItems = function() {
        return items;
    }

}


var dictionary = new Dictionary();
dictionary.set('A', 'aaa');
dictionary.set('B', 'bbb');
dictionary.set('A', 'aaa2'); // 覆盖前面的
console.log(dictionary.getItems());
