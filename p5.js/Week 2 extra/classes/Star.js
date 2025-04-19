class Star {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    show() {
        textSize(this.size);
        textAlign(CENTER, CENTER);
        text('⭐', this.x, this.y);
    }
}

export default Star;