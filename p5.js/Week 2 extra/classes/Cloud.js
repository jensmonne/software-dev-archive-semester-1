class Cloud {
    constructor(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
    }

    show() {
        fill(70);
        circle(this.x - 28, this.y - 7, this.size);
        circle(this.x + 2, this.y - 7, this.size + 10);
        circle(this.x + 32, this.y - 7, this.size);
        fill(255);
        circle(this.x - 30, this.y, this.size);
        circle(this.x, this.y, this.size + 10);
        circle(this.x + 30, this.y, this.size);
    }

    update() {
        this.x += this.speed;
        if (this.x > width + 100 && this.speed > 0) {
            this.x = -this.size - 100;
        } else if (this.x < -this.size - 100 && this.speed < 0) {
            this.x = width + 100;
        }
    }
}

export default Cloud;