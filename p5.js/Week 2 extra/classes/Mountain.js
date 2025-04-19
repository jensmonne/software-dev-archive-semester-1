class Mountain {
    constructor(x, y, size, thickness, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.thickness = thickness;
        this.color = color;
    }

    show() {
        fill(this.color);
        stroke(1)
        triangle(this.x, this.y, this.x + this.thickness, this.y, this.x + (this.thickness / 2), this.y + this.size);
    }
}

export default Mountain;