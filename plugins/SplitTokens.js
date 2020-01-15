import { keyWords } from "../reservTokens.js";

function SplitTokens(config) {
  this.tokenObject = [];
  this.keyWords = { ...keyWords };
  this.interpret = config.interpret;
  this.tokens = [];
}

SplitTokens.prototype.createTokens = function (str) {
  let obj = [];
  this.tokens = str.value.split(/\.*(\(|\)|\d*\.*[\d]|\d|\s|\;)/);
  this.tokens = this.tokens.filter(
    element => element !== "" && element !== "\n" && element !== " "
  );
  this.tokens.forEach(element => {
    obj.push(this.verifyToken(element))
  });
  this.tokenObject = obj;
  // aqui debemos pasarle los tokens al Interpret
  this.interpret.getTokens(this.tokenObject, this.tokens)
}

SplitTokens.prototype.verifyToken = function(token) {
  let isNumber = !isNaN(token);
  if (isNumber) {
    token.includes(".")
      ? (token = parseFloat(token))
      : (token = parseInt(token));
  }
  switch (token) {
    case this.keyWords.Programa: {
      return {
        type: "keyword",
        value: this.keyWords.Programa,
        description: "Definicion del programa"
      };
    }
    case this.keyWords.Inicio: {
      return {
        type: "keyword",
        value: this.keyWords.Inicio,
        description: "Punto de entrada del programa"
      };
    }
    case this.keyWords.Fin: {
      return {
        type: "keyword",
        value: this.keyWords.Fin,
        description: "Termina de ejecutar el programa"
      };
    }
    case this.keyWords.DibujarCirculo: {
      this.keyWords.DibujarCirculo;
      return {
        type: "function",
        value: this.keyWords.DibujarCirculo,
        description: "Dibuja un circulo"
      };
    }
    case this.keyWords.DibujarRectangulo: {
      return {
        type: "function",
        value: this.keyWords.DibujarRectangulo,
        description: "Dibuja un rectangulo"
      };
    }
    case this.keyWords.DibujarTriangulo: {
      return {
        type: "function",
        value: this.keyWords.DibujarTriangulo
      };
    }
    case this.keyWords.EliminarFigura: {
      return {
        type: "function",
        value: this.keyWords.EliminarFigura
      };
    }
    case this.keyWords.Dormir: {
      return {
        type: "function",
        value: this.keyWords.Dormir
      };
    }
    case this.keyWords.ROJO: {
      return {
        type: "function",
        value: this.keyWords.ROJO
      };
    }
    case this.keyWords.AZUL: {
      return {
        type: "function",
        value: this.keyWords.AZUL
      };
    }
    case this.keyWords.AMARILLO: {
      return {
        type: "function",
        value: this.keyWords.AMARILLO
      };
    }
    case "(":
      return { type: "Punctuator", value: token };
    case ")":
      return { type: "Punctuator", value: token };
    case ".":
      return { type: "Punctuator", value: token };
    case ",":
      return { type: "Punctuator", value: token };
    default:
      if (typeof token === "number" && token !== " ") {
        let isInteger = parseFloat(token);
        return {
          type: Number.isInteger(isInteger) ? "Number int" : "Decimal number",
          value: token
        };
      } else {
        return { type: "Identifier", value: token };
      }
  }
};

export default SplitTokens;
