var turn = 0;


//controlla se il turno è pari (G1) oppure dispari (G2)

function isEven(value) {
	if (value%2 == 0)
		return true;
	else
		return false;
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
        cell.setAttribute("id", id + "_" + i + "_" + j); // attribuisce un id progressivo ad ogni cella
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

// colora le celle durante il posizionamento
function setShip(td) {
  if (td.style.backgroundColor === "white") {
    td.style.backgroundColor = "lightgray";
  } else if (td.style.backgroundColor === "lightgray") {
      td.style.backgroundColor = "white";
  }
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
