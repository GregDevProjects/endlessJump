Turret = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'turret');
    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5, 0.5);

    //could have common function between this and eye
    this.rotateTurret = function(){
        this.rotation = game.physics.arcade.angleToXY({
                x: this.world.x,
                y: this.world.y
            },
	        Jetman.Player.sprite.centerX,
	        Jetman.Player.sprite.centerY
        );
        this.rotation += 89.5;
    }

    this.bulletPlayerCollision = function(){
    	this.weapon.killAll();
    	Jetman.Player.death();
    }

    this.bulletPlatformCollision = function(bullet,playform){
    	this.weapon.killAll();
    }

   
    //  Creates 1 single bullet, using the 'bullet' graphic
    this.weapon = game.add.weapon(2, 'bullet2');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;

    this.weapon.bulletLifespan = 2000;
    this.weapon.bulletSpeed = 300;
    this.weapon.trackSprite(this, 0, 0);
    this.weapon.bullets.callAll('body.setCircle', 'body', 7);

    this.shoot = function(){
    	this.weapon.fireAtSprite(Jetman.Player.sprite);
    }

	this.timer = this.game.time.events.loop(2000,  this.shoot, this);

    game.add.existing(this);
    this.kill();
}


Turret.prototype = Object.create(Phaser.Sprite.prototype);
Turret.prototype.constructor = Turret;

Turret.prototype.update = function() {
    this.rotateTurret();
    this.game.physics.arcade.collide(this.weapon.bullets, Jetman.Platforms.platforms, this.bulletPlatformCollision,null, this);
    this.game.physics.arcade.overlap(this.weapon.bullets, Jetman.PoolSpawner[Jetman.LeftToRightSpike.TYPE_ID], this.bulletPlatformCollision,null, this);
    this.game.physics.arcade.overlap(this.weapon.bullets, Jetman.PoolSpawner[Jetman.RightToLeftSpike.TYPE_ID], this.bulletPlatformCollision,null, this);
    this.game.physics.arcade.overlap(this.weapon.bullets, Jetman.Player.sprite,this.bulletPlayerCollision, null, this );
}

Jetman.Turret = { 
    TYPE_ID : 8,
    QUANTITY : 3,
    SPRITE : Turret
}
