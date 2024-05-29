class StartScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScreen' });
    }

      preload() {
        this.load.image('start_img', `https://play.rosebud.ai/assets/generate an AI background of Africa.png?CD6v`);
        this.load.image('start_text_img', `https://play.rosebud.ai/assets/start-text-image.png?K20L`);
        this.load.image('spacebar_img', `https://play.rosebud.ai/assets/spacebar1.png?88lM`);
        
         // Load the music
        this.load.audio('music_1', `https://play.rosebud.ai/assets/31 On a Misty Morn.mp3.mp3?jjjH`);
        this.load.audio('press', `https://play.rosebud.ai/assets/Scratch Chirp 5.wav.wav?w1Gv`);
        
    }

    create() {
        this.image1 = this.add.image(400, 280, 'start_img').setAlpha(0); // Starting position of 'start_img'
        this.image2 = this.add.image(400, 300, 'start_text_img').setAlpha(0); // Initial state of 'start_text_img'
        this.image3 = this.add.image(400, 300, 'spacebar_img').setAlpha(0); // Initial state of 'spacebar_img'

        // Play the music
        this.music = this.sound.add('music_1');
        this.music.play({
            loop: true // Loop the music
        });

    
        // Tween for moving 'start_img' down and fading in
        this.tweens.add({
            targets: this.image1,
            y: '+=20',
            alpha: 1,
            delay: 0,
            duration: 3000
        });

        // Tween for fading in 'start_text_img'
        this.tweens.add({
            targets: this.image2,
            alpha: 1,
            delay: 1500,
            duration: 2000,
        });

        // Tween for fading in 'spacebar_img'
        this.tweens.add({
            targets: this.image3,
            alpha: 1,
            delay: 3100,
            duration: 2000,
       
        });
            // Tween for making 'spacebar_img' flash

        this.tweens.add({
            targets: this.image3,
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            delay: 2500,
            duration: 700,
        });

        // Transition to 'Storybook' scene on spacebar press
        this.input.keyboard.on('keydown-SPACE', () => {
            this.sound.play('press');
            this.image1.destroy();
            this.image2.destroy();
            this.image3.destroy();
            this.scene.start('Storybook');
        });
    }
}

class Storybook extends Phaser.Scene {
    constructor() {
        super({ key: 'Storybook' });
        this.hitCount = 0
    }

    preload() {
        this.load.image('scene2_background', `https://play.rosebud.ai/assets/Scene2_background.png.png?z8kL`)
        this.load.image('story1_img', `https://play.rosebud.ai/assets/story1_img.png.png?doct`);
        this.load.image('story2_img', `https://play.rosebud.ai/assets/story2_img.png.png?u6yu`);
        this.load.image('story3_img', `https://play.rosebud.ai/assets/story3_img.png.png?8vFZ`);
        this.load.image('beginText_img', `https://play.rosebud.ai/assets/beginText_img.png.png?Q3qT`);
        this.load.audio('press', `https://play.rosebud.ai/assets/Scratch Chirp 5.wav.wav?w1Gv`);
    }


    create() {
        this.hitCount = 0; 
        this.scene2_background = this.add.image(400, 300, 'scene2_background');
        this.story1_img = this.add.image(400, 300, 'story1_img');
        this.story2_img = this.add.image(400, 300, 'story2_img').setAlpha(0);
        this.story3_img = this.add.image(400, 300, 'story3_img').setAlpha(0);
        this.beginText_img = this.add.image(400, 300, 'beginText_img').setAlpha(0);

        this.tweens.add({
            targets: this.scene2_background,
            y: '+=400',
            alpha: 1,
            delay: 0,
            duration: 15000
        });

        this.tweens.add({
            targets: this.story1_img,
            alpha: 1,
            delay: 2000,
            duration: 3000,
        });

        this.tweens.add({
            targets: this.story2_img,
            alpha: 1,
            delay: 100,
            duration: 200,
            onComplete: () => {
                this.tweens.add({
                    targets: this.story2_img,
                    alpha: 0,
                    delay: 2000,
                    duration: 2000,
                    onComplete: () => {
                        this.tweens.add({
                            targets: this.story3_img,
                            alpha: 1,
                            delay: 100,
                            duration: 200,
                            onComplete: () => {
                                this.tweens.add({
                                    targets: this.story3_img,
                                    alpha: 0,
                                    delay: 2000,
                                    duration: 2000,
                                    onComplete: () => {
                                        this.tweens.add({
                                            targets: this.beginText_img,
                                            alpha: 0.5,
                                            yoyo: true,
                                            repeat: -1,
                                            delay: 100,
                                            duration: 700,
                                        });
                                    },
                                });
                            },
                        });
                    },
                });
            },
        });


        this.input.keyboard.on('keydown-SPACE', () => {
            this.sound.play('press');
            this.story1_img.destroy();
            this.story2_img.destroy();
            this.beginText_img.destroy();

            // Stop the music
            this.scene.get('StartScreen').music.stop();
            this.scene.start('TheStorm');
        });
    }
}

//Begin Scene 3 - The Storm
class TheStorm extends Phaser.Scene {
    constructor() {
        super({ key: 'TheStorm' });
        this.hitCount = 0;
        this.gameStartedTime = 0; // keeps track of scene length to increase bricks
        this.platformHits = new Map(); // keeps track of the number of hits per platform
        this.frowns = []; // keeps track of all frowns

        
    }

    preload() {
        this.load.image('background', `https://play.rosebud.ai/assets/background.png.png?qeC3`);
        this.load.image('platform', `https://play.rosebud.ai/assets/ground.png.png?FqCt`);
        this.load.image('player', `https://play.rosebud.ai/assets/Sprite.png.png?75bq`)
        this.load.image('playerjump', `https://play.rosebud.ai/assets/SpriteJump.png.png?BobA`);
        this.load.image('bottom_platform', `https://play.rosebud.ai/assets/bottom_platform.png.png?be2v`);
        this.load.image('brick', `https://play.rosebud.ai/assets/Rubble.png.png?juaB`);
        this.load.image('lightning', `https://play.rosebud.ai/assets/lightning.png.png?YEa2`);
        this.load.image('rain', `https://play.rosebud.ai/assets/raindrop.png.png?Ys74`);
        this.load.image('new_background', `https://play.rosebud.ai/assets/new_background.png.png?Lj29`)
        this.load.image('platform', `https://play.rosebud.ai/assets/ground.png.png?FqCt`); 
        this.load.image('wave', `https://play.rosebud.ai/assets/wave.png.png?Rcnj`);
        this.load.image('phone', `https://play.rosebud.ai/assets/DDH_Phone_small.png.png?jIpN`); 
        this.load.image('heart', `https://play.rosebud.ai/assets/heart.png.png?qdIv`);
        this.load.image('chat', `https://play.rosebud.ai/assets/text_bubble_small.png.png?8NNs`);  
        this.load.image('button', `https://play.rosebud.ai/assets/button.png.png?xbgV`); 
        this.load.image('message', `https://play.rosebud.ai/assets/Message_1.png.png?ryYj`);
        this.load.image('press_spacebar', `https://play.rosebud.ai/assets/Message_2.png.png?1MwJ`);
        this.load.image('pixel', `https://play.rosebud.ai/assets/pixel.png.png?uLpZ`);
        this.load.image('frown_img', `https://play.rosebud.ai/assets/frown.png.png?xGQR`);
       // Music and SFX
        this.load.audio('seniorScam', `https://play.rosebud.ai/assets/NightNight.mp3.mp3?csyZ`); 
        this.load.audio('boing', `https://play.rosebud.ai/assets/Bend Resistor.wav.wav?UFg0`);
        this.load.audio('blip', `https://play.rosebud.ai/assets/Click Bodzin 2.wav.wav?aZLs`)
        this.load.audio('hit', `https://play.rosebud.ai/assets/SFX Quainted.wav.wav?sQYM`);
        this.load.audio('swoop', `https://play.rosebud.ai/assets/Chord EasySpook.wav.wav?Eg97`); 
    }


   create ()
    {
        this.hitCount = 0
        this.physics.world.setBounds(0, -this.scale.height, this.scale.width, this.scale.height * 2); 
        this.cameras.main.setBounds(0, -this.scale.height, this.scale.width, this.scale.height * 2); 

        this.background = this.add.image(400, 300, 'background');
        this.background.setScrollFactor(0);

        const backgroundHeight = this.background.displayHeight;
        const gameHeight = this.scale.height;

        this.tweens.add({
            targets: this.background,
            y: gameHeight - backgroundHeight / 2,
            duration: 80000,
            yoyo: true,
            repeat: -1
            
        });

        this.time.addEvent({
            delay: 20,
            callback: () => {
                const colors = [0xffffff,0x0000ff];
                const color = Phaser.Math.RND.pick(colors);
                if(this.background.texture.key !== 'new_background') {
                    this.background.setTint(color);
                }
            },
            callbackScope: this,
            loop: true
            
        });

        // Initialize the platform hit counts
        [this.leftPlatform, this.rightPlatform, this.higherLeftPlatform, this.higherRightPlatform, 
        this.highestLeftPlatform, this.highestRightPlatform].forEach(platform => {
            this.platformHits.set(platform, 0);
        });

        this.platforms = this.physics.add.staticGroup();
        const platform = this.platforms.create(this.scale.width / 2, this.scale.height - 32, 'platform');
        platform.displayWidth = this.scale.width;
        platform.refreshBody();
        platform.body.checkCollision.down = false;
        platform.body.checkCollision.left = false;
        platform.body.checkCollision.right = false;

        const platformWidth = 100;
        const platformHeight = this.scale.height / 2 + 150;

        this.leftPlatform = this.platforms.create(platformWidth / 1, platformHeight, 'platform');
        this.leftPlatform.displayWidth = platformWidth;
        this.leftPlatform.refreshBody();
        this.leftPlatform.body.checkCollision.down = false;
        this.leftPlatform.body.checkCollision.left = false;
        this.leftPlatform.body.checkCollision.right = false;

        this.rightPlatform = this.platforms.create(this.scale.width - platformWidth / 1, platformHeight, 'platform');
        this.rightPlatform.displayWidth = platformWidth;
        this.rightPlatform.refreshBody();
        this.rightPlatform.body.checkCollision.down = false;
        this.rightPlatform.body.checkCollision.left = false;
        this.rightPlatform.body.checkCollision.right = false;

        const highPlatformHeight = platformHeight - 100;

        this.higherLeftPlatform = this.platforms.create(platformWidth / 2 + 150, highPlatformHeight, 'platform');
        this.higherLeftPlatform.displayWidth = platformWidth;
        this.higherLeftPlatform.refreshBody();
        this.higherLeftPlatform.body.checkCollision.down = false;
        this.higherLeftPlatform.body.checkCollision.left = false;
        this.higherLeftPlatform.body.checkCollision.right = false;

        this.higherRightPlatform = this.platforms.create(this.scale.width - platformWidth / 2 - 150, highPlatformHeight, 'platform');
        this.higherRightPlatform.displayWidth = platformWidth;
        this.higherRightPlatform.refreshBody();
        this.higherRightPlatform.body.checkCollision.down = false;
        this.higherRightPlatform.body.checkCollision.left = false;
        this.higherRightPlatform.body.checkCollision.right = false;

        const highestPlatformHeight = platformHeight - 225;

        this.highestLeftPlatform = this.platforms.create(platformWidth / 2 + 250, highestPlatformHeight, 'platform');
        this.highestLeftPlatform.displayWidth = platformWidth;
        this.highestLeftPlatform.refreshBody();
        this.highestLeftPlatform.body.checkCollision.down = false;
        this.highestLeftPlatform.body.checkCollision.left = false;
        this.highestLeftPlatform.body.checkCollision.right = false;

        this.highestRightPlatform = this.platforms.create(this.scale.width - platformWidth / 2 - 250, highestPlatformHeight, 'platform');
        this.highestRightPlatform.displayWidth = platformWidth;
        this.highestRightPlatform.refreshBody();
        this.highestRightPlatform.body.checkCollision.down = false;
        this.highestRightPlatform.body.checkCollision.left = false;
        this.highestRightPlatform.body.checkCollision.right = false;

        this.player = this.physics.add.sprite(100, this.scale.height / 2, 'player').setScale(0.4);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.setGravityY(300);
        this.player.body.setSize(this.player.width/2, this.player.height);
       
        this.hitText = this.add.text(20, 20, 'Hits Left: ' + (10 - this.hitCount), { fontSize: '20px', fill: '#FFFF00' });
  
        // Animate the initial 'frown_img' sprite
        this.frownImg = this.physics.add.image(0, 0, 'frown_img').setAlpha(0);
  
        // Add overlap behavior between 'player' and 'frown_img'
        this.physics.add.overlap(this.player, this.frownImg, this.hitFrown, null, this);

       // Create a timed event to spawn new 'frown_img' sprites periodically
        this.time.addEvent({
            delay: Phaser.Math.Between(10000, 30000),
            callback: this.spawnFrown,
            callbackScope: this,
            loop: true
        });

        
        // Add the first wave at the bottom of the screen
        this.wave = this.addWave();

        // Set a timed event to add more waves at random intervals
        this.time.addEvent({
            delay: Phaser.Math.Between(3000, 10000), 
            callback: this.addWave,
            callbackScope: this,
            loop: true
            

        });

        this.physics.add.overlap(this.player, this.wave, this.hitWave, null, this);

        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.bricks = this.physics.add.group();
        this.physics.add.collider(this.bricks, this.platforms, this.brickHitPlatform, null, this); 
        this.physics.add.overlap(this.player, this.bricks, this.hitBrick, null, this);

        this.objects = this.physics.add.group();
        this.physics.add.collider(this.objects, this.platforms, this.objectHitPlatform, null, this); 
        this.physics.add.overlap(this.player, this.objects, this.hitObject, null, this);

        this.button = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'button').setVisible(false);
        this.message = this.add.image(this.scale.width / 2, this.scale.height / 2, 'message').setAlpha(0);
        this.pressSpacebar = this.add.image(this.scale.width / 2, this.scale.height / 2, 'press_spacebar').setAlpha(0);

       // Particle emitter for pixel burst
        this.particles = this.add.particles('pixel');
        this.emitter = this.particles.createEmitter({
            angle: { min: 0, max: 360 },
            speed: { min: -100, max: 100 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        this.emitter.stop();
        
        this.dropBrickEvent = this.time.addEvent({
            delay: 1000,
            callback: this.dropBrick,
            callbackScope: this,
            loop: true
        });
        this.music = this.sound.add('seniorScam');
        this.music.addMarker({
            name: 'intro',
            start: 0,
            loop: true
           
        });
        this.music.play('intro', { loop: true });
              
      
    }

    update ()

    
    {

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
            this.player.flipX = true; 
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
            this.player.flipX = false; 
        }
        else
        {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.sound.play('boing');
            this.player.setTexture('playerjump'); 
            this.player.setVelocityY(-400);
        }
        else if (this.player.body.touching.down)
        {
            this.player.setTexture('player'); 
        }

        if (this.frownImg.alpha > 0) {
            // Animate the horizontal movement of 'frown_img'
            this.frownImg.x += this.scale.width / (2 * 60); // Move from one side to the other in 2 seconds at 60 FPS

            // Make 'frown_img' move in a circular arc
            this.frownImg.y = (Math.sin(this.frownImg.x / this.scale.width * Math.PI) * this.scale.height / 2) + this.scale.height / 2;

        }

         if (this.hitCount >= 10) { 
            this.sound.play('swoop');
            this.music.stop('Intro');
            this.scene.start('Intermission');
        }


        if ((this.initialStart) && !this.spacebarPressed)
        {
            if (Phaser.Input.Keyboard.JustDown(this.cursors.space))
            {
                this.spacebarPressed = true;
                this.initialStart = false;
                this.background.setTexture('new_background');

                if (!this.dropObjectEvent)
                {
                    this.dropObjectEvent = this.time.addEvent({
                        delay: 1000,
                        callback: this.dropObject,
                        callbackScope: this,
                        loop: true
                    });
                }
                else
                {
                    this.dropObjectEvent.paused = false;
                }

                this.dropBrickEvent.paused = false;

                this.tweens.add({
                    targets: [this.button, this.message, this.pressSpacebar],
                    alpha: 0,
                    duration: 2000,
                });
            }
        }
    }

    addWave ()
    {
        const wave = this.physics.add.image(0, 0, 'wave');
        wave.y = this.scale.height - wave.displayHeight / .8; 
        wave.setVelocityX(this.scale.width / 2); 
        wave.body.allowGravity = false; 

        this.physics.add.overlap(this.player, wave, this.hitWave, null, this);
        return wave;
    }

    
    dropBrick ()
    {
        let bricksPerDrop = 1.5;

        if (this.time.now - this.gameStartedTime >= 100000) {
        bricksPerDrop *= 2; // Double the number of bricks dropped

        
    }

   if (this.time.now - this.gameStartedTime >= 400000) {
        bricksPerDrop *= 3; // Double the number of bricks dropped
  
    }

      if (this.time.now - this.gameStartedTime >= 500000) {
        bricksPerDrop *= 3.5; // Double the number of bricks dropped
  
    }





        for(let i = 0; i < bricksPerDrop; i++){
            const x = (Math.random() * this.cameras.main.width);
            const brickTypes = ['brick', 'rain', 'lightning'];
            const brickType = brickTypes[Math.floor(Math.random() * brickTypes.length)];
            const brick = this.bricks.create(x, 30, brickType);

            let velocityY = Phaser.Math.Between(50, 100);
            if (brickType === 'lightning') {
                velocityY = Phaser.Math.Between(150, 200); 
            }
            brick.setVelocityY(velocityY);
            brick.setBounce(1);
            brick.setCollideWorldBounds(true);
            brick.allowGravity = false;

            const rotation = Phaser.Math.Between(-10, 10) * 0.01;
            brick.rotation = rotation;
            
            if(brickType === 'lightning') {
                brick.setScale(0.5);
                this.tweens.add({
                    targets: brick,
                    scaleX: 1.5,
                    scaleY: 1.5,
                    y: this.scale.height - brick.height / 2,
                    duration: (this.scale.height / velocityY) * 1000
                });

                this.tweens.add({
                    targets: brick,
                    x: "+=10",
                    yoyo: true,
                    repeat: -1,
                    duration: 100
                });
            }
        }
    }


    


    dropObject ()
    {
        const x = (Math.random() * this.cameras.main.width);
        const types = ['phone', 'heart', 'chat'];
        const type = types[Math.floor(Math.random() * types.length)];
        const object = this.objects.create(x, 16, type);
        object.setGravityY(300);
        object.setVelocityY(Phaser.Math.Between(50, 100));
        object.setBounce(1);
        object.setCollideWorldBounds(true);
    }



    spawnFrown() {

                // Update active frowns
        for (let frown of this.frowns) {
            if (frown.active) {
                frown.x += frown.body.velocity.x / 60;
                frown.y += frown.body.velocity.y / 60;
            }
        }
    
        // Create a new 'frown_img' sprite at a random position
    const newFrown = this.physics.add.image(Phaser.Math.Between(0, this.scale.width), Phaser.Math.Between(this.scale.height / 3, this.scale.height), 'frown_img');
        // Set the velocity of 'frown_img'
        newFrown.setVelocity(Phaser.Math.Between(100, 300), Phaser.Math.Between(100, 300));
        // Enable 'frown_img' to move
        newFrown.body.allowGravity = false;
        // When 'frown_img' hits the edges of the screen, make it bounce
        newFrown.setCollideWorldBounds(true);
        newFrown.setBounce(1, 1);

        // Add overlap behavior between 'player' and 'frown_img'
        this.physics.add.overlap(this.player, newFrown, this.hitFrown, null, this);

        // Add newFrown to the array of frowns
        this.frowns.push(newFrown);

        // Add a timed event to remove 'frown_img' after 20000ms if it hasn't collided with the player
        this.time.addEvent({
            delay: 20000,
            callback: function () {
                if (newFrown.active) {
                    newFrown.disableBody(true, true);
                    // Remove the frown from the frowns array
                    this.frowns = this.frowns.filter(frown => frown !== newFrown);
                }
            },
            callbackScope: this,
        });
    }


    hitFrown(player, frownImg) {
         this.sound.play('hit');
         this.hitCount += 1;
         this.hitText.setText('Hits Left: ' + (10 - this.hitCount));
        // Disable 'frown_img' immediately after collision
        frownImg.disableBody(true, true);

        // Creating a time event to enable 'frown_img' after 2000ms
        this.time.addEvent({
            delay: 20000,
            callback: function() { frownImg.enableBody(true, frownImg.x, 0, true, true); },
            callbackScope: this,
        });

        this.hitCount += 1;
        player.setScale(player.scale * 0.8);
        this.cameras.main.shake(500, 0.005);
    }

    hitWave (player, wave)
    {
        wave.disableBody(true, true);
        this.sound.play('hit');
        this.hitCount += 1;
        this.hitText.setText('Hits Left: ' + (10 - this.hitCount));
        player.setScale(player.scale * 0.8); 
        this.cameras.main.shake(1000, 0.005);   
    }

    hitBrick(player, brick) {
    brick.disableBody(true, true);
    this.sound.play('hit');
    this.hitCount += 1; //Move this line above the next one
    this.hitText.setText('Hits Left: ' + (10 - this.hitCount));
        player.setScale(player.scale * 0.8); 
        this.cameras.main.shake(500, 0.005);
    }

    hitObject (player, object)
    {
        object.destroy();
        player.setScale(player.scale * 1.1);
    }

    brickHitPlatform (brick, platform) {
        this.sound.play('blip');
        brick.destroy();
        if (platform === this.leftPlatform || platform === this.rightPlatform ||
            platform === this.higherLeftPlatform || platform === this.higherRightPlatform ||
            platform === this.highestLeftPlatform || platform === this.highestRightPlatform) {

            const hitCount = this.platformHits.get(platform) || 0;
            if (hitCount < 2) {
                // Shrink the platform by 25%
                platform.displayWidth *= 0.75;
                platform.refreshBody();
                this.platformHits.set(platform, hitCount + 1);
            } else {
                // The platform has been hit 3 times, so we destroy it
                platform.destroy();
            }
            this.emitter.setPosition(platform.x, platform.y);
            this.emitter.explode(50, platform.x, platform.y);
        }
        else if (platform.y === this.scale.height - 32) {
            this.emitter.setPosition(brick.x, brick.y);
            this.emitter.explode(50, brick.x, brick.y);
        }
    }

    objectHitPlatform (object, platform)
    {
        object.destroy();
    }

}

//Begin Scene 4
class Intermission extends Phaser.Scene {
    constructor() {
        super({ key: 'Intermission' });
    }

    preload() {
        this.load.image('new_background', `https://play.rosebud.ai/assets/new_background.png.png?Lj29`);
        this.load.image('message1_img', `https://play.rosebud.ai/assets/Message_1.png.png?ryYj`);
        this.load.image('message2_img', `https://play.rosebud.ai/assets/Message_2.png.png?1MwJ`);
        this.load.image('message3_img', `https://play.rosebud.ai/assets/Message_3.png.png?8qB2`);
        this.load.image('message4_img', `https://play.rosebud.ai/assets/spacebar_img.png.png?uorQ`);
        this.load.audio('chill_song', `https://play.rosebud.ai/assets/12 Pat of Butter.mp3.mp3?qLOA`);
    }

    create() {

        // Play the music
        this.music = this.sound.add('chill_song');
        this.music.play({
            loop: true // Loop the music
        });
    
        this.message1 = this.add.image(400, 300, 'new_background');
        this.message1 = this.add.image(400, 300, 'message1_img');
        this.message2 = this.add.image(400, 300, 'message2_img').setAlpha(0);
        this.message3 = this.add.image(400, 300, 'message3_img').setAlpha(0);
        this.message4 = this.add.image(400, 300, 'message4_img').setAlpha(0);

        this.tweens.add({
            targets: this.message1,
            alpha: 0,
            delay: 2000,
            duration: 2000,
            onComplete: () => {
                this.tweens.add({
                    targets: this.message2,
                    alpha: { from: 0, to: 1 },
                    delay: 0,
                    duration: 2000,
                    yoyo: true,
                    onComplete: () => {
                        this.tweens.add({
                            targets: this.message3,
                            alpha: 1,
                            delay: 0,
                            duration: 2000,
                            onComplete: () => {
                                this.tweens.add({
                                    targets: this.message4, // Correct the asset name here
                                     alpha: 0.8,
                                     yoyo: true,
                                     repeat: -1,
                                    delay: 0,
                                    duration: 2000,
                                });
                            }
                        });
                    }
                });
            }
        });
        
        this.input.keyboard.on('keydown-SPACE', () => {
            this.message1.destroy();
            this.message2.destroy();
            this.message3.destroy();
            this.message4.destroy();
            // Stop the music
            this.music.stop('chill_song');
            this.scene.start('StrengthAfter');
        });
    }
}

class StrengthAfter extends Phaser.Scene {
    constructor() {
        super({ key: 'StrengthAfter' });
        this.hitCount = 1; // Initialize hit count
    }

    preload() {
        this.load.image('newbackground', `https://play.rosebud.ai/assets/start_img.png.png?jCtW`);
        this.load.image('platform', `https://play.rosebud.ai/assets/ground.png.png?FqCt`);
        this.load.image('player', `https://play.rosebud.ai/assets/Sprite.png.png?75bq`);
        this.load.image('playerjump', `https://play.rosebud.ai/assets/SpriteJump.png.png?BobA`);
        this.load.image('bottom_platform', `https://play.rosebud.ai/assets/bottom_platform.png.png?be2v`);
        this.load.image('chat', `https://play.rosebud.ai/assets/text_bubble_small.png.png?8NNs`);
        this.load.audio('boing', `https://play.rosebud.ai/assets/Scratch Chirp 5.wav.wav?w1Gv`);
        this.load.image('new_background', `https://play.rosebud.ai/assets/new_background.png.png?Lj29`);
        this.load.image('phone', `https://play.rosebud.ai/assets/DDH_Phone_small.png.png?jIpN`);
        this.load.image('heart', `https://play.rosebud.ai/assets/heart.png.png?qdIv`);
        this.load.image('button', `https://play.rosebud.ai/assets/button.png.png?xbgV`);
        this.load.image('message', `https://play.rosebud.ai/assets/Message_1.png.png?ryYj`);
        this.load.image('press_spacebar', `https://play.rosebud.ai/assets/Message_2.png.png?1MwJ`);
        this.load.image('flower1', `https://play.rosebud.ai/assets/Flower3.png.png?suzt`);
        this.load.image('flower2', `https://play.rosebud.ai/assets/Flower2.png.png?R8iU`);
        this.load.image('flower3', `https://play.rosebud.ai/assets/Flower1.png.png?1i98`);
        this.load.audio('music_2', `https://play.rosebud.ai/assets/01 In a Fruity Jam.mp3.mp3?ki8h`);
        this.load.image('pixel', `https://play.rosebud.ai/assets/pixel.png.png?uLpZ`);
        this.load.audio('blip', `https://play.rosebud.ai/assets/Bend Resistor.wav.wav?UFg0`);
    }

    create() {
        this.hitCount = 0; // Reset hit count at the beginning of each game
        this.physics.world.setBounds(0, -this.scale.height, this.scale.width, this.scale.height * 2);
        this.cameras.main.setBounds(0, -this.scale.height, this.scale.width, this.scale.height * 2);

        this.background = this.add.image(400, 300, 'newbackground');
        this.background.setScrollFactor(0);

        const backgroundHeight = this.background.displayHeight;
        const gameHeight = this.scale.height;

        this.flowers = this.physics.add.staticGroup();

        this.tweens.add({
            targets: this.background,
            y: gameHeight - backgroundHeight / 2,
            duration: 40000,
            yoyo: true,
            repeat: -1
            
        });

        this.platforms = this.physics.add.staticGroup();
        const platform = this.platforms.create(this.scale.width / 2, this.scale.height - 32, 'platform');
        platform.displayWidth = this.scale.width;
        platform.refreshBody();
        platform.body.checkCollision.down = false;
        platform.body.checkCollision.left = false;
        platform.body.checkCollision.right = false;

        const platformWidth = 100;
        const platformHeight = this.scale.height / 2 + 150;

        this.player = this.physics.add.sprite(100, this.scale.height / 2, 'player').setScale(0.2);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.setGravityY(300);
        this.player.body.setSize(this.player.width / 2, this.player.height);

        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.bricks = this.physics.add.group();
        this.physics.add.collider(this.bricks, this.platforms, this.brickHitPlatform, null, this);
        this.physics.add.overlap(this.player, this.bricks, this.hitBrick, null, this);

        this.objects = this.physics.add.group();
        this.physics.add.collider(this.objects, this.platforms, this.objectHitPlatform, null, this);
        this.physics.add.overlap(this.player, this.objects, this.hitObject, null, this);

        this.button = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'button').setVisible(false);
        this.message = this.add.image(this.scale.width / 2, this.scale.height / 2, 'message').setAlpha(0);
        this.pressSpacebar = this.add.image(this.scale.width / 2, this.scale.height / 2, 'press_spacebar').setAlpha(0);

        // Particle emitter for pixel burst
        this.particles = this.add.particles('pixel');
        this.emitter = this.particles.createEmitter({
            angle: { min: 0, max: 360 },
            speed: { min: -100, max: 100 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        this.emitter.stop();

        this.dropBrickEvent = this.time.addEvent({
            delay: 1000,
            callback: this.dropBrick,
            callbackScope: this,
            loop: true
        });
        this.music = this.sound.add('music_2');
        this.music.addMarker({
            name: 'music_2',
            start: 0,
        });
        this.music.play('music_2', { loop: true });
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.flipX = true;
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.flipX = false;
        }
        else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setTexture('playerjump');
            this.player.setVelocityY(-400);
        }
        else if (this.player.body.touching.down) {
            this.player.setTexture('player');
        }

        if ((this.initialStart) && !this.spacebarPressed) {
            if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
                this.spacebarPressed = true;
                this.initialStart = false;
                this.background.setTexture('new_background');

                if (!this.dropObjectEvent) {
                    this.dropObjectEvent = this.time.addEvent({
                        delay: 1000,
                        callback: this.dropObject,
                        callbackScope: this,
                        loop: true
                    });
                }
                else {
                    this.dropObjectEvent.paused = false;
                }

                this.dropBrickEvent.paused = false;

                this.tweens.add({
                    targets: [this.button, this.message, this.pressSpacebar],
                    alpha: 0,
                    duration: 2000,
                });
            }
        }

    }

     dropBrick() {
        const bricksPerDrop = 1;

        for (let i = 0; i < bricksPerDrop; i++) {
            const x = (Math.random() * this.cameras.main.width);
            const brickTypes = ['phone', 'heart', 'chat'];
            const brickType = brickTypes[Math.floor(Math.random() * brickTypes.length)];
            const brick = this.bricks.create(x, 4, brickType);

            let velocityY = Phaser.Math.Between(1, 10);

            brick.setVelocityY(velocityY);
            brick.setBounce(3);
            brick.setCollideWorldBounds(true);
            brick.allowGravity = false;

            const rotation = Phaser.Math.Between(-10, 10) * 0.01;
            brick.rotation = rotation;

            if (brickType === 'chat', 'phone', 'heart') {
                brick.setScale(0.5);
            }
        }
    }



hitBrick(player, brick) {
        brick.disableBody(true, true);
        this.sound.play('blip');

        if(this.cursors.up.isDown) {
            player.setScale(player.scale * 1.3);
        } else {
	     player.setScale(player.scale * 1.3);
            const platform = this.platforms.getChildren()[0];
            player.y = platform.y - player.displayHeight / 1 - platform.displayHeight / 1;
            player.body.reset(player.x, player.y);
        }

        this.cameras.main.shake(500, 0.005);

        this.hitCount += 1; // Increment hit count

        if (this.hitCount >= 10) {
            this.scene.start('Congratulations');
        }
    }


    hitObject(player, object) {
        object.destroy();
        player.setScale(player.scale * 1.1);
    }

    brickHitPlatform(brick, platform) {
        brick.destroy();

        const flowerTypes = ['flower1', 'flower2', 'flower3'];
        const flowerType = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];

        // Create a new flower sprite at the exact point of collision and make it 30% smaller
        this.flower = this.flowers.create(brick.x, platform.y - platform.displayHeight, flowerType).setScale(0.6);

        brick.destroy();

        if (platform === this.leftPlatform || platform === this.rightPlatform ||
            platform === this.higherLeftPlatform || platform === this.higherRightPlatform ||
            platform === this.highestLeftPlatform || platform === this.highestRightPlatform) {

            this.emitter.setPosition(platform.x, platform.y);
            this.emitter.explode(50, platform.x, platform.y);

            platform.destroy();
        }
        else if (platform.y === this.scale.height - 32) {
            this.emitter.setPosition(brick.x, brick.y);
            this.emitter.explode(50, brick.x, brick.y);
        }
    }

    objectHitPlatform(object, platform) {
        object.destroy();
    }   
}
class Congratulations extends Phaser.Scene {
    constructor() {
        super({ key: 'Congratulations' });
    }

    preload() {
        this.load.image('player', `https://play.rosebud.ai/assets/Sprite.png.png?75bq`);
        this.load.image('playerjump', `https://play.rosebud.ai/assets/SpriteJump.png.png?BobA`);
        this.load.image('end_background', `https://play.rosebud.ai/assets/end_background.png.png?PZEB`);
        this.load.image('bottom_bar', `https://play.rosebud.ai/assets/BottomBar.png.png?S5wd`);
        this.load.image('end_text_img', `https://play.rosebud.ai/assets/Message1.png.png?QJpu`);
        this.load.image('playagain_img', `https://play.rosebud.ai/assets/BottomMessage.png.png?amPj`);
    }


    create() {
        this.player = this.add.image(400, 300, 'player').setScale(2.8); // Make player 3 times bigger
        this.end_background = this.add.image(400, 300, 'end_background').setAlpha(0);
        this.bottom_bar = this.add.image(400, 300, 'bottom_bar').setAlpha(0);
        this.end_text_img = this.add.image(400, 300, 'end_text_img').setAlpha(0);
        this.playagain_img = this.add.image(400, 300, 'playagain_img').setAlpha(0);

        // Alternate between 'player' and 'playerjump' for 2 seconds
        for (let i = 0; i < 10; i++) {
            this.time.delayedCall(i * 200, () => {
                this.player.setTexture(i % 2 === 0 ? 'playerjump' : 'player');
            });
        }

        // Tween for making player move up and down slightly
        this.tweens.add({
            targets: this.player,
            y: '+=20',
            duration: 300,
            yoyo: true,
            repeat: -1
        });


        // Start the tween after 2 seconds
        this.time.delayedCall(2000, () => {
            this.tweens.add({
                targets: this.end_background,
                y: this.end_background.y - this.end_background.height / 2 + this.scale.height,
                ease: 'Linear',
                duration: 10000,
            });
        });


        // Fade in all images
        const fadeInDuration = 1000;
        this.tweens.add({
            targets: [this.end_background, this.bottom_bar, this.end_text_img, this.playagain_img],
            alpha: 1,
            delay: 2000,
            duration: fadeInDuration,
        });
        
        // Tween for making 'playagain_img' flash
        this.tweens.add({
            targets: this.playagain_img,
            alpha: 0.5,
            yoyo: true,
            repeat: -1,
            delay: 2500 + fadeInDuration,
            duration: 700,
        });
         
        this.input.keyboard.on('keydown-ENTER', () => {
            window.location.href = 'https://strengthafterdisaster.org/';
        });



                this.input.keyboard.on('keydown-SPACE', () => {
            this.end_background.destroy();
            this.bottom_bar.destroy();
            this.end_text_img.destroy();
            this.playagain_img.destroy();
            // Stop the music
            this.scene.get('StrengthAfter').music.stop();
            this.scene.start('Storybook');
        });
    }
}


const config = {
    type: Phaser.AUTO,
    parent: 'renderDiv',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [StartScreen, Storybook, TheStorm, Intermission, StrengthAfter, Congratulations]
};

window.phaserGame = new Phaser.Game(config);