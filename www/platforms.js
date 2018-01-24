//Jetman.Platforms = function(){};
Jetman.Platforms = {

    TileIndexes: {
        LAVA: 14,
        SPIKES_UP: 9,
        SPIKES_DOWN: 8
    },

    lastCameraPosition: false,


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

    invisibleBoundryCollision: function(obj,platform){
        if(obj.constructor.name === "Walker"){
            obj.reverseDirections();
        }
        
    },

    setTileCollisions: function(game){
        //invisible boundry for walkers 
        //a little hackey but easy on preformance 
        this.map.setTileIndexCallback(1, this.invisibleBoundryCollision, this);
        //platform tiles  
        this.map.setCollisionBetween(2, 7, true, this.platforms);
        //death tiles 
        this.map.setCollision([8,9,14], true, this.platforms);  
    },

    initBackground: function(game){

        // game.stage.backgroundColor = 0xe3dcd6; //#fcf9f9

        Jetman.Platforms.bg_1 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_1');
        Jetman.Platforms.bg_2 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_2');
        Jetman.Platforms.bg_3 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_3');
        Jetman.Platforms.bg_4 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_4');

         game.world.sendToBack(Jetman.Platforms.bg_1);
         game.world.sendToBack(Jetman.Platforms.bg_2);
         game.world.sendToBack(Jetman.Platforms.bg_3);
         game.world.sendToBack(Jetman.Platforms.bg_4);

    },
    // POST FINDINGS
    scrollBackground: function(camera){
        var layer1ScrollSpeed = 0.2;
        var layer2ScrollSpeed = 0.1;
        var layer3ScrollSpeed = 0.01;

        if(this.lastCameraPosition === false){
            this.lastCameraPosition = camera.y;
        }
        

        if(this.lastCameraPosition > camera.y){
            this.bg_1.tilePosition.y += layer1ScrollSpeed;
            this.bg_2.tilePosition.y += layer2ScrollSpeed;
            this.bg_3.tilePosition.y += layer3ScrollSpeed;
        } else if (this.lastCameraPosition < camera.y) {
            this.bg_1.tilePosition.y -= layer1ScrollSpeed;
            this.bg_2.tilePosition.y -= layer2ScrollSpeed;
            this.bg_3.tilePosition.y -= layer3ScrollSpeed;           
        }

        this.lastCameraPosition = camera.y;
    }


}