import Dog from './dog'
import gameData from '../data'

const rowHeight = 8
const startY = 13

export default class EnemyManager {
  constructor(game) {
    this.game = game
    this.rows = [
      0, 0, 0, 0, 0, 0,
    ]

    this.createDogs()
    this.trySpawn()
  }
  createDogs(num=30) {
    this.group = this.game.add.group()
    this.dogs = []

    for (var i = 0; i < num; i++) {
      let dog = new Dog(this.game, 64, -10)
      this.group.add(dog.sprite)
      dog.sprite.kill()
      this.dogs.push(dog)
    }
  }
  resetRow(row) {
    this.getRow(row).forEach(d => d.caughtUp())
  }
  getRow(row) {
    return this.dogs.filter(d => d.sprite.row === row && d.sprite.alive)
  }
  spawn(row) {
    let type = this.rows[row]
    let data = gameData.dog[type]
    let y = startY + rowHeight * row
    let size = this.game.rnd.integerInRange(data.size[0], data.size[1])

    for (var i = 0; i < size; i++) {
      let dog = this.dogs.filter(d => !d.sprite.alive)[0]
      let x = 64 + 10 * i
      dog.setup(x, y, type, row)
    }

    this.rows[row]++
    if (type >= Object.keys(gameData.dog).length - 1) {
      this.rows[row] = 0
    }
  }
  trySpawn(row) {
    if (this.getRow(row).length > 0) return

    if (typeof row === 'undefined') {
      for (var i = 0; i <= 5; i++) {
        setTimeout(this.spawn.bind(this, i), this.game.rnd.integerInRange(0, 4000))
      }
    } else {
      setTimeout(this.spawn.bind(this, row), this.game.rnd.integerInRange(0, 4000))
    }
  }
  catch(row) {
    this.getRow(row).forEach(d => d.catch())
  }
  update() {
    this.dogs.forEach((dog) => {
      dog.update()
    })
  }
}
