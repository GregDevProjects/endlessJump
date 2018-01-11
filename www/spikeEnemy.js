Jetman.SpikeEnemyTypes = {
    RIGHT_TO_LEFT: 1,
    LEFT_TO_RIGHT: 2,
    FOLLOW: 3
};

Jetman.SpikeEnemies = {

    init: function(map, game) {

            for (var i = 0; i < map.objects.spikeEnemy.length; i++) {
                new SpikedEnemy(
                    this.nameToEnum(map.objects.spikeEnemy[i].name),
                    game,
                    map.objects.spikeEnemy[i].x,
                    map.objects.spikeEnemy[i].y
                )


            }
        }
        //this is wierd 
    ,nameToEnum: function(tileObjName) {
        switch (tileObjName) {
            case 'rightToLeft':
                return 1;
            case 'leftToRight':
                return 2;
            case 'follow':
                return 3;
        }
    }


};




SpikedEnemy = function(spikeEnemyType, game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'spikeEnemy');
    this.spikeEnemyType = spikeEnemyType;
    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.moveSpeed = 100;


    this.move = function() {

        if (this.body.blocked.right || this.body.blocked.left) {
            this.moveSpeed = -this.moveSpeed;
        }

        switch (this.spikeEnemyType) {
            case Jetman.SpikeEnemyTypes.LEFT_TO_RIGHT:
                this.body.velocity.x = this.moveSpeed;
                return;
            case Jetman.SpikeEnemyTypes.RIGHT_TO_LEFT:
                this.body.velocity.x = -this.moveSpeed;
                return;
            case Jetman.SpikeEnemyTypes.FOLLOW:
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
        if (this.spikeEnemyType === Jetman.SpikeEnemyTypes.FOLLOW) {
            this.attachEye(game);
        }
    }

    this.onButtonOverlap = function(player, button) {
        if (!button.body.touching.up) {
            return;
        }
        Jetman.Player.fuel += 200;
        Jetman.Player.incrementCombo();
        //Jetman.Player.fuel =200;
        Jetman.Player.applySuddenVelocity(0, -300);
        button.parent.kill();
        button.kill();
    }

    this.onPlayerSpikeEnemyOverlap = function(player,spikeEnemy){
    	Jetman.Player.death();
    }

    this.init(this.game);


    game.add.existing(this);
}


SpikedEnemy.prototype = Object.create(Phaser.Sprite.prototype);
SpikedEnemy.prototype.constructor = SpikedEnemy;

SpikedEnemy.prototype.update = function() {


    this.game.physics.arcade.collide(Jetman.Player.sprite, this.children[0], this.onButtonOverlap);

    this.game.physics.arcade.collide(Jetman.Player.sprite, this, this.onPlayerSpikeEnemyOverlap);

    this.game.physics.arcade.collide(this, Jetman.Platforms.platforms);

    this.move();


}