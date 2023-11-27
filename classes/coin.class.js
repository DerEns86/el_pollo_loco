class Coin extends MovableObject {
       height = 130;
       width = 130;
     

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.animate();
        this.x = 500 + Math.random() * 1000;
        this.y = 170 + Math.random() * 150;

        this.offset.top = 50;
        this.offset.bottom = 50;
        this.offset.left = 50;
        this.offset.right = 100;
       
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 200);
    }
   

}