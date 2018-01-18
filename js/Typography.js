class Typography {

    constructor(displayName, color) {
        this.displayName = displayName;
        this.color = color;
        this.item = null;
        this.top = null;
    }

    getDisplayName() {
        return this.displayName;
    }

    getColor() {
        return this.color;
    }

    setData(item, top) {
        this.item = item;
        this.top = top;
    }

    getTop() {
        return this.top;
    }

    getItem() {
        return this.item;
    }

}