function readFile(htmlFile, input) {
  let file = htmlFile.files[0];
  let reader = new FileReader();

  reader.onload = function () {
    return input.value = reader.result;
  }

  if (file) {
    reader.readAsText(file, 'UTF-8');
  } else {
    return input.value = "";
  }
}

export default readFile;