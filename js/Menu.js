class Menu {

    /**
     *
     * @param {string} displayName
     * @param {function} func
     */
    constructor(displayName, func) {
        this.displayName = displayName;
        this.func = func;
        this.item = null;
        this.top = null;
    }

    getDisplayName() {
        return this.displayName;
    }

    invoke() {
        this.func();
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