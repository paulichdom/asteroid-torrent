'use strict';

import Asteroid from './asteroid.js';

export default class AsterLarge extends Asteroid {
    constructor(canvas, context, image){
        super(canvas, context, image);
        this.width = 320;
        this.height = 240;
    }
}