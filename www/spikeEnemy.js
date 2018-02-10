SpikedEnemy = function(game, spikeEnemyType) {

    Phaser.Sprite.call(this, game, 0, 0, 'spikeEnemy');
    this.spikeEnemyType = spikeEnemyType;
    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.spikeEnemyType === Jetman.LeftToRightSpike.TYPE_ID ? this.moveSpeed = -100 : this.moveSpeed = 100;
    this.body.immovable = true;

    this.move = function() {

        if(this.spikeEnemyType === Jetman.FollowSpike.TYPE_ID){
            this.followPlayerAndRotateEye();
        } else {
            this.moveBackAndForthBetweenBoundries();
        }

    }

    this.moveBackAndForthBetweenBoundries = function(){
        if (this.body.blocked.right || this.body.blocked.left) {
            this.moveSpeed = -this.moveSpeed;
        }
        this.body.velocity.x = -this.moveSpeed;        
    }

    this.followPlayerAndRotateEye = function(){
        this.rotateEye(game);
        if (this.centerX - 5 <= Jetman.Player.sprite.centerX && this.centerX + 5 >= Jetman.Player.sprite.centerX) {
            this.body.velocity.x = 0;
            return;
        }
        if (this.centerX > Jetman.Player.sprite.centerX) {
            this.body.velocity.x = -this.moveSpeed;
        } else {
            this.body.velocity.x = this.moveSpeed;
        }
    }

    this.attachEye = function(game) {
        this.eye = this.addChild(game.make.sprite(15, 45, 'spikeEnemyEye'));
        this.eye.anchor.setTo(0.5, 0.5);
    }

    this.attachButton = function(game) {
        var button = this.addChild(game.make.sprite(0, -10, 'button'));
        game.physics.enable(button, Phaser.Physics.ARCADE);
        button.body.moves = false
        this.button = button;
    }

    this.rotateEye = function(game) {
        this.eye.rotation = game.physics.arcade.angleToXY({
                x: this.eye.world.x,
                y: this.eye.world.y
            },
            Jetman.Player.sprite.centerX,
            Jetman.Player.sprite.centerY
        );
        this.eye.rotation += 89.5;
    }

    this.init = function(game) {
        this.attachButton(game);
        if (this.spikeEnemyType === Jetman.FollowSpike.TYPE_ID) {
            this.attachEye(game);
        }
    }

    this.onButtonOverlap = function(player, button) {
        if (!button.body.touching.up) {
            return;
        }
        Jetman.ExplosionEffect.play(button.parent);
       
        Jetman.Player.increaseFuel(150);
        Jetman.Player.incrementCombo();
        Jetman.PoolSpawner.respawn(button.parent.arrayIndex);
        Jetman.Player.applySuddenVelocity(0, -300);
        button.parent.kill();
        button.kill();
      
    }

    this.onPlayerSpikeEnemyOverlap = function(player,spikeEnemy){
    	Jetman.Player.death();
    }

    this.init(this.game);


    game.add.existing(this);
    this.kill();
}


SpikedEnemy.prototype = Object.create(Phaser.Sprite.prototype);
SpikedEnemy.prototype.constructor = SpikedEnemy;

SpikedEnemy.prototype.update = function() {


    this.game.physics.arcade.collide(Jetman.Player.sprite, this.children[0], this.onButtonOverlap);

    this.game.physics.arcade.collide(Jetman.Player.sprite, this, this.onPlayerSpikeEnemyOverlap);

    this.game.physics.arcade.collide(this, Jetman.Platforms.platforms);

    this.move();


}


Jetman.RightToLeftSpike = {
    TYPE_ID : 2,
    QUANTITY : 3,
    SPRITE : SpikedEnemy  
}

Jetman.LeftToRightSpike = {
    TYPE_ID : 3,
    QUANTITY : 3,
    SPRITE : SpikedEnemy  
}

Jetman.FollowSpike = {
    TYPE_ID : 4,
    QUANTITY : 2,
    SPRITE : SpikedEnemy
}

