class BottleOnGround extends DrawableObject {
    height = 60;
    width = 60;

sounds = {
    bottle_collect: new Audio('audio/bottle-collect.mp3')
};

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

}