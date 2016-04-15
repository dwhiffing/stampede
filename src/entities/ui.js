export default class UserInterface {
  constructor(game) {
    this.speed = 0.8
    this.lives = 5
    this.score = 0
    this.targetScore = 0
    this.nextLifeScore = 1000

    this.topgate = game.add.tileSprite(0, 8, 64, 4, 'gate')
    this.bottomgate = game.add.tileSprite(0, 60, 64, 4, 'gate')
    this.lifeText = game.add.bitmapText(2, 1, 'font', this.lives.toString(), 5)
    this.scoreText = game.add.bitmapText(25, 1, 'font', Math.floor(this.score).toString(), 5)

    this.topgate.sendToBack()

    this.gameover = () => {
      game.state.start('menu', true, false)
    }
  }
  update() {
    this.bottomgate.tilePosition.x -= 0.5 * this.speed
    this.topgate.tilePosition.x -= 0.5 * this.speed

    if (this.score < this.targetScore) {
      this.score += 0.3
      if (this.score >= this.nextLifeScore) {
        this.lives += 1
        this.speed += 0.1
        this.nextLifeScore += 1000
        this.lifeText.text = this.lives
      }
      this.scoreText.text = Math.floor(this.score).toString()
    }
  }
  loseLife() {
    this.lives -= 1
    if (this.lives < 0) {
      this.gameover()
    } else {
      this.lifeText.text = this.lives
    }
  }
  setScore(score) {
    this.targetScore += score
  }
}
