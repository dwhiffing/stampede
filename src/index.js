import BootState from './states/boot'
import LoadState from './states/load'
import PlayState from './states/play'
import MenuState from './states/menu'

(function() {
  let game = new Phaser.Game(64, 64, Phaser.CANVAS, '')

  game.state.add('boot', BootState)
  game.state.add('load', LoadState)
  game.state.add('menu', MenuState)
  game.state.add('play', PlayState)
  game.state.start('boot')
})()
