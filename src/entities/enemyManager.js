import Dog from './dog'
import gameData from '../data'

const rowHeight = 8
const startY = 13

export default class EnemyManager {
  constructor(game) {
    this.game = game
    this.rows = [0, 0, 0, 0, 0, 0]

    this.createDogs()
    this.trySpawn()
  }
  createDogs(num=30) {
    this.group = this.game.add.group()
    this.dogs = []

    for (var i = 0; i < num; i++) {
      let dog = new Dog(this.game, 64, -10)
      this.dogs.push(dog)
      this.group.add(dog)
      dog.kill()
    }
  }
  update() {
    this.dogs.forEach((dog) => {
      dog.update()
    })
  }
  spawn(row) {
    setTimeout(() => {
      let type = this.rows[row]
      let data = gameData.dog[type]
      let y = startY + rowHeight * row
      let size = this.game.rnd.integerInRange(data.size[0], data.size[1])

      for (var i = 0; i < size; i++) {
        let dog = this.dogs.filter(d => !d.alive)[0]
        let x = 64 + 10 * i
        dog.reset(x, y, type, row)
      }

      this.rows[row]++
      if (type >= Object.keys(gameData.dog).length - 1) {
        this.rows[row] = 0
      }
    }, this.game.rnd.integerInRange(0, 4000))
  }
  trySpawn(row) {
    if (this.getRow(row).length > 0) {
      return
    }
    if (typeof row === 'undefined') {
      [0,1,2,3,4,5].forEach(i => this.spawn(i))
    } else {
      this.spawn(row)
    }
  }
  getRow(row) {
    return this.dogs.filter(d => d.row === row && d.alive)
  }
  walk(row) {
    this.getRow(row).forEach(d => d.walk())
  }
  run(row) {
    this.getRow(row).forEach(d => d.run())
  }
}
