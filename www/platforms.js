var FUEL_POWER = {
    small : 450,
    med : 600,
    high: 850
}


function initPlatforms(){
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    fuel = game.add.group();
    fuel.enableBody = true;

  //  buildLevelOne();
}

function buildLevelOne(){
    var wavePosition = waveLineFuel(game.world.bounds.bottom);
    createFuel(wavePosition.x ,wavePosition.y - 200, FUEL_POWER.high); 
    groundFuel(); 
    createPlatform(wavePosition.x ,wavePosition.y - 500);
}


function waveLineFuel(startY){
    var gap = 50;
    var lastBlockLocation = {};
    for(var i =1;i<10;i++){
        var x = i%2==0?-gap:gap;
        var y = -200*i;
        gap+=10;
        createFuel(
                game.world.centerX + x, 
                startY + y - 120,
                FUEL_POWER.small
            );     
        lastBlockLocation.x = game.world.centerX + x;
        lastBlockLocation.y = startY + y - 120;
    }
    return lastBlockLocation;
}

function groundFuel(){
    createFuel(200, game.world.bounds.bottom - 50, FUEL_POWER.small);   
}

function createFuel(x,y, force){
    var ledge = fuel.create(x,y, 'fuel');
    ledge.body.immovable = true;
    ledge.force = force;
}

function createPlatform(x,y){
    var platform = platforms.create(x,y, 'platform');
    platform.body.immovable = true;
}

function onFuelOverlap(playerObj, fuel){
  //   console.log('overlap', fuel.index);
  //   fuel.index = -1;
    fuel.force = 100;
    console.log('sdf');
     player.player.body.velocity.y = -fuel.velocity;
//fuel.kill();
}

function onPlatformCollision(playerObj, platform){


}