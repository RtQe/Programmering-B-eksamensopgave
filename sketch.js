
let checkbox = [];
let randomTal;
let password = "";
let loadButton;
let r = 175;
let g = 145;
let b = 245;
let i = 0; 
let d = 0;
let e = 0;
let copyButton;

let string = [""];

let upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Æ", "Ø", "Å"];

let lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "æ", "ø", "å"];

let numbers = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9"]; //10

let symbols = ["$", "§", "!", "#", "€", "%", "&", "/", "=", "+", "?", "*", "@", "-", "_", ">", "<"];

let alleVariabler = [upperCase, lowerCase, numbers, symbols];

function setup() 
{
  
  if(window.frameElement) {window.draw = () => {}; return createA(location.href, `goto here: ${location.href}`, '_blank')}
  
  createCanvas(400, 400);
  background(r, g, b);
  
  rect(25, 70, 350, 30);
  
  box0 = new box(25, 125, 180, 20, 245, 66, 120);
  box1 = new box(25, 180, 180, 20, 245, 66, 170);
  box2 = new box(25, 215, 180, 20, 245, 66, 245);
  box3 = new box(25, 250, 180, 20, 200, 66, 245);
  box4 = new box(25, 285, 180, 20, 155, 66, 245);
  
  fill(0);
  slider = createSlider(0, 25, 10, 1);
  slider.position(260, 125);
  slider.style('80px', '80px');
  
  for(let i =0; i < 4; i++)
  {
    checkbox[i] = createCheckbox(" ", false);
    checkbox[i].position(370, 180 + (i * 35));
    checkbox[i].style('color', 10);
  }
  
  checkbox[0].checked(true);

  loadButton1 = createButton('Generate Password');
  loadButton1.position(85, 350);
  loadButton1.size(230, 30);
  loadButton1.mousePressed(loadPassword);
  
  copyButton = createButton('Copy');
  copyButton.mousePressed(copyText);
  copyButton.position(325, 70);
  copyButton.size(50, 30);
  
  textSize(30);
  textAlign(CENTER);
  text("Password Generator", 200, 50);
  textSize(15);
  
  textSize(70);
  text("__________", 200, 157);
  textSize(15);
  
  text("Password length", 115, 140);
  text("Uppercase letters", 115, 195);
  text("Lowercase letters", 115, 230);
  text("Numbers", 115, 265);
  text("Symbols", 115, 300);
  
  
}

function loadPassword() 
{
  password = "";
  
  textAlign(LEFT);
  let temp = [];
  for (let i = 0; i < slider.value(); i ++) 
  {
    temp.push(false);
  }
  
  let count = 0;
  for (let i in checkbox)
  {
    if(checkbox[i].checked())
    {
      count ++;
    }
  }
  
  for (let j in alleVariabler) 
  {  
    if (checkbox[j].checked())
    {
      for (i = 0; i < floor(slider.value() / count); i ++)
      {
        let x = floor(random(slider.value()));
        while (temp[x] != false) 
        {
          x = floor(random(slider.value()));
        }

        temp[x] = alleVariabler[j][Math.floor(random(alleVariabler[j].length))];
      }
    }
  }
  
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

  for (let i in temp)
  {
    password += temp[i];
  }
  
  stroke(80);
  fill(255);
  rect(25, 70, 350, 30);
  noStroke();
  fill(0);
  text(password, 30, 90);
}

function draw() 
{   
  noStroke();
  textSize(15);
  fill(r, g, b);
  rect(230,120,40,40);
  fill(0);
  textAlign(CENTER);
  text(slider.value(), 250, 140);
  
}

class box 
  {
    constructor(posX, posY, width, length, red, green, blue) 
    {
      this.posX = posX; 
      this.posY = posY;
      this.width = width;
      this.length = length;
      this.red = red;
      this.green = green;
      this.blue = blue; 
      
      fill(this.red, this.green, this.blue);
      rect(this.posX, this.posY, this.width, this.length);
    } 
  }

function copyText()
{
  navigator.clipboard.writeText(password);
}




