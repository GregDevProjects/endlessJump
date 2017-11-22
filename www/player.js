function Player() {

    this.construct = function() {
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player'); //initPlayer();
        game.physics.arcade.enable(this.player);
        this.player.body.allowGravity = true;
        this.player.body.gravity.y = 500;
    }
    this.construct();
    this.handleControlls = function() {
        cursors = game.input.keyboard.createCursorKeys();
        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            //  Move to the left
             this.moveLeft();

            //player.animations.play('left');
        } else if (cursors.right.isDown) {
            //  Move to the right
            this.moveRight();

            //player.animations.play('right');
        } else {
            //  Stand still
            this.player.animations.stop();
            //player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }
    }

    this.moveRight = function(){
        this.player.body.velocity.x = 150;
    }

    this.moveLeft = function(){
        this.player.body.velocity.x = -150;
    }

    this.stop = function(){
        this.player.body.velocity.x = 0;
    }
    return this;
}