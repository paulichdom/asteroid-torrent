'use strict';

// MODULES
import Player from './modules/player.js';
import Asteroid from './modules/asteroid.js';
import AsterLarge from './modules/asterLarge.js';
import AsterMedium from './modules/asterMedium.js';
import Projectile from './modules/projectile.js';
import Explosion from './modules/explosion.js';
import ExpSmall from './modules/expSmall.js';
import keypad from './modules/keypad.js';

// VARIABLES
// Select the canvas
const canvasPlayer = document.querySelector('#canvasPlayer');
const canvasEnemy = document.querySelector('#canvasEnemy');

// Select images
const imgSpaceShip = document.querySelector('#imgSpaceShip');
const imgAsteroidSmallGrey = document.querySelector('#imgAsteroidSmallGrey');
const imgAsteroidSmallRed = document.querySelector('#imgAsteroidSmallRed');
const imgAsteroidMedium = document.querySelector('#imgAsteroidMedium');
const imgAsteroidLarge = document.querySelector('#imgAsteroidLarge');
const imgMissile = document.querySelector('#imgMissile');
const imgExplosionBig = document.querySelector('#imgExplosionBig');
const imgExplosionSmall = document.querySelector('#imgExplosionSmall');
const backgroundImgOne = document.querySelector('#backgroundImgOne');

// Contexts
const ctxPlayer = canvasPlayer.getContext('2d');
const ctxEnemy = canvasEnemy.getContext('2d');
ctxPlayer.font = '25px Georgia';

// Register key's pressed
const movement = { x: 0, y: 0 };
let gameFrame = 0;
let gameSpeed = 3;

// Create player object
let player = new Player(canvasPlayer, ctxPlayer, movement, imgSpaceShip);

// Object collections
let projectiles = [];
let asteroids = [];
let explosions = [];
let score = 0;

// Object for handling background image
const bg = {
    x1: 0,
    x2: canvasPlayer.width,
    y: 0,
    width: canvasPlayer.width,
    height: canvasPlayer.height
}

// FUNCTIONS
// Create and handle a moving background
const handleBackground = () => {
    if (bg.x1 <= -bg.width + gameSpeed) bg.x1 = bg.width;
    else bg.x1 -= gameSpeed;
    if (bg.x2 <= -bg.width + gameSpeed) bg.x2 = bg.width;
    else bg.x2 -= gameSpeed;
    ctxPlayer.drawImage(backgroundImgOne, bg.x1, bg.y, bg.width, bg.height);
    ctxPlayer.drawImage(backgroundImgOne, bg.x2, bg.y, bg.width, bg.height);
}

// Create and handle explosions during collisions
const handleExplosion = () => {
    for (let i = 0; i < explosions.length; i++) {
        let ex = explosions[i];
        ex.draw();
        if (ex.frameX < ex.maxFrame) ex.frameX++;
        else explosions.splice(i, 1);
    }
}

/*
    Create and remove asteroids
    Handle collisions with projectiles and player object
    Create explosions during the collisions
*/
const handleAsteroids = () => {
    // Create asteroids in intervals
    if (gameFrame % 15 == 0) {
        asteroids.push(new Asteroid(canvasPlayer, ctxPlayer, imgAsteroidSmallGrey));
        asteroids.push(new Asteroid(canvasPlayer, ctxPlayer, imgAsteroidSmallRed));
    }
    if (gameFrame % 65 == 0) {
        asteroids.push(new AsterMedium(canvasPlayer, ctxPlayer, imgAsteroidMedium));
    }
    if (gameFrame % 90 == 0) {
        asteroids.push(new AsterLarge(canvasPlayer, ctxPlayer, imgAsteroidLarge));
    }

    // Draw the created asteroids on canvas and remove
    // asteroids that have passed the canvas border 
    for (let i = 0; i < asteroids.length; i++) {
        let as = asteroids[i];
        as.draw();
        as.update();
        as.handleAsteroidFrame();
        if (as.x < 0 - as.width * 2) {
            asteroids.splice(i, 1);
        }

        // Test collision with the projectile. if collision is occured
        // create an explosion and remove both objects 
        for(let j = 0; j < projectiles.length; j++) {
            let pr = projectiles[j];
            if(pr.testCollision(as)){
                explosions.push(new Explosion(canvasPlayer, ctxPlayer, pr, imgExplosionBig));
                score++;
                as.hit = true;
                projectiles.splice(j, 1);
                asteroids.splice(i, 1);
            }
        }
        
        // Test collision with player object
        if (player.testCollision(as)) {
            if (!as.hit) {
                explosions.push(new ExpSmall(canvasPlayer, ctxPlayer, as, imgExplosionSmall));
                player.hp -= 1;
                as.hit = true
                asteroids.splice(i, 1);
            }
            if (player.hp < 1) {
                ctxPlayer.fillStyle = 'yellow';
                ctxPlayer.fillText(
                    'Game Over, your score is ' +
                    score,
                    300,
                    canvasPlayer.height / 2 - 10)
            }
        }
    }
}

// Global variables for startAnimating() function
let fpsInterval, startTime, now, then, elapsed;

// Start the animation loop based on the specified fps parameter
function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

// Handle game animation
const animate = () => {
    if (player.hp < 1) return;
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        ctxPlayer.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
        ctxEnemy.clearRect(0, 0, canvasEnemy.width, canvasEnemy.height);
        handleBackground();
        player.draw();
        player.update();
        player.handlePlayerFrame();
        projectiles.forEach(projectile => projectile.launchProjectile());
        handleAsteroids();
        handleExplosion();
        ctxPlayer.fillStyle = 'yellow';
        ctxPlayer.fillText(score, 800, 50);
        ctxPlayer.fillText('👨🏽‍🚀 ' + player.hp + ' hp', 50, 50);
        gameFrame++;
    }
}

// EVENTLISTENERS
// Create a new projectile each time a 'Space' button is pressed
window.addEventListener('keydown', evt => {
    if (evt.code === 'Space')
        projectiles.push(new Projectile(canvasPlayer, ctxPlayer, player, imgMissile));
})

// Event listeners for controling the Player with the keypad
window.addEventListener('keydown', evt => keypad.active(evt, movement, player));
window.addEventListener('keyup', evt => keypad.idle(evt, movement, player));

// INIT
// Initiate animation
startAnimating(30);