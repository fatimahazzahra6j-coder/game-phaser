let game;

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  preload() {
    this.load.image("bg1", "assetf/image/bg1.png");
    this.load.image("btn", "assetf/image/play.png");
    this.load.image("teks", "assetf/image/SkyGuardian.png");
    this.load.image("info", "assetf/image/info.png");
    this.load.image("teksplay", "assetf/image/teksplay.png");
    this.load.image("credit", "assetf/image/credit.png");
    this.load.image("flare", "assetf/image/flare.png");

    this.load.audio(
      "bgMusic",
      "assetf/audio/magical-technology-sci-fi-science-futuristic-game-music-300607.mp3"
    );
    this.load.audio("clickSFX", "assetf/audio/soundtombol.mp3");
  }

  create() {
    const bg = this.add.image(0, 0, "bg1").setOrigin(0, 0);
    bg.displayWidth = this.sys.game.config.width;
    bg.displayHeight = this.sys.game.config.height;

    this.music = this.sound.add("bgMusic", { loop: true, volume: 0.3 });
    this.music.play();

    const clickSFX = this.sound.add("clickSFX", { volume: 0.1 });

    const titlegame = this.add
      .image(window.innerWidth / 2, 55, "teks")
      .setScale(0)
      .setDepth(11);
    this.tweens.add({
      targets: titlegame,
      ease: "Back",
      duration: 500,
      delay: 200,
      scaleX: 0.6,
      scaleY: 0.6,
    });

    const btn = this.add
      .image(window.innerWidth / 2, 275, "btn")
      .setInteractive()
      .setScale(0);
    this.tweens.add({
      targets: btn,
      ease: "Back",
      duration: 500,
      delay: 400,
      scaleX: 0.7,
      scaleY: 0.7,
    });

    this.input.on("gameobjectup", (pointer, gameObject) => {
      if (gameObject === btn) {
        clickSFX.play();
        this.scene.start("PlayScene");
      }
    });

    const teksPlay = this.add
      .image(window.innerWidth / 2, 200, "teksplay")
      .setScale(0)
      .setDepth(11);
    this.tweens.add({
      targets: teksPlay,
      ease: "Back",
      duration: 500,
      delay: 600,
      scaleX: 0.5,
      scaleY: 0.5,
    });

    const infoIcon = this.add
      .image(1310, 50, "info")
      .setScale(0)
      .setDepth(20)
      .setInteractive();
    this.tweens.add({
      targets: infoIcon,
      ease: "Back",
      duration: 500,
      scaleX: 0.6,
      scaleY: 0.6,
    });

    infoIcon.on("pointerdown", () => {
      this.tweens.add({
        targets: infoIcon,
        ease: "Power2",
        duration: 100,
        scaleX: 0.8,
        scaleY: 0.8,
      });
    });

    infoIcon.on("pointerup", () => {
      this.tweens.add({
        targets: infoIcon,
        ease: "Power2",
        duration: 100,
        scaleX: 0.6,
        scaleY: 0.6,
      });
    });

    const creditImage = this.add
      .image(
        this.sys.game.config.width / 2,
        this.sys.game.config.height / 2,
        "credit"
      )
      .setDepth(30)
      .setVisible(false);

    infoIcon.on("pointerdown", () => {
      clickSFX.play();
      creditImage.setVisible(!creditImage.visible);
    });

    creditImage.setInteractive().on("pointerdown", () => {
      clickSFX.play();
      creditImage.setVisible(false);
    });
    // Setelah membuat titlegame
    const titleX = window.innerWidth / 2;
    const titleY = 55;

    const flare = this.add
      .image(titleX, titleY, "flare")
      .setScale(1.2)
      .setDepth(12)
      .setAlpha(0.6);

    // Tween efek denyut dan sapu
    this.tweens.add({
      targets: flare,
      alpha: { from: 0.3, to: 1 },
      scaleX: { from: 1, to: 1.5 },
      scaleY: { from: 1, to: 1.5 },
      yoyo: true,
      repeat: -1,
      duration: 1500,
      ease: "Sine.easeInOut",
    });

    // Efek sapuan horizontal melewati teks
    this.tweens.add({
      targets: flare,
      x: { from: titleX - 200, to: titleX + 200 },
      yoyo: true,
      repeat: -1,
      duration: 2000,
      ease: "Sine.easeInOut",
    });
  }
}

class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: "PlayScene" });
    this.highScore = 0;
  }

  init() {
    this.score = 0;
    this.lives = 3;
  }

  preload() {
    // Asset Gambar
    this.load.image("bg_far", "assetf/image/bg_far.png");
    this.load.image("bg_near", "assetf/image/bg_near.png");
    this.load.image("robot", "assetf/image/robot.png");
    this.load.image("bullet", "assetf/image/peluru.png");
    this.load.image("ufo", "assetf/image/ufo1.png");
    this.load.image("ufo2", "assetf/image/ufo2.png");
    this.load.image("ufo3", "assetf/image/ufo3.png");
    this.load.image("ufo4", "assetf/image/ufo4.png");
    this.load.image("isi", "assetf/image/credit.png");
    this.load.image("informasi", "assetf/image/info.png");
    this.load.image("flash", "assetf/image/flash.png");
    this.load.image("playagin", "assetf/image/playagin.png");
    this.load.image("gameover_bg", "assetf/image/gameover_bg.png");
    this.load.image("explosion", "assetf/image/Explosion.png");
    this.load.image("powerup", "assetf/image/PowerUp.png");

    // Audio
    this.load.audio("clickSFX", "assetf/audio/soundtombol.mp3");
    this.load.audio("shootSFX", "assetf/audio/single-gunshot-54-40780.mp3");
    this.load.audio("ufoShootSFX", "assetf/audio/pistol-shot-233473.mp3");
    this.load.audio("winnerSFX", "assetf/audio/level-win-6416.mp3");
    this.load.audio("loseSFX", "assetf/audio/game-over-38511.mp3");
  }

  create() {
    this.tweensList = [];
    this.timersList = [];

    // === Background ===
    this.bgFar = this.add
      .tileSprite(
        0,
        0,
        this.sys.game.config.width,
        this.sys.game.config.height * 0.8,
        "bg_far"
      )
      .setOrigin(0, 0);

    this.bgNear = this.add
      .tileSprite(
        0,
        this.sys.game.config.height * 0.8,
        this.sys.game.config.width,
        this.sys.game.config.height * 0.2,
        "bg_near"
      )
      .setOrigin(0, 0);

    // === Nyawa ===
    this.lives = 3;
    this.livesText = this.add
      .text(
        20,
        this.game.config.height - 10,
        "LIFE : " + "❤️".repeat(this.lives),
        { fontFamily: "Inter", fontSize: "40px", fill: "#fff" }
      )
      .setOrigin(0, 1)
      .setDepth(50);

    // === Audio ===
    this.clickSFX = this.sound.add("clickSFX", { volume: 0.1 });
    this.shootSFX = this.sound.add("shootSFX", { volume: 0.2 });
    this.ufoShootSFX = this.sound.add("ufoShootSFX", { volume: 0.2 });
    this.winnerSFX = this.sound.add("winnerSFX", { volume: 0.7 });
    this.loseSFX = this.sound.add("loseSFX", { volume: 0.7 });

    // === Info & Credit ===
    const infoIcon = this.add
      .image(this.sys.game.config.width - 50, 50, "informasi")
      .setScale(0)
      .setDepth(20)
      .setInteractive();

    const infoTween = this.tweens.add({
      targets: infoIcon,
      ease: "Back",
      duration: 500,
      scaleX: 0.6,
      scaleY: 0.6,
    });
    this.tweensList.push(infoTween);

    infoIcon.on("pointerdown", () => {
      this.tweens.add({
        targets: infoIcon,
        ease: "Power2",
        duration: 100,
        scaleX: 0.8,
        scaleY: 0.8,
      });
    });

    infoIcon.on("pointerup", () => {
      this.tweens.add({
        targets: infoIcon,
        ease: "Power2",
        duration: 100,
        scaleX: 0.6,
        scaleY: 0.6,
      });
    });

    const creditImage = this.add
      .image(
        this.sys.game.config.width / 2,
        this.sys.game.config.height / 2,
        "isi"
      )
      .setDepth(30)
      .setVisible(false);

    infoIcon.on("pointerdown", () => {
      this.clickSFX.play();
      creditImage.setVisible(!creditImage.visible);
    });
    creditImage.setInteractive().on("pointerdown", () => {
      this.clickSFX.play();
      creditImage.setVisible(false);
    });

    // === Robot ===
    this.robot = this.physics.add.sprite(
      this.sys.game.config.width / 2,
      this.sys.game.config.height - 150,
      "robot"
    );
    this.robot.setCollideWorldBounds(true);

    const robotTween = this.tweens.add({
      targets: this.robot,
      y: this.robot.y - 3,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    this.tweensList.push(robotTween);

    // === Flash ===
    this.flash = this.add
      .image(this.robot.x, this.robot.y - 50, "flash")
      .setVisible(false)
      .setScale(0.5)
      .setDepth(10);

    // === Kontrol ===
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // === Groups ===
    this.bullets = this.physics.add.group();
    this.ufos = this.physics.add.group();
    this.ufoBullets = this.physics.add.group();

    this.lastFired = 0;
    this.fireRate = 400;

    this.input.keyboard.on("keydown-SPACE", () =>
      this.shootToPointer(this.input.activePointer)
    );
    this.input.on("pointerdown", (pointer) => this.shootToPointer(pointer));

    // === Spawn UFO Timer ===
    const spawnTimer = this.time.addEvent({
      delay: 1000,
      callback: this.spawnUfo,
      callbackScope: this,
      loop: true,
    });
    this.timersList.push(spawnTimer);

    // === Physics Overlap ===
    this.physics.add.overlap(this.bullets, this.ufos, this.hitUfo, null, this);
    this.physics.add.overlap(
      this.robot,
      this.ufoBullets,
      (robot, bullet) => {
        bullet.destroy();
        this.loseLife();
      },
      null,
      this
    );

    // === Score ===
    this.scoreText = this.add
      .text(20, 20, "Score: 0", {
        fontFamily: "Inter",
        fontSize: "36px",
        fill: "#00FF00",
      })
      .setDepth(50);

    this.highScoreText = this.add
      .text(20, 60, "High Score: " + this.highScore, {
        fontFamily: "Inter",
        fontSize: "36px",
        fill: "#00FF00",
      })
      .setDepth(50);
    // === Game Over UI ===
    this.gameOverBg = this.add
      .image(
        this.sys.game.config.width / 2,
        this.sys.game.config.height / 2,
        "gameover_bg"
      )
      .setDepth(20)
      .setVisible(false);

    this.gameOverText = this.add
      .text(
        this.sys.game.config.width / 2,
        this.sys.game.config.height / 2 - 200,
        "Game Over !",
        {
          fontFamily: "Arial",
          fontSize: "64px",
          fill: "#FF0000",
          fontStyle: "bold",
        }
      )
      .setOrigin(0.5)
      .setDepth(100)
      .setVisible(false);

    this.finalScoreText = this.add
      .text(
        this.sys.game.config.width / 2,
        this.sys.game.config.height / 2 - 50,
        "SCORE: ",
        {
          fontFamily: "Arial",
          fontSize: "48px",
          fill: "#DDDDDD",
          fontStyle: "bold",
        }
      )
      .setOrigin(0.5)
      .setDepth(100)
      .setVisible(false);

    this.finalScoreValue = this.add
      .text(
        this.sys.game.config.width / 2 + 120,
        this.sys.game.config.height / 2 - 50,
        "0",
        {
          fontFamily: "Arial",
          fontSize: "48px",
          fill: "#FFFF00",
          fontStyle: "bold",
        }
      )
      .setOrigin(0.5)
      .setDepth(100)
      .setVisible(false);

    this.playAgainText = this.add
      .text(
        this.sys.game.config.width / 2,
        this.sys.game.config.height / 2 + 80,
        "PLAY AGAIN",
        {
          fontFamily: "Arial",
          fontSize: "40px",
          fill: "#DDDDDD",
          fontStyle: "bold",
        }
      )
      .setOrigin(0.5)
      .setDepth(100)
      .setVisible(false);

    this.playAgainBtn = this.add
      .image(
        this.sys.game.config.width / 2,
        this.sys.game.config.height / 2 + 150,
        "playagin"
      )
      .setOrigin(0.5)
      .setScale(0.4)
      .setDepth(100)
      .setVisible(false)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.clickSFX.play();
        this.scene.restart();
      });

    this.newHighScoreText = this.add
      .text(
        this.sys.game.config.width / 2,
        this.sys.game.config.height / 2 - 200,
        "NEW HIGH SCORE",
        {
          fontFamily: "inter",
          fontSize: "50px",
          fill: "#FFFF00",
          fontStyle: "bold",
        }
      )
      .setOrigin(0.5)
      .setDepth(100)
      .setVisible(false);

    this.congratsText = this.add
      .text(
        this.sys.game.config.width / 2,
        this.sys.game.config.height / 2 - 130,
        "CONGRATULATIONS!\nYOU ARE THE BEST SKY GUARDIAN!",
        {
          fontFamily: "inter",
          fontSize: "28px",
          fill: "#FFFF00",
          align: "center",
        }
      )
      .setOrigin(0.5)
      .setDepth(100)
      .setVisible(false);

    // === Pause ===
    this.pauseKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.P
    );
    this.isPaused = false;

    this.pauseText = this.add
      .text(
        this.sys.game.config.width / 2,
        this.sys.game.config.height / 2,
        "PAUSED\nPress P to continue",
        {
          fontFamily: "inter",
          fontSize: "48px",
          fill: "#FFFFFF",
          align: "center",
        }
      )
      .setOrigin(0.5)
      .setDepth(100)
      .setVisible(false);
  }

  update() {
    // Toggle pause
    if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) this.togglePause();
    if (this.isPaused || this.lives <= 0) return;

    // === Background scroll ===
    this.bgFar.tilePositionX += 0.2;

    // === Robot kontrol gabungan keyboard & mouse ===
    let moveX = 0;
    if (this.cursors.left.isDown || this.keys.left.isDown) moveX = -300;
    else if (this.cursors.right.isDown || this.keys.right.isDown) moveX = 300;

    if (moveX !== 0) {
      // Keyboard aktif → gunakan velocity
      this.robot.setVelocityX(moveX);
    } else {
      // Tidak ada keyboard → ikuti mouse pointer secara smooth
      const pointer = this.input.activePointer;
      const lerpFactor = 0.1; // kecepatan mengikuti mouse
      this.robot.x = Phaser.Math.Linear(this.robot.x, pointer.x, lerpFactor);
      this.robot.setVelocityX(0); // pastikan velocity keyboard mati
    }

    // === Bersihkan peluru di luar layar ===
    [this.bullets, this.ufoBullets].forEach((group) => {
      group.getChildren().forEach((b) => {
        if (
          b.y < -50 ||
          b.y > this.sys.game.config.height + 50 ||
          b.x < -50 ||
          b.x > this.sys.game.config.width + 50
        ) {
          b.destroy();
        }
      });
    });

    // === Update UFO behavior ===
    this.ufos.getChildren().forEach((ufo) => {
      // Zigzag
      if (ufo.getData("zigzag")) {
        ufo.x += 2 * ufo.getData("direction");
        if (ufo.x <= 50 || ufo.x >= this.sys.game.config.width - 50)
          ufo.setData("direction", -ufo.getData("direction"));
      }
      // Spiral
      if (ufo.getData("spiral")) {
        let angle = ufo.getData("angle") + 0.01;
        ufo.setData("angle", angle);
        ufo.x = ufo.getData("startX") + Math.sin(angle * 2) * 80;
      }
      // Jika UFO turun melewati bgNear → hilang & kurangi nyawa
      if (ufo.y >= this.bgNear.y) {
        ufo.destroy();
        this.loseLife();
      }
    });

    // === Flash mengikuti robot ===
    this.flash.setPosition(this.robot.x, this.robot.y - 50);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    this.pauseText.setVisible(this.isPaused);

    if (this.isPaused) {
      // Pause physics
      this.physics.pause();
      // Pause all tweens
      this.tweensList.forEach((tween) => tween.pause());
      // Pause all timers
      this.timersList.forEach((timer) => (timer.paused = true));
      // Pause sound
      this.sound.pauseAll();
    } else {
      // Resume physics
      this.physics.resume();
      // Resume all tweens
      this.tweensList.forEach((tween) => tween.resume());
      // Resume all timers
      this.timersList.forEach((timer) => (timer.paused = false));
      // Resume sound
      this.sound.resumeAll();
    }
  }

  spawnUfo() {
    // Tentukan UFO yang bisa muncul sesuai skor
    let possibleUfos = ["ufo", "ufo2"];
    if (this.score >= 300) possibleUfos.push("ufo3");
    if (this.score >= 500) possibleUfos.push("ufo4");

    const key = Phaser.Math.RND.pick(possibleUfos);

    const ufo = this.ufos.create(
      Phaser.Math.Between(50, this.sys.game.config.width - 50),
      -50,
      key
    );

    // Faktor kecepatan tambahan berdasarkan skor
    let speedFactor = 1 + this.score / 500; // misal: setiap 500 skor naik 1x kecepatan

    switch (key) {
      case "ufo":
        ufo.setScale(0.8).setVelocityY(70 * speedFactor);
        break;
      case "ufo2":
        ufo.setScale(1).setVelocityY(80 * speedFactor);
        this.time.addEvent({
          delay: 3000 / speedFactor, // UFO menembak lebih cepat saat skor tinggi
          loop: true,
          callback: () => {
            if (this.lives > 0 && ufo.active) this.shootUfo(ufo);
          },
          callbackScope: this,
        });
        break;
      case "ufo3":
        ufo.setScale(1).setVelocityY(100 * speedFactor);
        ufo.setData("zigzag", true);
        ufo.setData("direction", 1);
        break;
      case "ufo4":
        ufo.setScale(1.2).setVelocityY(120 * speedFactor);
        ufo.setData("spiral", true);
        ufo.setData("angle", 0);
        ufo.setData("startX", ufo.x);
        break;
    }

    ufo.setDepth(5);
  }

  shootToPointer(pointer) {
    if (this.lives <= 0) return;
    const now = this.time.now;
    if (now - this.lastFired < this.fireRate) return;

    const bullet = this.bullets.create(
      this.robot.x,
      this.robot.y - 50,
      "bullet"
    );
    const angle = Phaser.Math.Angle.Between(
      bullet.x,
      bullet.y,
      pointer.x,
      pointer.y
    );
    this.physics.velocityFromRotation(angle, 400, bullet.body.velocity);

    this.shootSFX.play();
    this.tweens.add({
      targets: this.robot,
      x: this.robot.x - 5,
      duration: 50,
      yoyo: true,
    });
    this.flash.setVisible(true);
    this.time.delayedCall(100, () => this.flash.setVisible(false));
    this.lastFired = now;
  }

  shootUfo(ufo) {
    const bullet = this.ufoBullets.create(ufo.x, ufo.y + 20, "bullet");
    this.physics.moveToObject(bullet, this.robot, 200);
    this.ufoShootSFX.play();
  }

  hitUfo(bullet, ufo) {
    bullet.destroy();
    ufo.destroy();

    const explosion = this.add
      .sprite(ufo.x, ufo.y, "explosion")
      .setScale(0.5)
      .setDepth(20);
    this.tweens.add({
      targets: explosion,
      scale: 1,
      alpha: 0,
      duration: 500,
      ease: "Cubic.easeOut",
      onComplete: () => explosion.destroy(),
    });

    this.score += ufo.texture.key === "ufo2" ? 20 : 10;
    this.scoreText.setText("Score: " + this.score);

    this.dropPowerup(ufo.x, ufo.y);
  }

  loseLife() {
    if (this.lives <= 0) return;
    this.lives -= 1;
    this.livesText.setText("LIFE: " + "❤️".repeat(this.lives));
    if (this.lives <= 0) this.gameOver();
  }
  dropPowerup(x, y) {
    if (Phaser.Math.Between(1, 100) <= 30) {
      const powerup = this.physics.add
        .sprite(x, y, "powerup")
        .setScale(0.6)
        .setVelocityY(100)
        .setDepth(10);
      powerup.body.setSize(powerup.width, powerup.height);

      this.physics.add.overlap(this.robot, powerup, () => {
        powerup.destroy();
        if (this.lives < 5) {
          this.lives++;
          this.livesText.setText("LIFE: " + "❤️".repeat(this.lives));
        }
      });

      this.physics.add.overlap(this.bullets, powerup, (b, p) => {
        b.destroy();
        p.destroy();
        if (this.lives < 5) {
          this.lives++;
          this.livesText.setText("LIFE: " + "❤️".repeat(this.lives));
        }
      });
    }
  }

  gameOver() {
    this.physics.pause();

    let isNewHigh = false;
    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.highScoreText.setText("High Score: " + this.highScore);
      isNewHigh = true;
    }

    this.gameOverBg.setVisible(true);
    this.finalScoreText.setVisible(true);
    this.finalScoreValue.setText(this.score).setVisible(true);
    this.playAgainText.setVisible(true);
    this.playAgainBtn.setVisible(true);

    if (isNewHigh) {
      this.newHighScoreText.setVisible(true);
      this.congratsText.setVisible(true);
      this.winnerSFX.play(); // 🔊 mainkan audio winner
    } else {
      this.gameOverText.setVisible(true);
      this.loseSFX.play(); // 🔊 mainkan audio kalah
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#2d2d2d",
  scene: [MenuScene, PlayScene],
  physics: {
    default: "arcade",
    arcade: { debug: false },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

window.onload = function () {
  game = new Phaser.Game(config);
};
