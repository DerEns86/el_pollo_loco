class BottleOnGround extends DrawableObject {
    height = 60;
    width = 60;
    
  

 constructor() {
     super();
     this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
     this.x = 200 + Math.random() * 1500;
     this.y = 365;
    
 }

 draw(ctx) {
     ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
 }



}