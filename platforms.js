function initPlatforms(){
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    for(var i =1;i<10;i++){
        var x = i%2==0?-50:50;
        var y = -100*i;
        //debugger;
        createLedge(game.world.centerX + x, game.world.bounds.height+ y);     
    }

    initGround();

}

function createLedge(x,y){
    var ledge = platforms.create(x,y, 'platform');
    ledge.body.immovable = true;
    // debugger;
    //ledge = platforms.create(-150, 250, 'platform');
    ledge.body.allowGravity = false;
    ledge.body.gravity.y = 5;
}

function initGround(){
	ground = game.add.tileSprite(0,game.world.height - 100,game.world.width,100, 'ground');
	game.physics.arcade.enable(ground);
	ground.enableBody = true;
	ground.body.immovable = true;
}