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
    throwableObjects = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();

        this.test();

    }

    setWorld() {
        this.character.world = this;
    }

    test() {
        // console.log(this.statusBarCoin.percentage);
        // console.log(this.level.coins);
        // console.log(this.statusBarCoin.percentage);
        console.log(this.character);

    }




    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
            this.checkCollisionWithCoin();
            this.checkCollisionWithBottle();
        }, 100);
    }

    checkThrowObject() {
        if (this.keyboard.B) {
            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100);
            this.throwableObjects.push(bottle);

        }
    };

    checkCollisions() {

        this.level.enemies.forEach((enemy, i) => {
            // if (this.character.isaboveGround() && (this.character.x + this.character.width) >= this.level.enemies[i].x && (this.character.y + this.character.height) >= this.level.enemies[i].y){
            if (this.character.isaboveGround() && this.character.isColliding(enemy)) {
                console.log('above' + this.character.y);
                this.level.enemies[i].killed();
                setTimeout(() => {
                    this.level.enemies.splice(i, 1);
                }, 1000);
            }

            else if (this.character.isColliding(enemy) && !this.character.isaboveGround()) {
                this.character.hit();
                this.statusBarLife.setPercentage(this.character.energy);
            }
        });

        // #################collision with bottle#####################mit chat gbt eingefügt

        this.throwableObjects.forEach((throwableObject) => {
            this.level.enemies.forEach((enemy, i) => {
                if (throwableObject.isColliding(enemy)) {
                    console.log('HIT');
                    this.level.enemies.splice(i, 1);
                }
            });
        });
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
                this.level.bottleOnGround.splice(index, 1);
            }
        });
    }




    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        // draw backgroundObject
        this.addObjectsToMap(this.level.backgroundObjects);
        // draw Character
        this.addToMap(this.character);
        // draw chicken
        this.addObjectsToMap(this.level.enemies);
        // draw clouds
        this.addObjectsToMap(this.level.clouds);

        this.addObjectsToMap(this.level.coins);

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
        movable.drawFrame(this.ctx);
        movable.drawFrameYellow(this.ctx);
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