function Player() {

    this.construct = function() {
      
        this.player = game.add.sprite(0, 7950, 'player'); //initPlayer();
        game.physics.arcade.enable(this.player);
        this.player.body.allowGravity = true;
        this.player.body.collideWorldBounds=true;
        this.player.body.gravity.y = 300;
        
       
    }
    
    this.construct();


    this.moveRight = function(){
        this.player.body.velocity.x = 150;
    }

    this.moveLeft = function(){
        this.player.body.velocity.x = -150; 
    }

    this.stop = function(){
        this.player.body.velocity.x = 0;
    }
    return this;
}