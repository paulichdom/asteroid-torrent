'use strict';

export default class Projectile {
    constructor(canvas, context, shooter, image) {
        this.canvas = canvas;
        this.context = context;
        this.shooter = shooter;
        this.x = this.shooter.x + 32
        this.y = this.shooter.y + 12
        this.width = 39;
        this.height = 39;
        this.frameX = 2;
        this.frameY = 0;
        this.speed = 30;
        this.launch = false;
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

    launchProjectile() {
        this.draw()
        this.x += this.speed
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