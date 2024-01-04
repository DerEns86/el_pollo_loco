
class Character extends MovableObject {
    height = 200;
    y = 100;
    speed = 5;
    bottlesToThrow;
    hurtSoundPlayed = false;
    world;

    IMAGES_IDLE = characterImages.IMAGES_IDLE;
    IMAGES_SLEEP = characterImages.IMAGES_SLEEP;
    IMAGES_WALKING = characterImages.IMAGES_WALKING;
    IMAGES_JUMPING = characterImages.IMAGES_JUMPING;
    IMAGES_DEAD = characterImages.IMAGES_DEAD;
    IMAGES_HURT = characterImages.IMAGES_HURT;


    sounds = {
        walking_sound: new Audio('audio/walking.mp3'),
        jumping_sound: new Audio('audio/jump.mp3'),
        dead_sound: new Audio('audio/char-dead.mp3'),
        hurt_sound: new Audio('audio/hurt.mp3'),
        snoring_sound: new Audio('audio/snoring2.mp3')

    }

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();

        this.offset.top = 100;
        this.offset.bottom = 110;
        this.offset.left = 30;
        this.offset.right = 60;

        this.bottlesToThrow = 0;

        this.lastMove = new Date().getTime();

    }


    animate() {
        this.manageMovement();
        this.animateCharacterState();
    }

    animateCharacterState() {
        setInterval(() => {
            this.sounds.snoring_sound.pause();
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.sounds.dead_sound.play();
                this.characterIsDead();
                clearAllIntervals();

            } else if (this.isHurt() && !this.hurtSoundPlayed) {
                this.playAnimation(this.IMAGES_HURT);
                this.playHurtSound();

            }

            else if (this.isaboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                if (this.isSleeping()) {
                    this.playAnimation(this.IMAGES_SLEEP);
                    this.sounds.snoring_sound.play();
                } else {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
        }, 150);
    }

    manageMovement() {
        setInterval(() => {
            this.sounds.walking_sound.pause();
            if (this.canMoveRight()) {
                this.moveRight();
                this.lastMove = new Date().getTime();
                if (!this.isaboveGround()) {


                    this.sounds.walking_sound.play();
                }
            }
            if (this.canMoveLeft()) {
                this.moveLeft();
                this.lastMove = new Date().getTime();
                if (!this.isaboveGround()) {


                    this.sounds.walking_sound.play();
                }
            }

            if (this.canJump()) {
                this.jump();
                this.lastMove = new Date().getTime();
                this.sounds.jumping_sound.play();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)
    }

    playHurtSound() {

        if (!this.hurtSoundPlayed) {
            this.sounds.hurt_sound.play();

            setTimeout(() => {
                this.sounds.hurt_sound.pause();
                this.hurtSoundPlayed = false;
            }, 200);

            this.hurtSoundPlayed = true;
        }
    }


    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.x <= (this.world.endboss.x + 100);
    }

    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    canJump() {
        return this.world.keyboard.UP && !this.isaboveGround();
    }

    isMoving() {
        return this.canMoveLeft() || this.canMoveRight() || this.canJump();
    }

    isSleeping() {
        let timepassed = new Date().getTime() - this.lastMove; //difference in ms
        timepassed = timepassed / 1000;  //difference in seconds
        return timepassed > 2;
    }

    characterIsDead() {
        if (this.isDead()) {
            document.getElementById('lostScreen').classList.remove('d-none');
        }
    }


}