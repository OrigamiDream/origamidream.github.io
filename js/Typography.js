function Typography(displayName, color) {
    this.displayName = displayName;
    this.color = color;
    this.item = null;
    this.top = null;
}

Typography.prototype.getDisplayName = function() {
    return this.displayName;
}

Typography.prototype.getColor = function() {
    return this.color;
}

Typography.prototype.setData = function(item, top) {
    this.item = item;
    this.top = top;
}

Typography.prototype.getTop = function() {
    return this.top;
}

Typography.prototype.getItem = function() {
    return this.item;
}