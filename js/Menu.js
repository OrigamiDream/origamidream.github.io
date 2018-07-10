function Menu(displayName, func) {
    this.displayName = displayName;
    this.func = func;
    this.item = null;
    this.top = null;
}

Menu.prototype.getDisplayName = function() {
    return this.displayName;
}

Menu.prototype.invoke = function() {
    this.func();
}

Menu.prototype.setData = function(item, top) {
    this.item = item;
    this.top = top;
}

Menu.prototype.getTop = function() {
    return this.top;
}

Menu.prototype.getItem = function() {
    return this.item;
}