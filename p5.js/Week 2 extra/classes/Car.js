class Car {
    scoreValue = 1;

    constructor(x, y, carspeed, wheelBounce, frameColor, windowColor, wheelColor, windowPos, cars) {
        this.x = x;
        this.y = y;
        this.carspeed = carspeed;
        this.wheelBounce = wheelBounce || 0;
        this.frameColor = frameColor;
        this.windowColor = windowColor;
        this.wheelColor = wheelColor;
        this.windowPos = windowPos;
        this.cars = cars;
        this.scoreValue = round(abs(carspeed) / 2);
    }

    show() {
        // Frame
        fill(this.frameColor);
        rect(this.x, this.y, 100, 20);
        rect(this.x + 20, this.y - 20, 60, 20);

        // Windows
        fill(this.windowColor);
        rect(this.x + 30 - this.windowPos, this.y - 15, 20, 15);
        rect(this.x + 60 - this.windowPos, this.y - 15, 20, 15);

        // Wheels
        fill(this.wheelColor);
        circle(this.x + 25, this.y + 20 + this.wheelBounce, 22);
        circle(this.x + 75, this.y + 20 + this.wheelBounce, 22);
    }

    update() {
        this.wheelBounce = random(-1, 1);
        if (this.cars.includes(this)) {
            this.x += this.carspeed;

            if (this.x < -100 || this.x > width) {
                let index = this.cars.indexOf(this);
                if (index !== -1) {
                    this.cars.splice(index, 1);
                }
            }
        }
    }
}

// implemenet very rare spawn of a super rainbow mario star super car

export default Car;