class Pacman {
  //crea il costruttore
    constructor(x, y, diameter) {
      this.x = x;
      this.y = y;
      this.d = diameter;
    }
    
    show() {
      omino.resize(this.d, this.d);           //immagine grande come la cella
      image(omino, this.x-20, this.y-20);     //posizione di x e y meno mezza cella (20 px), quella dei bordi
    }
    
    /*
    movimento di pacman
    sono presenti tutte le condizioni in cui si puo trovare l'omino per direzionarsi nella corretta posizione
    
    DIR:
    0 alto
    1 basso
    2 sinistra
    3 destra

    NEIGHBORS:
    0 sopra
    1 destra
    2 sotto
    3 sinistra
    */
    move() {
        checkNeighbors(this.x, this.y, neighbors);  
        if(this.y % w == 0 && this.x % w == 0) {  //controlla se l'oggetto si trova al limite di una cella
          if(neighbors[3] || neighbors[1]) {      //controlla se l'oggetto ha muro alla sua sinistra o destra
            speedX = 0;                           //se così non lo fa muovere in orizzontale
          }
          if(neighbors[0] || neighbors[2]) {      //su, giù
            speedY = 0;                           //no in verticale
          }
          if(dir == 2 && neighbors[3] == false){  //se va a sinistra e non ha muro a sinistra, imposta le velocità (-4 fa andare a sinistra)
            speedX = -4;                     
            speedY = 0;
          } 
          if(dir == 3 && neighbors[1] == false){  //stessa logica di sopra...
            speedX = 4;
            speedY = 0;
          } 
          if(dir == 0 && neighbors[0] == false){  //su
            speedY = -4;
            speedX = 0;
            } 
          if(dir == 1 && neighbors[2] == false) { //giù
            speedY = 4;
            speedX = 0;
          }
      }
      //aggiornano la posizione dell'oggetto aggiungendo i suoi valori di velocità correnti alla sua posizione corrente
          this.x += speedX;
          this.y += speedY;
      }
  }