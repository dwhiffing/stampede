import Dog from './dog'

export default class EnemyManager {
  constructor(game) {
    this.group = game.add.group()
    this.rowHeight = 8
    this.startY = 13
    this.game = game

    this.dogs = []
    for (var i = 0; i < 30; i++) {
      let dog = new Dog(this.game, -19, -19)
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
  spawn(row) {
    let dog = this.dogs.filter(d => !d.sprite.alive)[0]
    dog.setup(70, this.startY + this.rowHeight * row, 0.2)
    dog.sprite.reset(64, this.startY + this.rowHeight * row)
    dog.sprite.row = row
  }
  update() {
    this.dogs.forEach((dog) => {
      dog.update()
    })
  }
}
