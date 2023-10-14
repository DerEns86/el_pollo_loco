class Coin extends DrawableObject {
       height = 130;
       width = 130;
     

    constructor(x, y) {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
       
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

   

}