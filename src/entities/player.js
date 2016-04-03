export default class Player {
  constructor(game, x, y) {

    this.sprite = game.add.sprite(x, y, 'player')
    this.sprite.animations.add('run')
    this.sprite.animations.play('run', 7, true)
    game.physics.arcade.enable(this.sprite)

    this.lasso = game.add.sprite(x+11, y-1, 'lasso')
    game.physics.arcade.enable(this.lasso)
    this.rope = game.add.tileSprite(x+11, y, 0, 6,'rope')
    this.rope.width = 0
    this.canShoot = true
    this.lasso.shooting = false
    this.speed = 0.4
    this.minY = 9
    this.maxY = 49
    this.game = game

    this.sprite.flicker = this.game.time.create(false)
    this.sprite.flicker.loop(250, () => {
      this.sprite.alpha = (this.sprite.alpha === 0.6) ? 0.9 : 0.6
    })
    this.sprite.flicker.start()
    this.sprite.flicker.pause()

    this.lasso.resetLasso = this.resetLasso.bind(this)
  }
  move(up) {
    if (up && this.sprite.y > this.minY) {
      this.sprite.y -= this.speed
      this.rope.y -= this.speed
      this.lasso.y -= this.speed
    } else if (this.sprite.y < this.maxY) {
      this.sprite.y += this.speed
    }
    this.lasso.y = this.sprite.y - 1
    this.rope.y = this.sprite.y
  }
  update() {
    if (this.lasso.shooting) {
      if (this.rope.width < 36) {
        this.rope.width += 1.5
        this.lasso.x += 1.5
        this.lasso.y = this.sprite.y + Math.floor(this.rope.width/6)
      } else {
        this.resetLasso()
      }
    }
  }
  resetLasso() {
    this.lasso.shooting = false
    this.rope.width = 0
    this.lasso.y = this.sprite.y - 1
    this.lasso.x = this.sprite.x + 11
    setTimeout(() => {
      this.canShoot = true
    }, 150)
  }
  buck() {
    if (!this.sprite.invulnerable) {
      this.flickerSprite()
    }
  }
  flickerSprite() {
    this.sprite.flicker.resume()
    this.sprite.invulnerable = true
    this.lasso.alpha = 0

    this.game.time.events.add(1500, () => {
      this.sprite.invulnerable = false
      this.sprite.flicker.pause()
      this.sprite.alpha = 1
      this.lasso.alpha = 1
    }, this.sprite)
  }
  shoot() {
    if (this.canShoot && !this.sprite.invulnerable) {
      this.canShoot = false
      this.lasso.shooting = true
    }
  }
}
