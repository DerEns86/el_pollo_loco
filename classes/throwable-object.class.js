class ThrowableObject extends MovableObject {

    isCollided = false;


    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]
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