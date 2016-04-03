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
    this.sprite.body.height = 4
    this.sprite.body.offset.setTo(0, 2)
  }
  setup(x, y, speed) {
    this.speed = speed
    this.baseSpeed = speed
    this.sprite.x = x
    this.sprite.y = y
  }
  update() {
    if (this.sprite.alive) {
      this.sprite.x -= this.speed
      if (this.speed < 0 && this.sprite.x > 60) {
        this.game.enemies.resetRow(this.sprite.row)
      }
      if (this.sprite.x < -30) {
        this.game.loseLife()
        this.sprite.kill()
        this.game.enemies.spawn(this.sprite.row)
        this.sprite.x = 70
      }
    }
  }
  caughtUp() {
    this.speed = this.baseSpeed
  }
  catch() {
    this.speed = -this.baseSpeed * 2
  }
  pickup() {
    if (this.game.player.lasso.shooting) {
      this.sprite.reset(-10, this.sprite.y)
      this.sprite.kill()
    }
  }
}
