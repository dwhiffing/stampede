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

  const up = document.getElementById('up')
  const down = document.getElementById('down')
  const shoot = document.getElementById('shoot')

  const touchStart = (key) => () => game.inputManager.start(key)
  const touchEnd = (key) => () => game.inputManager.end(key)
  const attachUpDown = (el, key) => {
    el.addEventListener('touchstart', touchStart(key))
    el.addEventListener('touchend', touchEnd(key))
    el.addEventListener('mousedown', touchStart(key))
    el.addEventListener('mouseup', touchEnd(key))
  }

  document.addEventListener('mouseup', () => {
    game.inputManager.end('up')
    game.inputManager.end('down')
    game.inputManager.end('shoot')
  })

  attachUpDown(up, 'up')
  attachUpDown(down, 'down')
  attachUpDown(shoot, 'shoot')
})()
