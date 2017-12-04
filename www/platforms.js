
function initGroups(){
    platforms = game.add.group();
    platforms.enableBody = true;
    fuel = game.add.group();
    fuel.enableBody = true;
    fuelXl = game.add.group();
    fuelXl.enableBody = true;
  }

function onFuelOverlap(playerObj, fuel){
    

    if(fuel.key === 'fuelXl'){
      player.player.body.allowGravity = false;
      game.camera.lerp.y = 0.05
      game.camera.targetOffset.y = -game.height/2;
    } 
    player.player.body.velocity.y = -fuel.velocity;
   // fuel.kill();
}

function onPlatformCollision(playerObj, platform){


}

function onDeathLayerCollide(playerObj, killObject){
  //playerObj.kill();
  console.log('hit');
  //debugger;
  // game.camera.flash(0xff0000, 500);
  //player.player.kill();
  // initPlayer();
  player.death();
}