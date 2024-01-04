class StatusBarLife extends DrawableObject {
   
    percentage = 100;



    IMAGES_HEALTH = statusbarHealthImages.IMAGES_HEALTH;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.setPercentage(100);
        this.width = 120;
        this.height = 40;
        this.x = 5;
        this.y = 10;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.getPictureIndex()];
        this.img = this.imageCache[path];
        
    }

    getPictureIndex(){
        if (this.percentage == 100){
            return 5;
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage >60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else 
            return 0;
        
    }



}