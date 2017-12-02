var game;
var player;
var input;

window.onload = function() {

    var width = window.innerWidth;// * window.devicePixelRatio;
    var height = window.innerHeight;// * window.devicePixelRatio;

    game = new Phaser.Game(width, height, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render });
    

    function preload () {
        game.load.image('platform', 'img/platform.png');
        game.load.image('player', 'img/player.png');
        game.load.image('ground', 'img/ground.png');
        game.load.image('bg', 'img/debugBg.png');
        game.load.image('fuel', 'img/fuel.png');

        game.load.tilemap('mapName', 'tilemaps/test.json', null, Phaser.Tilemap.TILED_JSON);
    }

    function create () {
      setPhysics();   
         game.add.tileSprite( 0, 4000, 500, 4000, 'bg');
        
        setBounds();
       // showBounds();
        initPlatforms();
       
        input = new Input();
                 player = new Player();
              cameraFollowPlayer();    
         //player = new Player();
        
        game.time.advancedTiming = true;

            map = game.add.tilemap('mapName');    
            res = map.addTilesetImage('fuel', 'fuel');    

           
           
         //  map.setCollision(1);
          //map.setCollision([0,1]);
         // map.setTileIndexCallback([0,1],onFuelOverlap, this );

          map.createFromObjects('fuel', 34,'platform',0,true,false,fuel);




                      layer = map.createLayer('Tile Layer 1');    
            layer2 = map.createLayer('Tile Layer 2');    
              //       layer2.enableBody = true;
            // game.physics.arcade.enable(layer2);
            map.setCollisionBetween(-1, 100);
             layer2.resizeWorld();


//game.physics.arcade.convertTilemap(map, layer);
            
           
             
//game.physics.arcade.convertTilemap(map, layer);
       
    }
    var playerYSet = false;
    function update() {
         //map.setTileIndexCallback([0,1], onFuelOverlap, this);
         //can add different layers for different platform types 
         //or use different object ids 
       game.physics.arcade.collide(player.player, layer2, test);

      //  game.physics.arcade.collide(player.player, platforms, onPlatformCollision, null, this);
        game.physics.arcade.overlap(player.player, fuel, onFuelOverlap, null, this);


      // game.physics.arcade.overlap(player.player, layer2, onFuelOverlap, null, this);
        input.dragControl();
        if(!playerYSet){
            player.player.y=7950;
           // player.player.y=1950
            playerYSet = true;
        }
         
    }

    function test(){
      console.log('hiy');
    }

    function render() {
        game.debug.pointer(game.input.activePointer);
        game.debug.text(game.time.fps, 2, 14, "#00ff00");
        //game.debug.body(spritename);
    }
};
