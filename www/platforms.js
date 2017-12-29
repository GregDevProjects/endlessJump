//Jetman.Platforms = function(){};
Jetman.Platforms = {

  initGroups: function(game){
      this.fuelXl = game.add.group();
      this.fuelXl.enableBody = true;

      this.fireball = game.add.group();
      this.fireball.enableBody = true;

    },


  onPlatformCollision: function (playerObj, platform){
     //might be better to create seprate layers for this kind of stuff
    if(platform.index === 1){ 
      //platform
      if(playerObj.body.blocked.down){
        Jetman.Player.startAnglingUpright();
      }
    }
    if(platform.index === 2){
      //lava
      Jetman.Player.death();
    }
    if(platform.index === 3){
      //spikes
      if(playerObj.body.blocked.up){
        Jetman.Player.death();
      }
    } 
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

      this.map.addTilesetImage('fuel', 'platform');    
      this.map.addTilesetImage('deathTiles', 'deathTiles');  

      this.platforms = this.map.createLayer('platforms');  

      this.map.setCollision([1,2,3],true, 0);
      this.platforms.resizeWorld();
    }

}