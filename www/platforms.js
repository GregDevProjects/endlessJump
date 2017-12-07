
function initGroups(){
    platforms = game.add.group();
    platforms.enableBody = true;
    fuel = game.add.group();
    fuel.enableBody = true;
    fuelXl = game.add.group();
    fuelXl.enableBody = true;

    fireball = game.add.group();
    fireball.enableBody = true;

  }


function onFuelOverlap(playerObj, fuel){
 

    if(fuel.key === 'fuelXl'){
      player.player.body.allowGravity = false;
      game.camera.lerp.y = 0.05
      game.camera.targetOffset.y = -game.height/2;
      particles.startParticleBurstNoTimeout();
    } else {
      particles.startParticleBurstWithTimeout()
       
    } 
    player.player.body.velocity.y = -fuel.velocity;
   // fuel.kill();
}

function onPlatformCollision(playerObj, platform){


}

function onDeathLayerCollide(playerObj, killObject){
  player.death();
}

function onLavaCollide(playerObj, killObject){
 player.death();
}

function onSpikesCollide(playerObj, killObject){
   player.death();
}

function onFireballPlayerOverlap(playerObj, fireballObj){
  player.death();
}

function onFireballPlatformOverlap(fireBallObj, tileCollide){
  //debugger;
  if(tileCollide.index === 1){
    fireBallObj.kill();
    //fireBallObj.destroy();
  }
  

}