class ThrowableObject extends MovableObject {

    isCollided = false;


    IMAGES_ROTATE = bottleImages.IMAGES_ROTATE;

    IMAGES_SPLASH = bottleImages.IMAGES_SPLASH;

    sounds = {
    splash_sound: new Audio('audio/bottle-smash.mp3'),
    throw_sound: new Audio('audio/throw.mp3')
    }

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 60;
        this.throw();
        if(!soundsMuted){
        this.sounds.throw_sound.play();
        }
        this.bottleToRemove = 0;
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            if (!this.isCollided && this.isBottleAboveGround()) {
                this.x += 10;
                this.playAnimation(this.IMAGES_ROTATE);
            } else {
                this.stopGravity();
                this.isCollided = true;
                this.bottleToRemove++;
                this.splashBottle();
            }
        }, 60);        
    }

    isBottleAboveGround() {
        return this.y < 360;
    }

    splashBottle() {
        if(this.bottleToRemove == 1){
            if(!soundsMuted) {
        this.sounds.splash_sound.play();
            }
        this.playAnimation(this.IMAGES_SPLASH);
        }
        this.bottleToRemove == 0;
    }
}