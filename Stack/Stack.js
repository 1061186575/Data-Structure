function Stack() {
    var items = [];
    this.push = function (elem) {
        items.push(elem)
    }
    this.pop = function () {
        return items.pop();
    }
    this.peek = function () {
        return items[items.length-1];
    }
    this.isEmpty = function () {
        return items.length === 0;
    }
    this.clear = function () {
        items = []; // or items.length = 0;
    }
    this.size = function () {
        return items.length;
    }
    this.print = function(){
        console.log(items.toString());
    }
}

// 进制转换
function baseConverter(decNumber, base){
    var remStack = new Stack(),
        rem,
        baseString = '',
        digits = '0123456789ABCDEF';
    while (decNumber > 0){
        rem = Math.floor(decNumber % base);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / base);
    }

    while (!remStack.isEmpty()){
        baseString += digits[remStack.pop()];
    }
    return baseString;
}

var decNumber = 1000,
    radix = 16;

console.log(baseConverter(decNumber, radix));
console.log((decNumber).toString(radix));



