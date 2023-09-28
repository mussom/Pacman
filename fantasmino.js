class Fantasma {
  constructor(x, y, diameter) {
    this.x = x;
    this.y = y;
    this.d = diameter;
    //this.r1 = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.neighbors = [];
  }
  

  //show del fantasmino
  show() {
    fantasmino.resize(this.d, this.d);        //immagine grande come la cella
    image(fantasmino, this.x-20, this.y-20);  //posizione di x e y meno mezza cella (20 px)
  }
  
  //uccisione
  kill() {
  let d = dist(pacman.x, pacman.y, this.x, this.y); //misura la distanza (stessa logica dell'incremento punti)
    if(d < w/2) {
      deathPac(); //richiama la morte di pacman
    }    
  }
    
  move() { 
        if(this.x % 40 == 0 && this.y % 40 == 0){   //controlla se l'oggetto si trova al limite di una cella
          this.r = random(1);   //genera un random fino a 1
          if(this.r < 0.25) {   //se il numero va qui muove a destra
            this.speedX = 4;
            this.speedY = 0;
          } else if(this.r < 0.5) { //se il numero va qui muove a sinistra
              this.speedX = -4;
              this.speedY = 0;
          } else if(this.r < 0.75) {  //se il numero va qui muove su
              this.speedX = 0;
              this.speedY = 4;  
          } else {                  //altrimenti muove giù
              this.speedX = 0;
              this.speedY = -4;
          }
        }
        
        //20 è la dimensione della mezza cella sul bordo
        //verifica solo che se va fuori dalla griglia riappare sul lato opposto
          if(this.x < -20) {
            this.x = width + 20;
          }
          if(this.x > width + 20) {
            this.x = -20;
          }
          if(this.y < -20) {
            this.y = height + 20;
          }
          if(this.y >height + 20) {
            this.y = -20;
          }
          //spostamento 
        this.x += this.speedX;
        this.y += this.speedY;
  }    
}