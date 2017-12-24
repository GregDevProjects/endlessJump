Jetman.Fuel = {
	init: function(map,game){

	  this.group = game.add.group();
      this.group.enableBody = true;

      var small = 300;
      var med = 600;
      var large = 900;
      var xl = 400;

      for (var i=0;i<map.objects.fuel.length;i++) {
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

      map.createFromObjects('fuel', 1,'fuelLow',0,true,false,this.group, Phaser.Sprite, false, false);
      map.createFromObjects('fuel', 2,'fuelMed',0,true,false,this.group, Phaser.Sprite, false, false);
      map.createFromObjects('fuel', 3,'fuelHigh',0,true,false,this.group, Phaser.Sprite, false, false);
      map.createFromObjects('fuel', 4,'fuelXl',0,true,false,this.group, Phaser.Sprite, false, false);

      this.group.callAll('animations.add', 'animations', 'glow', [0,1,2,3], 10, true);
      this.group.callAll('animations.play', 'animations', 'glow');

	},

	onFuelOverlap: function (playerObj, fuel){

      if(fuel.key === 'fuelXl'){
        player.player.body.allowGravity = false;
        game.camera.lerp.y = 0.05
        game.camera.targetOffset.y = -game.height/2;
        particles.startParticleBurstNoTimeout();
      } else {
        Jetman.Particles.startParticleBurstWithTimeout();
         
      } 
     // Jetman.Player.sprite.body.velocity.y = -fuel.velocity;
     // fuel.kill();
  }	
};