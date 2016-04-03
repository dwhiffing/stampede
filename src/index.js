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

  var up = document.getElementById('up')
  var down = document.getElementById('down')
  var shoot = document.getElementById('shoot')

  let touchStart = (key) => {
    game.inputManager.start(key)
  }
  let touchEnd = (key) => {
    game.inputManager.end(key)
  }
  up.addEventListener('touchstart', () => touchStart('up'))
  up.addEventListener('touchend', () => touchEnd('up'))
  down.addEventListener('touchstart', () => touchStart('down'))
  down.addEventListener('touchend', () => touchEnd('down'))
  shoot.addEventListener('touchstart', () => touchStart('shoot'))
  shoot.addEventListener('touchend', () => touchEnd('shoot'))
})()
