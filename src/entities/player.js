export default class Player {
  constructor(game, x, y) {
    this.lasso = game.add.sprite(x+11, y-3, 'lasso')
    game.physics.arcade.enable(this.lasso)

    this.sprite = game.add.sprite(x, y, 'player')
    this.sprite.animations.add('run', [0, 1], 7, true)
    this.sprite.animations.add('hit', [2])
    this.sprite.animations.play('run')
    game.physics.arcade.enable(this.sprite)
    this.sprite.body.height = 5
    this.sprite.body.offset.setTo(0, 5)

    this.rope = game.add.tileSprite(x+11, y, 0, 5.5, 'rope')
    this.rope.width = 0
    this.canShoot = true
    this.lasso.shooting = false
    this.speed = 0.4
    this.minY = 9
    this.maxY = 54
    this.game = game

    this.sprite.flicker = this.game.time.create(false)
    this.sprite.flicker.loop(150, () => {
      this.sprite.alpha = (this.sprite.alpha === 0.6) ? 0.9 : 0.6
    })
    this.sprite.flicker.start()
    this.sprite.flicker.pause()

    this.lasso.spin = this.game.time.create(false)
    this.lasso.spin.loop(80, () => {
      this.lassoOffset += this.lassoDirection
      if (this.lassoOffset <= -5) {
        this.lassoDirection = 1
      } else if (this.lassoOffset >= -1) {
        this.lassoDirection = -1
      }
      this.lasso.x = this.sprite.x + 11 + this.lassoOffset
    })
    this.lassoOffset = 0
    this.lassoDirection = -1
    this.lasso.spin.start()

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
    this.lasso.y = this.sprite.y - 3
    this.rope.y = this.sprite.y
  }
  update() {
    if (this.lasso.shooting) {
      if (this.rope.width < 36) {
        this.rope.width += 1.5
        this.lasso.x += 1.6
        this.lasso.y = (this.sprite.y-3) + this.rope.width/4.3
      } else {
        this.resetLasso()
      }
    } else {
      if (this.rope.width > 0) {
        this.rope.width -= 1.5
        this.lasso.x -= 1.6
        this.lasso.y = (this.sprite.y-3) + this.rope.width/4.3
      } else {
        this.rope.width = 0
        this.lasso.spin.resume()
        this.canShoot = true
        this.lasso.y = this.sprite.y - 3
      }
    }
  }
  resetLasso() {
    this.lasso.shooting = false
    this.lassoOffset = -1
  }
  buck() {
    if (!this.sprite.invulnerable) {
      this.flickerSprite()
    }
  }
  flickerSprite() {
    this.sprite.flicker.resume()
    this.sprite.invulnerable = true
    this.resetLasso()
    this.sprite.animations.play('hit')
    this.rope.width = 0
    this.lasso.alpha = 0

    this.game.time.events.add(1500, () => {
      this.sprite.invulnerable = false
      this.sprite.animations.play('run')
      this.sprite.flicker.pause()
      this.sprite.alpha = 1
      this.lasso.alpha = 1
    }, this.sprite)
  }
  shoot() {
    if (this.canShoot && !this.sprite.invulnerable) {
      this.canShoot = false
      this.lasso.spin.pause()
      this.lasso.shooting = true
    }
  }
}
