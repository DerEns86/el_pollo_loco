class StatusBarBottle extends DrawableObject {
   
    percentage = 0;



    IMAGES_BOTTLE = statusbarBottleImages.IMAGES_BOTTLE;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.setPercentage(0);
        this.width = 120;
        this.height = 40;
        this.x = 5;
        this.y = 70;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLE[this.getPictureIndex()];
        this.img = this.imageCache[path];
        
    }

    getPictureIndex(){
        if (this.percentage == 100){
            return 5;
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage ==60) {
            return 3;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 20) {
            return 1;
        } else 
            return 0;
        
    }



}