function initPlatforms(){
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;


    waveLineFuel();
    initGround();
    groundFuel();
}

function waveLineFuel(){
        var gap = 50;
    for(var i =1;i<10;i++){
        var x = i%2==0?-gap:gap;
        var y = -200*i;
        gap+=10;
        //debugger;
        createLedge(game.world.centerX + x, game.world.bounds.bottom+ y - 120);     
    }
}

function groundFuel(){
    createLedge(200, game.world.bounds.bottom - 50);   
}

function createLedge(x,y){
    var ledge = platforms.create(x,y, 'platform');
    ledge.body.immovable = true;
}

function initGround(){
	ground = game.add.tileSprite(0,game.world.bounds.height - 100,game.world.bounds.width,100, 'ground');
	game.physics.arcade.enable(ground);
	ground.enableBody = true;
	ground.body.immovable = true;
}

function onPlatformCollision(){
    player.player.body.velocity.y = -350;
}

function onGroundCollision(){
  //  console.log('you ded');
}