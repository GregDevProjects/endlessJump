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
	    var playerMiddle = playerPositionX;//+ Jetman.Player.sprite.width/2;
	    var tapPositionX = game.input.activePointer.x  + game.camera.x;
	    if (playerMiddle - 5 <= tapPositionX && playerMiddle + 5 >= tapPositionX){
	        Jetman.Player.stop();

	        return;
	    }

	    if (tapPositionX >  playerMiddle) {
	        Jetman.Player.moveRight();    
	    } else if (tapPositionX < playerMiddle){
	        Jetman.Player.moveLeft();
	    } 			
	}
}


