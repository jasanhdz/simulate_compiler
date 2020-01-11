class Tokens {
  constructor() {
    this.debuggerContainer = document.getElementById('debugger');
    this.canvas = document.getElementById('area_de_dibujo');
    this.lienzo = this.canvas.getContext('2d');
    this.text = document.getElementById('tokens').value;
    this.arrayMessages = [];
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

  addTemplate(message) {
    this.debuggerContainer.innerHTML = '';
    if (!this.arrayMessages.includes(message)) {
      this.arrayMessages.push(message);
      console.log(this.arrayMessages);
      this.arrayMessages.map(msg => {
        const template = document.createElement('p');
        template.textContent = msg;
        return this.debuggerContainer.appendChild(template);
      });
    }
  }

  getText() {
    this.tokens = this.text.split(" ");
    const arrayKeyWords = [];
    this.tokens.forEach(keyword => {
      if (!arrayKeyWords.includes(keyword)) {
        arrayKeyWords.push(keyword);
        return this.reservedWords(keyword);
      } else {
        return this.addTemplate("Las palabras no pueden repetirse");
      }
    });
    console.log(this.tokens.indexOf(this.reservTokens.Programa));
    console.log(this.text);
    this.addTemplate(this.text);
    this.addTemplate("Palabras reservadas: ");
    this.addTemplate(JSON.stringify(this.reservTokens));
    console.log(this.reservTokens)
    this.drawLine();
  }

  reservedWords(word) {
    switch (word) {
      case this.reservTokens.Programa: {
        alert("La palabra Programa está contendia");
      }
      case this.reservTokens.Inicio: {
        
      } 
      case this.reservTokens.Fin: {}
      case this.reservTokens.DibujarCirculo: {} 
      case this.reservTokens.DibujarRectangulo: {}
      case this.reservTokens.DibujarTriangulo: {}
      case this.reservTokens.EliminarFigura: {}
      case this.reservTokens.Dormir: {}
      case this.reservTokens.ROJO: {}
      case this.reservTokens.AZUL: {}
      case this.reservTokens.AMARILLO: {}
      case this.reservTokens.Constante: { }
      default: console.log("Sin palabras reservadas :(");
    }
  }

  drawLine() {
    this.lienzo.beginPath();
    this.lienzo.strokeStyle = "red";
    this.lienzo.moveTo(100, 100);
    this.lienzo.lineTo(200, 200); // trazar una linea
    this.lienzo.moveTo(100, 100);
    this.lienzo.lineTo(200, 100);
    this.lienzo.moveTo(200, 100);
    this.lienzo.lineTo(200, 200);
    this.lienzo.stroke();
    this.lienzo.closePath(); // cerrar lienzo o terminar trazo
  }


  dibujarCirculo(xinicial, yinicial, xfinal, yfinal, id) {}
  dibujarRectangulo(xinicial, yinicial, xfinal, yfinal, id) {
   
  }
  dibujarTriangulo(xinicial, yinicial, xfinal, yfinal, id) { }
  eliminarFigura(id) { }
  dormir(time) {}


}