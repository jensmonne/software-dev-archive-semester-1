class Ufo {
    constructor(x, y, ufoSpeed, scoreValue) {
        this.x = x;
        this.y = y;
        this.ufoSpeed = ufoSpeed;
        this.scoreValue = scoreValue;
    }

    show() {
        fill(66, 209, 245);
        circle(this.x, this.y - 10, 30);
        fill(110);
        ellipse(this.x, this.y, 100, 20);
    }

    update() {
        this.x += this.ufoSpeed;
    }
}

export default Ufo;