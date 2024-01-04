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

    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    setSoundsStatus() {
        if (this.soundsMuted) {
            this.muteAllSounds();
        }
    }

    toggleSoundMute() {
        this.soundsMuted = !this.soundsMuted;

        if (this.soundsMuted) {
            this.muteAllSounds();
        } else {
            this.unmuteAllSounds();
        }
    }

    muteAllSounds() {
        this.character.muteSounds();
        this.level.enemies.forEach(enemy => {
            enemy.muteSounds();
        });
        this.endboss.muteSounds();
    }


    unmuteAllSounds() {
        this.character.unmuteSounds();
        this.level.enemies.forEach(enemy => {
            if (enemy.muteSounds) { // Überprüfe, ob die Methode vorhanden ist, um Fehler zu vermeiden
                enemy.unmuteSounds();
            }
        });
        this.endboss.unmuteSounds();

    }



    toggleSettings() {
        let controls = document.getElementById('controls');
        controls.classList.toggle('hidden');
    }



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


    checkThrowObject() {
        if (this.keyboard.B && this.character.bottlesToThrow > 0 && this.throwableObjects.length == 0) {
            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100);
            this.throwableObjects.push(bottle);

            this.character.bottlesToThrow--;
            this.statusBarBottle.percentage -= 20;
            this.statusBarBottle.setPercentage(this.statusBarBottle.percentage);

        }

    }


    checkCollisions() {

        this.level.enemies.forEach((enemy, i) => {
            if (this.character.isaboveGround() && this.character.isColliding(enemy) && !enemy.isDead && this.character.speedY <= 0) {
                this.level.enemies[i].killed();
                this.character.jump();
                this.removeDeadEnemies(enemy, i)
            }

            else if (this.character.isColliding(enemy) && !this.character.isaboveGround() && !enemy.isDead) {
                this.character.hit();
                this.statusBarLife.setPercentage(this.character.energy);
            }
        });
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.statusBarLife.setPercentage(this.character.energy);
        }
    }

    checkCollisionBottleEnemy() {
        this.throwableObjects.forEach((throwableObject, i) => {
            this.level.enemies.forEach((enemy, j) => {
                if (throwableObject.isColliding(enemy) && !throwableObject.isCollided) {
                    throwableObject.isCollided = true;
                        this.playSound(throwableObject.sounds.splash_sound);
                    enemy.isDead = true;
                    this.removeDeadEnemies(enemy, j)
                }
            });
        });
    }


    checkCollisionBottleEndboss() {
        this.throwableObjects.forEach((throwableObject) => {
            if (throwableObject.isColliding(this.endboss)) {
                throwableObject.isCollided = true;
                    this.playSound(throwableObject.sounds.splash_sound);
                this.endboss.isHurt();
                this.endboss.hit();
                this.statusBarEndboss.setPercentage(this.endboss.energy);
            }
        });
    }



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

    playSound(sound) {
        if (!this.soundsMuted)
            sound.play();
    }

    removeCollidedBottles() {
        setTimeout(() => {
            this.throwableObjects = this.throwableObjects.filter(throwableObject => !throwableObject.isCollided);
        }, 60);
    }

    removeDeadEnemies(enemy, index) {
        setTimeout(() => {
            if (enemy.isDead) {
                this.level.enemies.splice(index, 1);
            }
        }, 1000);
    }

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


    setEndbossBarInX() {
        this.statusBarEndboss.x = (this.endboss.getEndbossX() + 120);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        // draw backgroundObject
        this.addObjectsToMap(this.level.backgroundObjects);
        // draw Character
        this.addToMap(this.character);

        this.addObjectsToMap(this.level.endboss);

        // draw chicken
        this.addObjectsToMap(this.level.enemies);
        // draw clouds
        this.addObjectsToMap(this.level.clouds);

        this.addObjectsToMap(this.level.coins);

        this.addToMap(this.statusBarEndboss);

        this.addObjectsToMap(this.level.bottleOnGround);

        // this.addObjectsToMap(this.coins);

        this.addObjectsToMap(this.throwableObjects);
        // draw statusbar
        // ---------space for fixed objects ----------
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusBarLife);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);

        this.ctx.translate(this.camera_x, 0);

        // ------------------------------------------


        this.ctx.translate(-this.camera_x, 0);

        // draw() wird immer wieder ausgeführt
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });

    }

    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }
    /**
     * Add the movableObjects to our map
     * 
     * @param {Object} movable - test
     */
    addToMap(movable) {
        if (movable.otherDirection) {
            this.flipImage(movable);
        }
        movable.draw(this.ctx);
        // movable.drawFrame(this.ctx);
        // movable.drawFrameYellow(this.ctx);
        // ####### remove later
        // movable.drawFrameHitBox(this.ctx);


        if (movable.otherDirection) {
            this.flipImageBack(movable);
        }
    }

    flipImage(movable) {
        this.ctx.save();
        this.ctx.translate(movable.width, 0);
        this.ctx.scale(-1, 1);
        movable.x = movable.x * -1;
    }

    flipImageBack(movable) {
        movable.x = movable.x * -1;
        this.ctx.restore();
    }
}