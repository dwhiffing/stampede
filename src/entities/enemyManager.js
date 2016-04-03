import Dog from './dog'

let rowData = [
  {
    color: 0x2C1400,
    speed: 0.2,
  }, {
    color: 0x7F6932,
    speed: 0.4,
  }, {
    color: 0xA9945F,
    speed: 0.8,
  }, {
    color: 0x000000,
    speed: 0.9,
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
  spawnDog(row, x, y, speed, color) {
    let dog = this.dogs.filter(d => !d.sprite.alive)[0]
    dog.setup(x, y, speed)
    dog.sprite.reset(x, y)
    dog.sprite.row = row
    dog.sprite.tint = color
  }
  spawn(row) {
    setTimeout(() => {
      let data = rowData[this.rows[row]]
      let y = this.startY + this.rowHeight * row
      this.rows[row]++

      this.spawnDog(row, 64, y, data.speed, data.color)
      this.spawnDog(row, 64+10, y, data.speed, data.color)

      if (this.rows[row] > Object.keys(rowData).length) {
        this.rows[row] = 0
      }

    }, this.game.rnd.integerInRange(1000, 5000))
  }
  update() {
    this.dogs.forEach((dog) => {
      dog.update()
    })
  }
}
