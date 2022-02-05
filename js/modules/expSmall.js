'use strict';

import Explosion from './explosion.js'

export default class ExpSmall extends Explosion {
    constructor(canvas, context, target, image) {
        super(canvas, context, target, image)
        this.width = 64;
        this.height = 64;
        this.minFrame = 0;
        this.maxFrame = 9;  
    } 
}