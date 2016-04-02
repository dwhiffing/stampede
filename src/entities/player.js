export default class Player {
  constructor(game, x, y) {
    this.sprite = game.add.sprite(x, y, 'player')
    this.rope = game.add.sprite(x+11, y, 'rope')
    this.sprite.animations.add('run')
    this.sprite.animations.play('run', 7, true)
    this.fireAnim = this.rope.animations.add('fire')
    this.canShoot = true
    this.speed = 0.4
    this.minY = 9
    this.maxY = 49
  }

  move(up) {
    if (up && this.sprite.y > this.minY) {
      this.sprite.y -= this.speed
      this.rope.y -= this.speed
    } else if (this.sprite.y < this.maxY) {
      this.sprite.y += this.speed
      this.rope.y += this.speed
    }
  }
  resetRope() {
    setTimeout(() => {
      this.rope.frame = 0
      this.canShoot = true
    }, 150)
  }
  shoot() {
    if (this.canShoot) {
      this.canShoot = false
      this.rope.animations.play('fire', 25)
      this.fireAnim.onComplete.add(this.resetRope, this);
    }
  }
}
