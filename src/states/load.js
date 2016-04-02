export default {
  preload() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.load.image('gate', 'images/gate.png')
    this.load.image('rope', 'images/rope.png')
    this.load.image('lasso', 'images/lasso.png')
    this.load.spritesheet('dog', 'images/dogs.png', 8, 6)
    this.load.spritesheet('player', 'images/player.png', 12, 10)
  },

  onLoadComplete() {
    this.game.state.start('play', true, false)
  }
}
