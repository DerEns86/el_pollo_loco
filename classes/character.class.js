/**
 * Represents a character object extending the functionality of a movable object.
 */
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
    /**
    * Creates a character object with specific properties
    */
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

    /**
    * Initiates the animation sequence for the character.
    * Manages character movement and state animations.
    */
    animate() {
        this.manageMovement();
        this.animateCharacterState();
    }

    /**
    * Initiates the animation sequence based on the character's current state.
    * Periodically checks the character's state and plays corresponding animations or actions.
    */
    animateCharacterState() {
        setInterval(() => {
            this.sounds.snoring_sound.pause();
            if (this.isDead()) {
                this.handleDeadState();
            } else if (this.isHurt() && !this.hurtSoundPlayed) {
                this.handleHurtState();
            } else if (this.isaboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.handleSleepState();
            }
        }, 150);
    }

    /**
    * Manages the character's movement based on input and game conditions.
    * Checks for movement possibilities and performs corresponding actions.
    */
    manageMovement() {
        setInterval(() => {
            this.sounds.walking_sound.pause();
            if (this.canMoveRight()) {
                this.moveRight();
                this.handleMovementInX();
            }
            if (this.canMoveLeft()) {
                this.moveLeft();
                this.handleMovementInX();
            }
            if (this.canJump()) {
                this.jump();
                this.handleJump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)
    }

    /**
    * Handles actions when the character jumps.
    * Updates the timestamp of the last movement and plays the jumping sound.
    */
    handleJump() {
        this.lastMove = new Date().getTime();
        this.sounds.jumping_sound.play();
    }

    /**
    * Handles actions related to character movement in the horizontal (X) direction.
    * Updates the timestamp of the last movement and plays the walking sound if the character is not above ground.
    */
    handleMovementInX() {
        this.lastMove = new Date().getTime();
        if (!this.isaboveGround()) {
            this.sounds.walking_sound.play();
        }
    }

    /**
    * Handles actions for the character's sleep state.
    * Plays corresponding animations and sound effects based on the character's sleep status.
    */
    handleSleepState() {
        if (this.isSleeping()) {
            this.playAnimation(this.IMAGES_SLEEP);
            this.sounds.snoring_sound.play();
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
    * Handles actions for the character's hurt state.
    * Initiates the hurt animation and sound effect for the character.
    */
    handleHurtState() {
        this.playAnimation(this.IMAGES_HURT);
        this.playHurtSound();
    }

    /**
    * Handles actions for the character's dead state.
    * Initiates the dead animation, plays the dead sound, handles character death UI, and clears all intervals.
    */
    handleDeadState() {
        this.playAnimation(this.IMAGES_DEAD);
        this.sounds.dead_sound.play();
        this.characterIsDead();
        clearAllIntervals();
    }

    /**
    * Plays the hurt sound if it hasn't been played recently.
    * Prevents rapid consecutive plays using a timeout.
    */
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

    /**
    * Checks if the character can move right based on keyboard input and position.
    * @returns {boolean} Returns true if the character can move right; otherwise, returns false.
    */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.x <= (this.world.endboss.x + 100);
    }

    /**
    * Checks if the character can move left based on keyboard input and position.
    * @returns {boolean} Returns true if the character can move left; otherwise, returns false.
    */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
    * Checks if the character can perform a jump based on keyboard input and position.
    * @returns {boolean} Returns true if the character can jump; otherwise, returns false.
    */
    canJump() {
        return this.world.keyboard.UP && !this.isaboveGround();
    }

    /**
    * Checks if the character is currently in motion.
    * @returns {boolean} Returns true if the character is moving; otherwise, returns false.
    */
    isMoving() {
        return this.canMoveLeft() || this.canMoveRight() || this.canJump();
    }

    /**
    * Checks if the character is in a sleeping state based on the time since the last move.
    * @returns {boolean} Returns true if the character is sleeping; otherwise, returns false.
    */
    isSleeping() {
        let timepassed = new Date().getTime() - this.lastMove; //difference in ms
        timepassed = timepassed / 1000;  //difference in seconds
        return timepassed > 2;
    }

    /**
    * Checks if the character is dead and updates the UI accordingly.
    */
    characterIsDead() {
        if (this.isDead()) {
            document.getElementById('lostScreen').classList.remove('d-none');
        }
    }
}