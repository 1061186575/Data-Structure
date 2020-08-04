/**
 * 模拟Set集合(es6已经有了), 有交集并集差集子集操作
 */


function Set() {
    let items = {};
    this.has = function(value){
        return items.hasOwnProperty(value); // or value in items;
    };
    this.add = function(value){
        if (!this.has(value)){
            items[value] = value;
            return true;
        }
        return false;
    };
    this.remove = function(value){
        if (this.has(value)){
            delete items[value];
            return true;
        }
        return false;
    };
    this.clear = function(){
        items = {};
    };
    this.size = function(){ //ECMAScript 5以上版本
        return Object.keys(items).length;
    };
    this.sizeLegacy = function(){ //在任何浏览器上运行
        let count = 0;
        for(let key in items) {
            if(items.hasOwnProperty(key)) ++count;
        }
        return count;
    };
    this.values = function(){ //ECMAScript 5以上版本
        let values = [];
        for (let i=0, keys=Object.keys(items); i<keys.length; i++) {
            values.push(items[keys[i]]);
        }
        return values;
    };
    this.valuesLegacy = function(){ // 在任何浏览器中都能执行
        let values = [];
        for(let key in items) {
            if(items.hasOwnProperty(key)) {
                values.push(items[key]);
            }
        }
        return values;
    };
    // 并集, A∪B
    this.union = function(otherSet){
        let unionSet = new Set();
        let values = this.values();

        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }
        values = otherSet.values();
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }

        return unionSet;
    }
    // 交集   A∩B
    this.intersection = function(otherSet){
        let intersectionSet = new Set(); //{1}
        let values = this.values();
        for (let i=0; i<values.length; i++){ //{2}
            if (otherSet.has(values[i])){ //{3}
                intersectionSet.add(values[i]); //{4}
            }
        }
        return intersectionSet;
    }
    // 差集 A-B, 意思是x（元素）存在于A中，且x不存在于B中。
    this.difference = function(otherSet){
        let differenceSet = new Set(); //{1}
        let values = this.values();
        for (let i=0; i<values.length; i++){ //{2}
            if (!otherSet.has(values[i])){ //{3}
                differenceSet.add(values[i]); //{4}
            }
        }
        return differenceSet;
    };
    // 子集 A⊆B, 意思是集合A中的每一个x（元素），也需要存在于B中。
    this.subset = function(otherSet){
        if (this.size() > otherSet.size()){ //{1}
            return false;
        } else {
            let values = this.values();
            for (let i=0; i<values.length; i++){ //{2}
                if (!otherSet.has(values[i])){ //{3}
                    return false; //{4}
                }
            }
            return true; //{5}
        }
    };

}



let set = new Set();
set.add(1);
console.log(set.values()); //输出["1"]
console.log(set.has(1)); //输出true
console.log(set.size()); //输出1

set.add(2);
console.log(set.values()); //输出["1", "2"]
console.log(set.has(2)); //true
console.log(set.size()); //2
set.remove(1);
console.log(set.values()); //输出["2"]
set.remove(2);
console.log(set.values()); //输出[]
console.log("set.size: ", set.size());


/*
let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);
let unionAB = setA.union(setB);
console.log(unionAB.values());
*/

/*
let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);
let intersectionAB = setA.intersection(setB);
console.log(intersectionAB.values());
 */


/*
let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);
let differenceAB = setA.difference(setB);
console.log(differenceAB.values());
 */

/*
let setA = new Set();
setA.add(1);
setA.add(2);
let setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);
let setC = new Set();
setC.add(2);
setC.add(3);
setC.add(4);
console.log(setA.subset(setB));
console.log(setA.subset(setC));
 */
