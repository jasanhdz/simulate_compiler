function GetColor(color) {
  switch (color) {
    case "NEGRO":
      return "black";
    case "AZUL":
      return "blue"
    case "VERDE":
      return "green"
    case "AMARILLO":
      return "yellow";
    case "ROJO":
      return "red";
    default:
      return undefined;
  }
}

export default GetColor;