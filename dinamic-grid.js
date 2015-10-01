/**
 * @category Functions
 * @package  EverCMS
 * @author   Everaldo Reis <contato@everaldoreis.com.br>
 * @license  Apache License Version 2.0, January 2004 <http://www.apache.org/licenses/>
 * @link     http://www.everaldoreis.com.br/dingrid.html
 */
function gengrid() {
    // Define o conteiner para as células do GRID
    var gridconteiner = document.getElementById('grid-conteiner');
    // Pega o tamanho do conteiner
    var w = gridconteiner.offsetWidth;
    var opts = {
        cols: 6, // Quantidade máxima de colunas
        cw: 237, // Largura mímina da coluna e células
        margin: 10, // Margin entre as células
        padding: 6 // Padding das células
    };
    // Calcula a quantidade de colunas possíveis com base na largura mínima
    for (i = 1; i < opts.cols; i++)
       if (w <= (opts.cw * (i + 1)) && w > (opts.cw * i))
            opts.cols = i;
    // Pega todas as celulas do grid e coloca em um array
    var cells = document.getElementsByClassName('cell');
    // Calcula a largura das colunas e células
    opts.cw = (Math.ceil(w / opts.cols) - ((opts.margin * 2) + (opts.padding * 2)));
    // Index de coluna
    var colIndex = 0;
    // Vetor de altura das colunas
    var colls = [];
    // Valor da maior coluna, usado para redimensionar o conteiner
    var maxCol = 0;
    // Margin total da célular
    var marginTotal = (opts.margin * 2);
    // Padding total da célula
    var paddingTotal = (opts.padding * 2);
    // Inicializa um vetor (t) com a altura das colunas
    var a = 0;
    while (a < opts.cols)
       colls[a++] = 0;
   // Caminha por cada célula para definir sua posição no grid
   for (i in cells) {
       if (typeof cells[i] == 'object') {
           // Procura pela menor coluna e armazena o index (f)
           for (f in colls)
               if (colls[f] < colls[colIndex])
                   colIndex = f;
           // Coloca a célula em position absolute
           cells[i].style.position = 'absolute';
           // Define a largura da célula
           cells[i].style.width = opts.cw + 'px';
           // Define o padding da célula
           cells[i].style.padding = opts.padding + 'px';
           // Move a célula no eixo y, onde y = t[colIndex]
           $(cells[i]).stop().animate({top: colls[colIndex] + 'px'}, 1000, false);
           // Increment a altura da coluna corrente
           colls[colIndex] += parseInt(cells[i].offsetHeight + marginTotal);
           // Armazena o valor da maior coluna até o momento
           maxCol = maxCol < colls[colIndex] ? colls[colIndex] : maxCol;
           // Move a célula no eixo x, onde x = ((opts.cw + marginTotal + paddingTotal) * colIndex)
           $(cells[i]).animate({left: ((opts.cw + marginTotal + paddingTotal) * colIndex) + 'px'}, 1000, false);
           if (++colIndex % colls.length === 0)
               colIndex = 0;
       }
   }
   // Atualiza a altura do conteiner
   gridconteiner.style.height = maxCol + 'px';

}
window.onload = function() {
   if (document.getElementById('grid-conteiner'))
       gengrid();
};
var tOut = false;
var milSec = 500;
window.onresize = function() {
   if (document.getElementById('grid-conteiner')) {
       // Cria um "delay" para o evento onresize para não ocorrer overflow na fila de animações
       if (tOut !== false)
           clearTimeout(tOut);
       tOut = setTimeout(gengrid, milSec);
   }
};
