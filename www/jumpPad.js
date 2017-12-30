Jetman.JumpPad = {
  VelocityChange : {
    UP: {x: 0, y: 700},
    UP_RIGHT: {x: 250, y: 700}
  },

	init: function(map,game){

	  this.group = game.add.group();
    this.group.enableBody = true;


    for (var i=0;i<map.objects.jumpPad.length;i++) {
      map.objects.fuel[i].properties = {};
      switch (map.objects.jumpPad[i].name) {
        case "up" :  
         map.objects.jumpPad[i].gid = 5;
          break;       
        case "upRight" :
         map.objects.jumpPad[i].gid = 6;    
          map.objects.jumpPad[i].properties = {rotation: 45};
         map.objects.jumpPad[i].properties.anchor = {x:0.5, y:0.5};//.setTo(0.5, 0.5);
         break;     
      }
    }

    map.createFromObjects('jumpPad', 5,'jumpPadUp',0,true,false,this.group, Phaser.Sprite, false, false);

    map.createFromObjects('jumpPad', 6,'jumpPadUp',0,true,false,this.group, Phaser.Sprite, false, false);
   // debugger;
      this.group.callAll('animations.add', 'animations', 'motion', null, 60, true);
      this.group.callAll('animations.play', 'animations', 'motion');

	},

  onPlayerOverlap: function(player, jumpPad){

     // debugger;
      switch (jumpPad.name){
        case "up":
          Jetman.Player.sprite.body.maxVelocity.y = Jetman.JumpPad.VelocityChange.UP.y;
          Jetman.Player.sprite.body.velocity.y = -Jetman.JumpPad.VelocityChange.UP.y;
          break;
        case "upRight":
         Jetman.Player.sprite.body.maxVelocity.y = Jetman.JumpPad.VelocityChange.UP_RIGHT.y;
         Jetman.Player.sprite.body.velocity.y = -Jetman.JumpPad.VelocityChange.UP_RIGHT.y;
          Jetman.Player.sprite.body.velocity.x = Jetman.JumpPad.VelocityChange.UP_RIGHT.x;
          Jetman.Player.didCollideWithJumpadX = true;
        // this.game.physics.arcade.velocityFromAngle(45, 300, Jetman.Player.sprite.body.velocity)
          break;
          

      }

      Jetman.Player.isOnJumpPadMomentum = true;
     // debugger;
  }



};

