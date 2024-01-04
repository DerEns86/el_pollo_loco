/**
 * represents the game world containing various game elements and functionality
 */
class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarLife = new StatusBarLife();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    endboss = this.level.endboss[0];
    sounds = [];


    /**
     * Creates a game world with necessary elements and configurations.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
     * @param {Keyboard} keyboard - The keyboard input for the game.
     * @param {boolean} soundsMuted - Indicates if game sounds are muted or not.
     */
    constructor(canvas, keyboard, soundsMuted) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.soundsMuted = soundsMuted;
        this.draw();
        this.setWorld();
        this.run();
        this.setSoundsStatus();

    }

    /**
     * Sets the world property for the character and endboss to this instance of World
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * Sets the state of sounds to muted
     * Default is soundsMuted = false
     */
    setSoundsStatus() {
        if (this.soundsMuted) {
            this.muteAllSounds();
        }
    }

    /**
     * toggles the sound between muted and unmuted
     */
    toggleSoundMute() {
        this.soundsMuted = !this.soundsMuted;

        if (this.soundsMuted) {
            this.muteAllSounds();
        } else {
            this.unmuteAllSounds();
        }
    }

    /**
     * mutes all sounds of character, chicken and endboss
     */
    muteAllSounds() {
        this.character.muteSounds();
        this.level.enemies.forEach(enemy => {
            enemy.muteSounds();
        });
        this.endboss.muteSounds();
    }

    /**
     * unmute all sounds of character, chicken and endboss
     */
    unmuteAllSounds() {
        this.character.unmuteSounds();
        this.level.enemies.forEach(enemy => {
            if (enemy.muteSounds) {
                enemy.unmuteSounds();
            }
        });
        this.endboss.unmuteSounds();
    }

    /**
     * toggles the keybord description element between hidden and not
     */
    toggleSettings() {
        let controls = document.getElementById('controls');
        controls.classList.toggle('hidden');
    }

    /**
     * sets the interval to run the game and check the state permantly
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
            this.checkCollisionWithCoin();
            this.checkCollisionWithBottle();
            this.checkCollisionBottleEnemy();
            this.checkCollisionBottleEndboss();
            this.activateEndboss();
            this.removeCollidedBottles();
            this.setEndbossBarInX();
        }, 100);
    }

    /**
     * creates a new instance of throwableObject when hit keyboard key B 
     * and update the statusbar
     */
    checkThrowObject() {
        if (this.keyboard.B && this.character.bottlesToThrow > 0 && this.throwableObjects.length == 0) {
            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.bottlesToThrow--;
            this.statusBarBottle.percentage -= 20;
            this.statusBarBottle.setPercentage(this.statusBarBottle.percentage);
        }
    }

    /**
     * checks collision between character and chicken or endboss
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.character.isaboveGround() && this.character.isColliding(enemy) && !enemy.isDead && this.character.speedY <= 0) {
                this.level.enemies[i].killed();
                this.character.jump();
                this.removeDeadEnemies(enemy, i)
            }
            else if (this.character.isColliding(enemy) && !this.character.isaboveGround() && !enemy.isDead) {
                this.handleCharacterHit();
            }
        });
        if (this.character.isColliding(this.endboss)) {
            this.handleCharacterHit();
        }
    }

    /**
     * checks and handle collision between thrown bottle an chicken
     */
    checkCollisionBottleEnemy() {
        this.throwableObjects.forEach((throwableObject) => {
            this.level.enemies.forEach((enemy, j) => {
                if (this.isCollisionAndNotBroken(enemy, throwableObject)) {
                    this.handleCollidedBottle(throwableObject);
                    this.handleCollisionBottleWithEnemy(enemy, j)
                }
            });
        });
    }

    /**
     * checks and handle collision between thrown bottle and endboss
     */
    checkCollisionBottleEndboss() {
        this.throwableObjects.forEach((throwableObject) => {
            if (throwableObject.isColliding(this.endboss)) {
                this.handleCollidedBottle(throwableObject);
                this.handleCollisionBottleWithEndboss();
            }
        });
    }

    /**
     * set and handle the damage and statusbar when character is hit 
     */
    handleCharacterHit() {
        this.character.hit();
        this.statusBarLife.setPercentage(this.character.energy);
    }

    /**
     * Sets a specific enemy object as dead when hit by a bottle
     * @param {object} enemy - The single object representing an enemy in the enemies array
     * @param {number} j - the index of the enemy in the enemies array
     */
    handleCollisionBottleWithEnemy(enemy, j) {
        enemy.isDead = true;
        this.removeDeadEnemies(enemy, j);
    }

    /**
     * handles the collision of a bottle and the endboss
     */
    handleCollisionBottleWithEndboss() {
        this.endboss.isHurt();
        this.endboss.hit();
        this.statusBarEndboss.setPercentage(this.endboss.energy);
    }

/**
 * checks if a throwable object is colliding with a target and is not yet broken
 * @param {object} targetObject - the object being targeted 
 * @param {object} throwableObject - the object being thrown 
 * @returns {boolean} - Returns true if the throwable object is colliding with the target object and is not yet broken; otherwise, returns false
 */
    isCollisionAndNotBroken(targetObject, throwableObject) {
        return throwableObject.isColliding(targetObject) && !throwableObject.isCollided
    }

    /**
     * handle the collision of a bottle
     * @param {object} throwableObject - the bottle object that collided 
     */
    handleCollidedBottle(throwableObject) {
        throwableObject.isCollided = true;
        this.playSound(throwableObject.sounds.splash_sound);
    }

    /**
     * checks for collision between the character and coins in the level
     */
    checkCollisionWithCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.playSound(this.level.coins[index].sounds.coin_collect);
                this.statusBarCoin.percentage += 20;
                this.statusBarCoin.setPercentage(this.statusBarCoin.percentage);
                this.level.coins.splice(index, 1);
            }
        });
    }

    /**
     * checks for collision between the character and collectable bottles in the level
     */
    checkCollisionWithBottle() {
        this.level.bottleOnGround.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.playSound(this.level.bottleOnGround[index].sounds.bottle_collect);
                this.statusBarBottle.percentage += 20;
                this.statusBarBottle.setPercentage(this.statusBarBottle.percentage);
                this.character.bottlesToThrow++;
                this.level.bottleOnGround.splice(index, 1);
            }
        });
    }
    
    /**
     * plays a sound if sound is not muted
     * @param {object} sound - the sound object to be played
     */
    playSound(sound) {
        if (!this.soundsMuted)
            sound.play();
    }

    /**
     * removes collided bottle from the throwableObjects array after a timeout
     */
    removeCollidedBottles() {
        setTimeout(() => {
            this.throwableObjects = this.throwableObjects.filter(throwableObject => !throwableObject.isCollided);
        }, 60);
    }

    /**
     * remove enemy from the enemies array when it's dead
     * @param {object} enemy - object form the enemies array
     * @param {number} index - index of the specific enemy in the enemies array
     */
    removeDeadEnemies(enemy, index) {
        setTimeout(() => {
            if (enemy.isDead) {
                this.level.enemies.splice(index, 1);
            }
        }, 1000);
    }

    /**
     * activate and handle the endboss when the character is close to him
     */
    activateEndboss() {
        if ((this.endboss.x - this.character.x) < 700 && !this.endboss.isAlarmed) {
            this.endboss.isAlarmed = true;
            this.endboss.speed = 0.5;
            this.endboss.sounds.sound_Endboss.play();
        }
        else if ((this.endboss.x - this.character.x) < 200 && this.endboss.isAlarmed) {
            this.endboss.isReadyToAttack = true;
            this.endboss.speed = this.endboss.attackSpeed;
        } else {
            this.endboss.isReadyToAttack = false;
        }
    }

    /**
     * sets the endboss statusbar in x 
     */
    setEndbossBarInX() {
        this.statusBarEndboss.x = (this.endboss.getEndbossX() + 120);
    }

    /**
    * Clears the canvas, translates the context based on camera position,
    * and draws various game elements like background, characters, status bars, etc.
    */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
       this.drawBackground();
        this.drawAllCharacter();
        this.addToMap(this.statusBarEndboss);
        this.drawCollectableObjects();
        this.addObjectsToMap(this.throwableObjects);
        this.drawStatusBars();
        this.ctx.translate(-this.camera_x, 0);
        this.requestNextFrame();
    }

    /**
     * requests the next animation frame and invokes the draw method
     */
    requestNextFrame(){
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * draws all background objects of this game
     */
    drawBackground(){
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * draws all movable characters of this game
     */
    drawAllCharacter(){
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
    }

    /**
     * draws all collectable Objects for the game
     */
    drawCollectableObjects(){
        this.addObjectsToMap(this.level.bottleOnGround);
        this.addObjectsToMap(this.level.coins);
    }

    /**
     * draw all static statusbars
     */
    drawStatusBars(){
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);

        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * add multiple objects to map
     * @param {objects} objects - a array of objects
     */
    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }
    /**
     * Add an movableObject to map
     * @param {Object} movable - instance of a movable object
     */
    addToMap(movable) {
        if (movable.otherDirection) {
            this.flipImage(movable);
        }
        movable.draw(this.ctx);
        // remove after feedback ##########
        // movable.drawFrame(this.ctx);
        // movable.drawFrameYellow(this.ctx);
        // movable.drawFrameHitBox(this.ctx);
        if (movable.otherDirection) {
            this.flipImageBack(movable);
        }
    }

    /**
     * flips the image of a movable object when direction is changed
     * @param {object} movable - movable object
     */
    flipImage(movable) {
        this.ctx.save();
        this.ctx.translate(movable.width, 0);
        this.ctx.scale(-1, 1);
        movable.x = movable.x * -1;
    }

    /**
     * flips the image of a movable object back to default
     * @param {object} movable - movable object
     */
    flipImageBack(movable) {
        movable.x = movable.x * -1;
        this.ctx.restore();
    }
}