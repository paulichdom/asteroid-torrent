'use strict';

const calc = {
    
    generateRand(min, max) {
        return ~~(Math.random() * (max - min + 1) + min);
    }
}

export default calc;