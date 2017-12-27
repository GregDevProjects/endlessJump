Jetman.JumpPad = {
	init: function(map,game){

	  this.group = game.add.group();
    this.group.enableBody = true;


    for (var i=0;i<map.objects.jumpPad.length;i++) {
      map.objects.fuel[i].properties = {};
      switch (map.objects.jumpPad[i].name) {
        case "up" :  
         map.objects.jumpPad[i].gid = 5;
          break;                  
      }
    }

    map.createFromObjects('jumpPad', 5,'jumpPadUp',0,true,false,this.group, Phaser.Sprite, false, false);

      this.group.callAll('animations.add', 'animations', 'motion', null, 60, true);
      this.group.callAll('animations.play', 'animations', 'motion');

	},

  onPlayerOverlap: function(player, jumpPad){
      Jetman.Player.sprite.body.maxVelocity.y = 700;
      Jetman.Player.sprite.body.velocity.y = -700;
        Jetman.Player.isOnJumpPadMomentum = true;
  }



};

