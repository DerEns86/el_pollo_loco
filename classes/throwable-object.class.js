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


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 60;
        this.throw();

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
                this.splashBottle();
            }
        }, 50);
    }

    isBottleAboveGround() {
        return this.y < 360;
    }

    splashBottle() {
        this.playAnimation(this.IMAGES_SPLASH);
        
    }
}