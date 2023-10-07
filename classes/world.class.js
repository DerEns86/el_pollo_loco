class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud(),
    ]
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    ];
    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();


    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // draw backgroundObject
        this.addObjectsToMap(this.backgroundObjects);
        // draw Character
        this.addToMap(this.character);
        // draw chicken
        this.addObjectsToMap(this.enemies);
        // draw clouds
        this.addObjectsToMap(this.clouds);

        
        

        // draw() wird immer wieder ausgeführt
        let self = this;
       requestAnimationFrame(function() {
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
            this.ctx.save();
            this.ctx.translate(movable.width, 0);
            this.ctx.scale(-1,1);
            movable.x = movable.x * -1;
        }
        this.ctx.drawImage(movable.img, movable.x, movable.y, movable.width, movable.height);

        if (movable.otherDirection) {
            movable.x = movable.x * -1;
            this.ctx.restore();
        }
    }

    flipImage(movable) {
        
    }
}