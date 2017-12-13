//Jetman.Platforms = function(){};
Jetman.Platforms = {

  initGroups: function(game){
      // this.platforms = game.add.group();
      // this.platforms.enableBody = true;
      
      this.fuel = game.add.group();
      this.fuel.enableBody = true;
      
      this.fuelXl = game.add.group();
      this.fuelXl.enableBody = true;

      this.fireball = game.add.group();
      this.fireball.enableBody = true;

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
  },

  onPlatformCollision: function (playerObj, platform){


  },

  onDeathLayerCollide: function (playerObj, killObject){
    Jetman.Player.death();
  },

  onLavaCollide: function (playerObj, killObject){
   Jetman.Player.death();
  },

  onSpikesCollide: function (playerObj, killObject){
     Jetman.Player.death();
  },

  onFireballPlayerOverlap: function (playerObj, fireballObj){
    Jetman.Player.death();
  },

  onFireballPlatformOverlap: function (fireBallObj, tileCollide){
    //debugger;
    if(tileCollide.index === 1){
      fireBallObj.kill();
      //fireBallObj.destroy();
    }
    

  },    
  //init level 1 
  initTileMap: function(game) {
      this.map = game.add.tilemap('mapName');    
      this.addGidToObjects(); 
      this.map.addTilesetImage('fuel', 'platform');    
     
      this.map.addTilesetImage('deathTiles', 'deathTiles');  
      this.platforms = this.map.createLayer('platforms');    
      this.map.setTileIndexCallback(3, Jetman.Platforms.onSpikesCollide, this);
      this.map.setTileIndexCallback(2, Jetman.Platforms.onLavaCollide, this); 
      this.map.setCollision(1);
      this.platforms.resizeWorld();
    },

    tileObjectsToSprites: function() {
      this.map.createFromObjects('fuel', 1,'fuelLow',0,true,false,Jetman.Platforms.fuel, Phaser.Sprite, false, false);
      this.map.createFromObjects('fuel', 2,'fuelMed',0,true,false,Jetman.Platforms.fuel, Phaser.Sprite, false, false);
      this.map.createFromObjects('fuel', 3,'fuelHigh',0,true,false,Jetman.Platforms.fuel, Phaser.Sprite, false, false);
      this.map.createFromObjects('fuel', 4,'fuelXl',0,true,false,Jetman.Platforms.fuel, Phaser.Sprite, false, false);

      //instead of callAll it might be better to only animate xl fuels
      Jetman.Platforms.fuel.callAll('animations.add', 'animations', 'glow', [0, 1,2,3], 10, true);
      Jetman.Platforms.fuel.callAll('animations.play', 'animations', 'glow');
  },

  addGidToObjects: function() {
      var small = 300;
      var med = 600;
      var large = 900;
      var xl = 400;
      for (var i=0;i<this.map.objects.fuel.length;i++) {
        //map.objects.fuel[i].height = 25;
        //map.objects.fuel[i].width = 50;
        this.map.objects.fuel[i].properties = {};
        switch (this.map.objects.fuel[i].type) {
          case "s" :  
            this.map.objects.fuel[i].properties.velocity = small;
            this.map.objects.fuel[i].gid = 1;
            break;
          case "m" :  
            this.map.objects.fuel[i].properties.velocity = med;
            this.map.objects.fuel[i].gid = 2;
            break;
          case "l" :  
            this.map.objects.fuel[i].properties.velocity = large;
            this.map.objects.fuel[i].gid = 3;
            break;
          case "xl":
            this.map.objects.fuel[i].properties.velocity = xl;
            this.map.objects.fuel[i].gid = 4;                      
        }
      }
      for (var i=0;i<this.map.objects.fireballSpawn.length;i++) {
        //ADD THESE TO AN ARRAY OR SOMWTHING 
        this.map.objects.fireballSpawn[i].gid = 5;
        var aSpawner = this.map.objects.fireballSpawn[i];
        spawner = new randomSpriteSpawner(1,aSpawner.x,aSpawner.y,aSpawner.width,aSpawner.height, 4000);
      }
  }


}