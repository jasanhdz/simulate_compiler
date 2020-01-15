import { keyWords } from '../reservTokens.js';

function Interpret(object) { 
  this.debuger = object.debuger;
  this.arrayMessages = [];
  this.keyWords = { ...keyWords };
  this.constantes = [];
}

Interpret.prototype.getTokens = function (objectTokens, tokens) {
  this.objectTokens = objectTokens;
  this.tokens = tokens;
  this.buildNameProgram();
}

Interpret.prototype.addTemplate = function (message) {
  let obj = [];
  if (!this.arrayMessages.includes(message)) {
    obj.push(message);
    this.arrayMessages = obj;
    this.arrayMessages.map(msg => {
      const template = document.createElement('p');
      template.textContent = msg;
      return this.debuger.appendChild(template);
    });
  }
}

Interpret.prototype.tokenLogic = function () { }

Interpret.prototype.buildNameProgram = function () { 
  this.debuger.innerHTML = '';
  if (this.tokens[0] === this.keyWords.Programa) {
    const indexesProgram = this.getAllIndexes(this.tokens, this.keyWords.Programa);
    if (indexesProgram.length < 2) {
      // console.log(this.tokens);
      let position = this.tokens.indexOf('Programa');
      let name = this.tokens[position + 1];
      if (name !== undefined) {
        this.addTemplate(`${this.tokens[position]} ${name}`);
        const indexesConstante = this.getAllIndexes(this.tokens, this.keyWords.Constante);
        this.runIndexes(indexesConstante, this.keyWords.Constante);
        if (this.constantes.length > 0) {
          this.addTemplate(`constantes: ${JSON.stringify(this.constantes)}`)
          this.buildInitProgram();
        }
        else this.addTemplate("Deberías definir primero las constantes");
        console.log(this.constantes.length);
      }
      else {
        this.addTemplate(`El programa debe estar definido`);
        this.addTemplate(`Fin del programa`);
      }
    } else {
      this.addTemplate(`**${this.keyWords.Programa}** no se puede definir más de 1 vez :(`);
    }
  } else {
    this.addTemplate("El programa debe comenzar con la palabra **Programa**");
  }
}

Interpret.prototype.buildInitProgram = function () { 
  const start = this.tokens.indexOf(this.keyWords.Inicio);
  // console.log(start, "aui");
  if (start) {
    const indexesDrawCircle = this.getAllIndexes(this.tokens, this.keyWords.DibujarCirculo);
    const indexesDrawTriangulo = this.getAllIndexes(this.tokens, this.keyWords.DibujarTriangulo);
    const indexesDrawRectangulo = this.getAllIndexes(this.tokens, this.keyWords.DibujarRectangulo);
    // console.log(indexesDrawCircle);
    // console.log(this.words);
    this.runIndexes(indexesDrawCircle, this.keyWords.DibujarCirculo);
    this.runIndexes(indexesDrawRectangulo, this.keyWords.DibujarRectangulo);
    this.runIndexes(indexesDrawTriangulo, this.keyWords.DibujarTriangulo);
  } else {

  }
}

Interpret.prototype.runIndexes = function (arrIndexes = [], keyword) {
  arrIndexes.forEach(key => {
    this.getCompared(key, keyword);
  })
}

Interpret.prototype.getCompared = function (position, keyword) {
  // debugger;
  let i = 0;
    switch (keyword) {
      case this.keyWords.DibujarCirculo: {
        this.getComparedFunctions(position);
        this.drawFigure(position + 1, position + 2);
      }
      case this.keyWords.Constante: {
        this.createConstante(position);
      }
    }
  console.log(this.constantes);
}

Interpret.prototype.createConstante = function (position) {
  let clave = this.tokens[position + 1];
  let valor = this.tokens[position + 2];
  debugger;
  if (typeof valor === 'number') {
    if (this.constantes.length === 0) {
      this.constantes.push({ name: clave, value: valor })
    } else {
      let getNames = this.getFields(this.constantes, "name");
      debugger;
      if (!getNames.includes(clave)) {
        this.constantes.push({ name: clave, value: valor })
      } else {
        this.addTemplate(`La constante ya esta declarada :(`);
      }
    }
  } else {
    this.addTemplate(`El valor que intentas asignar en: ${clave} : ${valor} no es posible`);
  }
}

Interpret.prototype.getFields = function (array, clave) {
  let output = [];
  for (let i = 0; i < array.length; i++) 
    output.push(array[i][clave]);
    return output;
}

Interpret.prototype.getComparedFunctions = function (position) { 
  let v1, v2;
  if (this.tokens[position + 1] === "(") {
    v1 = this.tokens[position + 2];
    console.log(!"Iniciando instrucción");
    if (this.tokens[position + 5] === ")") {
      console.log("fin de la instrucción");
    } else console.log(`la función ${this.tokens[position]} debe terminar con )`)
  } else {
    console.log(`la función ${this.tokens[position]} debe llevar parentesis`)
  }
}

Interpret.prototype.getAllIndexes = function (arr, val) {
  // debugger;
  let indexes = [], i = -1;
  while ((i = arr.indexOf(val, i+1)) != -1) {
    indexes.push(i);
    // debugger;
  }
  return indexes;
}

export default Interpret;