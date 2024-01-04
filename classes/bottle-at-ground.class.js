/**
 * Represents a bottle object on the ground, extending the functionality of a drawable object.
 */
class BottleOnGround extends DrawableObject {
    height = 60;
    width = 60;

    sounds = {
        bottle_collect: new Audio('audio/bottle-collect.mp3')
    };

    /**
     * Creates a bottle object on the ground with specific properties and offsets.
     */
    constructor() {
        super();
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random() * 1500;
        this.y = 365;

        this.offset.top = 10;
        this.offset.bottom = 20;
        this.offset.left = 15;
        this.offset.right = 30;
    }

    /**
     * Draws the bottle on the ground using the provided rendering context.
     * @param {CanvasRenderingContext2D} ctx - The rendering context to draw the bottle.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

}