import { keyWords, arrayKeyWords } from "../reservTokens.js";
import GetColor from "../utils/colors.js";
// import Debuger from './Debuger'

function Interpret(object) {
  this.Debuger = object.debuger;
  this.containerDebuger = object.container;
  this.drawings = object.drawings;
  this.splitTokens = object.splitTokens;
  this.keyWords = { ...keyWords };
  this.ids = [];
  this.arrayKeyWords = [...arrayKeyWords];
}

Interpret.prototype.processTokens = function (str) {
  let data = this.splitTokens.createTokens(str);
  this.tokens = data.tokens;
  this.objectTokens = data.tokenObjects;
  this.constantes = [];
  this.buildNameProgram();
};

Interpret.prototype.verifyConstantes = function () {
  const indexesConstante = this.getAllIndexes(
    this.tokens,
    this.keyWords.Constante
  );
  if (indexesConstante.length < 2) {
    this.runIndexes(indexesConstante, this.keyWords.Constante);
    if (this.constantes.length > 0) {
      this.Debuger.Error(`constantes: ${JSON.stringify(this.constantes)}`, "blue");
      this.buildInitProgram();
    } else {
      this.Debuger.Error("Syntax Error: Debes definir primero las constantes");
      console.log(this.constantes.length);
    }
  } else {
    this.Debuger.Error(
      `Syntax Error: **${this.keyWords.Constante}** no se puede definir más de 1 vez :(`
    );
  }
};

Interpret.prototype.buildNameProgram = function() {
  this.containerDebuger.innerHTML = "";
  // console.log(this.tokens);
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
        this.Debuger.Error(`Semantic Error: En la definición del Programa`);
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
    const indexFin = this.getAllIndexes(this.tokens, this.keyWords.Fin)
    const indexesDormir = this.getAllIndexes(this.tokens, this.keyWords.Dormir);
    if (this.tokens[this.tokens.length-1] === "Fin") {
      // get functions positions
      if (indexesEnd.length === 1) { 
        let indexesFunctions = indexesDrawCircle
          .concat(indexesDrawTriangulo)
          .concat(indexesDrawRectangulo)
          .concat(indexesDormir)
          .concat(indexesDeleteFigure)
          .concat(indexFin);
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
      return this.createArrayConstantes(position);
    case this.keyWords.DibujarCirculo:
      return this.buildParamsCircle(position);
    case this.keyWords.DibujarTriangulo:
      return this.buildParamsTriangle(position);
    case this.keyWords.EliminarFigura:
      return this.buildParamDeleteFigure(position);
    case this.keyWords.Fin:
      swal("Buen trabajo!", "El programa se ejecuto con éxito!", "success");
    default:
      return 0;
  }
};

Interpret.prototype.buildParamSleep = function(position) {
  // Dormir(time)
  // debugger;
  const iniFn = this.tokens[position + 1] === "(";
  const time = this.tokens[position + 2];
  const finFn = this.tokens[position + 3];
  if (iniFn && time !== ")") {
    if (finFn !== ")") {
      this.Debuger.Error("SyntaxError: La función debe abrir y cerrar parantesis");
    }
    else if (typeof time === "number") {
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
    this.Debuger.Error(`SyntaxError: La función ${this.tokens[position]} recibe un párametro indefinido`);
  }
};

Interpret.prototype.buildParamDeleteFigure = function(position) {
  // EliminarFigura(id);
  // debugger;
  let iniFn = this.tokens[position + 1];
  let id = this.tokens[position + 2];
  let finFn = this.tokens[position + 3] === ")";

  if (iniFn === "(" && id !== ")") {
    if (!this.ids.includes(id) && finFn) {
      this.Debuger.Error(`Semantic Error: No existe niguna figura con el id: ${id} `)
    }
    else if (!finFn) {
      this.Debuger.Error(
        `Syntax Error: La función ${this.tokens[position]} debe cerrar con parentesis :(`
      );
    }
    // this.Debuger.Error("Función escrita correctamente", "blue");
    console.log(this.ids);
    // debugger;
    this.ids.splice(this.ids.indexOf(id), 1);
    this.drawings.removeFigure(id);
  } else {
    this.Debuger.Error(
      `Syntax Error: La función ${this.tokens[position]} recibe un id indefinido :(`
    );  }
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

Interpret.prototype.validationPostiveNumber = function (number) {
  if (number > 0) {
    return number;
  } else {
    return this.Debuger.Error("Semantic Error: El Programa no acepta números Negativos");
  }
} 

Interpret.prototype.createArrayConstantes = function (position) {
  for (let i = position; i < this.tokens.length; i+=2) {
    let clave = this.tokens[i + 1];
    let valor = this.tokens[i + 2];
    if (clave === "Inicio" || clave === undefined) {
      break;
    } else {
      if (!this.arrayKeyWords.includes(clave)) {
        debugger;
          if (typeof clave === "string" && typeof valor === "number") {
            if (this.constantes.length === 0) {
              if (this.validationPostiveNumber(valor)) {
                this.constantes.push({ name: clave, value: valor });
              }
            } else {
              let getNames = this.getFields(this.constantes, "name");
              // debugger;
              if (!getNames.includes(clave)) {
                if (this.validationPostiveNumber(valor)) {
                  this.constantes.push({ name: clave, value: valor });
                }
              } else {
                this.Debuger.Error(`SyntaxError: La constante "${clave}" ya esta declarada :(`);
                break;
              }
            }
          } else {
            this.Debuger.Error(
              `SyntaxError: El valor que intentas asignar con clave: ${clave} y valor: ${valor} } no es posible`
            );
            break;
          }
        } else {
          this.Debuger.Error(
            `SyntaxError: No puedes usar ${clave} porque es una Palabra reservada`
          );
          break;
        }
    }
  }
}

Interpret.prototype.getFields = function(array, clave) {
  let output = [];
  for (let i = 0; i < array.length; i++) output.push(array[i][clave]);
  return output;
};

Interpret.prototype.buildParamsRectangle = function(position) {
  // must containt 13 positions ( 2, 4, 6, 8, 10, Color);
  let iniFn = this.tokens[position + 1] === "(";
  let color = GetColor(this.keyWords[this.tokens[position + 12]]);
  let strColor = this.tokens[position + 12];
  // debugger;
  let finFn = this.tokens[position + 13] === ")";
  let id = this.tokens[position + 10];
  if (!iniFn && !finFn) {
    this.Debuger.Error(`Syntax Error: ${this.tokens[position]}: Debe recibir los párametros entre parentesis`)
  }
  let params = []
  if (
    this.tokens[position + 2] !== ',' ||
    this.tokens[position + 4] !== ',' ||
    this.tokens[position + 6] !== ',' ||
    this.tokens[position + 8] !== ','
  ) {
      params = [
        this.tokens[position + 2],
        this.tokens[position + 4],
        this.tokens[position + 6],
        this.tokens[position + 8],
      ];
  } else {
    this.Debuger.Error(`Syntax Error: la función ${this.tokens[position]} contiene parametros indefinidos`)
  }
  let finalValue = [];

  if (params.length === 4) {
    // debugger;
    params.forEach(e => {
      if (typeof e === "string") {
        let r = this.constantes.find(constante => constante.name === e);
        // debugger;
        if (r !== undefined) {
          finalValue.push(this.validationPostiveNumber(r.value)); 
        } 
      } else {
        if (typeof e === "number") {
          finalValue.push(this.validationPostiveNumber(e)); 
        } else {
          finalValue.push(e);
        }
      }
    });
    console.log(finalValue);
    if (!this.ids.includes(id)) {
      if (color === undefined) {
        this.Debuger.Error(`Semantic Error: El color: ${strColor} que ingresante a ${this.tokens[position]} con ${id} es indefinido`);
      }
      this.drawings.dibujarRectangulo(...finalValue, id, color);
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
  let strColor = this.tokens[position + 10]
  let finFn = this.tokens[position + 11] === ")";
  let id = this.tokens[position + 8];
  let params = []
  if (
    this.tokens[position + 2] !== ',' ||
    this.tokens[position + 4] !== ',' ||
    this.tokens[position + 6] !== ','
  ) {
    params = [
      this.tokens[position + 2],
      this.tokens[position + 4],
      this.tokens[position + 6]
    ];
  } else {
    this.Debuger.Error(`Syntax Error: la función ${this.tokens[position]} contiene parametros indefinidos`)
  }

  if (!iniFn && !finFn) {
    this.Debuger.Error(`Syntax Error: ${this.tokens[position]}: Debe recibir los párametros entre parentesis`)
  }

  let finalValue = [];
  // debugger;
  if (params.length === 3) {

    params.forEach(e => {
      if (typeof e === "string") {
        let r = this.constantes.find(constante => constante.name === e);
        if (r !== undefined) {
          finalValue.push(this.validationPostiveNumber(r.value)); 
        } 
      } else {
        if (typeof e === "number") {
          finalValue.push(this.validationPostiveNumber(e)); 
        } else {
          finalValue.push(e);
        }
      }
    });
    if (!this.ids.includes(id)) {
      if (color === undefined) {
        this.Debuger.Error(`Semantic Error: El color: ${strColor} que ingresante a ${this.tokens[position]} con ${id} es indefinido`);
      }
      this.drawings.dibujarCirculo(...finalValue, id, color);
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
  let strColor = this.tokens[position + 16]
  // debugger;
  let finFn = this.tokens[position + 17] === ")";
  let id = this.tokens[position + 14];

  if (!iniFn && !finFn) {
    this.Debuger.Error(`Syntax Error: ${this.tokens[position]}: Debe recibir los párametros entre parentesis`)
  }

  let params = []
  if (
    this.tokens[position + 2] !== ',' ||
    this.tokens[position + 4] !== ',' ||
    this.tokens[position + 6] !== ',' ||
    this.tokens[position + 8] !== ',' ||
    this.tokens[position + 10] !== ',' ||
    this.tokens[position + 12] !== ','
  ) {
    params = [
      this.tokens[position + 2], // x1
      this.tokens[position + 4], // y1
      this.tokens[position + 6], // x2
      this.tokens[position + 8], // y2
      this.tokens[position + 10], // x3
      this.tokens[position + 12] // y3
    ];
  } else {
    this.Debuger.Error(`Syntax Error: la función ${this.tokens[position]} contiene parametros indefinidos`)
  }
  let finalValue = [];
  // debugger;
  if (params.length === 6) {
    params.forEach(e => {
      if (typeof e === "string") {
        let r = this.constantes.find(constante => constante.name === e);
        if (r !== undefined) {
          finalValue.push(this.validationPostiveNumber(r.value)); 
        } 
      } else {
        if (typeof e === "number") {
          finalValue.push(this.validationPostiveNumber(e)); 
        } else {
          finalValue.push(e);
        }
      }
    });
    if (!this.ids.includes(id)) {
      if (color === undefined) {
        this.Debuger.Error(`Semantic Error: El color: ${strColor} que ingresante a ${this.tokens[position]} con ${id} es indefinido`);
      }
      this.drawings.dibujarTriangulo(...finalValue, id, color);
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
