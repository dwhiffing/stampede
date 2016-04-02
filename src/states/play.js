import Dog from '../entities/dog'
import Player from '../entities/player'
import scaledDraw from '../scaledDraw'

export default {
  create(game) {
    game.stage.backgroundColor = '#41a744'

    this.game.scale.setResizeCallback(scaledDraw.resize, this);
    scaledDraw.init.call(this);

    game.topgate = game.add.tileSprite(0, 8, 64, 4, 'gate');

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

    game.player = new Player(game, 2, 14)
    group.add(game.player.sprite)

    game.bottomgate = game.add.tileSprite(0, 60, 64, 4, 'gate');
  },

  update(game) {
    game.bottomgate.tilePosition.x -= 0.5
    game.topgate.tilePosition.x -= 0.5
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && game.player.sprite.y > 9) {
      game.player.sprite.y -= 0.4
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && game.player.sprite.y < 49) {
      game.player.sprite.y += 0.4
    }
  },

  render(game) {
    scaledDraw.render.call(this);
  }
}
