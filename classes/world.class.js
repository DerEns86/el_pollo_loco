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
    


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();

       


    }

    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    test() {
        if (this.character.isDead()) {
            console.log('dead');
            document.getElementById('canvas').innerHTML = "Tot";
        }
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
                setTimeout(() => {
                    this.level.enemies.splice(i, 1);
                }, 1000);
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
                    throwableObject.splash_sound.play();
                    enemy.isDead = true;
                    setTimeout(() => {
                        if (enemy.isDead) {
                            this.level.enemies.splice(j, 1);
                        }
                    }, 1000);
                }
            });
        });


    }

    checkCollisionBottleEndboss() {
        this.throwableObjects.forEach((throwableObject) => {
            if (throwableObject.isColliding(this.endboss)) {
                // console.log('Hit Endboss');
                throwableObject.isCollided = true;
                throwableObject.splash_sound.play();
                this.endboss.isHurt();
                this.endboss.hit();
                this.statusBarEndboss.setPercentage(this.endboss.energy);
            }

        });
        // this.removeCollidedBottles();
    }



    checkCollisionWithCoin() {
        this.level.coins.forEach((coin, index) => {

            if (this.character.isColliding(coin)) {
                this.statusBarCoin.percentage += 20;
                this.statusBarCoin.setPercentage(this.statusBarCoin.percentage);
                this.level.coins.splice(index, 1);
            }
        });
    }

    checkCollisionWithBottle() {
        this.level.bottleOnGround.forEach((bottle, index) => {

            if (this.character.isColliding(bottle)) {
                this.statusBarBottle.percentage += 20;
                this.statusBarBottle.setPercentage(this.statusBarBottle.percentage);
                this.character.bottlesToThrow++;

                this.level.bottleOnGround.splice(index, 1);
            }
        });
    }

    removeCollidedBottles() {
        setTimeout(() => {
            this.throwableObjects = this.throwableObjects.filter(throwableObject => !throwableObject.isCollided);
        }, 60);
    }

    //    Auf Fehler überprüfen, endboss rreagiert nicht richtig bei alarm
    activateEndboss() {
        if (this.character.x > 1600 || this.endboss.isAlarmed) {
            this.endboss.isAlarmed = true;

            if ((this.endboss.x - this.character.x) < 200 && this.endboss.isAlarmed) {
                this.endboss.isReadyToAttack = true;
                // console.log('Attack');
                // this.endboss.attack();
             
            } else {
                this.endboss.isReadyToAttack = false;
            }

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
        movable.drawFrameHitBox(this.ctx);


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