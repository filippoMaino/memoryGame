// 
var tabellone = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; //matrice 4x4 di zero

var selezione = [];

class Giocatori {
    constructor(n,t) {
      this.nome = n;
      this.tempo = t;
    }
}

//*********** INIZIALIZZAZIONE

function Memory(){
    //popolare la matrice in maniera randomica

    //per sapere se è uscito 7
    // usciti[(7-1)].molteplicita.lenght<2 --> se sì allora posso aggiungere 7
    //altrimenti genera un altro numero

this.usciti = [
        //mi deve contare la molteplicita
        //inizio oggetto
        {
            molteplicita : [] //conta molteplicita del numero 1
        }//fine oggetto. molteplicità è un attributo cui accedere con usciti[0].molteplicità!!!!!
        
        
        ,{
            molteplicita : [] //conta molteplicita del numero 2
        },{
            molteplicita : [] //conta molteplicita del numero 3 e coì via
        },{
            molteplicita : []
        },{
            molteplicita : []
        },{
            molteplicita : []
        },{
            molteplicita : []
        },{
            molteplicita : []
        }
    ];

this.verificaMolteplicita= () => {
    
    let numeroGenerato = (Math.floor(Math.random() * 8))+1;
    if(
        this.usciti[(numeroGenerato-1)].molteplicita.length < 2){
        this.usciti[(numeroGenerato-1)].molteplicita.push(1);
        return numeroGenerato;}
         // il return fa uscire dalla funzionoe!!!!
    else{
        return this.verificaMolteplicita();
    };
};
//il controllo lo facciamo fare da qualcun altro in Memory
this.generaNumero = () => { //questa funzione non serve a niente, ma è un "incrocio" a cui convergono più funzioni
    let numero = this.verificaMolteplicita();
    return numero;
};

this.start = () => {
    for (let r=0; r<4; r++){
        for(let c=0; c<4; c++){
            //tabellone[r][c] = Math.floor(Math.random() * 8)+1; // bisogna però fare un controllo
            tabellone[r][c] = this.generaNumero();
        }
    }
};
//fine Memory()
};

function inizializzaCarte(){
    //prende i numeri dal tabellone e li mette nell'html
    let m = new Memory();
    m.start(); //metodo del prototipo
    
    //*************** STAMPA I NUMERI SULLE CARTE - DISABILITATA */
    document.getElementById('cardsWindow').classList.remove('hide');
    for (let r=0; r<4; r++){
        for(let c=0; c<4; c++){
            let id = r.toString() + c.toString();
            document.getElementById(id).innerHTML = '';
// alla inizializzazione gli devo dare l'attributo onclick così non posso cliccare prima
//al momento i div con la funzione onclick non hanno id
        }
    }
    console.log(tabellone);
};

//*********** ALLA SELEZIONE */

function cartaSelezionata(id){
    //mi deve creare l'array di confronto
    let riga = id.substring(0,1); //prende il primo carattere della stringa a partire da pos 0
    let colonna = id.substring(1);
    let rc = riga.toString()+colonna.toString();
    
    let carta = document.getElementById(rc); //prende il p su cui hai cliccato

    if(selezione.length==0){
            //sto selezionando la prima carta
            selezione.push(rc); //metto in selezione id della prima carta
            carta.classList.add('selected');
            carta.classList.remove('cartA');
            
        }

    else /*if(selezione.length==1)*/{
                //siamo alla seconda carta
        if (selezione[0]!== rc){
            //ovvero la seconda carta che sto selezionando è diversa dalla prima
            selezione.push(rc);
            
            carta.classList.add('selected'); //prima add e poi remove altrimenti non lo trova!!
            carta.classList.remove('cartA');
            verificaMatch(selezione);
            selezione = [];     
        }
        else /*(selezione[0]== rc) se seleziono di nuovo la stessa carta*/{
            //deseleziona
            selezione = [];
            carta.classList.remove('selected');
            carta.classList.add('cartA');
        }
    };
};

function verificaMatch(selezione){
    let riga1 = selezione[0].substring(0,1); 
    let colonna1 = selezione[0].substring(1);
    let riga2 = selezione[1].substring(0,1); 
    let colonna2 = selezione[1].substring(1);
    
    let card1 = document.getElementById(selezione[0]);
    let card2 = document.getElementById(selezione[1]);

    if(tabellone[riga1][colonna1]==tabellone[riga2][colonna2]){
        
        card1.classList.remove('selected');
        card2.classList.remove('selected');
         
        card1.classList.add('greenMatched');
        card2.classList.add('greenMatched');
        setTimeout(()=>{
        tabellone[riga1][colonna1] = 10;
        tabellone[riga2][colonna2] = 10;
        card1.remove();
        card2.remove();
        },500 );
        
    }
    else{
        card1.classList.remove('selected');
        card2.classList.remove('selected');
         
        card1.classList.add('redMatched');
        card2.classList.add('redMatched');
        setTimeout(()=>{
        card1.classList.remove('redMatched');
        card2.classList.remove('redMatched');
        },500 );
    };
    selezione = [];
};

//****************AL CLICK SU INIZIA */
// innerHTML necessita del BACKTICK

function startStop(){
let nome = document.getElementById('nome');
if (nome.value == ''){ //con controllo su null non andava
    alert('inserisci il tuo nome!!')
}else{
    
    document.getElementById('cardsWindow').innerHTML = 
    `<div class="row">
    <div class="col-3">
        <div>
            <p class="h1 carta cartA" id="00" onclick="cartaSelezionata('00')"></p>
        </div>
    </div>
    <div class="col-3">
        <div >
            <p class="h1 carta cartA" id="01" onclick="cartaSelezionata('01')"></p>
        </div>
    </div>
    <div class="col-3">
        <div >
            <p class="h1 carta cartA" id="02" onclick="cartaSelezionata('02')"></p>
        </div>
    </div>
    <div class="col-3">
        <div >
            <p class="h1 carta cartA" id="03" onclick="cartaSelezionata('03')"></p>
        </div>
    </div>
</div>
    <!--seconda riga matrice-->
    <div class="row">
        <div class="col-3">
            <div >
                <p class="h1 carta cartA" id="10" onclick="cartaSelezionata('10')"></p>
            </div>
        </div>
        <div class="col-3">
            <div >
                <p class="h1 carta cartA" id="11" onclick="cartaSelezionata('11')"></p>
            </div>
        </div>
        <div class="col-3">
            <div >
                <p class="h1 carta cartA" id="12" onclick="cartaSelezionata('12')"></p>
            </div>
        </div>
        <div class="col-3">
            <div >
                <p class="h1 carta cartA" id="13" onclick="cartaSelezionata('13')"></p>
            </div>
        </div>
    </div>
    <!--terza riga matrice -->
    <div class="row">
        <div class="col-3">
            <div >
                <p class="h1 carta cartA" id="20" onclick="cartaSelezionata('20')"></p>
            </div>
        </div>
        <div class="col-3">
            <div >
                <p class="h1 carta cartA" id="21" onclick="cartaSelezionata('21')"></p>
            </div>
        </div>
        <div class="col-3">
            <div >
                <p class="h1 carta cartA" id="22" onclick="cartaSelezionata('22')"></p>
            </div>
        </div>
        <div class="col-3">
            <div >
                <p class="h1 carta cartA" id="23" onclick="cartaSelezionata('23')"></p>
            </div>
        </div>
    </div>
    <!--quarta riga matrice-->
    <div class="row">
        <div class="col-3">
            <div >
                <p class="h1 carta cartA" id="30" onclick="cartaSelezionata('30')"></p>
            </div>
        </div>
        <div class="col-3">
            <div >
                <p class="h1 carta cartA" id="31" onclick="cartaSelezionata('31')"></p>
            </div>
        </div>
        <div class="col-3">
            <div >
                <p class="h1 carta cartA" id="32" onclick="cartaSelezionata('32')"></p>
            </div>
        </div>
        <div class="col-3">
            <div >
                <p class="h1 carta cartA" id="33" onclick="cartaSelezionata('33')"></p>
            </div>
        </div>
    </div>`;
    inizializzaCarte();
    document.getElementById('btnInizio').setAttribute( "onclick", null );
    console.log('rendi il button null');
    //document.getElementById('btnInizio').onclick = null; NON FUNZIONAVA
    let x=1000;
    let tempo =0;
    let t=  setInterval(() => {
        let somma = 0;
        tempo += 1;
        document.getElementById('timer').innerText = `${tempo} secondi`;
        for (let r=0; r<4; r++){
            for(let c=0; c<4; c++){
                somma += tabellone[r][c];
            }
        }
        if (somma==160){
            alert('YOU WIN!!!');
            clearInterval(t);
            
            let p = new Giocatori(nome.value,tempo);
            //window.localStorage.setItem('giocatori',JSON.stringify(giocatori)); //questo comando resetta il localStorage
            
            let giocatoriStorage = JSON.parse(window.localStorage.getItem('giocatori'));
            giocatoriStorage.push(p);
            giocatoriStorage.sort((a,b)=>{return (a.tempo - b.tempo)}); //funzione di ordinamento in base al tempo
            window.localStorage.setItem('giocatori',JSON.stringify(giocatoriStorage));
            let nomiClassifica = '';
            for(let i=0; i< giocatoriStorage.length; i++){
            nomiClassifica+= `<div>${giocatoriStorage[i].nome} time: ${giocatoriStorage[i].tempo} s</div>`;
            document.getElementById('classifica').innerHTML = nomiClassifica};
            document.getElementById('btnInizio').setAttribute( "onclick", "startStop()");
            document.getElementById('nome').value = '';
            document.getElementById('timer').innerText = ``;
        }
        
        console.log('sto girando')
        }, x)
    }    
}

//****************AL CARICAMENTO */

window.onload = () => {
    if(window.localStorage.getItem('giocatori') !=null) 
    {
    console.log('ci sono utenti nello storage');
    let giocatoriStorage = JSON.parse(window.localStorage.getItem('giocatori'));
    //anagrafica.push(datiStore) se faccio così mi fa un array di array
    let nomiClassifica = '';
            for(let i=0; i< giocatoriStorage.length; i++){
            nomiClassifica+= `<div>${giocatoriStorage[i].nome} time: ${giocatoriStorage[i].tempo} s</div>`;
            document.getElementById('classifica').innerHTML = nomiClassifica};
    
    }
    else{console.log('non ci sono utenti nello storage');
    giocatoriStorage = [];
    window.localStorage.setItem('giocatori',JSON.stringify(giocatoriStorage));}

};
    




