import scaledDraw from '../scaledDraw'

export default {
  create(game) {
    game.stage.backgroundColor = '#000'

    game.scale.setResizeCallback(scaledDraw.resize, this)
    scaledDraw.init.call(this)

    game.lifeText = game.add.bitmapText(2, 1, 'font', "Game over", 5)
  },

  update(game) {
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      game.state.start('play', true, false)
    }
  },

  render(game) {
    scaledDraw.render.call(this)
  }
}
