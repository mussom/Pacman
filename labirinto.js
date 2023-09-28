class Cella {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.muro = false;      //se è vero sarà un muro, l'omino non può passare
      this.conPunti = false;  //se è vero la cella incrementerà il punteggio
      this.time = 0;
    }
    
    show() {
      if(this.muro == true) {   //se il muro è vero 
        fill(0, 51, 153);       //colore muro
        rect(this.x, this.y, w, w); //crea rettangolo (muro gestito a celle)
        this.conPunti = false;      //il muro non ha punti
      } else if(this.conPunti) {    //se non ha il muro e ha punti
        fill(255, 255, 255);        // colore bianco
        ellipse(this.x, this.y, w/5); //puntini bianchi che mangia pacman
      }
    }
    
    //incremento dei punti 
    total() {
      if(this.conPunti) { //se ha i punti

        /*misura la distanza e quando arriva a metà cella (dove c'è il puntino), 
        incrementa il punteggio e toglie la possibilità di incrementare punti*/
        let d = dist(pacman.x, pacman.y, this.x, this.y); 
        if(d < 20) {
          totalScore++;
          this.conPunti = false;  //toglie la possibilità di incrementare i punti
        }
      }
    }
  }