import gameData from '../data'

export default class Dog {
  constructor(game, x, y, speed) {
    this.game = game

    this.sprite = game.add.sprite(x, y, 'dog')
    game.physics.arcade.enable(this.sprite)

    this.sprite.body.height = 4
    this.sprite.body.offset.setTo(0, 2)
    this.sprite.catch = this.catch.bind(this)
    this.sprite.pickup = this.pickup.bind(this)

    this.sprite.animations.add('0', [0, 1], 8, true)
    this.sprite.animations.add('1', [0, 1], 6, true)
    this.sprite.animations.add('2', [0, 1], 4, true)
    this.sprite.animations.add('3', [2])
    this.sprite.animations.add('4', [3])
  }
  setup(x, y, type, row) {
    let data = gameData.dog[type]
    this.sprite.reset(x, y)
    this.speed = data.speed
    this.baseSpeed = data.speed
    this.sprite.row = row
    this.sprite.type = type
    this.sprite.tint = data.color
    this.sprite.score = data.score
    this.sprite.animations.play(type.toString())
  }
  update() {
    if (this.sprite.alive) {
      this.sprite.x -= this.speed
      if (this.speed < 0 && this.sprite.x > 70) {
        this.game.enemies.resetRow(this.sprite.row)
      }
      if (this.sprite.x < -30) {
        if (this.sprite.type !== 4) {
          this.game.ui.loseLife()
        }
        this.sprite.kill()
        this.game.enemies.trySpawn(this.sprite.row)
        this.sprite.x = 70
      }
    }
  }
  caughtUp() {
    this.speed = this.baseSpeed
  }
  catch() {
    this.speed = -this.baseSpeed
  }
  pickup() {
    if (this.game.player.lasso.shooting) {
      this.sprite.reset(-10, this.sprite.y)
      this.game.ui.setScore(this.sprite.score)
      this.sprite.kill()
    }
  }
}
