// This file includes functions to be exported to scenes.js

export function parallax_background(game,gameState){
	// this functions uses the already preloaded layer assests to create the parallax background
	var i;
	for (i = 0; i < 10; i++ ){
		// adds layers then repeats to increase the map length 10 times
		var x = gameState.width
		gameState.layer10 = game.add.image(x,0,'layer10')
		gameState.layer10.setOrigin(0,0)
		gameState.layer9 = game.add.image(x,0,'layer9')
		gameState.layer9.setOrigin(0,0)
		gameState.layer8 = game.add.image(x,0,'layer8')
		gameState.layer8.setOrigin(0,0)
		gameState.layer7 = game.add.image(x,0,'layer7')
		gameState.layer7.setOrigin(0,0)
		gameState.layer6 = game.add.image(x,0,'layer6')
		gameState.layer6.setOrigin(0,0)
		gameState.layer5 = game.add.image(x,0,'layer5')
		gameState.layer5.setOrigin(0,0)
		gameState.layer4 = game.add.image(x,0,'layer4')
		gameState.layer4.setOrigin(0,0)
		gameState.layer3 = game.add.image(x,0,'layer3')
		gameState.layer3.setOrigin(0,0)
		gameState.layer2 = game.add.image(x,0,'layer2')
		gameState.layer2.setOrigin(0,0)
		gameState.layer1 = game.add.image(x,0,'layer1')
		gameState.layer1.setOrigin(0,0)
		gameState.layer0 = game.add.image(x,0,'layer0')
		gameState.layer0.setOrigin(0,0)

		// sets the widths used in setting the scroll factor and in the next execution of the for loop
		gameState.layer_width = parseFloat(gameState.layer10.getBounds().width)
		gameState.width += gameState.layer_width;
		const window_width = gameState.config.width
		const layer0_width = gameState.layer0.getBounds().width
		const layer1_width = gameState.layer1.getBounds().width
		const layer2_width = gameState.layer2.getBounds().width
		const layer3_width = gameState.layer3.getBounds().width
		const layer4_width = gameState.layer4.getBounds().width
		const layer5_width = gameState.layer5.getBounds().width
		const layer6_width = gameState.layer6.getBounds().width
		const layer7_width = gameState.layer7.getBounds().width
		const layer8_width = gameState.layer8.getBounds().width
		const layer9_width = gameState.layer9.getBounds().width

		// sets the scroll factor for each layer to create the parallax effect
		gameState.layer10.setScrollFactor(0)
		gameState.layer9.setScrollFactor(((layer9_width - window_width)-50) / (gameState.layer_width - window_width));
		gameState.layer8.setScrollFactor(((layer8_width - window_width)-45) / (gameState.layer_width - window_width));
		gameState.layer7.setScrollFactor(((layer7_width - window_width)-40) / (gameState.layer_width - window_width));
		gameState.layer6.setScrollFactor(((layer6_width - window_width)-35) / (gameState.layer_width - window_width));
		gameState.layer5.setScrollFactor(((layer5_width - window_width)-30) / (gameState.layer_width - window_width));
		gameState.layer4.setScrollFactor(((layer4_width - window_width)-25) / (gameState.layer_width - window_width));
		gameState.layer3.setScrollFactor(((layer3_width - window_width)-20) / (gameState.layer_width - window_width));
		gameState.layer2.setScrollFactor(((layer2_width - window_width)-15) / (gameState.layer_width - window_width));
		gameState.layer1.setScrollFactor(((layer1_width - window_width)-10) / (gameState.layer_width - window_width));
		gameState.layer0.setScrollFactor(((layer0_width - window_width)-5) / (gameState.layer_width - window_width));
	}

}

export function playerdie(gameState){
	// functions that represents what happens when the player dies
	gameState.playerdead = true;
	// saves score as highscore if that's the case
	if (localStorage.getItem('score') < gameState.score){
		localStorage.setItem('score',gameState.score)
		gameState.game.add.text(280, 260, "New Highscore!!", { fontSize: '30px', fill: '#fff'}).setScrollFactor(0)
	}
	gameState.player.anims.pause()
	// playes death animations and destroys the player sprite
	gameState.game.time.addEvent({
		delay: 30,
		callback: function(){gameState.player.anims.pause()
			gameState.player.anims.play('dead',true);
			gameState.game.time.addEvent({
				delay: 1000,
				callback: function(){gameState.player.destroy()},
				loop: false,
		})},
		loop: false,
})
}

export function robotdie(gameState){
	// functions that represents what happens when robot should die
	gameState.robot1.anims.pause()
	// playes death animations
	gameState.robot1.anims.play('robot1death',true)
	if (gameState.robotdead == false){
		// if player is alive, and a robot dies, the score increases by 100 points
		if (!gameState.playerdead){
			gameState.score += 100;}
		gameState.scoreText.setText(`Score: ${gameState.score}`)
		// after robot dies, another robot is generated
		gameState.game.time.addEvent({
			delay: 2000,
			callback: function(){robotGen(gameState)},
			callbackScope:gameState.game,
			loop: false,
		});
		gameState.robotdead =true;
		// destroys the robot sprite after 1 sec from dying
		gameState.game.time.addEvent({
		delay: 1000,
		callback: function(){
			gameState.robot1.destroy()
		},
		loop: false,
	})
	}
}

export function collide_with_robot(gameState){
	// function representing what happens on collision with a walking robot
	gameState.game.physics.add.collider(gameState.player,gameState.robot1,function(){
		gameState.game.time.addEvent({
			delay: 200,
			callback: function(){
				// if the player was attacking with sword on collision, robot dies, else, player dies
				if (!gameState.playerdead){
					// sets player velocity to 0 on collision to avoid moving because of the collision after death of the robot
					gameState.player.setVelocityX(0)	
					if (gameState.attkObj.isDown && gameState.attacking == true){
						robotdie(gameState);
					}
					else if ((gameState.robotdead==false)&&gameState.player.y > 700){
						playerdie(gameState);
			}}},
			loop:false
		})
		
	})

}
export function robotGen(gameState){
	// represents the generator for the walking robots
	gameState.robotdead = false;
	// increases the robot speed by 15, every time a robot is generated
	gameState.robotspd += 15;
	// if player is on the right side of the map, the robot is generated in the left, and vice versa
	if (gameState.player.x <= 4000){
		gameState.robot1 = gameState.game.physics.add.sprite(gameState.player.x+750, 650, 'robot1','10_Run/Run_000.png').setScale(0.14);
		gameState.robot1.flipX= true;
		gameState.robot1.setVelocityX(-gameState.robotspd)
	}
	else {
		gameState.robot1 = gameState.game.physics.add.sprite(gameState.player.x-750, 650, 'robot1','10_Run/Run_000.png').setScale(0.14);
		gameState.robot1.flipX= false;
		gameState.robot1.setVelocityX(gameState.robotspd)
	}
	gameState.robot1.setCollideWorldBounds(true);
	gameState.robot1.anims.play('robot1run',true)
	collide_with_robot(gameState)
}

export function flyrobotGen(height, gameState){
	// generates flying robots at the height specified
	gameState.flyrobot = gameState.game.physics.add.sprite(gameState.player.x+750, height, 'robot2','13_Death/Death_006.png').setScale(0.14);
	// pushes flyring robots in a list to be iterated over in the update function in the game scene
	gameState.flyrobots.push(gameState.flyrobot);
	gameState.flyrobot.flipX= true;
	gameState.flyrobot.setVelocityX(-250)
	gameState.flyrobot.setCollideWorldBounds(true);
	gameState.flyrobot.anims.play('flyrobot',true)
	gameState.flyrobot.body.allowGravity= false
	// if the fllying robots touches the player, player dies
	gameState.game.physics.add.overlap(gameState.player,gameState.flyrobot,function(){
		if (gameState.player.y > (height)){
			if (!(height < 650 && gameState.cursors.down.isDown )){
			playerdie(gameState);}
		}})
}

export function missileGen(gameState){
	// represents the missile generator
	// creates 3 missiles around the player
	gameState.missile1 = gameState.game.physics.add.sprite(gameState.player.x+400, 200, 'missile','Missile_3_Flying_000.png').setScale(0.25);
	gameState.missile2 = gameState.game.physics.add.sprite(gameState.player.x-400, 200, 'missile','Missile_3_Flying_000.png').setScale(0.25);
	gameState.missile3 = gameState.game.physics.add.sprite(gameState.player.x, 200, 'missile','Missile_3_Flying_000.png').setScale(0.25);
	gameState.missiles = [];
	gameState.missiles.push(gameState.missile1,gameState.missile2,gameState.missile3);
	// iterates over missiles, so that if player touches them, player dies
	for (var missile of gameState.missiles){
		missile.flipY= true;
		missile.setCollideWorldBounds(true);
		missile.anims.play('missilefly',true)
		missile.body.allowGravity= false
		gameState.game.physics.add.overlap(gameState.player,missile,function(){
				playerdie(gameState);
			})
		gameState.game.physics.add.overlap(gameState.robot1,missile,function(){
			robotdie(gameState)});
		missiledrop(missile,gameState)
}}

export function missiledrop(missile,gameState){
	// represents the drop of the missiles and explosions
	// missile stay hanging for a bit then fall and explode
	gameState.game.time.addEvent({
		delay:700,
		callback: function(){missile.body.allowGravity = true;
			gameState.game.time.addEvent({
				delay:900,
				callback:function(){missile.anims.play('explode',true)
				gameState.game.time.addEvent({
					delay:600,
					callback:function(){missile.destroy();},
					loop:false
				})
				},
				loop: false
			})
		},
		loop:false
	})
}

export function throw_kunai(spd, gameState){
	// function respresenting the throwing of kunais
	gameState.kunai_flying = true
	// makes the kunai denies for a bit after, so the player is not able to spam it
	gameState.kunai_denied = true;
	// allows the kunai again in 2 secs and a half
	gameState.game.time.addEvent({
		delay: 2500,
		callback: function(){gameState.kunai_denied =false},
		loop: false,
	})
	// creates the sprite and sends the kunai depending on the direction of the player when they throw
	if(gameState.player.flipX==false){
		gameState.kunai = gameState.game.physics.add.sprite(gameState.player.x + 50,gameState.player.y - 7,'kunai').setScale(0.3)
		gameState.kunai.body.allowGravity = false;
		gameState.kunai.flipX =false;
		gameState.kunai.setVelocityX(spd);
	}
	else{
		gameState.kunai = gameState.game.physics.add.sprite(gameState.player.x - 50,gameState.player.y - 7,'kunai').setScale(0.3)
		gameState.kunai.body.allowGravity = false;
		gameState.kunai.flipX =true;
		gameState.kunai.setVelocityX(-spd);
	}
}

export function sword_attack(gameState){
	// represents the sword attack by the player
	gameState.player.anims.play('attack', true);
	gameState.attacking = true;
	// the sword becomes denied afer a sec and a half, so user won't spam it
	gameState.game.time.addEvent({
		delay: 1500,
		callback: function(){
		gameState.attacking = false;
		gameState.sword_denied = true;
	},
		loop: false,
	})
	// allows the sword again after 2 secs and a half
	gameState.game.time.addEvent({
		delay: 2500,
		callback: function(){gameState.sword_denied =false},
		loop: false,
	})
}

export  function right_left_move(direction, gameState){
	// represents the movements of player to right or left
	gameState.player.flipX =direction;
	if (direction){
		gameState.player.x -= 5}
	else{
		gameState.player.x += 5}
	if (gameState.cursors.down.isDown){
		// player slides when down button is pressed
		gameState.player.anims.play('slide', true);
	}
	else if ((gameState.cursors.up.isDown)) {
		// player jumps when up button is pressed
		gameState.player.setVelocityY(-650)
		gameState.player.anims.play('jump', true);
		}
	else if (gameState.attkObj.isDown && gameState.sword_denied == false){
		// attacks with sword if user presses the button and sword is allowed
		sword_attack(gameState);
	}
	else if ((gameState.throwObj.isDown)){
		if (!gameState.kunai_flying  && gameState.kunai_denied == false){
			// throws the kunai if it's allowed and there are no kunais flying already
			gameState.player.anims.play('throw', true);
			throw_kunai(700,gameState);
	}}
	else{
		// if there is nothing else, going on other than moving, it plays the running animations
	gameState.player.anims.play('run', true)}
}