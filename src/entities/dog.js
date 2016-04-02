export default class Dog {
  constructor(game, x, y, speed) {
    this.sprite = game.add.sprite(x, y, 'dog')
    this.sprite.animations.add('run')
    this.sprite.animations.play('run', 5, true)
    this.setup(x, y, speed)
    game.physics.arcade.enable(this.sprite)
    this.sprite.catch = this.catch.bind(this)
    this.sprite.pickup = this.pickup.bind(this)
  }
  setup(x, y, speed) {
    this.speed = speed
    this.baseSpeed = speed
    this.sprite.x = x
    this.sprite.y = y
  }
  update() {
    if (this.speed < this.baseSpeed) {
      this.speed += 0.01
    }
    this.sprite.x -= this.speed
  }
  catch() {
    this.speed = -1
  }
  pickup() {
    this.sprite.kill()
  }
}
