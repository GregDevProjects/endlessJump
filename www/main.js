var game;
var player;
var input;
var map;
//tile layer of platforms 
var platforms; 
var bursting = false;
window.onload = function() {

    var width = window.innerWidth;// * window.devicePixelRatio;
    var height = window.innerHeight;// * window.devicePixelRatio;

    game = new Phaser.Game(width, height, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render });
    

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

       emitter = game.add.emitter(0, 0, 50);
       emitter.makeParticles('jetParticle');
       player.player.addChild(emitter);
       emitter.y = 50;
  emitter.x = 25;
      emitter.frequency = 1;
      
      emitter.minRotation = 0;
      emitter.maxRotation = 0;
      emitter.gravity = 1000;
      emitter.setAlpha(1,0,0);
     
    //emitter.flow( 1000, 250, 25, -1);
    }



    function update() {
    // emitter.start( false, 500 , 2, 500);
    //  emitter.emitParticle();
     if(bursting){
      emitter.flow( 300, 50, 5, -1);
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
