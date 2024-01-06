/**
* Represents a drawable object that can be displayed on a canvas.
*/
class DrawableObject {
    x = 80;
    y = 200;
    width = 100;
    height = 150;
    
    img;
    imageCache = {};
    currentImage = 0;

    onCollisionCourse = false;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right:0
    }
    
    /**
    * Loads an image for the drawable object.
    * @param {string} path - The path to the image file.
    */
    loadImage(path) {
        this.img = new Image()
        this.img.src = path;
    }

    /**
    * Loads multiple images into the image cache.
    * @param {string[]} arr - Array of image paths to load.
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
    * Draws the drawable object on the canvas using the provided rendering context.
    * @param {CanvasRenderingContext2D} ctx - The rendering context to draw the object.
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    //############## remove after feedback ##################


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawFrameHitBox(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof BottleOnGround ) {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.stroke();
        }
    }

    drawFrameYellow(ctx) {
        if (this instanceof Coin || this instanceof BottleOnGround ) {
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.strokeStyle = "yellow";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}