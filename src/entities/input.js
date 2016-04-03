export default class Input {
  constructor(game) {
    this.game = game
  }
  update() {
    if (this._isDown('UP') || this._isDown('W')) {
      this.game.player.move(true)
    } else if (this._isDown('DOWN') || this._isDown('S')) {
      this.game.player.move()
    }
    if (this._isDown('SPACEBAR') || this._isDown('Z')) {
      this.game.player.shoot()
    }
  }
  _isDown(key) {
    return this.game.input.keyboard.isDown(Phaser.Keyboard[key])
  }
}
