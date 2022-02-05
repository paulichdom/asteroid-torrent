'use strict';

export default class Explosion {
    constructor(canvas, context, target, image) {
        this.canvas = canvas;
        this.context = context;
        this.target = target;
        this.x = this.target.x;
        this.y = this.target.y;
        this.width = 111;
        this.height = 109;
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 8;
        this.speed = 0;
        this.image = image;
    }

    draw() {
        this.context.drawImage(
            this.image,
            this.width * this.frameX,
            this.height * this.frameY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}