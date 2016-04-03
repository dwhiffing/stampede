let canShoot, lassoOffset, lassoDirection, sprite, lasso, rope
let minY = 9
let maxY = 54
let speed = 0.4
let lassoSpeed = 1.5

export default class Player {
  constructor(game, x, y) {
    this.game = game
    canShoot = true
    lassoOffset = 0
    lassoDirection = -1

    lasso = game.add.sprite(x+11, y-3, 'lasso')
    this.lasso = lasso
    game.physics.arcade.enable(lasso)

    lasso.shooting = false
    lasso.spin = this.game.time.create(false)
    lasso.spin.loop(80, this.spinLasso.bind(this))
    lasso.spin.start()

    rope = game.add.tileSprite(x+11, y, 0, 5.5, 'rope')
    this.rope = rope
    rope.width = 0

    sprite = game.add.sprite(x, y, 'player')
    this.sprite = sprite
    sprite.animations.add('run', [0, 1], 7, true)
    sprite.animations.add('hit', [2])
    game.physics.arcade.enable(sprite)

    sprite.body.height = 5
    sprite.body.offset.setTo(0, 5)

    sprite.flicker = this.game.time.create(false)
    sprite.flicker.loop(150, this.flicker.bind(this))
    sprite.flicker.start()
    sprite.flicker.pause()

    sprite.animations.play('run')
  }
  update() {
    if (lasso.shooting) {
      if (rope.width < 36) {
        this.setLasso(1.5)
      } else {
        this.resetLasso()
      }
    } else {
      if (rope.width > 0) {
        this.setLasso(-1.5)
      } else {
        this.resetLasso()
      }
    }
  }
  move(up) {
    if (up && sprite.y > minY) {
      sprite.y -= speed
      rope.y -= speed
      lasso.y -= speed
    } else if (sprite.y < maxY) {
      sprite.y += speed
    }
    lasso.y = sprite.y - 3
    rope.y = sprite.y
  }
  setLasso(speed=0) {
    rope.width += speed
    lasso.x += speed
    lasso.y = (sprite.y - 3) + rope.width / 4.3
  }
  resetLasso() {
    rope.width = 0
    lasso.alpha = 1
    lasso.shooting = false
    canShoot = true
    lasso.spin.resume()
    this.setLasso()
  }
  retractLasso() {
    lasso.shooting = false
  }
  buck() {
    if (!sprite.invulnerable) return
    sprite.flicker.resume()
    sprite.invulnerable = true
    this.resetLasso()
    sprite.animations.play('hit')

    this.game.time.events.add(1500, () => {
      sprite.invulnerable = false
      sprite.animations.play('run')
      sprite.flicker.pause()
      sprite.alpha = 1
      lasso.alpha = 1
    }, sprite)
  }
  shoot() {
    if (!canShoot || sprite.invulnerable) return
    canShoot = false
    lasso.spin.pause()
    this.lasso.shooting = true
  }
  flicker() {
    sprite.alpha = (sprite.alpha === 0.6) ? 0.9 : 0.6
  }
  spinLasso() {
    lassoOffset += lassoDirection
    if (lassoOffset <= -5) {
      lassoDirection = 1
    } else if (lassoOffset >= -1) {
      lassoDirection = -1
    }
    lasso.x = sprite.x + 11 + lassoOffset
  }
}
