//Jetman.Platforms = function(){};
Jetman.Platforms = {

  initGroups: function(game){
      this.fuelXl = game.add.group();
      this.fuelXl.enableBody = true;

      this.fireball = game.add.group();
      this.fireball.enableBody = true;

    },


  onPlatformCollision: function (playerObj, platform){
    Jetman.Player.startAnglingUpright();
    
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
      //WASH ME
      this.game = game;

      this.map = game.add.tilemap('mapName');    
     // this.addGidToObjects(); 
      this.map.addTilesetImage('fuel', 'platform');    
     
      this.map.addTilesetImage('deathTiles', 'deathTiles');  
      this.platforms = this.map.createLayer('platforms');    
      this.map.setTileIndexCallback(3, Jetman.Platforms.onSpikesCollide, this);
      this.map.setTileIndexCallback(2, Jetman.Platforms.onLavaCollide, this); 
      this.map.setCollision(1);
      this.platforms.resizeWorld();
    }

}