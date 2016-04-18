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
    game.inputManager.end('button')
    game.inputManager.end('reset')
  })

  attachUpDown(up, 'up')
  attachUpDown(down, 'down')
  attachUpDown(shoot, 'shoot')
  attachUpDown(button, 'shoot')
  attachUpDown(reset, 'reset')


  // 1270x1600
  const setStyle = (el, style) => {
    el.setAttribute('style', `${style}`)
  }

  let background = document.getElementById('background')
  let app = document.getElementById('app')
  let controls = document.getElementById('controls')

  let resizeFn = () => {
    let { clientWidth: fullWidth, clientHeight: fullHeight } = document.documentElement
    // let ratio = fullHeight <= fullWidth && 1220*fullWidth/1220 < fullHeight ? fullHeight/1600 : fullWidth/1220
    let ratio = fullWidth/1220
    if (1600 * ratio > fullHeight) {
      ratio = fullHeight/1600
    }
    let canvasSize = 540 * ratio
    setStyle(background, `width: ${1220 * ratio}px; height: ${1600 * ratio}px;padding:${120*ratio}px;padding-top: ${290*ratio}px;margin-top:${-(1600*ratio)/2}px;margin-left:${-(1220*ratio)/2}px`)
    setStyle(app, `width: ${canvasSize}px; height: ${canvasSize}px`)
    setStyle(controls, `left: ${200*ratio}px;right: ${140*ratio}px; bottom: ${200*ratio}px; top: ${1030*ratio}px`)
    setStyle(up, `height: ${170*ratio}px;`)
    setStyle(down, `height: ${170*ratio}px;`)
    setStyle(shoot, `height: ${170*ratio}px;width: ${170*ratio}px;`)
    setStyle(button, `height: ${170*ratio}px;width: ${170*ratio}px;right:${230*ratio}px;top:${120*ratio}px`)
    setStyle(reset, `height: ${80*ratio}px;width: ${80*ratio}px;right:${70*ratio}px;top:${280*ratio}px`)
  }
  resizeFn()

  window.addEventListener('resize', resizeFn)
})()
