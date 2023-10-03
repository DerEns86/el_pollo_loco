class Chicken extends MovableObject {
    height = 70;
    width = 70;
    y = 380;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
       
        this.x = 200 + Math.random() * 500;
        this.animate();
    } 

    animate() {
        setInterval( () => {
            this.x -= 0.35;
        }, 1000 / 60);
    }
   
}