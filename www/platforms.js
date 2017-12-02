function initPlatforms(){
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    fuel = game.add.group();
    fuel.enableBody = true;

  //  buildLevelOne();
}

function onFuelOverlap(playerObj, fuel){
  //   console.log('overlap', fuel.index);
  //   fuel.index = -1;
    console.log('sdf');
     player.player.body.velocity.y = -fuel.velocity;
    //fuel.kill();
}

function onPlatformCollision(playerObj, platform){


}