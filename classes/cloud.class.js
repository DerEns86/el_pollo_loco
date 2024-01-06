/**
* Represents a cloud object extending the functionality of a movable object.
*/
class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 200;

    /**
    * Creates a cloud object with specific properties.
    */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
    * Initiates the animation sequence for the cloud by moving it left.
    */
    animate() {
        this.moveLeft();
    }
}