const gameState = {}

function preload()
{
	this.load.image('layer10','assests/forestart/PNG/Background layers/Layer_0010_1.png')
	this.load.image('layer0','assests/forestart/PNG/Background layers/Layer_0000_9.png')
	this.load.image('layer1','assests/forestart/PNG/Background layers/Layer_0001_8.png')
	this.load.image('layer2','assests/forestart/PNG/Background layers/Layer_0002_7.png')
	this.load.image('layer3','assests/forestart/PNG/Background layers/Layer_0003_6.png')
	this.load.image('layer4','assests/forestart/PNG/Background layers/Layer_0004_Lights.png')
	this.load.image('layer5','assests/forestart/PNG/Background layers/Layer_0005_5.png')
	this.load.image('layer6','assests/forestart/PNG/Background layers/Layer_0006_4.png')
	this.load.image('layer7','assests/forestart/PNG/Background layers/Layer_0007_Lights.png')
	this.load.image('layer8','assests/forestart/PNG/Background layers/Layer_0008_3.png')
	this.load.image('layer9','assests/forestart/PNG/Background layers/Layer_0009_2.png')
	this.load.image('kunai','assests/ninjaadventurenew/png/Kunai.png',{ frameWidth: 160, frameHeight: 32})
	this.load.multiatlas('player', 'assests/ninjaadventurenew/player.json', 'assests/ninjaadventurenew');
	this.load.multiatlas('robot1', 'assests/robots/PNG_Animations/Robot1/robot1.json', 'assests/robots/PNG_Animations/Robot1');
	this.load.multiatlas('robot2', 'assests/robots/PNG_Animations/Robot2/robot2.json', 'assests/robots/PNG_Animations/Robot2');
	this.load.multiatlas('missile', 'assests/spaceshoot/PNG/Sprites/Missile/missile.json', 'assests/spaceshoot/PNG/Sprites/Missile');
}
function parallax_background(game){
	var i;
	for (i = 0; i < 10; i++ ){
		x = gameState.width
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

		gameState.layer_width = parseFloat(gameState.layer10.getBounds().width)
		gameState.width += gameState.layer_width;

		const window_width = config.width
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
function playerdie(){
	gameState.playerdead = true;
	gameState.player.anims.pause()
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
function collide_with_robot(){
	gameState.game.physics.add.collider(gameState.player,gameState.robot1,function(){
		gameState.game.time.addEvent({
			delay: 200,
			callback: function(){
				if (!gameState.playerdead){
					gameState.player.setVelocityX(0)
					if (gameState.attkObj.isDown && gameState.attacking == true){
						gameState.robot1.anims.pause()
						gameState.robot1.anims.play('robot1death',true)
						if (gameState.robotdead == false){
							gameState.game.time.addEvent({
								delay: 2000,
								callback: robotGen,
								callbackScope:gameState.game,
								loop: false,
							});
						}
						gameState.robotdead =true;
						gameState.game.time.addEvent({
							delay: 1000,
							callback: function(){
								gameState.robot1.destroy()
								gameState.robot1.x = 7000;
							},
							loop: false,
						})
					}
					else if ((gameState.robotdead==false)&&gameState.player.y > 700){
						playerdie();
			}}},
			loop:false
		})
		
	})

}
// make function for robotdie, add scoring system (saving highest score to local data?), then add sounds, comment it all and make it neat
function robotGen(){
	gameState.robotdead = false;
	gameState.robotspd += 15;
	if (gameState.player.x < 4000){
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
	collide_with_robot()
}

function flyrobotGen(height){
	gameState.flyrobot = gameState.game.physics.add.sprite(gameState.player.x+750, height, 'robot2','13_Death/Death_006.png').setScale(0.14);
	gameState.flyrobots.push(gameState.flyrobot);
	gameState.flyrobot.flipX= true;
	gameState.flyrobot.setVelocityX(-300)
	gameState.flyrobot.setCollideWorldBounds(true);
	gameState.flyrobot.anims.play('flyrobot',true)
	gameState.flyrobot.body.allowGravity= false
	gameState.game.physics.add.overlap(gameState.player,gameState.flyrobot,function(){
		if (gameState.player.y > (height)){
			if (!(height < 650 && gameState.cursors.down.isDown )){
			playerdie();}
		}})
}

function missileGen(){
	gameState.missile1 = gameState.game.physics.add.sprite(gameState.player.x+400, 200, 'missile','Missile_3_Flying_000.png').setScale(0.25);
	gameState.missile2 = gameState.game.physics.add.sprite(gameState.player.x-400, 200, 'missile','Missile_3_Flying_000.png').setScale(0.25);
	gameState.missile3 = gameState.game.physics.add.sprite(gameState.player.x, 200, 'missile','Missile_3_Flying_000.png').setScale(0.25);
	gameState.missiles = [];
	gameState.missiles.push(gameState.missile1);
	gameState.missiles.push(gameState.missile2);
	gameState.missiles.push(gameState.missile3);
	for (missile of gameState.missiles){
		missile.flipY= true;
		missile.setCollideWorldBounds(true);
		missile.anims.play('missilefly',true)
		missile.body.allowGravity= false
		gameState.game.physics.add.overlap(gameState.player,missile,function(){
				playerdie();
			})
}
	gameState.game.time.addEvent({
		delay:700,
		callback: function(){gameState.missile1.body.allowGravity = true;
			gameState.game.time.addEvent({
				delay:900,
				callback:function(){gameState.missile1.anims.play('explode',true)
				gameState.game.time.addEvent({
					delay:300,
					callback:function(){gameState.missile1.destroy();},
					loop:false
				})
				},
				loop: false
			})
		},
		loop:false
})
	gameState.game.time.addEvent({
		delay:700,
		callback: function(){gameState.missile2.body.allowGravity = true;
			gameState.game.time.addEvent({
				delay:900,
				callback:function(){gameState.missile2.anims.play('explode',true)
				gameState.game.time.addEvent({
					delay:700,
					callback:function(){gameState.missile2.destroy();},
					loop:false
				})
				},
				loop: false
			})
		},
		loop:false
	})
	gameState.game.time.addEvent({
		delay:700,
		callback: function(){gameState.missile3.body.allowGravity = true;
			gameState.game.time.addEvent({
				delay:900,
				callback:function(){gameState.missile3.anims.play('explode',true)
				gameState.game.time.addEvent({
					delay:800,
					callback:function(){gameState.missile3.destroy();},
					loop:false
				})
				},
				loop: false
			})
		},
		loop:false
	})
} // make the missile drop function
function create()
{	gameState.width = 0
	parallax_background(this)
	gameState.player = this.physics.add.sprite(75, 700, 'player','png/idle/Idle__001.png').setScale(0.25);
	
	gameState.robot1 = this.physics.add.sprite(1000, 700, 'robot1','10_Run/Run_000.png').setScale(0.14);

	gameState.robot1.flipX= true;
	gameState.robot1.setCollideWorldBounds(true);
	
	gameState.missileflyingNames = this.anims.generateFrameNames('missile', {
		start: 0, end: 9, zeroPad: 3,
		prefix: 'Missile_3_Flying_', suffix: '.png'
	});
	gameState.explodeNames = this.anims.generateFrameNames('missile', {
		start: 0, end: 7, zeroPad: 3,
		prefix: 'Missile_3_Explosion_', suffix: '.png'
	});
	// fly robot section
	gameState.flyrobotNames = this.anims.generateFrameNames('robot2', {
		start: 8, end: 9, zeroPad: 3,
		prefix: '13_Death/Death_', suffix: '.png'
	});
	// robot 1 section
	gameState.robot1runNames = this.anims.generateFrameNames('robot1', {
		start: 0, end: 11, zeroPad: 3,
		prefix: '10_Run/Run_', suffix: '.png'
	});
	gameState.robot1deathNames = this.anims.generateFrameNames('robot1', {
		start: 0, end: 14, zeroPad: 3,
		prefix: '13_Death/Death_', suffix: '.png'
	});
	gameState.robot1shotNames = this.anims.generateFrameNames('robot1', {
		start: 0, end: 11, zeroPad: 3,
		prefix: '12_Run_Shot/Run_Shot_', suffix: '.png'
	});
	//player section
	gameState.deadNames = this.anims.generateFrameNames('player', {
		start: 0, end: 9, zeroPad: 3,
		prefix: 'png/dead/Dead__', suffix: '.png'
	});
	gameState.runNames = this.anims.generateFrameNames('player', {
		start: 0, end: 9, zeroPad: 3,
		prefix: 'png/run/', suffix: '.png'
	});
	gameState.jumpNames = this.anims.generateFrameNames('player', {
		start: 0, end: 9, zeroPad: 3,
		prefix: 'png/jump/Jump__', suffix: '.png'
	});
	gameState.attackNames = this.anims.generateFrameNames('player', {
		start: 0, end: 9, zeroPad: 3,
		prefix: 'png/attack/', suffix: '.png'
	});
	gameState.jumpattackNames = this.anims.generateFrameNames('player', {
		start: 0, end: 9, zeroPad: 3,
		prefix: 'png/jumpattack/Jump_Attack__', suffix: '.png'
	});
	gameState.jumpthrowNames = this.anims.generateFrameNames('player', {
		start: 0, end: 9, zeroPad: 3,
		prefix: 'png/jumpthrow/Jump_Throw__', suffix: '.png'
	});
	gameState.slideNames = this.anims.generateFrameNames('player', {
		start: 0, end: 9, zeroPad: 3,
		prefix: 'png/slide/Slide__', suffix: '.png'
	});
	gameState.throwNames = this.anims.generateFrameNames('player', {
		start: 0, end: 9, zeroPad: 3,
		prefix: 'png/throw/Throw__', suffix: '.png'
	});
	gameState.idleNames = this.anims.generateFrameNames('player', {
		start: 0, end: 9, zeroPad: 3,
		prefix: 'png/idle/Idle__', suffix: '.png'
	});

	this.anims.create({
		key: 'missilefly',
		frames: gameState.missileflyingNames,
		frameRate: 9,
		repeat: -1 });
	this.anims.create({
		key: 'explode',
		frames: gameState.explodeNames,
		frameRate: 7,
		repeat: 1 });

	this.anims.create({
		key: 'flyrobot',
		frames: gameState.flyrobotNames,
		frameRate: 2,
		repeat: -1 });

	this.anims.create({
		key: 'robot1run',
		frames: gameState.robot1runNames,
		frameRate: 11,
		repeat: -1 });
	this.anims.create({
		key: 'robot1death',
		frames: gameState.robot1deathNames,
		frameRate: 14,
		repeat: 0 });
	this.anims.create({
		key: 'robot1runshot',
		frames: gameState.robot1shotNames,
		frameRate: 11,
		repeat: 0 });

	this.anims.create({
		key: 'throw',
		frames: gameState.throwNames,
		frameRate: 25,
		repeat: 0 });
	this.anims.create({
		key: 'slide',
		frames: gameState.slideNames,
		frameRate: 25,
		repeat: -1
	  });
	this.anims.create({
		key: 'jumpthrow',
		frames: gameState.jumpthrowNames,
		frameRate: 20,
		repeat: 0
	  });
	this.anims.create({
		key: 'jumpattack',
		frames: gameState.jumpattackNames,
		frameRate: 20,
		repeat: -1
	  });
	this.anims.create({
		key: 'dead',
		frames: gameState.deadNames,
		frameRate: 10,
		repeat: 0
	  });
	this.anims.create({
		key: 'run',
		frames: gameState.runNames,
		frameRate: 20,
		repeat: -1
	  });
	  this.anims.create({
		key: 'attack',
		frames: gameState.attackNames,
		frameRate: 20,
		repeat: -1
	  });
	  this.anims.create({
		key: 'jump',
		frames: gameState.jumpNames,
		frameRate: 5,
		repeat: 1
	  });
	  this.anims.create({
		key: 'idle',
		frames: gameState.idleNames,
		frameRate: 7,
		repeat: -1
	  });
	this.cameras.main.setBounds(0, 0, (gameState.width*2), gameState.layer10.height);
	this.physics.world.setBounds(0, 0, (gameState.width), gameState.layer10.height-20);
	gameState.player.setCollideWorldBounds(true);

	this.cameras.main.startFollow(gameState.player, true, 1, 0.5,0)
	gameState.cursors = this.input.keyboard.createCursorKeys();
	gameState.attkObj = this.input.keyboard.addKey('Z')
	gameState.throwObj = this.input.keyboard.addKey('X')
	gameState.iskunai = false;
	gameState.robot1.anims.play('robot1run',true)
	gameState.robot1.setVelocityX(-140)
	gameState.robot1.allowGravity= false
	gameState.robotspd = 140
	gameState.game = this
	gameState.playerdead =false;
	gameState.robotdead = false;
	gameState.kunai_denied = false;
	gameState.sword_denied =false;
	gameState.player.anims.play('idle', true)
	gameState.attacking = false;
	gameState.flyrobots = [];
	
	collide_with_robot()
	gameState.game.time.addEvent({
		delay:5000,
		callback: function(){flyrobotGen(613)},
		loop: false,
	})
	gameState.game.time.addEvent({
		delay:7000,
		callback: function(){flyrobotGen(670)},
		loop: false,
	})
	gameState.game.time.addEvent({
		delay:9000,
		callback: function(){flyrobotGen(550)},
		loop: false,
	})
	gameState.game.time.addEvent({
		delay:10000,
		callback: missileGen,
		loop: true,
	})
	
} 
function throw_kunai(spd){
	gameState.iskunai = true
	gameState.kunai_denied = true;
	gameState.game.time.addEvent({
		delay: 2500,
		callback: function(){gameState.kunai_denied =false},
		loop: false,
	})
	
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
function sword_attack(){
	gameState.player.anims.play('attack', true);
	gameState.attacking = true;
	gameState.game.time.addEvent({
		delay: 1500,
		callback: function(){
		gameState.attacking = false;
		gameState.sword_denied = true;
	},
		loop: false,
	})
	gameState.game.time.addEvent({
		delay: 2500,
		callback: function(){gameState.sword_denied =false},
		loop: false,
	})
}
function right_left_move(direction){
	gameState.player.flipX =direction;
	if (direction){
		gameState.player.x -= 5}
	else{
		gameState.player.x += 5}
	if (gameState.cursors.down.isDown){
		gameState.player.anims.play('slide', true);
	}
	else if ((gameState.cursors.up.isDown)) {
		gameState.player.setVelocityY(-650)
		gameState.player.anims.play('jump', true);
		}
	else if (gameState.attkObj.isDown && gameState.sword_denied == false){
		sword_attack();
	}
	else if ((gameState.throwObj.isDown)){
		if (!gameState.iskunai  && gameState.kunai_denied == false){
			gameState.player.anims.play('throw', true);
			throw_kunai(700);
	}}
	else{
	gameState.player.anims.play('run', true)}
}
function update(){
	for (flyrobot of gameState.flyrobots){
		if (flyrobot && flyrobot.x < 150){
			flyrobot.flipX = false;
			flyrobot.setVelocityX(gameState.robotspd+200)
		}
		else if (flyrobot && flyrobot.x >9150){
			flyrobot.flipX = true;
			flyrobot.setVelocityX(-gameState.robotspd-200)
		}
	}
	if (!gameState.robotdead){
		if (gameState.robot1.x < 100){
			gameState.robot1.flipX = false;
			gameState.robotspd += 15
			gameState.robot1.setVelocityX(gameState.robotspd)
		}
		else if (gameState.robot1.x >9150){
			gameState.robot1.flipX = true;
			gameState.robotspd += 15
			gameState.robot1.setVelocityX(-gameState.robotspd)
		}
	}
	if (!gameState.playerdead){
		if (gameState.player.y > 700){
			if ((gameState.cursors.up.isDown)) {
				gameState.player.setVelocityY(-650)
				gameState.player.anims.play('jump', true);
				}
			else if (gameState.cursors.right.isDown){
				right_left_move(false)
			}
			else if (gameState.cursors.left.isDown){
				right_left_move(true)
			}
			else if ((gameState.throwObj.isDown)){
				if (!gameState.iskunai  && gameState.kunai_denied == false){
					gameState.player.anims.play('throw', true);
					throw_kunai(500);
				}
			}
			else if (gameState.iskunai && (((!gameState.kunai.flipX)&& (gameState.kunai.x < (gameState.player.x +200 ))) || ((gameState.kunai.flipX)&& (gameState.kunai.x > (gameState.player.x -200 ))))){
					gameState.player.anims.play('throw', true);
				}
			
			else if (gameState.attkObj.isDown && gameState.sword_denied == false){
				sword_attack();
				}
			else if (gameState.cursors.down.isDown){
					gameState.player.anims.play('slide', true);
				}
			else {gameState.player.anims.play('idle',true);}
	}
		if (gameState.player.y < 700){
			if (gameState.cursors.right.isDown){
				gameState.player.flipX =false;
				gameState.player.x += 5
			}
			else if (gameState.cursors.left.isDown){
				gameState.player.flipX =true;
				gameState.player.x -= 5
			}
			if (gameState.throwObj.isDown){
				if (!gameState.iskunai && gameState.kunai_denied == false){
					gameState.player.anims.play('jumpthrow', true);
					throw_kunai(500)
			}}
			else {
				gameState.player.anims.play('jump', true);
			}
		}
	}
	
	if (gameState.iskunai){
		if ((((gameState.kunai.x > (gameState.robot1.x-30)&& !gameState.kunai.flipX)&&gameState.robot1.x>gameState.player.x)||(((gameState.kunai.x < (gameState.robot1.x+30)&& gameState.kunai.flipX)&&gameState.robot1.x<gameState.player.x)))&& (gameState.kunai.y> gameState.robot1.y-50)){
			gameState.robot1.anims.pause()
			gameState.robot1.anims.play('robot1death',true)
			if (gameState.robotdead == false){
				this.time.addEvent({
					delay: 2000,
					callback: robotGen,
					callbackScope:this,
					loop: false,
				});
			}
			gameState.robotdead = true;
			gameState.kunai.destroy()
			delete gameState.kunai;
			gameState.iskunai = false;
			gameState.game.time.addEvent({
				delay: 1000,
				callback: function(){gameState.robot1.destroy()
				},
				loop: false,
			})
		}
		else if ((gameState.kunai.x > (gameState.player.x + 700))||(gameState.kunai.x < (gameState.player.x - 700))){
			gameState.kunai.destroy()
			delete gameState.kunai;
			gameState.iskunai = false;
		}
	}
}

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 825,
	fps: {target: 60},
	backgroundColor: "ffffff",
	physics: {
		default: 'arcade',
		arcade: {
		  gravity: {
			y: 800 },
		  enableBody: true,
	
		}},
  scene: {preload,create,update}
  };
  
  const game = new Phaser.Game(config);