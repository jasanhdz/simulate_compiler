class Tokens {
  constructor() {
    this.debuggerContainer = document.getElementById('debugger');
    this.canvas = document.getElementById('area_de_dibujo');
    this.lienzo = this.canvas.getContext('2d');
    this.text = document.getElementById('tokens').value;
    this.tokens = [];
    this.arrayMessages = [];
    this.reservTokens = {
      Programa: "Programa",
      Inicio: "Inicio",
      Fin: "Fin",
      DibujarCirculo: (x, y) => {
        this.name = "DibujarCirculo";
        alert(`Exacto ${x} ${y}`);
      },
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

  createTokens() {
    let words = this.text.split(/\.*(\(|\)|\d*\.*[\d]|\d|\s)/);
    words = words.filter(element => element !== "" && element !== "\n");
    words.forEach(element => {
      // let vdd = element.prototype.match(/\d*\.*[\d]|\d/);
      // console.log(vdd);
      this.tokens.push(
        this.verifyToken(element)
      );
    });
    console.log(this.tokens);
  }

  verifyToken(token) {
    let isNumber = !isNaN(token);
    if (isNumber) {
      let isFloat = token.includes('.');
      if (isFloat) {
        token = parseFloat(token);
        console.log(token);
      } else {
        token = parseInt(token);
        console.log(token);
      }
    }
    switch (token) {
      case this.reservTokens.Programa: {
        return {
          type: "keyword",
          value: this.reservTokens.Programa,
          description: "Definicion del programa"
        }
      }
      case this.reservTokens.Inicio: {
        return {
          type: "keyword",
          value: this.reservTokens.Inicio,
          description: "Punto de entrada del programa"
        }
      }
      case this.reservTokens.Fin: {
        return {
          type: "keyword",
          value: this.reservTokens.Fin,
          description: "Termina de ejecutar el programa"
        }
      }
      case this.reservTokens.DibujarCirculo.name: {
        this.reservTokens.DibujarCirculo(56, 12);
        return {
          type: "function",
          value: this.reservTokens.DibujarCirculo,
          description: "Dibuja un circulo"
        }
      }
      case this.reservTokens.DibujarRectangulo: {
        return {
          type: "function",
          value: this.reservTokens.DibujarRectangulo,
          description: "Dibuja un rectangulo"
        }
      }
      case this.reservTokens.DibujarTriangulo: {
        return {
          type: "function",
          value: this.reservTokens.DibujarTriangulo
        }
      }
      case this.reservTokens.EliminarFigura: {
        return {
          type: "function",
          value: this.reservTokens.EliminarFigura
        } 
      }
      case this.reservTokens.Dormir: {
        return {
          type: "function",
          value: this.reservTokens.Dormir
        } 
      }
      case this.reservTokens.ROJO: {
        return {
          type: "function",
          value: this.reservTokens.ROJO
        } 
      }
      case this.reservTokens.AZUL: {
        return {
          type: "function",
          value: this.reservTokens.AZUL
        } 
      }
      case this.reservTokens.AMARILLO: {
        return {
          type: "function",
          value: this.reservTokens.AMARILLO
        } 
      }
      case "(": 
        return {type: "Punctuator", value: token}
      case ")": 
        return {type: "Punctuator", value: token}
      case ".": 
        return {type: "Punctuator", value: token}
      case ",": 
        return {type: "Punctuator", value: token}
      default:
        // console.log(token);
        if (typeof token === 'number', token) {
          let isInteger = parseFloat(token);
          return {
            type: Number.isInteger(isInteger) ? "Number int" : "Decimal number",
            value: token,
          }
        } else {
            return {
              type: "Identifier",
              value: token
            }
        }
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