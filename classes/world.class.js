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
    coins = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.setCoins();
       
        
    }

    setWorld() {
        this.character.world = this;
    }


    setCoins(){
        console.log('SetCoin');
        // this.coins.push(new Coin(200, 50));
        // this.coins.push(new Coin(150, 100));
        // this.coins.push(new Coin(1000, 200));

        for (let i = 0; i < 6; i++) {
            const randomX = Math.random() * (this.level.level_end_x - 500);
            const randomY = Math.random() * (canvas.height - 200);
            this.coins.push(new Coin(randomX, randomY));
        }
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
        }, 100);
    }

    checkThrowObject() {
        if (this.keyboard.B) {
            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100);
            this.throwableObjects.push(bottle);

        }
    };

    checkCollisions() {

        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
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
        // ################collision with coin#########################

        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                // Hier wird die Münze aufgesammelt
                this.coins.splice(index, 1); // Entferne die Münze aus der Liste
               // this.statusBarCoin.increment(); // Inkrementiere den Münzzähler im Statusbalken
               console.log('Catch');
            }
        });
        // ###########################################
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

        this.addObjectsToMap(this.coins);

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