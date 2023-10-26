class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    coins;
    bottleOnGround;
    level_end_x = 2250;

    constructor(enemies, endboss, clouds, backgroundObjects, coins, bottleOnGround) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottleOnGround = bottleOnGround;
    }
    
}