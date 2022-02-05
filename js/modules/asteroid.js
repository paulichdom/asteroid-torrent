'use strict';

import calc from './calc.js'

export default class Asteroid {
    constructor(canvas, context, image) {
        this.canvas = canvas;
        this.context = context;
        this.x = this.canvas.width + Math.random() * this.canvas.width;
        this.y = calc.generateRand(10, this.canvas.height - 10); //  Math.random() * this.canvas.height;
        this.width = 64; // 64
        this.height = 64; //64
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 15;
        this.speed = Math.random() * 7 + 1;
        this.color = 'black';
        this.image = image;
        this.chance = calc.generateRand(0,2);
        this.hit = false;
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

    update() {
        this.x -= this.speed;
        if(this.chance) this.y += Math.random();
        else this.y -= Math.random(); // TODO: terinary operator
    }

    handleAsteroidFrame() {
        if (this.frameX < this.maxFrame) this.frameX++
        else this.frameX = 0;
    }

    get bottom() { return this.y + this.height; }
    get left() { return this.x; }
    get right() { return this.x + this.width; }
    get top() { return this.y; }

    testCollision(collidingObject) {
        if (this.top > collidingObject.bottom ||
            this.right < collidingObject.left ||
            this.bottom < collidingObject.top ||
            this.left > collidingObject.right) {
            return false
        } else {
            return true;
        }
    }
}