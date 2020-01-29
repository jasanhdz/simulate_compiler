import { keyWords } from "../reservTokens.js";

function SplitTokens(config) {
  this.tokenObject = [];
  this.keyWords = { ...keyWords };
  this.tokens = [];
  this.Debuger = config.debuger;
}

SplitTokens.prototype.createTokens = function (str) {
  let obj = [], obj2 = [];
  this.tokens = str.value.split(/\.*(\(|\)|\s|\;|[,])/);
  this.tokens = this.tokens.filter(
    element => element !== "" && element !== "\n" && element !== " "
  );
  this.tokens.forEach(element => {
    obj.push(this.verifyToken(element))
    obj2.push(this.verifyNumber(element));
  });
  this.tokenObject = obj;
  this.tokens = obj2;
  console.log(this.tokens);
  return {
    tokenObjects: this.tokenObject,
    tokens: this.tokens,
  }
}

SplitTokens.prototype.verifyNumber = function (token) {
  debugger;
  let isNumber = !isNaN(token);
  if (isNumber) {
    token.includes(".")
      ? (token = parseFloat(token))
      : (token = parseInt(token));
  } 
  else {
    if (token !== ")" && token !== "(" && token !== "," && token !== "") {
      if (this.verifyString(token)) {
        return token
      } else {
        return this.Debuger.Error(
          "Syntax Error: Todos los identificadores deben comenzar con una letra y solo deben contener Letras y números"
        );
      }
    } else {
      return token
    }
  }
  return token;
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

SplitTokens.prototype.verifyString = function (str) {
  let FirstLetter = /^[A-Za-z]+[A-Za-z-0-9]*$/; 
  if (str.match(FirstLetter)) {
    return true;
  } else {
    return false;
  }
}

export default SplitTokens;
