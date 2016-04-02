import Dog from './dog'

export default class EnemyManager {
  constructor(game) {
    let group = game.add.group()
    
    let dog = new Dog(game, 30, 13)
    let dog2 = new Dog(game, 30, 21)
    let dog3 = new Dog(game, 30, 29)
    let dog4 = new Dog(game, 30, 37)
    let dog5 = new Dog(game, 30, 45)
    let dog6 = new Dog(game, 30, 53)
    group.add(dog.sprite)
    group.add(dog2.sprite)
    group.add(dog3.sprite)
    group.add(dog4.sprite)
    group.add(dog5.sprite)
    group.add(dog6.sprite)
  }
}
