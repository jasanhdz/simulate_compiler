let array1 = [1, 1, 3, 5, 9];

array1.forEach(element => {
  verify(element);
});

function verify(element) {
  switch (true) {
    case (element < 9): {
      return console.log("Es un número");
    }
    default: return console.log("Falso");    
  }
}

