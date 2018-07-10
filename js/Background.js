function Background(displayName, color, css, img, repeat) {
    this.displayName = displayName;
    this.color = color;
    this.img = img;
    this.css = css;
    this.repeat = repeat;
}

Background.prototype.getDisplayName = function() {
    return this.displayName;
}

Background.prototype.getCSS = function() {
    return this.css;
}

Background.prototype.getColor = function() {
    return this.color;
}

Background.prototype.getImg = function() {
    return this.img;
}

Background.prototype.getRepeat = function() {
    return this.repeat;
}

Background.prototype.setData = function(item, top) {
    this.item = item;
    this.top = top;
}

Background.prototype.getTop = function() {
    return this.top;
}

Background.prototype.getItem = function() {
    return this.item;
}