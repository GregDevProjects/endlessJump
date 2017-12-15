Jetman.SpikeEnemyTypes = {
	RIGHT_TO_LEFT:1,
	LEFT_TO_RIGHT:2,
	FOLLOW:3
};

Jetman.SpikeEnemies = {



	init: function(map,game){//(SpikeEnemyType,x,y,game){
		//this.all = [];
		this.game = game;
		
		this.group = this.game.add.group();
		this.group.name ='SpikeEnemies';

		      //   Jetman.SpikeEnemies.init(
      //     this.map.objects.spikeEnemy[i].name,
      //     this.map.objects.spikeEnemy[i].x,
      //     this.map.objects.spikeEnemy[i].y,
      //     this.game
      //   );
	

		for (var i=0;i<map.objects.spikeEnemy.length;i++) {
			this.group.add(new this.SpikedEnemy(
          map.objects.spikeEnemy[i].name,
          map.objects.spikeEnemy[i].x,
          map.objects.spikeEnemy[i].y,
          this.game

				)

			);
		}
		// switch(SpikeEnemyType){
		// 	case Jetman.SpikeEnemyTypes.RIGHT_TO_LEFT:

		// 		break;
		// }
		

	},	

	SpikedEnemy: function(SpikeEnemyType,x,y,game){
		this.sprite =game.add.sprite(x, y, 'spikeEnemy'); 
		this.SpikeEnemyType = SpikeEnemyType;
		this.move = function(){
			switch(SpikeEnemyType){
				case Jetman.SpikeEnemyTypes.RIGHT_TO_LEFT:
					this.sprite

				break;
			}	
		}

		return this.sprite;
	}
	

	


};