function initPlatforms(){
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
   // platforms.allowGravity = false;
    //var ground = platforms.create(0, game.world.height - 64, 'ground');
    //ground.body.immovable = true;
    //ground.body.allowGravity = false

    ledge = platforms.create(game.world.centerX, game.world.centerY + 100, 'platform');

    ledge.body.immovable = true;
    // debugger;
    //ledge = platforms.create(-150, 250, 'platform');
    ledge.body.allowGravity = true;
    ledge.body.gravity.y = 5;


    initGround();

}

function initGround(){
	ground = game.add.tileSprite(0,game.world.height - 100,game.world.width,100, 'ground');
	game.physics.arcade.enable(ground);
	ground.enableBody = true;
	ground.body.immovable = true;
}