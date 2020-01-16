function Debuger(object) {
  this.arrayMessages = [];
  this.container = object.container;
}

Debuger.prototype.Error = function (message) { 
let obj = [];
  if (!this.arrayMessages.includes(message)) {
    obj.push(message);
    this.arrayMessages = obj;
    this.arrayMessages.map(msg => {
      const template = document.createElement('p');
      template.textContent = msg;
      return this.container.appendChild(template);
    });
  }
}

export default Debuger;