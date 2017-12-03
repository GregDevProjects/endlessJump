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
	var small = 400;
	var med = 600;
	var large = 900;
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
		}
	}

}

function initTileMap(){
 	map = game.add.tilemap('mapName');    
	addGidToObjects(); 
	map.addTilesetImage('fuel', 'platform');    
	layer = map.createLayer('Tile Layer 1');    
	map.setCollision(1);
	layer.resizeWorld();
}

function tileObjectsToSprites(){
	map.createFromObjects('fuel', 1,'fuelLow',0,true,false,fuel, Phaser.Sprite, false, false);
	map.createFromObjects('fuel', 2,'fuelMed',0,true,false,fuel, Phaser.Sprite, false, false);
	map.createFromObjects('fuel', 3,'fuelHigh',0,true,false,fuel, Phaser.Sprite, false, false);
}