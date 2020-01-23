import { keyWords } from "../reservTokens.js";
import GetColor from "../utils/colors.js";
// import Debuger from './Debuger'

function Interpret(object) {
  this.Debuger = object.debuger;
  this.containerDebuger = object.container;
  this.drawings = object.drawings;
  this.splitTokens = object.splitTokens;
  this.keyWords = { ...keyWords };
  this.ids = [];
}

Interpret.prototype.processTokens = function(str) {
  const data = this.splitTokens.createTokens(str);
  this.tokens = data.tokens;
  this.objectTokens = data.tokenObjects;
  this.constantes = [];
  this.buildNameProgram();
};

Interpret.prototype.verifyConstantes = function() {
  const indexesConstante = this.getAllIndexes(
    this.tokens,
    this.keyWords.Constante
  );
  this.runIndexes(indexesConstante, this.keyWords.Constante);
  if (this.constantes.length > 0) {
    this.Debuger.Error(`constantes: ${JSON.stringify(this.constantes)}`, "blue");
    this.buildInitProgram();
  } else {
    this.Debuger.Error("Syntax Error: Debes definir primero las constantes");
    console.log(this.constantes.length);
  }
};

Interpret.prototype.buildNameProgram = function() {
  this.containerDebuger.innerHTML = "";
  if (this.tokens[0] === this.keyWords.Programa) {
    const indexesProgram = this.getAllIndexes(
      this.tokens,
      this.keyWords.Programa
    );
    if (indexesProgram.length < 2) {
      // console.log(this.tokens);
      let position = this.tokens.indexOf("Programa");
      let name = this.tokens[position + 1];
      if (name !== undefined) {
        this.Debuger.Error(`${this.tokens[position]} ${name}`, "blue");
        this.verifyConstantes();
      } else {
        this.Debuger.Error(`Semantic Error: El programa debe estar definido`);
        this.Debuger.Error(`Fin del programa`);
      }
    } else {
      this.Debuger.Error(
        `Syntax Error: **${this.keyWords.Programa}** no se puede definir más de 1 vez :(`
      );
    }
  } else {
    this.Debuger.Error("Syntax Error: El programa debe comenzar con la palabra **Programa**");
  }
};

Interpret.prototype.buildInitProgram = function() {
  // this.containerDebuger.innerHTML = "";
  const indexesStart = this.getAllIndexes(this.tokens, this.keyWords.Inicio);
  const indexesEnd = this.getAllIndexes(this.tokens, this.keyWords.Fin);
  console.log(indexesEnd);
  if (indexesStart.length === 1) {
    const indexesDrawCircle = this.getAllIndexes(
      this.tokens,
      this.keyWords.DibujarCirculo
    );
    const indexesDrawTriangulo = this.getAllIndexes(
      this.tokens,
      this.keyWords.DibujarTriangulo
    );
    const indexesDrawRectangulo = this.getAllIndexes(
      this.tokens,
      this.keyWords.DibujarRectangulo
    );
    const indexesDeleteFigure = this.getAllIndexes(
      this.tokens,
      this.keyWords.EliminarFigura
    );
    const indexesDormir = this.getAllIndexes(this.tokens, this.keyWords.Dormir);
    if (this.tokens[this.tokens.length-1] === "Fin") {
      // get functions positions
      if (indexesEnd.length === 1) { 
        let indexesFunctions = indexesDrawCircle
        .concat(indexesDrawTriangulo)
        .concat(indexesDrawRectangulo)
        .concat(indexesDormir)
        .concat(indexesDeleteFigure);
      // we order the positions of the functions
      this.indexesFunctions = indexesFunctions.sort((a, b) => a - b);
      // we iterate according to the positions
      this.runIndexes(this.indexesFunctions);
      } else {
        this.Debuger.Error(
          `Semantic Error: no puedes poner ** ${indexesEnd.length} Fin** en el programa`
        );
       }
    }
    else {
      this.Debuger.Error(
        "Syntax Error: Debes finalizar la instrucción con **Fin**"
      );
    }
  } else if (indexesStart.length >= 2) {
    this.Debuger.Error(
      `Semantic Error: no puedes poner ** ${indexesStart.length} Inicio** en el programa`
    );
  } else {
    this.Debuger.Error(
      "Syntax Error: Ahora debes definir el punto de entrada del programa :p usando **Inicio**"
    );
  }
};

Interpret.prototype.runIndexes = function (arrIndexes = []) {
  for (let i = 0; i < arrIndexes.length; i++) {
    if (this.tokens[arrIndexes[i]] === "Dormir") {
      console.log(this.tokens);
      debugger;
      this.buildParamSleep(arrIndexes[i]);
      break;
    } else {
      this.getCompared(arrIndexes[i], this.tokens[arrIndexes[i]]);
    }
  }
};

Interpret.prototype.getCompared = function (position, keyword) {
  debugger;
  switch (keyword) {
    case this.keyWords.DibujarRectangulo:
      return this.buildParamsRectangle(position);
    case this.keyWords.Constante:
      return this.createConstante(position);
    case this.keyWords.DibujarCirculo:
      return this.buildParamsCircle(position);
    case this.keyWords.DibujarTriangulo:
      return this.buildParamsTriangle(position);
    case this.keyWords.EliminarFigura:
      return this.buildParamDeleteFigure(position);
    default:
      return 0;
  }
};

Interpret.prototype.buildParamSleep = function(position) {
  // Dormir(time)
  // debugger;
  const iniFn = this.tokens[position + 1] === "(";
  const time = this.tokens[position + 2];
  const finFn = this.tokens[position + 3] === ")";
  if (iniFn && time && finFn) {
    if (typeof time === "number") {
      this.tokens.splice(position, 1);
      // this.tokens.splice(position + 1, 1);
      // this.tokens.splice(position + 2, 1);
      // this.tokens.splice(position + 3, 1);
      debugger;
      this.ids = [];
      this.sleep(time);
      console.log("ultimo");
    } else {
      this.Debuger.Error(`SyntaxError: el ${time} de Dormir no es un número :'(`)
    }
  } else {
    this.Debuger.Error("SyntaxError: La función debe abrir y cerrar parantesis");
  }
};

Interpret.prototype.buildParamDeleteFigure = function(position) {
  // EliminarFigura(id);
  // debugger;
  let iniFn = this.tokens[position + 1] === "(";
  let id = this.tokens[position + 2];
  let finFn = this.tokens[position + 3] === ")";
  if (iniFn && id && finFn) {
    this.Debuger.Error("Función escrita correctamente", "blue");
    console.log(this.ids);
    // debugger;
    this.ids.splice(this.ids.indexOf(id), 1);
    this.drawings.removeFigure(id);
  } else {
    this.Debuger.Error("SyntaxError: La función debe abrir y cerrar parantesis");
  }
};

Interpret.prototype.createConstante = function(position) {
  let clave = this.tokens[position + 1];
  let valor = this.tokens[position + 2];
  // debugger;
  if (typeof valor === "number" && typeof clave !== "number") {
    if (this.constantes.length === 0) {
      this.constantes.push({ name: clave, value: valor });
    } else {
      let getNames = this.getFields(this.constantes, "name");
      // debugger;
      if (!getNames.includes(clave)) {
        this.constantes.push({ name: clave, value: valor });
      } else {
        this.Debuger.Error(`SyntaxError: La constante ya esta declarada :(`);
      }
    }
  } else {
    this.Debuger.Error(
      `SyntaxError: El valor que intentas asignar con clave: ${clave} y valor: ${valor} } no es posible`
    );
  }
};

Interpret.prototype.getFields = function(array, clave) {
  let output = [];
  for (let i = 0; i < array.length; i++) output.push(array[i][clave]);
  return output;
};

Interpret.prototype.buildParamsRectangle = function(position) {
  // must containt 13 positions ( 2, 4, 6, 8, 10, Color);
  let iniFn = this.tokens[position + 1] === "(";
  let color = GetColor(this.keyWords[this.tokens[position + 12]]);
  // debugger;
  let finFn = this.tokens[position + 13] === ")";
  let id = this.tokens[position + 10];
  let params = [
    this.tokens[position + 2],
    this.tokens[position + 4],
    this.tokens[position + 6],
    this.tokens[position + 8]
  ];
  let finalValue = [];

  if (iniFn && params.length === 4 && color && id && finFn) {
    // debugger;
    this.Debuger.Error("Función escrita correctamente", "blue");

    params.forEach(e => {
      if (typeof e === "string") {
        let r = this.constantes.find(constante => constante.name === e);
        // debugger;
        if (r !== undefined) {
          finalValue.push(r.value);
        }
      } else {
        finalValue.push(e);
      }
    });

    let getParams = [...finalValue, id, color];
    if (!this.ids.includes(id)) {
      this.drawings.dibujarRectangulo(...getParams);
      this.ids.push(id);
    } else {
      this.Debuger.Error("SyntaxError: Ya existe una figura con ese Id :p ");
    }
  }
};

Interpret.prototype.buildParamsCircle = function(position) {
  // must containt 11 positions ( coordX, coordY, radio, id, color )
  let iniFn = this.tokens[position + 1] === "(";
  let color = GetColor(this.keyWords[this.tokens[position + 10]]);
  // debugger;
  let finFn = this.tokens[position + 11] === ")";
  let id = this.tokens[position + 8];
  let params = [
    this.tokens[position + 2],
    this.tokens[position + 4],
    this.tokens[position + 6]
  ];
  let finalValue = [];
  // debugger;
  if (iniFn && params.length === 3 && color && id && finFn) {
    // debugger;
    this.Debuger.Error("Función escrita correctamente", "blue");

    params.forEach(e => {
      if (typeof e === "string") {
        let r = this.constantes.find(constante => constante.name === e);
        // debugger;
        if (r !== undefined) {
          finalValue.push(r.value);
        }
      } else {
        finalValue.push(e);
      }
    });
    let getParams = [...finalValue, id, color];
    if (!this.ids.includes(id)) {
      this.drawings.dibujarCirculo(...getParams);
      this.ids.push(id);
    } else {
      this.Debuger.Error("SyntaxError: Ya existe una figura con ese Id :p ");
    }
  }
};

Interpret.prototype.buildParamsTriangle = function(position) {
  // must containt 17 positions
  // DibujarTriangulo(x1, y1, x2, y2, x3, y3, id, color);
  let iniFn = this.tokens[position + 1] === "(";
  let color = GetColor(this.keyWords[this.tokens[position + 16]]);
  // debugger;
  let finFn = this.tokens[position + 17] === ")";
  let id = this.tokens[position + 14];
  let params = [
    this.tokens[position + 2], // x1
    this.tokens[position + 4], // y1
    this.tokens[position + 6], // x2
    this.tokens[position + 8], // y2
    this.tokens[position + 10], // x3
    this.tokens[position + 12] // y3
  ];
  let finalValue = [];
  // debugger;
  if (iniFn && params.length === 6 && color && id && finFn) {
    // debugger;
    this.Debuger.Error("Función escrita correctamente", "blue");
    params.forEach(e => {
      if (typeof e === "string") {
        let r = this.constantes.find(constante => constante.name === e);
        // debugger;
        if (r !== undefined) {
          finalValue.push(r.value);
        }
      } else {
        finalValue.push(e);
      }
    });
    let getParams = [...finalValue, id, color];
    if (!this.ids.includes(id)) {
      this.drawings.dibujarTriangulo(...getParams);
      this.ids.push(id);
    } else {
      this.Debuger.Error("SyntaxError: Ya existe una figura con ese Id :p ");
    }
  }
};

// I guarentee that a function arrives
Interpret.prototype.getComparedFunctions = function(position) {
  // check if it containts constants
  let v1, v2;
  if (this.tokens[position + 1] === "(") {
    v1 = this.tokens[position + 2];
    console.log("Iniciando instrucción");
    if (this.tokens[position + 5] === ")") {
      console.log("fin de la instrucción");
    } else
      console.log(`SyntaxError: la función ${this.tokens[position]} debe terminar con )`);
  } else {
    console.log(`SyntaxError: la función ${this.tokens[position]} debe llevar parentesis`);
  }
};

Interpret.prototype.getAllIndexes = function(arr, val) {
  // debugger;
  let indexes = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i);
    // debugger;
  }
  return indexes;
};

Interpret.prototype.sleep = function (ms, flag) {
  let me = this;
  let time;
  if (!flag) {
    time = ms * 1000;
    setTimeout(function () {
      me.sleep(ms, true);
    }, time)
  } else {
    // debugger;
    console.log(`han pasado ${ms} Segundos`);
    console.log(me.tokens);
    me.buildInitProgram();
  }
}

export default Interpret;
