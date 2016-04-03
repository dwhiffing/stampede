import scaledDraw from '../scaledDraw'

export default {
  create(game) {
    this.game = game
    game.stage.backgroundColor = '#000'

    this.game.scale.setResizeCallback(scaledDraw.resize, this)
    scaledDraw.init.call(this)

    game.lifeText = game.add.bitmapText(2, 1, 'font', "Game over", 5)
  },

  update(game) {
    if (this.isDown('SPACEBAR') || this.isDown('Z')) {
      game.state.start('play', true, false)
    }
  },

  isDown(key) {
    return this.game.input.keyboard.isDown(Phaser.Keyboard[key])
  },

  render(game) {
    scaledDraw.render.call(this)
  }
}
