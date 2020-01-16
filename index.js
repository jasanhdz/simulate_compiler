import SplitTokens from "./plugins/SplitTokens.js";
import Interpret from "./plugins/Interpret.js";
import readFile from "./utils/readFile.js";
import DrawFigures from "./plugins/DrawFigures.js";

const debugerContainer = document.getElementById("debugger");
const canvas = document.getElementById('area_de_dibujo');
const string = document.getElementById("tokens");
const $button = document.getElementById("interprete");
const fileToLoad = document.getElementById("file");

const tokens = new SplitTokens({
  interpret: new Interpret({
    debuger: debugerContainer,
    drawings: new DrawFigures({canvas: canvas})
  }),

});
$button.onclick = () => tokens.createTokens(string);
fileToLoad.onchange = () => {
  readFile(fileToLoad, string);
  string.focus();
};
