import gameData from '../data'

export default class Dog extends Phaser.Sprite {
  constructor(game, x, y, speed) {
    super(game, x, y, "dog")
    game.physics.arcade.enable(this)

    this.body.height = 4
    this.body.offset.setTo(0, 2)

    this.animations.add('0', [0, 1], 8, true)
    this.animations.add('1', [0, 1], 6, true)
    this.animations.add('2', [0, 1], 4, true)
    this.animations.add('3', [2])
    this.animations.add('4', [3])
  }
  reset(x, y, type, row) {
    super.reset(x, y)
    this.row = row
    this.type = type
    this.animations.play(type.toString())

    let data = gameData.dog[type]
    this.speed = data.speed
    this.baseSpeed = data.speed
    this.tint = data.color
    this.score = data.score
  }
  update() {
    if (!this.alive) return

    this.x -= this.speed

    if (this.speed > 0) {
      this.checkIfStrayed()
    } else {
      this.checkIfCaughtUp()
    }
  }
  checkIfStrayed() {
    if (this.x < -30) {
      if (this.type !== 4) {
        this.game.ui.loseLife()
      }
      this.stray()
    }
  }
  stray() {
    this.kill()
    this.game.enemies.trySpawn(this.row)
    this.x = 70
  }
  checkIfCaughtUp() {
    if (this.x > 70) {
      this.game.enemies.walk(this.row)
    }
  }
  walk() {
    this.speed = this.baseSpeed
  }
  run() {
    this.speed = -this.baseSpeed
  }
  capture() {
    this.x = -10
    this.kill()
  }
}
