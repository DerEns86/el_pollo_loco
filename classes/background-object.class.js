/**
 * Represents a background object that extends the functionality of a movable object.
 */
class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;

     /**
     * Creates a background object with an image at a specific x-coordinate.
     * @param {string} imagePath - The path to the image for the background.
     * @param {number} x - The x-coordinate of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}