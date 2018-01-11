Jetman.Text = {

	DeathText : [
		'BAD',
		'NO',
		'FUCK',
		'WHOOPSIE',
		'OUCH',
		'DEAD',
		'SATAN',
		'JETDEAD',
	],

	displayRiseAndFadeOutText: function(x,y, text, game){
		var style = { font: "20px Arial", fill: "#ffffff", align: "center" };
		var text =  game.add.text(x,y, text, style);
		game.add.tween(text).to(
				{ y: y -100 },
				1000, 
				Phaser.Easing.Linear.None, 
				true
			);

		game.add.tween(text).to(
				{ alpha: 0 }, 
				1000, 
				Phaser.Easing.Linear.None, 
				true
			);
	},

	displayCenterText: function(text, game){
		var style = {font: "50px Arial", fill: "#FF0000", stroke: '#000000', strokeThickness: 3};
		var text = game.add.text(
				game.world.width / 2, 
				game.camera.height / 2,
				text, 
				style
			);

		text.anchor.setTo(0.5, 0.5);
		text.fixedToCamera = true;

	},

	displayDeathText: function(game){
		var index = Math.floor(Math.random() * (this.DeathText.length));
		var text = this.DeathText[index];
		this.displayCenterText(text,game);	
	}

}