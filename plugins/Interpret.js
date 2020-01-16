import { keyWords } from '../reservTokens.js';

function Interpret(object) { 
  this.debuger = object.debuger;
  this.arrayMessages = [];
  this.keyWords = { ...keyWords };
  this.drawings = object.drawings;
}

Interpret.prototype.getTokens = function (objectTokens, tokens) {
  this.objectTokens = objectTokens;
  this.tokens = tokens;
  this.constantes = [];
  this.namesConstantes = [];
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

Interpret.prototype.verifyConstantes = function () { 
  const indexesConstante = this.getAllIndexes(this.tokens, this.keyWords.Constante);
  this.runIndexes(indexesConstante, this.keyWords.Constante);
  if (this.constantes.length > 0) {
    this.addTemplate(`constantes: ${JSON.stringify(this.constantes)}`)
    this.buildInitProgram();
  }
  else {
    this.addTemplate("Deberías definir primero las constantes");
    console.log(this.constantes.length);
  }
}

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
        this.verifyConstantes();
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
  this.debuger.innerHTML = '';
  const indexesStart = this.getAllIndexes(this.tokens, this.keyWords.Inicio);
  if (indexesStart.length === 1) {
    const indexesDrawCircle = this.getAllIndexes(this.tokens, this.keyWords.DibujarCirculo);
    const indexesDrawTriangulo = this.getAllIndexes(this.tokens, this.keyWords.DibujarTriangulo);
    const indexesDrawRectangulo = this.getAllIndexes(this.tokens, this.keyWords.DibujarRectangulo);
    // console.log(indexesDrawCircle);
    // console.log(this.words);
    this.runIndexes(indexesDrawCircle, this.keyWords.DibujarCirculo);
    this.runIndexes(indexesDrawRectangulo, this.keyWords.DibujarRectangulo);
    this.runIndexes(indexesDrawTriangulo, this.keyWords.DibujarTriangulo);
  }
  else if (indexesStart.length >= 2) {
    this.addTemplate(`no puedes poner ** ${indexesStart.length} Inicio** en el programa`);
  }
  else {
    this.addTemplate("Ahora debes definir el punto de entrada del programa :p usando **Inicio**");
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
      case this.keyWords.DibujarRectangulo: {
        return this.buildParamsRectangle(position);
      }
      case this.keyWords.Constante: {
       return this.createConstante(position);
      }
    }
  console.log(this.constantes);
}

Interpret.prototype.createConstante = function (position) {
  let clave = this.tokens[position + 1];
  let valor = this.tokens[position + 2];
  debugger;
  if (typeof valor === 'number' && typeof clave !== 'number') {
    if (this.constantes.length === 0) {
      this.constantes.push({ name: clave, value: valor })
      this.namesConstantes.push(clave);
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
    this.addTemplate(`El valor que intentas asignar con clave: ${clave} y valor: ${valor} } no es posible`);
  }
}

Interpret.prototype.getFields = function (array, clave) {
  let output = [];
  for (let i = 0; i < array.length; i++) 
    output.push(array[i][clave]);
    return output;
}

Interpret.prototype.buildParamsRectangle = function (position) {
  // must containt 13 positions ( 2, 4, 6, 8, 10, Color);
  let iniFn = this.tokens[position + 1] === "(";
  let color = this.keyWords[this.tokens[position + 12]];
  let finFn = this.tokens[position + 13] === ")";
  let id = this.tokens[position + 10];
  let params = [
    this.tokens[position + 2],
    this.tokens[position + 4],
    this.tokens[position + 6],
    this.tokens[position + 8],
  ];
  let finalValue = [];

  if (iniFn && params.length === 4 && color && finFn) {
    debugger;
    this.addTemplate("Función escrita correctamente");

    params.forEach(e => {
      if (typeof e === "string") {
        let r = this.constantes.find(constante => constante.name === e)
        debugger;
        if (r !== undefined) {
          finalValue.push(r.value);
        } 
      } else {
        finalValue.push(e);
      }
    })
  }
  let getParams = [...finalValue, id, color];
  this.drawings.dibujarRectangulo(...getParams);
}

// I guarentee that a function arrives
Interpret.prototype.getComparedFunctions = function (position) { 

  // check if it containts constants
  let v1, v2;
  if (this.tokens[position + 1] === "(") {
    v1 = this.tokens[position + 2];
    console.log("Iniciando instrucción");
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