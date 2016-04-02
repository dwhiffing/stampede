import EnemyManager from '../entities/enemyManager'
import Player from '../entities/player'
import scaledDraw from '../scaledDraw'


export default {
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#41a744'

    this.game.scale.setResizeCallback(scaledDraw.resize, this);
    scaledDraw.init.call(this);

    game.topgate = game.add.tileSprite(0, 8, 64, 4, 'gate');

    game.enemies = new EnemyManager(game)
    game.player = new Player(game, 2, 14)

    game.bottomgate = game.add.tileSprite(0, 60, 64, 4, 'gate');
  },

  update(game) {
    const isDown = game.input.keyboard.isDown
    this.input.update(game)
    game.bottomgate.tilePosition.x -= 0.5
    game.topgate.tilePosition.x -= 0.5

    if (this.isDown('UP') || this.isDown('W')) {
      game.player.move(true)
    } else if (this.isDown('DOWN') || this.isDown('S')) {
      game.player.move()
    }
    if (this.isDown('SPACEBAR') || this.isDown('Z')) {
      game.player.shoot()
    }
  },

  isDown(key) {
    return this.game.input.keyboard.isDown(Phaser.Keyboard[key])
  },

  render(game) {
    scaledDraw.render.call(this);
  }
}
