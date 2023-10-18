class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottleOnGround;
    level_end_x = 2250;

    constructor(enemies, clouds, backgroundObjects, coins, bottleOnGround) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottleOnGround = bottleOnGround;
    }
    
}