export default class Dog {
  constructor(game, x, y) {
    this.sprite = game.add.sprite(x, y, 'dog')
    this.sprite.animations.add('run')
    this.sprite.animations.play('run', 5, true)
  }
}
