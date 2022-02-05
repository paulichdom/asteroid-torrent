'use strict';

import Asteroid from './asteroid.js';

export default class AsterMedium extends Asteroid {
    constructor(canvas, context, image){
        super(canvas, context, image);
        this.width = 120;
        this.height = 120;
    }
}