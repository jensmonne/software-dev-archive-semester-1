class Tree {
    constructor(x1, y1, x2, y2, size, leaf, green) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.size = size;
        this.leaf = leaf;
        this.green = green;
        this.treeType = Math.floor(random(1, 3.9));
        this.showThirdTriangle = random(1) < 0.5;
    }

    show() {
        if (this.treeType === 1) {
            // trunk
            fill(107, 73, 33);
            stroke(1);
            rect(this.x1 + this.size, this.y2 + this.size, this.size, 100);

            // leafs
            fill(0, this.green, 0);
            let centerX = this.x1 + this.size + (this.size / 2);
            let centerY = this.y2 + this.size;
            triangle(centerX - this.size - 25, centerY, centerX + this.size + 25, centerY, centerX, centerY - 70);
            triangle(centerX - this.size - 25, centerY - 30, centerX + this.size + 25, centerY - 30, centerX, centerY - 95);
            if (this.showThirdTriangle) {
                triangle(centerX - this.size - 25, centerY - 60, centerX + this.size + 25, centerY - 60, centerX, centerY - 125);
            }
        } else if (this.treeType === 2) {
            // trunk
            fill(150, 100, 50);
            stroke(1);
            rect(this.x1 + this.size, this.y2 + this.size - 30, this.size, 120);

            // leafs
            fill(0, this.green, 0);
            let centerX = this.x1 + this.size + (this.size / 2);
            let centerY = this.y2 + this.size;
            ellipse(centerX, centerY - 50, this.size * 4);
        } else if (this.treeType === 3) {
            // trunk
            fill(150, 100, 50);
            stroke(1);
            rect(this.x1 + this.size, this.y2 + this.size - 30, this.size, 120);

            // leafs
            fill(0, this.green, 0);
            let centerX = this.x1 + this.size + (this.size / 2);
            let centerY = this.y2 + this.size;
            ellipse(centerX, centerY - 10, this.size * 2 + 10, this.size * 5 + 5);
        }
    }
}

export default Tree;