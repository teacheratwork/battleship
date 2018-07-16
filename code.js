// Codice logico del software. Gestisce la creazione degli oggetti
// il cambio di turni e fasi
// gli eventi principali

// Indica il turno di gioco. Se dispari, giocatore 1 di turno
var turn = 1;

// Array di oggetti che indicano lo stato della singola cella della battaglia
// Se lo stato è 0 la cella è vuota
// Se lo stato è 1 sulla cella c'è una nave
// Se lo stato è 2 sulla cella c'è una nave colpita
// Se lo stato è 3 indic mancato
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

// Restituisce il giocatore non di turno
function opponentPlayer(){
  if (turn%2 == 0)
    return 1;
  else
    return 2;
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
  // variabile per indicare giocatore avversario
  var opponent = opponentPlayer();
  // Recupero l'array del giocatore di turno
  var active_grid = grids[player];
  // Recuper l'array del giocatore avversario
  var opponent_grid = grids[opponent];
  // Recupero il div nel quale disegnare le tabelle
  var container = document.getElementById("grids");
  row = null;
  cell = null;
  var table = document.createElement("table");
  table.setAttribute("id", "active_table");
  table.setAttribute("class", "grid");
  // imposta il nome del giocatore nell'intestazione
  setPlayer();

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
              else if  (active_grid[cell_number] === 3)
                cell.setAttribute("class", "missed");
          break;

          case 1:
            if (active_grid[cell_number] === 0)
              cell.setAttribute("class", "empty");
            else if (active_grid[cell_number] === 1)
              cell.setAttribute("class", "ship");
            else if  (active_grid[cell_number] === 2)
              cell.setAttribute("class", "hit");
            else if  (active_grid[cell_number] === 3)
              cell.setAttribute("class", "missed");
            break;

          case 2:
            if (opponent_grid[cell_number] === 0 || opponent_grid[cell_number] === 1) {
              cell.setAttribute("class", "unknown");
              cell.setAttribute("onClick", "hit(this)");
            }
            else if  (opponent_grid[cell_number] === 2)
              cell.setAttribute("class", "hit");
            else if  (opponent_grid[cell_number] === 3)
              cell.setAttribute("class", "missed");
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

// TODO: sistemare funzione deleteGrids()
// cancella la griglia attiva
function deleteGrids() {
  var tableContainer = document.getElementById("grids");
  //contiene le tabele visibili per la cancellazione
}

// gestisce il termine dei turni di setup
function setupDone() {
  var buttonContainer = document.getElementById("buttons");
  var consoleContainer = document.getElementById("console");

  if (turn === 2) {
    // rimuove le istruzioni di piazzamento al termine del secondo turno
    consoleContainer.removeChild(document.getElementById("console_msg"));
    // rimuove il bottone FATTO
    buttonContainer.removeChild(document.getElementById("button"));
  }
  // rimuove la griglia attiva
  deleteGrids();
  // cambio turno
  turn ++;
  // diesgna la griglia adatta al turno di gioco
  drawGrids();
}


// funzione per colpire
// Reminder:
// Stato = 0 la cella è vuota
// Stato = 1 sulla cella c'è una nave
// Stato = 2 sulla cella c'è una nave colpita
// Stato = 3 indica mancato
function hit(td) {
  var opponent = opponentPlayer();
  // l'id della cella cliccata funge da indice per l'array
  var cell = td.id;
  var opponent_grid = grids[opponent];

  if (opponent_grid[cell] === 0) {
    // setta un div di messaggio MANCATO
    opponent_grid[cell] = 3;
    deleteGrids();
    turn++;
    drawGrids();
  } else if (opponent_grid[cell] === 1) {
    // setta un div di messaggio COLPITA
    opponent_grid[cell] = 2;
    deleteGrids();
    turn++;
    drawGrids();
  } else if (opponent_grid[cell] === 2 || opponent_grid[cell] === 3) {
      alert("CASELLA GIÀ COLPITA!");
  }
}
