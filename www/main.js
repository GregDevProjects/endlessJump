var game;
var player;
var input;
var map;
//tile layer of platforms 
var platforms; 
var particles;
window.onload = function() {

    var width = window.innerWidth;// * window.devicePixelRatio;
    var height = window.innerHeight;// * window.devicePixelRatio;

    game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
    
    //(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'gameArea')
    function preload () {
        game.load.image('platform', 'img/dirtWall.png');
        game.load.image('player', 'img/playerProto.png');
        game.load.image('ground', 'img/ground.png');
        game.load.image('bg', 'img/debugBg.png');
        game.load.image('fuelLow', 'img/low.png');
        game.load.image('fuelMed', 'img/med.png'); 
        game.load.image('fuelHigh', 'img/high.png');
        game.load.image('jetParticle', 'img/jetParticle.png')
       
        game.load.image('deathTiles', 'img/deathTiles.png');
        game.load.spritesheet('fuelXl', 'img/xl.png', 50, 25, 4); 
        game.load.tilemap('mapName', 'tilemaps/test.json', null, Phaser.Tilemap.TILED_JSON);
    }

    function create () {
      setPhysics();   
      input = new Input();
      game.renderer.renderSession.roundPixels = true;
      game.time.advancedTiming = true;
      game.stage.backgroundColor = 0xcc7b09;

      initGroups();
      initTileMap();
      tileObjectsToSprites();
      particles = new Particles();
      initPlayer();
      

    }



    function update() {
      //hackey 
      if(particles.isBurstingActive){
        particles.jetpackParticleFlare();
      }

      game.physics.arcade.collide(player.player, platforms);
      game.physics.arcade.overlap(player.player, fuel, onFuelOverlap, null, this);
      input.dragControl();

    }


    function render() {
        game.debug.pointer(game.input.activePointer);
        game.debug.text(game.time.fps, 2, 14, "#00ff00");
      //  game.debug.body(player.player);
    }
};
