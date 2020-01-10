let $area_de_dibujo = document.getElementById('area_de_dibujo')
let lienzo = $area_de_dibujo.getContext("2d");
console.log(lienzo);

lienzo.beginPath();
lienzo.strokeStyle = "red";
lienzo.moveTo(100, 100);
lienzo.lineTo(200, 200); // trazar una linea
lienzo.moveTo(100, 100);
lienzo.lineTo(200, 100);
lienzo.moveTo(200, 100);
lienzo.lineTo(200, 200);
lienzo.stroke();
lienzo.closePath(); // cerrar lienzo o terminar trazo

function drawLine(color, xinicial, yincial, xfinal, yfinal) {

}

class Tokens {
  constructor() {
    this.tokens = document.getElementById('tokens').value;
    this.reservTokens = {
      Programa: "Programa",
      Inicio: "Inicio",
      Fin: "Fin",
      DibujarCirculo: "DibujarCirculo",
      DibujarRectangulo: "DibujarRectangulo",
      DibujarTriangulo: "DibujarTriangulo",
      EliminarFigura: "EliminarFigura",
      Dormir: "Dormir",
      ROJO: "ROJO",
      AZUL: "AZUL",
      VERDE: "VERDE",
      NEGRO: "NEGRO",
      AMARILLO: "AMARILLO",
      Constante: "Constante",
    };
  }

  getText() {
    console.log(this.tokens);
    console.log(this.reservTokens)
  }

  dibujarCirculo(xinicial, yinicial, xfinal, yfinal, id) {}
  dibujarRectangulo(xinicial, yinicial, xfinal, yfinal, id) {}
  dibujarTriangulo(xinicial, yinicial, xfinal, yfinal, id) { }
  eliminarFigura(id) { }
  dormir(time) {}


}