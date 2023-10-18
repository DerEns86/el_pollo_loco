class Coin extends DrawableObject {
       height = 130;
       width = 130;
     

    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.x = Math.random() * 1500;
        this.y = Math.random() * 300;

        this.offset.top = 50;
        this.offset.bottom = 100;
        this.offset.left = 50;
        this.offset.right = 100;
       
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

   

}