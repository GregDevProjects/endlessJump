//world settings go here 
function setPhysics(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
}

function cameraFollowPlayer(){
	game.camera.follow(player.player);
}

// -add the gid property to the objects from the tilemap 
// -add properties from the object type in tiled to the sprite
//workaround as tiled doesn't do this 
function addGidToObjects(){
	var small = 400;
	var med = 600;
	var large = 900;
	for (var i=0;i<map.objects.fuel.length;i++) {
		map.objects.fuel[i].gid = 34;
		map.objects.fuel[i].properties = {};
		switch (map.objects.fuel[i].type) {
			case "s" : 	map.objects.fuel[i].properties.velocity = small;
				break;
			case "m" : 	map.objects.fuel[i].properties.velocity = med;
				break;
			case "l" : 	map.objects.fuel[i].properties.velocity = large;
				break;								
		}
	}

}