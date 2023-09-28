let pacman;
let muore;
let omino;
let isPaused = false;
let giocoAvviato = false;
let bottone;
let bottone2;
let fantasmino;
let start;
let vinto;
let griglia = [];
let righe, colonne;
const w = 40; //grandezza cella
let speedX = 0;
let speedY = 0;
let totalScore = 0;
let fantasmi = [];
let numeroFantasmi = 7;
let dir; //0 con freccia su, 1 con freccia a destra, 2 con freccia giù, 3 con freccia a sinistra
let neighbors = [];

function preload(){
  muore=loadImage("img/morte.jpg")
  omino=loadImage("img/omino.png")
  start=loadImage("img/start.gif")
  fantasmino=loadImage("img/fantasmino.png")
  vinto=loadImage("img/vinto.png")
}

alert('Il gioco consiste nel prendere tutte le caramelline senza farsi mangiare dai fantasmi. Se voui ricominciare puoi cliccare il tasto R. Se invece vuoi mettere in pausa e ripartire premi il tasto P. Muoviti con le freccette. BUONA FORTUNA!')

//quando il gioco è avviato giocoAvviato=true e rimuovo il bottone
function avviaGioco() {
  giocoAvviato = true;
  bottone.remove();
}

//crea bottone di avvio
function bottoneAvvio() {
  bottone = createButton('Avvia gioco');
  bottone.position(485, 630);
  bottone.mousePressed(avviaGioco);
}


function setup() {
  createCanvas(1040, 800);
  rectMode(CENTER); //posiziona al centro
  noStroke(); //elimina i bordi
  bottoneAvvio();
  righe = 21;
  colonne = 27;
  for(let i = 0; i < righe; i++) {
    griglia[i] = [];  //matrice (come costruzione arrayMulti di java)
    for(let j = 0; j < colonne; j++) {
      griglia[i][j] = new Cella(w*(j + 0), w*(i + 0));
    }
  }
  for(let i = 0; i < numeroFantasmi; i++) {
    //punto di partenza dei fantasmi
    let rx = 13;  
    let ry = 10;
    fantasmi[i] = new Fantasma(w*rx, w*ry, w);
  }
  //pacman con punto di partenza
  pacman = new Pacman(13 * w, 15 * w, w);
  sfondo();
}

function draw() {
  if (!isPaused) {
    if (giocoAvviato) {
      background(0);  
      for(let i = 0; i < righe; i++) {
        for(let j = 0; j < colonne; j++) {
          //funzioni del labirinto
          griglia[i][j].show();
          griglia[i][j].total();
        }
      }
  
      //creazione pacman e fantasmini e movimento pacman
      pacman.show();
      pacman.move();
      fantasmi[0].show();
      fantasmi[1].show();
      fantasmi[2].show();
      fantasmi[3].show();
      fantasmi[4].show();
      fantasmi[5].show();
      fantasmi[6].show();
  
      //movimento fantasmini e possibilità di uccidere
      for(let i = 0; i < numeroFantasmi; i++) {
        fantasmi[i].move();
        fantasmi[i].kill();
      }
      
      //punti
      textSize(40)
      fill(255, 255, 255);
      textFont('Georgia');
      textStyle(BOLD);
      text('Punti:' + totalScore, 440, 171);
  
      //se si vince
      if(win()) {
        push();
        stroke(5);
        setTimeout(noLoop, 100);
        pop();
      }
    } else {
      background(start);
      textSize(20)
      fill(255, 255, 255);
      textFont('Georgia');
      textStyle(BOLD);
      text('CLICCA PER AVVIARE:', 405, 605);
    }
  }else{
    fill(255);
    rect(520, 400, 200, 100);
    fill(0);
    textSize(40);
    text("PAUSA", 450, 410);
  }
  
}

/*
funzione che permette, premendo le frecce di direzione, il movimento di pacman 
0 alto
1 basso
2 sinistra
3 destra

permette anche il reset e la pausa del gioco
*/

function keyPressed() {
  if(keyCode === UP_ARROW) {
    dir = 0;
  }
  if(keyCode === DOWN_ARROW) {
    dir = 1;
  }
  if(keyCode === LEFT_ARROW) {
    dir = 2;
  }
  if(keyCode === RIGHT_ARROW) {
    dir = 3;
  }
  if (key === "r" || key === "R") {
    setup();
    avviaGioco();
    totalScore = 0;
  }
  if (key === "i" || key === "I") {
    window.location.reload(true);
  }
  if (key === 'p' || key === 'P') {
    isPaused = !isPaused;
  }
}


//quando un fantasma tocca pacman si mette il noLoop e l'immagine di sfondo della morte
function deathPac() {
  noLoop();
  background(muore);
  textSize(50);
  fill(255, 255, 255);
  textFont('Georgia');
  textStyle(BOLD);
  text('CLICCA "i" PER RICOMINCIARE', 100, 550);
}

//calcola l'indice della cella nella griglia che corrisponde ai valori x e y dati 

function checkNeighbors(x, y, array) {
  let i = floor(y/40); //calcola il valore minimo più vicino
  let j = floor(x/40);
  let top = griglia[i-1][j];
  let right = griglia[i][j+1];
  let bottom = griglia[i+1][j];
  let left = griglia[i][j-1];
  /*
  if(!top) {
    top = false;
  }
  if(!right) {
    right = false;
  }
  if(!bottom) {
    bottom = false;
  }
  if(!left) {
    left = false;
  }*/
  array[0] = top.muro;
  array[1] = right.muro;
  array[2] = bottom.muro;
  array[3] = left.muro;
}


// funzione che dice se si vince (raccolta di tutte le palline)
function win() {
  let count = 0;
  for(let i = 0; i < righe; i++) {
    for(let j = 0; j < colonne; j++) {
      if(griglia[i][j].conPunti) {
        count++;
      }
    }
  }
  if(count == 0) {
    background(vinto);
    return true
  } else {
      return false;
    }
}


//crea tutta la griglia sotto (mette i muri)
function sfondo() {
  for(let i = 0; i < righe; i++) {      //mette i punti a tutte le celle (se è un muro tanto non viene calcolato il punto)
    for(let j = 0; j < colonne; j++) {
      griglia[i][j].conPunti = true;
    }
    griglia[15][13].conPunti=false;
  }

  //contorno labirinto

  for(let i = 0; i < colonne; i++) {  //mette i muri a tutta la prima riga e l'ultima
    griglia[0][i].muro = true;
    griglia[righe-1][i].muro = true;
  }
  for(let i = 0; i < righe; i++) {  //mette i muri a tutta la prima colonna e l'ultima
    griglia[i][0].muro = true;
    griglia[i][colonne-1].muro = true;
  }

  //riempimento celle interne come muri (riproduzione labirinto di pacman)

  griglia[1][13].muro = true;

  griglia[2][2].muro = true;
  griglia[2][3].muro = true;
  griglia[2][4].muro = true;
  griglia[2][6].muro = true;
  griglia[2][7].muro = true;
  griglia[2][8].muro = true;
  griglia[2][9].muro = true;
  griglia[2][10].muro = true;
  griglia[2][11].muro = true;
  griglia[2][13].muro = true;
  griglia[2][15].muro = true;
  griglia[2][16].muro = true;
  griglia[2][17].muro = true;
  griglia[2][18].muro = true;
  griglia[2][19].muro = true;
  griglia[2][20].muro = true;
  griglia[2][22].muro = true;
  griglia[2][23].muro = true;
  griglia[2][24].muro = true;

  griglia[3][2].muro = true;
  griglia[3][3].muro = true;
  griglia[3][4].muro = true;
  griglia[3][6].muro = true;
  griglia[3][7].muro = true;
  griglia[3][8].muro = true;
  griglia[3][18].muro = true;
  griglia[3][19].muro = true;
  griglia[3][20].muro = true;
  griglia[3][22].muro = true;
  griglia[3][23].muro = true;
  griglia[3][24].muro = true;

  griglia[4][2].muro = true;
  griglia[4][3].muro = true;
  griglia[4][4].muro = true;
  griglia[4][6].muro = true;
  griglia[4][7].muro = true;
  griglia[4][8].muro = true;
  griglia[4][10].muro = true;
  griglia[4][11].muro = true;
  griglia[4][12].muro = true;
  griglia[4][13].muro = true;
  griglia[4][14].muro = true;
  griglia[4][15].muro = true;
  griglia[4][16].muro = true;
  griglia[4][18].muro = true;
  griglia[4][19].muro = true;
  griglia[4][20].muro = true;
  griglia[4][22].muro = true;
  griglia[4][23].muro = true;
  griglia[4][24].muro = true;

  griglia[5][13].muro = true;
  
  griglia[6][2].muro = true;
  griglia[6][3].muro = true;
  griglia[6][4].muro = true;
  griglia[6][6].muro = true;
  griglia[6][7].muro = true;
  griglia[6][8].muro = true;
  griglia[6][9].muro = true;
  griglia[6][10].muro = true;
  griglia[6][11].muro = true;
  griglia[6][13].muro = true;
  griglia[6][15].muro = true;
  griglia[6][16].muro = true;
  griglia[6][17].muro = true;
  griglia[6][18].muro = true;
  griglia[6][19].muro = true;
  griglia[6][20].muro = true;
  griglia[6][22].muro = true;
  griglia[6][23].muro = true;
  griglia[6][24].muro = true;

  griglia[7][8].muro = true;
  griglia[7][18].muro = true;
   
  griglia[8][2].muro = true;
  griglia[8][3].muro = true;
  griglia[8][5].muro = true;
  griglia[8][6].muro = true;
  griglia[8][8].muro = true;
  griglia[8][10].muro = true;
  griglia[8][11].muro = true;
  griglia[8][12].muro = true;
  griglia[8][14].muro = true;
  griglia[8][15].muro = true;
  griglia[8][16].muro = true;
  griglia[8][18].muro = true;
  griglia[8][20].muro = true;
  griglia[8][21].muro = true;
  griglia[8][23].muro = true;
  griglia[8][24].muro = true;

  griglia[9][2].muro = true;
  griglia[9][3].muro = true;
  griglia[9][5].muro = true;
  griglia[9][6].muro = true;
  griglia[9][8].muro = true;
  griglia[9][10].muro = true;
  griglia[9][16].muro = true;
  griglia[9][18].muro = true;
  griglia[9][20].muro = true;
  griglia[9][21].muro = true;
  griglia[9][23].muro = true;
  griglia[9][24].muro = true;

  griglia[10][12].muro = true;
  griglia[10][13].muro = true;
  griglia[10][14].muro = true;

  griglia[11][1].muro = true;
  griglia[11][2].muro = true;
  griglia[11][4].muro = true;
  griglia[11][5].muro = true;
  griglia[11][6].muro = true;
  griglia[11][8].muro = true;
  griglia[11][10].muro = true;
  griglia[11][16].muro = true;
  griglia[11][18].muro = true;
  griglia[11][20].muro = true;
  griglia[11][21].muro = true;
  griglia[11][22].muro = true;
  griglia[11][24].muro = true;
  griglia[11][25].muro = true;

  griglia[12][1].muro = true;
  griglia[12][2].muro = true;
  griglia[12][4].muro = true;
  griglia[12][5].muro = true;
  griglia[12][6].muro = true;
  griglia[12][8].muro = true;
  griglia[12][10].muro = true;
  griglia[12][11].muro = true;
  griglia[12][12].muro = true;
  griglia[12][13].muro = true;
  griglia[12][14].muro = true;
  griglia[12][15].muro = true;
  griglia[12][16].muro = true;
  griglia[12][18].muro = true;
  griglia[12][20].muro = true;
  griglia[12][21].muro = true;
  griglia[12][22].muro = true;
  griglia[12][24].muro = true;
  griglia[12][25].muro = true;

  griglia[13][13].muro = true;

  griglia[14][2].muro = true;
  griglia[14][3].muro = true;
  griglia[14][4].muro = true;
  griglia[14][6].muro = true;
  griglia[14][7].muro = true;
  griglia[14][8].muro = true;
  griglia[14][9].muro = true;
  griglia[14][10].muro = true;
  griglia[14][11].muro = true;
  griglia[14][13].muro = true;
  griglia[14][15].muro = true;
  griglia[14][16].muro = true;
  griglia[14][17].muro = true;
  griglia[14][18].muro = true;
  griglia[14][19].muro = true;
  griglia[14][20].muro = true;
  griglia[14][22].muro = true;
  griglia[14][23].muro = true;
  griglia[14][24].muro = true;

  griglia[15][4].muro = true;
  griglia[15][22].muro = true;
  
  griglia[16][1].muro = true;
  griglia[16][2].muro = true;
  griglia[16][4].muro = true;
  griglia[16][5].muro = true;
  griglia[16][6].muro = true;
  griglia[16][8].muro = true;
  griglia[16][10].muro = true;
  griglia[16][11].muro = true;
  griglia[16][12].muro = true;
  griglia[16][13].muro = true;
  griglia[16][14].muro = true;
  griglia[16][15].muro = true;
  griglia[16][16].muro = true;
  griglia[16][18].muro = true;
  griglia[16][20].muro = true;
  griglia[16][21].muro = true;
  griglia[16][22].muro = true;
  griglia[16][24].muro = true;
  griglia[16][25].muro = true;

  griglia[17][8].muro = true;
  griglia[17][18].muro = true;

  griglia[18][2].muro = true;
  griglia[18][3].muro = true;
  griglia[18][4].muro = true;
  griglia[18][5].muro = true;
  griglia[18][6].muro = true;
  griglia[18][7].muro = true;
  griglia[18][8].muro = true;
  griglia[18][9].muro = true;
  griglia[18][10].muro = true;
  griglia[18][11].muro = true;
  griglia[18][13].muro = true;
  griglia[18][15].muro = true;
  griglia[18][16].muro = true;
  griglia[18][17].muro = true;
  griglia[18][18].muro = true;
  griglia[18][19].muro = true;
  griglia[18][20].muro = true;
  griglia[18][21].muro = true;
  griglia[18][22].muro = true;
  griglia[18][23].muro = true;
  griglia[18][24].muro = true;

  griglia[19][13].muro = true;
}