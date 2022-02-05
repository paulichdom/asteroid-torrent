'use strict';

const keypad = {

    active(evt, movement, subject) {
        switch (evt.key) {
            case ('a'):
            case ('ArrowLeft'):
                subject.moving = true;
                movement.x = -1;
                break;
            case ('w'):
            case ('ArrowUp'):
                subject.moving = true;
                movement.y = -1;
                break;
            case ('d'):
            case ('ArrowRight'):
                subject.moving = true;
                movement.x = 1;
                break;
            case ('s'):
            case ('ArrowDown'):
                subject.moving = true;
                movement.y = 1;
                break;
            default:
                break;
        }
    },
    
    idle(evt, movement, subject) {
        switch (evt.key) {
            case ('a'):
            case ('ArrowLeft'):
            case ('d'):
            case ('ArrowRight'):
                subject.moving = false;
                movement.x = 0;
                break;
            case ('w'):
            case ('ArrowUp'):
            case ('s'):
            case ('ArrowDown'):
                subject.moving = false;
                movement.y = 0;
                break;
            default:
                break;
        }
    },
}

export default keypad;