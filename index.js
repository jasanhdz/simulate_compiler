import SplitTokens from './plugins/SplitTokens.js';
import Interpret from './plugins/Interpret.js';

const debugerContainer = document.getElementById('debugger');
// const canvas = document.getElementById('area_de_dibujo');
const string = document.getElementById('tokens');
const $button = document.getElementById('interprete');

const tokens = new SplitTokens({interpret: new Interpret({debuger:debugerContainer}) });
$button.onclick = () => tokens.createTokens(string);



