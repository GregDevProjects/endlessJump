//Jetman.Platforms = function(){};
Jetman.Platforms = {

    TileIndexes: {
        LAVA: 5,
        SPIKES_UP: 10,
        SPIKES_DOWN: 2
    },


    onPlatformLayerCollision: function(playerObj, platform) {

        if (playerObj.body.blocked.down) {
            Jetman.Player.resetCombo();
            Jetman.Player.startAnglingUpright();
        }   
        

    },

    onDeathLayerCollision: function(playerObj, deathTile){
      //  debugger;
        switch (deathTile.index) {
            case Jetman.Platforms.TileIndexes.LAVA:
                Jetman.Player.death();
                return;
            case Jetman.Platforms.TileIndexes.SPIKES_DOWN:
                if (playerObj.body.blocked.up) {
                    Jetman.Player.death();
                }
                return;  
            case Jetman.Platforms.TileIndexes.SPIKES_UP:
                if (playerObj.body.blocked.down) {
                    Jetman.Player.death();
                }
                return; 
        }
    },

    onFireballPlayerOverlap: function(playerObj, fireballObj) {
        Jetman.Player.death();
    },

    onFireballPlatformOverlap: function(fireBallObj, tileCollide) {
        //debugger;
        if (tileCollide.index === 1) {
            fireBallObj.kill();
            //fireBallObj.destroy();
        }

    },
    //init level 1 
    initTileMap: function(game) {
        this.map = game.add.tilemap('mapName');

        this.addTilesetImages(game);
        this.createLayers(game);

       this.boundries.enableBody = true;
        this.death.enableBody = true;

        this.platforms.resizeWorld();
        this.setTileCollisions();
        //for preformance?
        game.camera.roundPx = false;
        
    },

    createLayers: function(){
         //this.bg =  this.map.createLayer('bg'); 
        this.platforms = this.map.createLayer('platforms');  
       this.boundries = this.map.createLayer('invisible');   
       this.boundries.visible = false;
       this.death = this.map.createLayer('death');

    
      
    },

    addTilesetImages: function(){
     //   this.map.addTilesetImage( 'bg','bg');
        this.map.addTilesetImage('deathTiles', 'deathTiles');
        this.map.addTilesetImage('invisible', 'invisible');
        this.map.addTilesetImage( 'platform_rock','rockPlatforms');
         ;
    },

    setTileCollisions: function(){
        this.map.setCollisionBetween(12, 18, true, this.platforms);
       this.map.setCollision(11, true, this.boundries);

       this.map.setCollision([2,5,10], true, this.death);  
    },

    initBackground: function(game){
        Jetman.Platforms.bg_bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_bg');
        Jetman.Platforms.bg_fg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_fg');
        Jetman.Platforms.bg_bg.fixedToCamera = true;
        game.world.sendToBack(Jetman.Platforms.bg_fg);
        game.world.sendToBack(Jetman.Platforms.bg_bg);
    }

}