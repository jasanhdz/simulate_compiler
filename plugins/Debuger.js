function Debuger(object) {
  this.arrayMessages = [];
  this.container = object.container;
}

Debuger.prototype.Error = function (message, color) { 
  let obj = [];
  if (this.arrayMessages.length === 0) {
    this.container.innerHTML = '';
  }
  if (!this.arrayMessages.includes(message)) {
    obj.push(message);
    this.arrayMessages = obj;
    this.arrayMessages.map(msg => {
      const template = document.createElement('p');
      const fin = document.createElement('p');
      if (color) {
        template.style.color = color;
        template.textContent = msg;
        return this.container.appendChild(template);
      } else {
        template.style.color = "red";
        template.textContent = msg;
        this.container.appendChild(template);
        fin.style.color = "red";
        fin.textContent = "Fin del programa.....";
        this.container.appendChild(fin)
        throw new Error(msg);
      }
    });
  }
}

export default Debuger;