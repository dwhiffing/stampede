export default class Dog {
  constructor(game, x, y, speed) {
    this.sprite = game.add.sprite(x, y, 'dog')
    this.sprite.animations.add('run')
    this.sprite.animations.play('run', 5, true)
    this.setup(x, y, speed)
    game.physics.arcade.enable(this.sprite)
    this.game = game
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
    if (this.sprite.x < -30 && this.sprite.alive) {
      this.game.loseLife()
      this.sprite.kill()
      this.game.enemies.spawn(this.sprite.row)
      this.sprite.x = 70
    }
  }
  catch() {
    this.speed = -1
  }
  pickup() {
    if (this.game.player.lasso.shooting) {
      this.sprite.kill()
      this.sprite.x = 60
    }
  }
}
