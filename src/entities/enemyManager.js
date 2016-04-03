import Dog from './dog'

let rowData = [
  {
    color: 0x772D11,
    speed: 0.1,
    size: [2,4]
  }, {
    color: 0xD0906D,
    speed: 0.25,
    size: [2,3]
  }, {
    color: 0xFFC6BE,
    speed: 0.5,
    size: [1,3]
  }, {
    color: 0x000000,
    speed: 1,
    size: [1,1]
  },
]

export default class EnemyManager {
  constructor(game) {
    this.group = game.add.group()
    this.rowHeight = 8
    this.startY = 13
    this.game = game

    this.rows = [
      0, 0, 0, 0, 0, 0,
    ]

    this.dogs = []
    for (var i = 0; i < 30; i++) {
      let dog = new Dog(this.game, 64, -10)
      this.group.add(dog.sprite)
      dog.sprite.kill()
      this.dogs.push(dog)
    }

    this.spawn(0)
    this.spawn(1)
    this.spawn(2)
    this.spawn(3)
    this.spawn(4)
    this.spawn(5)
  }
  spawnDog(row, x, y, speed, color, type) {
    let dog = this.dogs.filter(d => !d.sprite.alive)[0]
    dog.setup(x, y, speed)
    dog.sprite.reset(x, y)
    dog.sprite.row = row
    dog.sprite.tint = color
    dog.sprite.type = type
  }
  resetRow(row) {
    this.getRow(row).forEach(d => d.caughtUp())
  }
  getRow(row) {
    return this.dogs.filter(d => d.sprite.row === row && d.sprite.alive)
  }
  spawn(row) {
    if (this.getRow(row).length > 0) return

    setTimeout(() => {
      let type = this.rows[row]
      let data = rowData[type]
      let y = this.startY + this.rowHeight * row
      let size = this.game.rnd.integerInRange(data.size[0],data.size[1])
      this.type = type
      for (var i = 0; i < size; i++) {
        this.spawnDog(row, 64 + 10 * i, y, data.speed, data.color, type)
      }

      this.rows[row]++
      if (type >= Object.keys(rowData).length - 1) {
        this.rows[row] = 0
      }

    }, this.game.rnd.integerInRange(0, 4000))
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
