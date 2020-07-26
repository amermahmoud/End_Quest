import * as mechanics from './mechanics.js';    // imports the mechanics functions from another file

const gameState = {}    // Global variable used throughout the code and in the imported functions

var start = new Phaser.Class({
    // Class representing the starting scene of the game
    Extends: Phaser.Scene,

    initialize:

    function start ()
    {
        Phaser.Scene.call(this, { key: 'start' });      // defines the key by which the scene can be called
    },

    preload: function ()    // preloads the necessary assets for the game
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
        this.load.multiatlas('robot1', 'assests/robots/PNG_Animations/Robot1/Robot1.json', 'assests/robots/PNG_Animations/Robot1');
        this.load.multiatlas('robot2', 'assests/robots/PNG_Animations/Robot2/Robot2.json', 'assests/robots/PNG_Animations/Robot2');
        this.load.multiatlas('missile', 'assests/spaceshoot/PNG/Sprites/Missile/missile.json', 'assests/spaceshoot/PNG/Sprites/Missile');
        this.load.image('start','assests/start_end/start.png')

    },

    create: function ()
    {
      this.add.image(0,0,'start').setOrigin(0,0)
      this.input.keyboard.on('keydown_ENTER', function(){this.scene.start('instruct')},this) 
        }

});

var instruct = new Phaser.Class({
    // class representing the instructions page scene
    Extends: Phaser.Scene,

    initialize:

    function instruct ()
    {
        Phaser.Scene.call(this, { key: 'instruct' }); // defines the key by which the scene can be called
    },

    preload: function ()
    {
        this.load.image('instruct','assests/start_end/instructions.png')    // preload instructions

    },

    create: function ()
    {
      this.add.image(0,0,'instruct').setOrigin(0,0)
      this.input.keyboard.on('keydown_ENTER', function(){this.scene.start('game')},this) 
        }

});

var game = new Phaser.Class({
    // Class representing the actual game
    Extends: Phaser.Scene,

    initialize:

    function game ()
    {
        Phaser.Scene.call(this, { key: 'game' });
    },

    create: function ()
    {
        // defines the starting game screen width as 0 then parallax_background() adds to it
        gameState.width = 0
        mechanics.parallax_background(this, gameState)  // adds the parallax background to the game

        //adds the score text on the screen and retrieves the highscore from local storage
        gameState.scoreText = this.add.text(550, 160, 'Score: 0', { fontSize: '30px', fill: '#000'}).setScrollFactor(0)
        var highscore = localStorage.getItem('score')
        if (highscore == null){
            highscore = 0;}
        gameState.highscoreText = this.add.text(50, 160, `HighScore: ${highscore}`, { fontSize: '30px', fill: '#000'}).setScrollFactor(0)
        
        // adds the sprites for the player and the first robot
        gameState.player = this.physics.add.sprite(75, 700, 'player','png/idle/Idle__001.png').setScale(0.25);
        gameState.robot1 = this.physics.add.sprite(1000, 700, 'robot1','10_Run/Run_000.png').setScale(0.14);
        gameState.robot1.flipX= true;
        gameState.robot1.setCollideWorldBounds(true);
        gameState.robot1.setVelocityX(-140)
        gameState.robot1.allowGravity= false
        
        // animation frame generator for missiles and their explosions
        gameState.missileflyingNames = this.anims.generateFrameNames('missile', {
            start: 0, end: 9, zeroPad: 3,
            prefix: 'Missile_3_Flying_', suffix: '.png'
        });
        gameState.explodeNames = this.anims.generateFrameNames('missile', {
            start: 0, end: 7, zeroPad: 3,
            prefix: 'Missile_3_Explosion_', suffix: '.png'
        });
        // animation frame generator for flying robots
        gameState.flyrobotNames = this.anims.generateFrameNames('robot2', {
            start: 8, end: 9, zeroPad: 3,
            prefix: '13_Death/Death_', suffix: '.png'
        });
        // animation frame generator for the walking robots
        gameState.robot1runNames = this.anims.generateFrameNames('robot1', {
            start: 0, end: 11, zeroPad: 3,
            prefix: '10_Run/Run_', suffix: '.png'
        });
        gameState.robot1deathNames = this.anims.generateFrameNames('robot1', {
            start: 0, end: 14, zeroPad: 3,
            prefix: '13_Death/Death_', suffix: '.png'
        });

        // animation frame generator for the player actions
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

        // creates the animation for the missiles and their explosions
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
        // creates the animation for the flying robot
        this.anims.create({
            key: 'flyrobot',
            frames: gameState.flyrobotNames,
            frameRate: 2,
            repeat: -1 });
        // creates the animation for the walking robot
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
        // creates the animation for the player actions
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

        // setts the camera settings to focus on the player
        this.cameras.main.setBounds(0, 0, (gameState.width*2), gameState.layer10.height);
        this.cameras.main.startFollow(gameState.player, true, 1, 0.5,0)
        // sets bounds for the physics of the game world
        this.physics.world.setBounds(0, 0, (gameState.width), gameState.layer10.height-20);
        gameState.player.setCollideWorldBounds(true);

        // restarts the game when the player dies and presses ENTER
        this.input.keyboard.on('keydown_ENTER', function(){
            if (gameState.playerdead){
                this.scene.restart('game')}},this) 
        
        // creates the keyboard controls used in the game
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.attkObj = this.input.keyboard.addKey('Z')
        gameState.throwObj = this.input.keyboard.addKey('X')
        this.input.keyboard.on('keydown_SPACE', function(){
            this.scene.launch('pausescreen');
            this.scene.pause('game')},this) 
        
        // sets global variables used in the game
        gameState.kunai_flying = false;     // indicates whether there is a kunai flying or not
        gameState.robotspd = 140    // the starting speed for the robots
        gameState.game = this;      // globally set to be referred to in other functions
        gameState.playerdead =false;    // indicates if player is dead or not
        gameState.robotdead = false;    // indicates if robot is dead or not
        gameState.kunai_denied = false;     // indicates if kunai is available to be used
        gameState.sword_denied =false;      // indicates if sword is available to be used
        gameState.attacking = false;        // shows whether the player is attacking or not
        gameState.flyrobots = [];           // list of flying robots
        gameState.score = 0;                // the beginning score
        
        // plays animations for player and first robot
        gameState.player.anims.play('idle', true)
        gameState.robot1.anims.play('robot1run',true)
        
        mechanics.collide_with_robot(gameState) // calls the collision function to determine what happens when robot collides with player
        // Calls the enemy generator functions
        gameState.game.time.addEvent({
            delay:5000,
            callback: function(){mechanics.flyrobotGen(625,gameState)},
            loop: false,
        })
        gameState.game.time.addEvent({
            delay:10000,
            callback: function(){mechanics.flyrobotGen(670,gameState)},
            loop: false,
        })
        gameState.game.time.addEvent({
            delay:15000,
            callback: function(){mechanics.flyrobotGen(550,gameState)},
            loop: false,
        })
        gameState.game.time.addEvent({
            delay:20000,
            callback: function(){mechanics.missileGen(gameState)},
            loop: true,
        })
        },

        update: function() {
            // Executed in every frame

            // makes robots change direction when they reach the end of the map
            for (var flyrobot of gameState.flyrobots){
                if (flyrobot && flyrobot.x < 150){
                    flyrobot.flipX = false;
                    flyrobot.setVelocityX(gameState.robotspd+150)
                }
                else if (flyrobot && flyrobot.x >9150){
                    flyrobot.flipX = true;
                    flyrobot.setVelocityX(-gameState.robotspd-150)
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

            // checks for player controls while the player is alive
            if (!gameState.playerdead){

                // controls if the player is on the ground
                if (gameState.player.y > 700){         
                    if ((gameState.cursors.up.isDown)) {
                        gameState.player.setVelocityY(-650)
                        gameState.player.anims.play('jump', true);  // jumps on pressing up arrow
                        }
                    else if (gameState.cursors.right.isDown){
                        mechanics.right_left_move(false,gameState)  // runs to right direction
                    }
                    else if (gameState.cursors.left.isDown){
                        mechanics.right_left_move(true,gameState)   // runs to left direction
                    }
                    else if ((gameState.throwObj.isDown)){      
                        // throw kunai when the key is pressed and it's avaialble
                        if (!gameState.kunai_flying  && gameState.kunai_denied == false){
                            gameState.player.anims.play('throw', true);
                            mechanics.throw_kunai(500,gameState);
                        }
                    }
                    else if (gameState.kunai_flying && (((!gameState.kunai.flipX)&& (gameState.kunai.x < (gameState.player.x +200 ))) || ((gameState.kunai.flipX)&& (gameState.kunai.x > (gameState.player.x -200 ))))){
                            // keeps the throwing animation for the player playing for a bit after throwing
                            gameState.player.anims.play('throw', true);
                        }
                    else if (gameState.attkObj.isDown && gameState.sword_denied == false){
                        // attacks with sword when key is pressed and it's available (sword_denied == false)
                        mechanics.sword_attack(gameState);
                        }
                    else if (gameState.cursors.down.isDown){
                            gameState.player.anims.play('slide', true);
                        }
                    // if nothing else is going on for the player, idle animation plays
                    else {gameState.player.anims.play('idle',true);}      
            }

                // sets controls when the player is in the air
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
                        if (!gameState.kunai_flying && gameState.kunai_denied == false){
                            gameState.player.anims.play('jumpthrow', true);        // throws while jumping
                            mechanics.throw_kunai(500,gameState)
                    }}
                    else {
                        gameState.player.anims.play('jump', true);
                    }
                }
            }
            // if player is dead
            else{
                // adds game over text on the screen
                this.add.text(300, 360, 'GAME OVER', { fontSize: '40px', fill: '#fff'}).setScrollFactor(0)
                this.add.text(210, 460, 'Press Enter to restart', { fontSize: '30px', fill: '#fff'}).setScrollFactor(0)
            }
            

            // checks to remove kunai when it hits a robot or when it goes far away from the player
            if (gameState.kunai_flying){
                // if kunai comes near enough to hit a robot from one of the two directions (this is more accurate than adding a collide function)
                if (Math.abs(gameState.kunai.x - gameState.robot1.x) < (30)&& (gameState.kunai.y> gameState.robot1.y-50)){
                    gameState.kunai.destroy()
                    delete gameState.kunai;
                    gameState.kunai_flying = false;
                    mechanics.robotdie(gameState);
                }
                // if it goes far away from the player in any direction
                else if ((gameState.kunai.x > (gameState.player.x + 700))||(gameState.kunai.x < (gameState.player.x - 700))){
                    gameState.kunai.destroy()
                    delete gameState.kunai;
                    gameState.kunai_flying = false;
                }
            }
        }

});

var pause = new Phaser.Class({
    // class representing pause screen, allows to resume the game
    Extends: Phaser.Scene,

    initialize:

    function instruct ()
    {
        Phaser.Scene.call(this, { key: 'pausescreen' });    // key to call the scene from the game
    },


    create: function ()
    {
    var pausetext= this.add.text(280, 560, 'Game Paused', { fontSize: '40px', fill: '#fff'}).setScrollFactor(0)
    // removes the game paused text and resumes game when space is pressed
      this.input.keyboard.on('keydown_SPACE', function(){
          pausetext.destroy();
          this.scene.resume('game')
        },this) 
        }

});

// variable defining the settings of the game
gameState.config = {
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
  scene: [start,instruct,game,pause]
  };
  // calls the phaser game with the configs specified
  const game_start = new Phaser.Game(gameState.config);