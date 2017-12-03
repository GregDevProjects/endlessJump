
function initGroups(){
    platforms = game.add.group();
    platforms.enableBody = true;
    fuel = game.add.group();
    fuel.enableBody = true;
}

function onFuelOverlap(playerObj, fuel){
    player.player.body.velocity.y = -fuel.velocity;
    fuel.kill();
}

function onPlatformCollision(playerObj, platform){


}