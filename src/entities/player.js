export default class Player {
  constructor(game, x, y) {
    this.sprite = game.add.sprite(x, y, 'player')
    this.sprite.animations.add('run')
    this.sprite.animations.play('run', 7, true)
  }
}
