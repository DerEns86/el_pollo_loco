class Chicken extends MovableObject {
    height = 60;
    width = 60;
    y = 365;

    isDead = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 300 + Math.random() * 800;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();

        this.offset.top = 10;
        this.offset.bottom = 20;
        this.offset.left = 5;
        this.offset.right = 10;

    }

    animate() {

        this.moveInterval = setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);


        this.animationInterval = setInterval(() => {

            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {

                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    killed() {
        if (!this.isDead) {
            this.isDead = true;
            clearInterval(this.moveInterval);
        }

    }


}