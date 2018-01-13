Jetman.Input = {
	dragControl: function(game){

		if (!game.input.activePointer.isDown) {
			Jetman.Player.stop();
			return;
		}
		this.moveToPointer(game);
	
	},

	moveToPointer: function(game){
		if(!Jetman.Player.flyToActivePointer()){
			this.moveOnGround(game);
		}
	},

	moveOnGround: function(game){
		var playerPositionX = Jetman.Player.sprite.centerX;
	    var tapPositionX = game.input.activePointer.x  + game.camera.x;

	    if (playerPositionX - 2 <= tapPositionX && playerPositionX + 2 >= tapPositionX){
	        Jetman.Player.stop();
	        return;
	    }

	    if (tapPositionX > playerPositionX) {
	        Jetman.Player.moveRight();    
	    } else if (tapPositionX < playerPositionX){
	        Jetman.Player.moveLeft();
	    } 			
	}
}


