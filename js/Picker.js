function Picker(top, index, item) {
    this.top = top;
    this.index = index;
    this.item = item;
}

Picker.prototype.getTop = function() {
    return this.top;
}

Picker.prototype.getIndex = function() {
    return this.index;
}

Picker.prototype.getItem = function() {
    return this.item;
}