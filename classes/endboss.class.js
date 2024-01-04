class Endboss extends MovableObject {

    height = 400;
    width = 400;
    y = 50;
    energy = 100;
    speed = 0;
    attackSpeed = 0.5;

    // isDead = false;
    isReadyToAttack = false;
    isAlarmed = false;
    hasAttacked = false;

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',

    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    sounds = {
        sound_Endboss: new Audio('audio/chicken-endboss.mp3'),
        sound_isAlarmed: new Audio('audio/chicken-2.mp3')
    }

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2000;
        this.animate();

        // this.sounds.sound_Endboss.play();

        this.offset.top = 50;
        this.offset.bottom = 110;
        this.offset.left = 60;
        this.offset.right = 120;

    }

    animate() {


        this.moveInterval = setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);


        setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.gameOver();
                setTimeout(() => {
                    clearAllIntervals();
                }, 1000 / 60);


            }

            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);

            } else if (this.isReadyToAttack && this.isAlarmed && this.x >= this.world.character.x) {
                this.playAnimation(this.IMAGES_ATTACK);
                // this.clearInterval();
                this.attack();
                setTimeout(() => {
                    this.isReadyToAttack = false;
                }, 200);

            } else {


                this.playAnimation(this.IMAGES_WALKING);


            }

        }, 200);
    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = false;
    }

    hit() {
        this.energy -= 25;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    attack() {
        this.sounds.sound_isAlarmed.play();
        this.jump();
        this.x -= 30;
    }

    killed() {
        if (!this.isDead) {
            this.isDead = true;
            // clearInterval(this.moveInterval);
        }

    }

    getEndbossX() {
        return this.x;
    }

    clearInterval() {
        clearInterval(this.moveInterval);
    }

    gameOver() {
        if (this.isDead()) {
            document.getElementById('gameOverScreen').classList.remove('d-none');
        }
    }
}