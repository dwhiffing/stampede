let pixel = {
  scale: 8,
  canvas: null,
  context: null,
  width: 0,
  height: 0,
}

const scaledDraw = {
  init() {
    this.game.canvas.style['display'] = 'none'
    scaledDraw.resize.call(this, this.scale, {
      width: window.innerWidth,
      height: window.innerHeight,
    })
  },
  resize(scale, parentBounds) {
    if (pixel.canvas) {
      pixel.canvas.remove()
    }
    pixel.canvas = Phaser.Canvas.create(this.game.width * pixel.scale, this.game.height * pixel.scale)
    pixel.context = pixel.canvas.getContext('2d')
    Phaser.Canvas.addToDOM(pixel.canvas)
    Phaser.Canvas.setSmoothingEnabled(pixel.context, false)
    pixel.width = pixel.canvas.width
    pixel.height = pixel.canvas.height
  },
  render() {
    pixel.context.drawImage(this.game.canvas, 0, 0, this.game.width, this.game.height, 0, 0, pixel.width, pixel.height)
  },
}

export default scaledDraw
