/**
 * Represents the end boss extending the functionality of a movable object.
 */
class Endboss extends MovableObject {
    height = 400;
    width = 400;
    y = 50;
    energy = 100;
    speed = 0;
    attackSpeed = 0.5;
    isReadyToAttack = false;
    isAlarmed = false;
    hasAttacked = false;

    IMAGES_ALERT = endbossImages.IMAGES_ALERT;
    IMAGES_WALKING = endbossImages.IMAGES_WALKING;
    IMAGES_ATTACK = endbossImages.IMAGES_ATTACK;
    IMAGES_HURT = endbossImages.IMAGES_HURT;
    IMAGES_DEAD = endbossImages.IMAGES_DEAD;

    sounds = {
        sound_Endboss: new Audio('audio/chicken-endboss.mp3'),
        sound_isAlarmed: new Audio('audio/chicken-2.mp3')
    }

    /**
    * Creates an end boss with specific properties and behaviors.
    */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.animate();

        this.offset.top = 50;
        this.offset.bottom = 110;
        this.offset.left = 60;
        this.offset.right = 120;
    }

    /**
    * Initiates the animation and movement handling for the end boss.
    */
    animate() {
        this.manageMovement();
        this.manageAnimation();       
    }

    /**
    * Handles animations for the end boss based on its state.
    */
    manageAnimation(){
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.gameOver();
            }else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isReadyToAttack && this.isAlarmed && this.x >= this.world.character.x) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.attack();
                this.resetAttackState();
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    /**
    * sets the variable to default after an timeout
    */
    resetAttackState(){
        setTimeout(() => {
            this.isReadyToAttack = false;
        }, 200);
    }

    /**
    * Handles movement of the end boss.
    */
    manageMovement(){
        this.moveInterval = setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }

    /**
    * Moves the end boss to the left.
    */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = false;
    }

    /**
    * Reduces the energy level of the end boss when hit.
    */
    hit() {
        this.energy -= 25;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
    * Initiates an attack by the end boss.
    * Triggers specific actions for an attack, including playing sounds, jumping, and moving towards the left.
    */
    attack() {
        this.sounds.sound_isAlarmed.play();
        this.jump();
        this.x -= 30;
    }

    /**
    * Marks the end boss as killed if it's not already dead.
    */
    killed() {
        if (!this.isDead) {
            this.isDead = true;
        }
    }

    /**
     * getter to return the x position
     * @returns - return the x position
     */
    getEndbossX() {
        return this.x;
    }

    /**
     * shows gamoverscreen when endboss is killed
     * and clear all intervals
     */
    gameOver() {
        if (this.isDead()) {
            document.getElementById('gameOverScreen').classList.remove('d-none');
            setTimeout(() => {
                clearAllIntervals();
            }, 1000 / 60);
        }
    }
}