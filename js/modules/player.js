'use strict';

/*
    Player class represents the main character in the game. Player object 
    will be controlled by the user. Player object has a position on screen, 
    size, speed and sprite specifications. It can draw the sprite, move,
    handle frames and detect collision.
*/

export default class Player {

    constructor(canvas, context, controller, image) {
        this.canvas = canvas;
        this.context = context;
        this.controller = controller;
        this.x = 50;
        this.y = 100;
        this.width = 64;
        this.height = 64;
        this.frameX = 0;
        this.frameY = 2;
        this.minFrame = 0;
        this.maxFrame = 2;
        this.speed = 12;
        this.speedX = 32;
        this.speedY = 32;
        this.accel = .001;
        this.resist = .03;
        this.moving = false;
        this.hp = 3;
        this.image = image
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

        if (this.x + this.controller.x * this.speed > 0)
            this.x += this.controller.x * this.speed;

        if (this.x + this.controller.x * this.speed > this.canvas.width)
            this.x = this.canvas.width - this.width
            this.y += this.controller.y * this.speed;

        if (this.y < 0 - this.height)
            this.y += this.canvas.height + this.height

        if (this.y > this.canvas.height + this.height)
            this.y -= this.canvas.height + this.height * 1.5
    }

    handlePlayerFrame() {
        if (this.frameX < this.maxFrame && this.moving) this.frameX = 0;
        else this.frameX = 1;
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