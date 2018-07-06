// Codice logico del software. Gestisce la creazione degli oggetti
// il cambio di turni e fasi
// gli eventi principali


// Indica il turno di gioco. Se pari, giocatore 1 di turno
var turn = 0;

// Array di oggetti che indicano lo stato della singola cella della battaglia
// Nella chiave è presente il nome della cella "A1 - B3 - ecc...."
// Se lo stato è 0 la cella è vuota
// Se lo stato è 1 sulla cella c'è una nave
// Se lo stato è 2 sulla cella c'è una nave colpita
var status_grid1 = [];
var status_grid2 = [];
var status_grids = [0,status_grid1, status_grid2];

//controlla se il turno è pari (G1) oppure dispari (G2)
function isEven(value) {
  if (value%2 == 0)
		return true;
	else
		return false;
}

// Crea le griglie array per la battaglia  navale
// n è il numero di celle totali (100)
function createGrids(n)
{
  for (var x = 0; x < n; x++)
  {
        // var letter = String.fromCharCode(65 + y);
        // var number = x+1;
        // var cell_name = letter + number;
        status_grid1[x] = 0;
        status_grid2[x] = 0;
  }
}

// colora le celle durante il posizionamento
function setShip(td) 
{
  var id = td.getAttribute("id");
  // Recuperiamo la chiave per entrare nell'array
  var parti = id.split("_");
  var id = parti[0] + "_" + parti[1];
  var n_grid = parti[1];   // 1 se grid1, 2 se grid 2
  var x = parti[2];

  // Recupero l'array corretto
  var status_grid = status_grids[n_grid];

  // Guardo lo stato della cella
  var status = status_grid[x];

  // Lo cambio e coloro
  if (x == 0)
  {
    // Aggiungi nave
    status_grid[x] = 1;

    td.style.backgroundColor = "lightgray";
  }
  else
  {
    // Rimuovi nave
    status_grid[x] = 0;

    td.style.backgroundColor = "white";
  }

}


// TODO: funzione che disegna la tabella sulla base dell'array "grid"
// div_id: div in cui disegnare
// player_n: numero del giocatore: 1 o 2
// mode: 0 per remind piccolo della propria plancia, 1 per plancia d'attacco
function draw_table(div_id, player_n, mode)
{
  // Recupero l'array corretto
  var status_grid = status_grids[player_n];

  var div = document.getElementById(id);
  row = null;
  cell = null;
  var table = document.createElement("table"); // metodo DOM per creare un elemento
  table.setAttribute("class", "grids"); // metodo DOM per impostare un attributo in un elemento

  for (var i = 0; i < 10; i++) {
    row = table.insertRow();  // metodo DOM per creare linee nella tabella

    for (var j = 0; j < 10; j++) {
        cell_number = (i*10+j);
        cell = row.insertCell();
        cell.setAttribute("id", id + "_" + cell_number); // attribuisce un id progressivo ad ogni cella
        
        // TODO: aggiornare questa parte. andrebbe in css
        var status = status_grid[cell_number];

        if (status == 0)
            cell.style.backgroundColor = "white";
        if (status == 1)
            cell.style.backgroundColor = "lightgray";
        if (status == 2)
            cell.style.backgroundColor = "red";

				// attribuisce la funzione per il setup delle navi sulle celle delle tabella di proprietÃ  del giocatore
				if (mode == 0) {
          cell.setAttribute("onclick", "setShip(this)");
        }

        if (mode == 1) {
          cell.setAttribute("onclick", "hit(this)");
        }
    }

	div.appendChild(table);
  }
}

// Crea le griglie di gioco dei giocatori
function createTable_10_10(id) {
  var div = document.getElementById(id);
  row = null;
  cell = null;
  var table = document.createElement("table"); // metodo DOM per creare un elemento
  table.setAttribute("class", "grids"); // metodo DOM per impostare un attributo in un elemento

  for (var i = 0; i < 10; i++) {
    row = table.insertRow();  // metodo DOM per creare linee nella tabella

    for (var j = 0; j < 10; j++) {
        cell = row.insertCell();
        cell.setAttribute("id", id + "_" + (i*10+j)); // attribuisce un id progressivo ad ogni cella
        cell.style.backgroundColor = "white";

				// attribuisce la funzione per il setup delle navi sulle celle delle tabella di proprietÃ  del giocatore
				if (id === "grid_1" || id === "grid_3") {
          cell.setAttribute("onclick", "setShip(this)");
        }
    }

	div.appendChild(table);
  }
}


// setup iniziale: nasconde tutte le celle tranne quella di proprietà  del giocatore 1 (potrebbe anche essere impostato in file CSS)

function setup() {
  var grid_1 = document.getElementById("grid_1");
  var grid_2 = document.getElementById("grid_2");
  var grid_3 = document.getElementById("grid_3");
  var grid_4 = document.getElementById("grid_4");

  grid_1.setAttribute("class", "inBlock");
  grid_2.setAttribute("class", "hidden");
  grid_3.setAttribute("class", "hidden");
  grid_4.setAttribute("class", "hidden");
}


// inserisce il paragrafo di istruzioni in console

function consoleSettingMsg() {
  var con = document.getElementById("console");
  var par = document.createElement("P");

	par.innerHTML = "Senza farti vedere dal tuo avversario, clicca sulla tabella per posizionare le navi. <br />Premi FATTO! qundo hai finito.";
  par.setAttribute("class", "console");
  par.setAttribute("id", "console_msg");
  con.appendChild(par);
}

// gestisce il termine del setup

function setupDone() {
  var title = document.getElementById('playerTitle').textContent;

  // mostra le griglie di G1 o di G2 a seconda del turno di gioco, controllo farlocco su title..

  if (isEven(turn)) {
    grid_1.setAttribute("class", "hidden");
    grid_3.setAttribute("class", "inBlock"); // visualizzare griglia 3 e nascondere le altre
    document.getElementById('playerTitle').innerHTML = "GIOCATORE 2";
    window.alert("Ora lascia che il giocatore 2 posizioni le sue navi!");
    turn++;
  } else if (!isEven(turn)) {
      document.getElementById('playerTitle').innerHTML = "GIOCATORE 1";
      window.alert("Giocatore 1, preparati a iniziare la partita!");

      // mostra la grglia con le navi di G1,la miniaturizza la blocca da modifiche
      grid_1.setAttribute("class", "inBlock miniature");
      for (var i=0; i<10; i++) {
        for (var j=0; j<10; j++) {
          cell = document.getElementById("grid_1_"+i+"_"+j);
          cell.removeAttribute("onclick");
        }
      }

      // mostra la griglia di G1 e imposta su ogni cella la funzione per colpire hit()

      grid_2.setAttribute("class", "inBlock");
      for (var i=0; i<10; i++) {
        for (var j=0; j<10; j++) {
          cell = document.getElementById("grid_2_"+i+"_"+j);
          cell.setAttribute("onclick", "hit(this)");
        }
      }

      // nasconde la grglia con le navi di G2,la miniaturizza la blocca da modifiche

      grid_3.setAttribute("class", "hidden miniature");
      for (var i=0; i<10; i++) {
        for (var j=0; j<10; j++) {
          cell = document.getElementById("grid_3_"+i+"_"+j);
          cell.removeAttribute("onclick");
        }
      }

      // nasconde la griglia di G2 e imposta su ogni cella la funzione per colpire hit()

      grid_4.setAttribute("class", "hidden");
      for (var i=0; i<10; i++) {
        for (var j=0; j<10; j++) {
          cell = document.getElementById("grid_4_"+i+"_"+j);
          cell.setAttribute("onclick", "hit(this)");
        }
      }

      // cambia il messaggio in console

      document.getElementById("console_msg").innerHTML = "Colpisci cliccando sulla tabella di destra.<br />(AZZURRO = mancato! - ROSSO = colpito!)";

      // rimuove il tasto FATTO!

      document.getElementById("buttons").setAttribute("class", "hidden");

      turn++;
    }
}

function hit(td) {

  var twinTdNum;
	var flag = false;

  // seleziona il turno del giocatore 1 o 2
    if (isEven(turn)) {
    twinTdNum = 3;
    } else twinTdNum = 1;

  var twinId = "grid_"+ twinTdNum + "_" + td.id.slice(7);
  var color = document.getElementById(twinId).style.backgroundColor;
  var twinTd = document.getElementById(twinId);

			if (color === "lightblue" || color === "red") {
				alert("Casella giÃ  colpita!");
			} else if (color === "white") {
      	td.style.backgroundColor = "lightblue";
				// rimuovere le tabelle prima del cambio GIOCATORE
      	alert("MANCATO!\nIl gioco passa al tuo avversario!");
    	} else if (color === "lightgray") {
      	td.style.backgroundColor = "red";
      	twinTd.style.backgroundColor = "red";
				// rimuovere le tabelle prima del cambio GIOCATORE (diffioltà : gli alert vengono eseguiti prima delle modifiche ad html)
      	alert("COLPITO!\nIl gioco passa al tuo avversario!");
    }

		// manca controllo vincitore
			turn++;
    	changePlayer();

}

function changePlayer (){
  var grid_1 = document.getElementById("grid_1");
  var grid_2 = document.getElementById("grid_2");
  var grid_3 = document.getElementById("grid_3");
  var grid_4 = document.getElementById("grid_4");

  if (isEven(turn)) {
    document.getElementById('playerTitle').innerHTML = "GIOCATORE 1";
    grid_1.setAttribute("class", "inBlock miniature");
    grid_2.setAttribute("class", "inBlock");
    grid_3.setAttribute("class", "hidden");
    grid_4.setAttribute("class", "hidden");
  } else if (!isEven(turn)) {
    document.getElementById('playerTitle').innerHTML = "GIOCATORE 2";
    grid_1.setAttribute("class", "hidden");
    grid_2.setAttribute("class", "hidden");
    grid_3.setAttribute("class", "inBlock miniature");
    grid_4.setAttribute("class", "inBlock");
  }
}
