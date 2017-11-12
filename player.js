function initPlayer(){
	player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
	game.physics.arcade.enable(player);
	//player.enableBody = true;

    player.body.allowGravity = true;
    //player.body.immovable = true;
    player.body.gravity.y = 500;
}

function handleControlls(){
	cursors = game.input.keyboard.createCursorKeys();
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        //player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        //player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        //player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
}