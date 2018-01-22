//Jetman.Platforms = function(){};
Jetman.Platforms = {

    TileIndexes: {
        LAVA: 14,
        SPIKES_UP: 9,
        SPIKES_DOWN: 8
    },


    onPlatformLayerCollision: function(playerObj, platform) {
        if(platform.index > 2 && platform.index < 8 ){
            if (playerObj.body.blocked.down) {
                Jetman.Player.resetCombo();
                Jetman.Player.startAnglingUpright();
            }   
        }else{
            Jetman.Platforms.onDeathLayerCollision(playerObj,platform )
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

       // this.boundries.enableBody = true;
       //  this.death.enableBody = true;

        this.platforms.resizeWorld();
        this.setTileCollisions(game);
        //for preformance?
        game.camera.roundPx = false;
        
    },

    createLayers: function(game){
        //only use one layer to improve preformance 
        this.platforms = this.map.createLayer('everything' );  
    },

    addTilesetImages: function(){
        this.map.addTilesetImage('platform_caves_all','caveTiles');
    },

    setTileCollisions: function(game){
        //platform tiles  
        this.map.setCollisionBetween(2, 7, true, this.platforms);
        //death tiles 
        this.map.setCollision([8,9,14], true, this.platforms);  
    },

    initBackground: function(game){
        Jetman.Platforms.bg_bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_bg');
        Jetman.Platforms.bg_fg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_fg');
        Jetman.Platforms.bg_bg.fixedToCamera = true;
        game.world.sendToBack(Jetman.Platforms.bg_fg);
        game.world.sendToBack(Jetman.Platforms.bg_bg);
    }

}