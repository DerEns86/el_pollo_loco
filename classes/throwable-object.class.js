class ThrowableObject extends MovableObject {

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
        // TODO abändern mit if-else. die playAnimation Splash stoppen oder die 
        // bottle splicen
        this.speedY = 20;
        this.applyGravity();

        setInterval(() => {

            if (this.y <= 365) {
                this.x += 10;
                this.playAnimation(this.IMAGES_ROTATE);
            } else {
                // this.stopGravity();
                this.splashBottle();

                // this.y = 365;
                // this.testThrow();
            }

        }, 50)

    }

    splashBottle() {
        this.stopGravity();
        this.bottleToRemove++;
        this.playAnimation(this.IMAGES_SPLASH);
        
    }
}