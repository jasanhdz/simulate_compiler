function DrawFigures(config) { 
  this.canvas = config.canvas;
  console.log(this.canvas);
  this.ctx = this.canvas.getContext('2d');
}

DrawFigures.prototype.drawLine = function () {
  // this.lienzo.beginPath();
  // this.lienzo.strokeStyle = "red";
  // this.lienzo.moveTo(100, 100);
  // this.lienzo.lineTo(200, 200); // trazar una linea
  // this.lienzo.moveTo(100, 100);
  // this.lienzo.lineTo(200, 100);
  // this.lienzo.moveTo(200, 100);
  // this.lienzo.lineTo(200, 200);
  // this.lienzo.stroke();
  // this.lienzo.closePath(); // cerrar lienzo o terminar trazo
}

DrawFigures.prototype.dibujarRectangulo = function (coordX, coordY, largo, alto, identificador, color) {
  this.ctx.rect(coordX, coordY, largo, alto);
  this.ctx.fillStyle = color;
  this.ctx.fill();
}

export default DrawFigures;