export default class Input {
  constructor(game) {
    this.game = game
    this.isDown = {
      up: false,
      down: false,
      shoot: false,
    }
  }
  update() {
    if (this._isDown('UP') || this._isDown('W') || this.isDown['up']) {
      this.game.player.move(true)
    } else if (this._isDown('DOWN') || this._isDown('S') || this.isDown['down']) {
      this.game.player.move()
    }
    if (this._isDown('SPACEBAR') || this._isDown('Z') || this.isDown['shoot']) {
      this.game.player.shoot()
    }
    if (this._isDown('R') || this.isDown['reset']) {
      this.game.state.start('play', true, false)
    }
  }
  start(key) {
    if (key === 'down' && this.isDown.up) {
      this.isDown.up = false
    }
    if (key === 'up' && this.isDown.down) {
      this.isDown.down = false
    }
    this.isDown[key] = true
  }
  end(key) {
    this.isDown[key] = false
  }
  _isDown(key) {
    return this.game.input.keyboard.isDown(Phaser.Keyboard[key])
  }
}
