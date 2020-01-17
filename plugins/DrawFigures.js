function DrawFigures(config) {
  this.canvas = config.canvas;
  console.log(this.canvas);
  this.ctx = this.canvas.getContext("2d");
  this.ids = [];
}

DrawFigures.prototype.dibujarRectangulo = function (
  coordX, coordY, largo, alto, id, color) {
  this.ids.push(id);
  this.ctx.beginPath();
  this.ctx.rect(coordX, coordY, largo, alto);
  this.ctx.closePath();

  this.ctx.lineWidth = 2;
  this.strokeStyle = "#666666";
  this.ctx.stroke();

  this.ctx.fillStyle = color;
  this.ctx.fill();
  console.log(this.ids);
};

DrawFigures.prototype.dibujarCirculo = function (
  coordX, coordY, radio, id, color) {
  this.ids.push(id);
  this.ctx.beginPath();
  this.ctx.arc(coordX, coordY, radio, 0, 2 * Math.PI);
  this.ctx.closePath();

  this.ctx.lineWidth = 2;
  this.strokeStyle = "#666666";
  this.ctx.stroke();

  this.ctx.fillStyle = color;
  this.ctx.fill();
  console.log(this.ids);
};

DrawFigures.prototype.dibujarTriangulo = function (
  coordX1, coordY1, coordX2, coordY2, coordX3, coordY3,
  id, color) { 
  this.ids.push(id);
  this.ctx.beginPath();
  this.ctx.moveTo(coordX1, coordY1);
  this.ctx.lineTo(coordX2, coordY2);
  this.ctx.lineTo(coordX3, coordY3);
  this.ctx.closePath();

  this.ctx.lineWidth = 2;
  this.strokeStyle = "#666666";
  this.ctx.stroke();

  this.ctx.fillStyle = color;
  this.ctx.fill();
  console.log(this.ids);
};

export default DrawFigures;
