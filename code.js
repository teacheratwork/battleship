// Codice logico del software. Gestisce la creazione degli oggetti
// il cambio di turni e fasi
// gli eventi principali

// Indica il turno di gioco. Se dispari, giocatore 1 di turno
var turn = 1;

// Array di oggetti che indicano lo stato della singola cella della battaglia
// Se lo stato è 0 la cella è vuota
// Se lo stato è 1 sulla cella c'è una nave
// Se lo stato è 2 sulla cella c'è una nave colpita
var grid_player1 = [];
var grid_player2 = [];
var grids = [0,grid_player1, grid_player2]; // creato per accesso all'array corretto

// Crea le griglie di entrambi i giocatori
createGrids(100);

// Funzione per creare 2 griglie array per la battaglia navale
// n è il numero di celle totali (default 100)
function createGrids(n) {
  for (var x = 0; x < n; x++) {
    grid_player1[x] = 0;
    grid_player2[x] = 0;
  }
}

// Restituisce il giocatore attivo, G1 nei turni dispari e G2 nei turni pari
function activePlayer() {
  if (turn%2 == 0)
		return 2;
	else
		return 1;
}

// gestisce il giocatore indicato nell'intestazione della pagina innerHTML
function setPlayer() {
  var activePl = activePlayer();
  document.getElementById("playerTitle").innerHTML = "GIOCATORE " + activePl;
}

// gestisce la creazione delle tabelle a seconda del turno di gioco:
// nei primi due turni di gioco lancia la funzione drawTable in mode 0 altrimenti mode 1 e 2
function drawGrids() {
  if (turn === 1 || turn === 2)
    drawTable(0);
  else {
    drawTable(1);
    drawTable(2);
  }
}

// funzione che disegna le tabelle:
// mode 0 -> disegna una tabella per il posizionamento
// mode 1 -> una ridotta come reminder della propria griglia
// mode 2 -> disegna una tabella per colpire
function drawTable(mode) {
  // variabile per indicare giocatore di turno
  var player = activePlayer();
  // Recupero l'array corretto
  var active_grid = grids[player];
  // Recupero il div nel quale disegnare le tabelle
  var container = document.getElementById("grids");
  row = null;
  cell = null;
  var table = document.createElement("table");
  table.setAttribute("id", "active_table");
  table.setAttribute("class", "grid");

  for (var i = 0; i < 10; i++) {
    row = table.insertRow();

    for (var j = 0; j < 10; j++) {
        cell_number = (i*10+j);
        cell = row.insertCell();
        cell.setAttribute("id", cell_number); // assegna alle celle classi differenti a seconda del mode
        switch (mode) {
          case 0:
            cell.setAttribute("onClick", "setShip(this)");
            if (active_grid[cell_number] === 0)
              cell.setAttribute("class", "empty");
            else if (active_grid[cell_number] === 1)
              cell.setAttribute("class", "ship");
            else if  (active_grid[cell_number] === 2)
              cell.setAttribute("class", "hit");
          break;

          case 1:
            if (active_grid[cell_number] === 0)
              cell.setAttribute("class", "empty");
            else if (active_grid[cell_number] === 1)
              cell.setAttribute("class", "ship");
            else if  (active_grid[cell_number] === 2)
              cell.setAttribute("class", "hit");
            break;

          case 2:
            if (active_grid[cell_number] === 0 || active_grid[cell_number] === 1)
              cell.setAttribute("class", "unknown");
            else if  (active_grid[cell_number] === 2)
              cell.setAttribute("class", "hit()");
          break;
        }
    }
  }

  // miniaturizza la tabella se mode = 1
  if (mode === 1)
    table.setAttribute("class", "miniature");

  var new_div = document.createElement("DIV");
  new_div.setAttribute("id", "grid" + mode);
  new_div.setAttribute("class", "grids");
	new_div.appendChild(table);
  container.appendChild(new_div);
}

// imposta il messaggio opportuno nella console
function consoleSettingMsg() {
  var con = document.getElementById("console");
  var par = document.createElement("P");

	par.innerHTML = "Senza farti vedere dal tuo avversario, clicca sulla tabella per posizionare le navi. <br />Premi FATTO! qundo hai finito.";
  par.setAttribute("class", "console");
  par.setAttribute("id", "console_msg");
  con.appendChild(par);
}



// gestisce il posizionamento delle navi: modifica l'array e colora la cella corrispondente
function setShip(td) {
  var player = activePlayer();
  var cell = td.id;
  var active_grid = grids[player];
  // l'id della cella cliccata funge da indice per l'array
  // il click cambia valore nell'array e classe al td della cella
  if (active_grid[cell] === 0) {
    active_grid[cell] = 1;
    td.setAttribute ("class", "ship");
  } else if (active_grid[cell] === 1) {
      active_grid[cell] = 0;
      td.setAttribute ("class","empty");
  }
}

// gestisce il termine dei turni di setup
function setupDone() {
  // rimuove le istruzioni di piazzamento al termine del secondo turno
  if (turn === 2) {
    var cons = document.getElementById("console");
    cons.removeChild("console_msg");
  }
  // cancella la griglia attiva
  var tableContainer = document.getElementById("grids");
  tableContainer.removeChild(document.getElementById("grid0"));
  // cambio turno
  turn ++;
  // diesgna la griglia adatta al turno di gioco
  drawGrids();
}

/*
// funzione per colpire
hit() {
}
*/
