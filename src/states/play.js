import EnemyManager from '../entities/enemyManager'
import Player from '../entities/player'
import scaledDraw from '../scaledDraw'

export default {
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#41a744'
    game.physics.startSystem(Phaser.Physics.ARCADE)

    this.game.scale.setResizeCallback(scaledDraw.resize, this)
    scaledDraw.init.call(this)

    game.lives = 5
    game.score = 0

    game.topgate = game.add.tileSprite(0, 8, 64, 4, 'gate')

    game.enemies = new EnemyManager(game)
    game.player = new Player(game, 2, 14)

    game.bottomgate = game.add.tileSprite(0, 60, 64, 4, 'gate')

    game.lifeText = game.add.bitmapText(2, 1, 'font', game.lives.toString(), 5)
    game.scoreText = game.add.bitmapText(25, 1, 'font', game.score.toString(), 5)
    game.gameover = () => {
      game.state.start('menu', true, false)
    }
    game.loseLife = () => {
      game.lives -= 1
      if (game.lives < 0) {
        game.gameover()
      } else {
        game.lifeText.text = game.lives
      }
    }
    game.setScore = (score) => {
      game.score += score
      game.scoreText.text = game.score
    }
  },

  update(game) {
    const isDown = game.input.keyboard.isDown
    this.input.update(game)
    game.enemies.update()
    game.bottomgate.tilePosition.x -= 0.5
    game.topgate.tilePosition.x -= 0.5

    game.physics.arcade.overlap(game.player.sprite, game.enemies.group, (player, dog) => {
      dog.catch()
    })

    if (game.player.lasso.shooting) {
      game.physics.arcade.overlap(game.player.lasso, game.enemies.group, (player, dog) => {
        dog.pickup()
        game.setScore(50)
        game.enemies.spawn(dog.row)
        player.resetLasso()
      })
    }

    if (this.isDown('UP') || this.isDown('W')) {
      game.player.move(true)
    } else if (this.isDown('DOWN') || this.isDown('S')) {
      game.player.move()
    }
    if (this.isDown('SPACEBAR') || this.isDown('Z')) {
      game.player.shoot()
    }
    game.player.update()
  },

  isDown(key) {
    return this.game.input.keyboard.isDown(Phaser.Keyboard[key])
  },

  render(game) {
    game.debug.body(game.player.sprite)
    game.debug.body(game.player.lasso)
    game.enemies.dogs.forEach(dog => game.debug.body(dog.sprite))
    scaledDraw.render.call(this)
  }
}
