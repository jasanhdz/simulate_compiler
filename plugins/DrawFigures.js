function DrawFigures(config) {
  this.canvas = config.canvas;
  console.log(this.canvas);
  this.ctx = this.canvas.getContext("2d");
  this.ids = [];
  this.figures = [];
}

DrawFigures.prototype.dibujarRectangulo = function (
  coordX, coordY, largo, alto, id, color) {
  this.ctx.beginPath();
  this.ctx.rect(coordX, coordY, largo, alto);
  this.ctx.closePath();

  this.ctx.lineWidth = 2;
  this.strokeStyle = "#666666";
  this.ctx.stroke();

  this.ctx.fillStyle = color;
  this.ctx.fill();
  if (!this.ids.includes(id)) {
    this.ids.push(id);
    this.figures.push({
      coordX, coordY, largo, alto, id, color,
      type: "Rectangle"
    });
  }
};

DrawFigures.prototype.dibujarCirculo = function (
  coordX, coordY, radio, id, color) {
  this.ctx.beginPath();
  this.ctx.arc(coordX, coordY, radio, 0, 2 * Math.PI);
  this.ctx.closePath();

  this.ctx.lineWidth = 2;
  this.strokeStyle = "#666666";
  this.ctx.stroke();

  this.ctx.fillStyle = color;
  this.ctx.fill();

  if (!this.ids.includes(id)) {
    this.ids.push(id);
    this.figures.push({
      coordX, coordY, radio, id, color, type: "Circle",
    });
  }
  
};

DrawFigures.prototype.dibujarTriangulo = function (
  coordX1, coordY1, coordX2, coordY2, coordX3, coordY3,
  id, color) { 
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

  if (!this.ids.includes(id)) {
    this.ids.push(id);
    this.figures.push({
      coordX1, coordY1, coordX2,
      coordY2, coordX3, coordY3,
      id, color, type: "Triangle"
    });
  }

};

DrawFigures.prototype.cleanCanvas = function () {
  console.log(this.ctx);
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  console.log(`valor anterior de ids: ${JSON.stringify(this.ids)}`);
  this.ids = [];
  console.log(`valor actual de ids: ${JSON.stringify(this.ids)}`);
}

DrawFigures.prototype.removeFigure = function (id) {
  console.log(this.ids)
  if (this.ids.includes(id)) {
    this.ids.splice(this.ids.indexOf(id), 1);
    this.figures.splice(this.figures.findIndex(e => e.id === id), 1);
    // cleaning drawing area
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ids.forEach(id => {
      let fg = this.figures.find(figure => figure.id === id);
      this.updatedFigures(fg);
    });
  }
}

DrawFigures.prototype.updatedFigures = function (figure) {
  // painting figures
  // debugger;
  switch (figure.type) {
      case "Triangle": {
        return this.dibujarTriangulo(...Object.values(figure));
      }
      case "Rectangle": {
        return this.dibujarRectangulo(...Object.values(figure));
      }
      case "Circle": {
        return this.dibujarCirculo(...Object.values(figure));
      }
    }
}

export default DrawFigures;
