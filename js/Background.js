class Background {

    /**
     * A constructor for background settings
     *
     * @param {string} display name
     * @param {string} color
     * @param {string} img url
     * @param {string} css-style repeat
     */
    constructor(displayName, color, img, repeat) {
        this.displayName = displayName;
        this.color = color;
        this.img = img;
        this.repeat = repeat;
        this.item = null;
        this.top = null;
    }

    getDisplayName() {
        return this.displayName;
    }

    getColor() {
        return this.color;
    }

    getImg() {
        return this.color;
    }

    getRepeat() {
        return this.repeat;
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