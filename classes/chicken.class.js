/**
 * Represents a chicken enemy extending the functionality of a movable object.
 */
class Chicken extends MovableObject {
    height = 60;
    width = 60;
    y = 365;

    isDead = false;

    IMAGES_WALKING = chickenImages.IMAGES_WALKING;
    IMAGES_DEAD = chickenImages.IMAGES_DEAD;

    sounds = {
        deadChicken_sound: new Audio('audio/chicken-dead.mp3'),
    }

    /**
    * Creates a chicken enemy with specific properties.
    */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 500 + Math.random() * 1200;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();

        this.offset.top = 8;
        this.offset.bottom = 20;
        this.offset.left = 5;
        this.offset.right = 10;
    }

    /**
    * Initiates the animation and movement handling for the chicken.
    */
    animate() {
        this.handleMovment();
        this.handleAnimations();
    };

    /**
    * Handles animations for the chicken based on its state.
    */
    handleAnimations() {
        this.animationInterval = setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    /**
    * Handles movement of the chicken.
    */
    handleMovment() {
        this.moveInterval = setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }

    /**
    * Handles actions when the chicken is killed.
    */
    killed() {
        if (!this.isDead) {
            this.isDead = true;
            this.sounds.deadChicken_sound.play();
            clearInterval(this.moveInterval);
        }
    }
}