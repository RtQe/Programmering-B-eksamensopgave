//opretter variabler
let checkbox = [];
let randomTal;
let password = "";
let loadButton;
let copyButton;
let r = 175;
let g = 145;
let b = 245;
let i = 0; 
let d = 0;
let e = 0;

//opretter strings
let string = [""];

let upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Æ", "Ø", "Å"];

let lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "æ", "ø", "å"];

let numbers = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9"]; 

let symbols = ["$", "§", "!", "#", "€", "%", "&", "/", "=", "+", "?", "*", "@", "-", "_", ">", "<"];

//laver en string med alle de andre strings i sig 
let alleVariabler = [upperCase, lowerCase, numbers, symbols];

//setup - kører kun en gang 
function setup() 
{
  //opretter canvas og baggrundsfarve 
  createCanvas(400, 400);
  background(r, g, b);
  
  //opretter firkanter som laver GUI'en overskuelig
  rect(25, 70, 350, 30);
  
  box0 = new box(25, 125, 180, 20, 245, 66, 120);
  box1 = new box(25, 180, 180, 20, 245, 66, 170);
  box2 = new box(25, 215, 180, 20, 245, 66, 245);
  box3 = new box(25, 250, 180, 20, 200, 66, 245);
  box4 = new box(25, 285, 180, 20, 155, 66, 245);
  
  //opretter en slider til mængden af karakterer i adgangskoden
  fill(0);
  slider = createSlider(0, 25, 10, 1);
  slider.position(260, 125);
  slider.style('80px', '80px');
  
  //laver en for loop som opretter 4 checkbokse 
  for(let i =0; i < 4; i++)
  {
    checkbox[i] = createCheckbox(" ", false);
    checkbox[i].position(370, 180 + (i * 35));
    checkbox[i].style('color', 10);
  }
  
  //laver checkbox0 tjekket fra starten af programmet 
  checkbox[0].checked(true);

  //påretter en knap til genereringen af adgangskoden
  loadButton = createButton('Generate Password');
  loadButton.position(85, 350);
  loadButton.size(230, 30);
  loadButton.mousePressed(loadPassword);   //kalder en funktion 
  
  //laver en knap som kopierer adgangskoden til clipboardet
  copyButton = createButton('Copy');
  copyButton.mousePressed(copyText);        //kalder en funktion 
  copyButton.position(325, 70);
  copyButton.size(50, 30);
  
  //opretter GUI text så man ved hvad programmet er
  textSize(30);
  textAlign(CENTER);
  text("Password Generator", 200, 50);
  textSize(15);
  
  //opdeler længden med checkboksene så det er mere overskueligt
  textSize(70);
  text("__________", 200, 157);
  textSize(15);
  
  //texter kategorierne af slideren og checkboksene
  text("Password length", 115, 140);
  text("Uppercase letters", 115, 195);
  text("Lowercase letters", 115, 230);
  text("Numbers", 115, 265);
  text("Symbols", 115, 300);
}

//funktionen som bliver kaldt når man trykker på "Generate Password" (loadButton)
function loadPassword() 
{
  //opretter et tomt variabel 
  password = "";
  
  textAlign(LEFT);
  
  let temp = [];          //opretter en tom string
  
  //Der skal kun sættes characters ind i temp, hvis er under mængden af slider.value
  for (let i = 0; i < slider.value(); i ++) 
  {
    temp.push(false);
  }
  
  //opretter et count variabel
  let count = 0;
  
  //Sætter variablet "i" ind i checkbox'en og hvis den er checked, så skal count plusse én
  for (let i in checkbox)
  {
    if(checkbox[i].checked())
    {
      count ++;
    }
  }
  
  //sætter variablet "j" ind i min string "alleVariabler" 
  for (let j in alleVariabler) 
  {  
    //hvis checkboxen er chekket...
    if (checkbox[j].checked())
    {
      
      //find en plads i mængden af pladser, altså slider.value. 
      //Denne værdi bliver divideret med count, som er mængden af kasser der er tjekket af. 
      for (i = 0; i < floor(slider.value() / count); i ++)
      {
        //laver et variabel x, som er et random sted på mængden af pladser, altså slider.value. 
        let x = floor(random(slider.value()));
        
        //tjekker om noget inde i temp[x] er false
        while (temp[x] != false) 
        {
          //indsætter x på den plads 
          x = floor(random(slider.value()));
        }
        
        //Indsætter det hele i stringen 'alleVariabler' 
        temp[x] = alleVariabler[j][Math.floor(random(alleVariabler[j].length))];
      }
    }
  }
  
  //Finder de sidste placeringer der mangler en værdi, og giver dem en værdi. i tilfælde af at antallet af checkboxe ikke går op med længden af kodeordet. 
  while (temp.indexOf(false) != -1) 
  {
    let x;
    
    for (let i in alleVariabler)
    {
      if (checkbox[i].checked()) 
      {
        x = alleVariabler[i][Math.floor(random(alleVariabler[i].length))];
      }    
    }
    
    temp[temp.indexOf(false)] = x;
  }

  //giver 'password' værdien 
  for (let i in temp)
  {
    password += temp[i];
  }
  
  //texter password
  stroke(80);
  fill(255);
  rect(25, 70, 350, 30);
  noStroke();
  fill(0);
  text(password, 30, 90);
}

//draw
function draw() 
{   
  //texter værdien af slider.value, ovenpå en rect så det ikke bliver ulæseligt
  noStroke();
  textSize(15);
  fill(r, g, b);
  rect(230,120,40,40);
  fill(0);
  textAlign(CENTER);
  text(slider.value(), 250, 140);
}

//class
class box 
  {
    //i constructoren opretter variabler
    constructor(posX, posY, width, length, red, green, blue) 
    {
      //opretter lokale variabler
      this.posX = posX; 
      this.posY = posY;
      this.width = width;
      this.length = length;
      this.red = red;
      this.green = green;
      this.blue = blue; 
      
      //farver med deres givne farve
      fill(this.red, this.green, this.blue);
      //laver kasser med størrelserne og positionerne
      rect(this.posX, this.posY, this.width, this.length);
    } 
  }

//copytext funktion
function copyText()
{
  //kopirer 'password' til clipboard 
  navigator.clipboard.writeText(password);
}




