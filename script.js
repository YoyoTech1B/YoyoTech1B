let score = 0;

let time = 30;

let gameRunning = false;

let timer;



const scoreText =
document.getElementById("gameScore");

const timeText =
document.getElementById("gameTime");

const attackBox =
document.getElementById("attackBox");

const statusText =
document.getElementById("gameStatus");



document.getElementById("startGameButton")
.onclick = function(){


score = 0;

time = 30;

gameRunning = true;


scoreText.textContent = score;

timeText.textContent = time;


statusText.textContent =
"DEFEND THE CORE";


attackBox.textContent =
"WAITING FOR ATTACK";


timer = setInterval(()=>{


time--;

timeText.textContent=time;


if(time<=0){

clearInterval(timer);

gameRunning=false;

statusText.textContent=
"GAME OVER SCORE: "+score;

attackBox.textContent=
"CORE SECURED";

}


},1000);


spawnAttack();


};





function spawnAttack(){


if(!gameRunning)
return;


attackBox.textContent=
"⚠ SYSTEM ATTACK DETECTED";


attackBox.classList.add(
"attack-active"
);



setTimeout(()=>{


attackBox.classList.remove(
"attack-active"
);


},800);


}






document.getElementById("defendButton")
.onclick=function(){


if(!gameRunning)
return;


score+=10;


scoreText.textContent=score;


attackBox.textContent=
"✓ ATTACK BLOCKED";


setTimeout(spawnAttack,1000);


};
