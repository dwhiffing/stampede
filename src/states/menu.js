import scaledDraw from '../scaledDraw'
import InputManager from '../entities/input'
let score = 0
export default {
  init(args={}) {
    score = args.score || 0
  },
  create(game) {
    this.game = game
    game.scale.setResizeCallback(scaledDraw.resize, this)
    scaledDraw.init.call(this)
    game.inputManager = new InputManager(game)

    game.youText = game.add.bitmapText(23, 7, 'font', "you", 5)
    game.loseText = game.add.bitmapText(20, 14, 'font', "lose", 5)
    game.loseText = game.add.bitmapText(16, 30, 'font', "score:", 5)
    game.scoreText = game.add.bitmapText(20, 38, 'font', score.toString(), 5)
  },

  update(game) {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.game.input.keyboard.isDown(Phaser.Keyboard.R) || this.game.input.keyboard.isDown(Phaser.Keyboard.Z) || this.game.inputManager.isDown['reset']){
      this.game.state.start('play', true, false)
    }
  },

  render(game) {
    scaledDraw.render.call(this)
  }
}
