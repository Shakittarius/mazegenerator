
var koko = 50;
var solut = [];
var leveys = 20;

var x = 0;
var y = 0;

var current;
var reitti = [];
var takaisin = 1;

function setup() {

   
    createCanvas(1000,1000);

    for (let i = 0; i < koko; i++) {

        solut[i] = new Array(koko);
    }


    for (let i = 0; i < koko; i++) {


        for (let j = 0; j < koko; j++) {

            solut[i][j] = new Solu(i, j);

        }
    }

 current = solut[5][5];
 
}


function draw() {

   
   translate(10,10);
    background(0);

   for (let i = 0; i < koko; i++) {

    for (let j = 0; j < koko; j++) {

      solut[i][j].show();

    }
   }

 
   go();
   
   console.log(reitti[takaisin]);
     
   
}



function go() {

    var v = false;
    var o = false;
    var y = false;
    var a = false;

    if (current.i == 0) y = true;

    if (current.i != 0) {

        if (solut[current.i - 1][current.j].kayty) y = true;
    }

    if (current.i == koko - 1) a = true;

    if (current.i != koko - 1) {
        
        if (solut[current.i + 1][current.j].kayty) a = true;
    
    }

    if (current.j == 0) v = true;
    
    if (current.j !=0) {
    
        if (solut[current.i][current.j - 1].kayty) v = true;
    
    }

    if (current.j == koko -1) o = true;
     
    if (current.j != koko - 1) {
    
        if (solut[current.i][current.j + 1].kayty) o = true;
    
    }
    solut[current.i][current.j].kayty = true;

    let g = false;

    

    if (v && o && a && y) {

        current = reitti[takaisin]
        takaisin++;


    }

    if (!v || !o || !a || !y) {
        
    do {
    
        var n = Math.floor(Math.random() * 4);
    
        if (n == 0 && a == false && current.i != koko -1) {

            g = true;

            current.hide("alas");
            current = solut[current.i + 1][current.j];
            
            
        }

        if (n == 1 && o == false && current.j != koko -1) {

            g = true;

            current.hide("oikea");
            current = solut[current.i][current.j + 1];
            

        }

        if (n == 2 && y == false && current.i != 0) {

            g = true;

            current.hide("ylos");
            current = solut[current.i - 1][current.j];
            

        }

        if (n == 3 && v == false && current.j != 0) {

            g = true;

            current.hide("vasen");
            current = solut[current.i][current.j - 1];
    

        }


    }

    while(!g);
    reitti.unshift(current);
    takaisin = 1;
    }
}

function Solu(i, j){

    this.i = i;
    this.j = j;

    this.y = i * leveys;
    this.x = j * leveys;

    this.vasen = true;
    this.oikea = true;
    this.alas = true;
    this.ylos = true;

    this.kayty = false;



    this.hide = function(sivu) {

        if (sivu == "vasen") {
            
            this.vasen = false;

            if (j != 0) {

           solut[i][j-1].oikea = false;

            }
        }

        if (sivu == "oikea") {

            this.oikea = false;

            if (j != koko - 1) {

            solut[i][j+1].vasen = false;

            }
        }

        if (sivu == "alas") {

            this.alas = false;
            
            if (i != koko - 1) {
                
                solut[i+1][j].ylos = false;
            }



        }

        if (sivu == "ylos") {

            
            this.ylos = false;

            if (i != 0) {

                solut[i-1][j].alas = false;
            }
        }

    }

    this.show = function() {

        stroke(255);
        strokeWeight(1);
        if (this.vasen == true) line(this.x - leveys/2, this.y - leveys/2, this.x - leveys/2, this.y + leveys/2);

       if (this.oikea == true) line(this.x + leveys/2, this.y - leveys/2, this.x + leveys/2, this.y + leveys/2);

        if (this.alas == true) line(this.x - leveys/2, this.y + leveys/2, this.x + leveys/2, this.y + leveys/2);

      if (this.ylos == true) line(this.x - leveys/2, this.y - leveys/2, this.x + leveys/2, this.y - leveys/2);
        
      if (this.kayty == true) {

        fill(100);
        noStroke();
        rect(this.x - leveys / 2, this.y - leveys / 2, leveys, leveys);


      }

      if (current.j == j && current.i == i) {

        fill('green');
    rect(this.x - leveys / 2, this.y - leveys / 2, leveys, leveys);

    }

    }


}