export default class Input {
  constructor(game) {
    this.game = game
    this.down = {
      up: false,
      down: false,
      shoot: false,
    }
  }
  update() {
    if (this._isDown('UP') || this._isDown('W') || this.down['up']) {
      this.game.player.move(true)
    } else if (this._isDown('DOWN') || this._isDown('S') || this.down['down']) {
      this.game.player.move()
    }
    if (this._isDown('SPACEBAR') || this._isDown('Z') || this.down['shoot']) {
      this.game.player.shoot()
    }
  }
  start(key) {
    this.down[key] = true
  }
  end(key) {
    this.down[key] = false
  }
  _isDown(key) {
    return this.game.input.keyboard.isDown(Phaser.Keyboard[key])
  }
}
