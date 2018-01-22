Jetman.Jumper = {

    init: function(map, game) {
        for (var i = 0; i < map.objects.jumper.length; i++) {

            new Jumper(
                game,
                map.objects.jumper[i].x,
                map.objects.jumper[i].y
            );
        }

    }
};


Jumper = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'jumper');
    game.physics.arcade.enable(this, Phaser.Physics.ARCADE);
    this.moveSpeed = 200;
    this.jumpSpeed = 300;
    this.controlledFallSpeed = 3.5;
    this.button = this.addChild(game.make.sprite(0, -10, 'button'));
    game.physics.enable(this.button, Phaser.Physics.ARCADE);
    this.button.body.moves = false
    this.body.gravity.y = 200;

    this.move = function() {
        if (this.centerY < Jetman.Player.sprite.centerY && this.body.blocked.none) {
            this.moveTowardsPlayer();
            return;
        }

        if (this.body.blocked.down || this.body.blocked.left || this.body.blocked.right) {

            if (this.isJumperSlightlyAbovePlayer()) {
                this.moveTowardsPlayer();
            } else {
                this.jumpTowardsPlayer();
            }
        }
    }

    this.isJumperSlightlyAbovePlayer = function() {
        return this.centerY < Jetman.Player.sprite.centerY - 200;
    }

    this.moveTowardsPlayer = function() {
        if (this.centerX > Jetman.Player.sprite.centerX) {
            this.body.velocity.x -= this.controlledFallSpeed;
        } else {
            this.body.velocity.x += this.controlledFallSpeed;
        }
    }

    this.jumpTowardsPlayer = function() {
        this.body.velocity.y = -this.jumpSpeed;

        if (this.centerX > Jetman.Player.sprite.centerX) {
            this.body.velocity.x = -this.moveSpeed;
        } else {
            this.body.velocity.x = this.moveSpeed;
        }
    }


    this.onButtonOverlap = function(player, button) {
        if (!button.body.touching.up) {
            return;
        }

        Jetman.Player.incrementCombo();
        Jetman.Player.fuel += 150;
        Jetman.Player.applySuddenVelocity(0, -300);
        button.parent.kill();
        button.kill();
    }

    this.onPlayerCollision = function(player, button) {
        Jetman.Player.death();
    }

    game.add.existing(this);
    this.kill();
}

Jumper.prototype = Object.create(Phaser.Sprite.prototype);
Jumper.prototype.constructor = Jumper;

Jumper.prototype.update = function() {
    this.game.physics.arcade.collide(this, Jetman.Platforms.platforms);
    this.game.physics.arcade.collide(Jetman.Player.sprite, this.button, this.onButtonOverlap);
    this.game.physics.arcade.collide(Jetman.Player.sprite, this, this.onPlayerCollision, null, this);
    this.move();

}

