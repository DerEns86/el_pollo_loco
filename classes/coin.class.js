/**
 * Represents a coin object extending the functionality of a movable object.
 */
class Coin extends MovableObject {
       height = 130;
       width = 130;
     
    IMAGES = coinImages.COIN_IMAGES;

    sounds = {
        coin_collect: new Audio('audio/coin.mp3')
    };

    /**
    * Creates a coin object with specific properties and animations.
    */
    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.animate();
        this.x = 500 + Math.random() * 1600;
        this.y = 170 + Math.random() * 150;

        this.offset.top = 50;
        this.offset.bottom = 50;
        this.offset.left = 50;
        this.offset.right = 100; 
    }

    /**
    * Draws the coin on the canvas using the provided rendering context.
    * @param {CanvasRenderingContext2D} ctx - The rendering context to draw the coin.
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
    * Initiates the animation sequence for the coins
    */
    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }
}