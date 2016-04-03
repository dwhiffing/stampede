import scaledDraw from '../scaledDraw'
// import InputManager from '../entities/input'

export default {
  create(game) {
    game.stage.backgroundColor = '#000'

    game.scale.setResizeCallback(scaledDraw.resize, this)
    scaledDraw.init.call(this)
    // game.inputManager = new InputManager(game)

    game.lifeText = game.add.bitmapText(2, 1, 'font', "Game over", 5)
  },

  update(game) {
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.inputManager.down['shoot']) {
      game.state.start('play', true, false)
    }
  },

  render(game) {
    scaledDraw.render.call(this)
  }
}
