function readFile(htmlFile, input) {
  let content;
  let file = htmlFile.files[0];
  let reader = new FileReader();

  reader.onload = function () {
    input.value = reader.result;
    return content;
  }

  if (file) {
    reader.readAsText(file, 'UTF-8');
  } else {
    input.value = "";
  }
}

export default readFile;