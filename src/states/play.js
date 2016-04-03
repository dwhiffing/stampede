import EnemyManager from '../entities/enemyManager'
import InputManager from '../entities/input'
import UserInterface from '../entities/ui'
import Player from '../entities/player'
import scaledDraw from '../scaledDraw'

export default {
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#41a744'
    game.physics.startSystem(Phaser.Physics.ARCADE)

    game.scale.setResizeCallback(scaledDraw.resize, this)
    scaledDraw.init.call(this)

    game.enemies = new EnemyManager(game)
    game.player = new Player(game, 2, 14)
    game.inputManager = new InputManager(game)
    game.ui = new UserInterface(game)
  },

  update(game) {
    game.inputManager.update()
    game.enemies.update()
    game.ui.update()
    game.input.update()
    game.player.update()

    game.physics.arcade.overlap(game.player.lasso, game.enemies.group, this._lassoCollide.bind(this))
    game.physics.arcade.overlap(game.player.sprite, game.enemies.group, this._dogCollide.bind(this))
  },

  _lassoCollide(lasso, dog) {
    if (this.game.player.lasso.shooting && dog.type !== 4) {
      dog.capture()
      this.game.ui.setScore(dog.score)
      this.game.enemies.trySpawn(dog.row)
      this.game.player.retractLasso()
    }
  },

  _dogCollide(player, dog) {
    if (dog.type >= 3) {
      this.game.player.buck()
    } else if (!this.game.player.sprite.invulnerable) {
      this.game.enemies.run(dog.row)
    }
  },

  render(game) {
    // this._drawBodies()
    scaledDraw.render.call(this)
  },

  _drawBodies() {
    game.debug.body(game.player.sprite)
    game.debug.body(game.player.lasso)
    game.enemies.dogs.forEach(dog => game.debug.body(dog.sprite))
  },
}
