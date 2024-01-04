class SmallChicken extends Chicken {

    height = 40;
    width = 40;
    y = 385;

    IMAGES_WALKING = smallChickenImages.IMAGES_WALKING;

    IMAGES_DEAD = smallChickenImages.IMAGES_DEAD;

    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.offset.top = 10;
    }

}