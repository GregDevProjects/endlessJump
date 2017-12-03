function Player() {

    this.construct = function() {
        var x = map.objects.playerStart[0].x; 
        var y =map.objects.playerStart[0].y;
        this.player = game.add.sprite(x, y, 'player'); //initPlayer();
        game.physics.arcade.enable(this.player);
        this.player.body.allowGravity = true;
        this.player.body.collideWorldBounds=true;
        this.player.body.gravity.y = 300;
        
       
    }
    
    this.construct();

    this.respawnAfterDeath = function(){
      //  game.camera.unfollow(this.player)

        game.camera.flash(0xff0000, 500);
        this.player.kill();

        //probably need to wait for the update loop before camera follows again
      //  cameraFollowPlayer();

    }

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