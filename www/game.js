//world settings go here 
function setPhysics(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
}

function cameraFollowPlayer(){
	game.camera.follow(player.player);
}

// -add the gid property to the objects from the tilemap 
// -add properties from the object type in tiled to the sprite
//workaround for now, would be better to set this in tiled 
function addGidToObjects(){
	//make these constants 
	var small = 400;
	var med = 600;
	var large = 900;
	var xl = 400;
	for (var i=0;i<map.objects.fuel.length;i++) {
		//map.objects.fuel[i].height = 25;
		//map.objects.fuel[i].width = 50;
		map.objects.fuel[i].properties = {};
		switch (map.objects.fuel[i].type) {
			case "s" : 	
				map.objects.fuel[i].properties.velocity = small;
				map.objects.fuel[i].gid = 1;
				break;
			case "m" : 	
				map.objects.fuel[i].properties.velocity = med;
				map.objects.fuel[i].gid = 2;
				break;
			case "l" : 	
				map.objects.fuel[i].properties.velocity = large;
				map.objects.fuel[i].gid = 3;
				break;
			case "xl":
				map.objects.fuel[i].properties.velocity = xl;
				map.objects.fuel[i].gid = 4;											
		}
	}
	for (var i=0;i<map.objects.fireballSpawn.length;i++) {
		map.objects.fireballSpawn[i].gid = 5;
		var aSpawner = map.objects.fireballSpawn[i];
		spawner = new randomSpriteSpawner(1,aSpawner.x,aSpawner.y,aSpawner.width,aSpawner.height, 2000);
	}

}

function initTileMap(){
 	map = game.add.tilemap('mapName');    
	addGidToObjects(); 
	map.addTilesetImage('fuel', 'platform');    
 
	map.addTilesetImage('deathTiles', 'deathTiles');  
	platforms = map.createLayer('platforms');    
	map.setTileIndexCallback(3, onSpikesCollide, this);
	map.setTileIndexCallback(2, onLavaCollide, this);
	map.setCollision(1);
	platforms.resizeWorld();
}

function tileObjectsToSprites(){
	map.createFromObjects('fuel', 1,'fuelLow',0,true,false,fuel, Phaser.Sprite, false, false);
	map.createFromObjects('fuel', 2,'fuelMed',0,true,false,fuel, Phaser.Sprite, false, false);
	map.createFromObjects('fuel', 3,'fuelHigh',0,true,false,fuel, Phaser.Sprite, false, false);
	map.createFromObjects('fuel', 4,'fuelXl',0,true,false,fuel, Phaser.Sprite, false, false);

	//instead of callAll it might be better to only animate xl fuels
	fuel.callAll('animations.add', 'animations', 'glow', [0, 1,2,3], 10, true);
    fuel.callAll('animations.play', 'animations', 'glow');

	
}

//spawns new player at the playerStart object from the tilesheet
function initPlayer(){
	
	player = new Player();
    cameraFollowPlayer();
   // game.camera.targetOffset.set(0);
}