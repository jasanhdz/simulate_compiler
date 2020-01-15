import { keyWords } from '../reservTokens.js';

function Interpret(object) { 
  this.debuger = object.debuger;
  this.arrayMessages = [];
  this.keyWords = { ...keyWords };
}

Interpret.prototype.getTokens = function (objectTokens, tokens) {
  this.objectTokens = objectTokens;
  this.tokens = tokens;
  this.buildNameProgram();
}

Interpret.prototype.addTemplate = function (message) {
  this.debuger.innerHTML = '';
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

Interpret.prototype.tokenLogic = function () { }

Interpret.prototype.buildNameProgram = function () { 
  if (this.tokens[0] === this.keyWords.Programa) {
    const indexesProgram = this.getAllIndexes(this.tokens, this.keyWords.Programa);
    if (indexesProgram.length < 2) {
      console.log(this.tokens);
      let position = this.tokens.indexOf('Programa');
      let name = this.tokens[position + 1];
      name !== undefined ?
        console.log(`${this.tokens[position]} ${name} valeee`) :
        console.log(`El programa debe estar definido`);
      this.buildInitProgram();
    } else {
      console.log(`${this.keyWords.Programa} no se puede definir más de 1 vez :(`);
    }
  } else {
    console.log("El programa debe comenzar con la palabra Programa");
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
    switch (keyword) {
      case this.keyWords.DibujarCirculo: {
        this.getComparedFunctions(position);
        this.drawFigure(position + 1, position + 2);
      }
    }
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