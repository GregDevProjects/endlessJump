Jetman.Walker = {

    init: function(map, game) {
        for (var i = 0; i < map.objects.walker.length; i++) {

            new Walker(
                game,
                map.objects.walker[i].x,
                map.objects.walker[i].y
            );
        }

    }

}


Walker = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'walker');
    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 1000;
    this.walkerMoveSpeed = 50;
    this.button = this.addChild(game.make.sprite(0, -10, 'button'));
    game.physics.enable(this.button, Phaser.Physics.ARCADE);
    this.button.body.moves = false


    this.move = function() {
        if (this.body.blocked.right || this.body.blocked.left) {
            this.walkerMoveSpeed = -this.walkerMoveSpeed;
        }
        this.body.velocity.x = this.walkerMoveSpeed;
    }

    this.onPlayerWalkerCollision = function(player, walker) {
        Jetman.Player.death();
    }

    this.onPlayerButtonCollision = function(button, player) {

        if (!button.body.touching.up) {
            return;
        }

        Jetman.Player.incrementCombo();
        Jetman.Player.fuel += 150;
        Jetman.Player.applySuddenVelocity(0, -300);
        button.parent.kill();
        button.kill();
    }

    game.add.existing(this);
}


Walker.prototype = Object.create(Phaser.Sprite.prototype);
Walker.prototype.constructor = Walker;

Walker.prototype.update = function() {
    this.game.physics.arcade.collide(this, Jetman.Platforms.platforms);
    this.game.physics.arcade.collide(this, Jetman.Platforms.boundries);
    this.game.physics.arcade.collide(this, Jetman.Player.sprite, this.onPlayerWalkerCollision);
    this.game.physics.arcade.collide(this.button, Jetman.Player.sprite, this.onPlayerButtonCollision);
    this.move();

}