
function initGroups(){
    platforms = game.add.group();
    platforms.enableBody = true;
    fuel = game.add.group();
    fuel.enableBody = true;
    fuelXl = game.add.group();
    fuelXl.enableBody = true;
  }


      function particleBurst() {
        bursting = true;
        function stopburst(){
          bursting = false;
        }
        game.time.events.add(250, stopburst, this);


         //emitter.emitParticle();
         
    // emitter.x = player.player.centerX;
    // emitter.y = player.player.bottom;
   // emitter.start( false, 500 , 2, 500);

    }

function onFuelOverlap(playerObj, fuel){
  particleBurst();
    //emitter.flow( 1000, 250, 5, -1);
//emitter.emitParticle();
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
  //debugger;
  // game.camera.flash(0xff0000, 500);
  //player.player.kill();
  // initPlayer();
  player.death();
}

function onLavaCollide(playerObj, killObject){
 player.death();
}

function onSpikesCollide(playerObj, killObject){
   player.death();
}