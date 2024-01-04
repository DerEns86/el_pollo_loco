/**
* Represents a game level containing various elements.
*/
class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    coins;
    bottleOnGround;
    level_end_x = 2250;

    /**
    * Creates a game level with various elements.
    * @param {Array} enemies - Array containing enemy objects.
    * @param {Object} endboss - End boss object for the level.
    * @param {Array} clouds - Array containing cloud objects.
    * @param {Array} backgroundObjects - Array containing background objects.
    * @param {Array} coins - Array containing coin objects.
    * @param {Object} bottleOnGround - Object representing a bottle on the ground.
    */
    constructor(enemies, endboss, clouds, backgroundObjects, coins, bottleOnGround) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottleOnGround = bottleOnGround;
    }
    
}