import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDP_PMEdF9C5qpbb8fQDJ17dbJ2CMrt_TU",
  authDomain: "ytcc-analytics.firebaseapp.com",
  projectId: "ytcc-analytics",
  storageBucket: "ytcc-analytics.firebasestorage.app",
  messagingSenderId: "516249060788",
  appId: "1:516249060788:web:51d4c43b7ad171dcc6dee1"
};

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
/* ==================================================
   YTCC APP INSTALL BUTTON
   AUTO HIDE AFTER INSTALL
================================================== */


let installPrompt = null;


const installButton =
document.getElementById(
    "installYTCCButton"
);



window.addEventListener(

"beforeinstallprompt",

(event)=>{


    event.preventDefault();


    installPrompt = event;


    if(installButton){

        installButton.style.display =
        "block";

    }


});







installButton?.addEventListener(

"click",

async ()=>{


    if(!installPrompt)
    return;



    installPrompt.prompt();



    const result =
    await installPrompt.userChoice;



    if(result.outcome === "accepted"){


        console.log(
            "YTCC INSTALLED"
        );


        installButton.style.display =
        "none";


    }



    installPrompt = null;


});








/* ==================================================
   HIDE BUTTON IF ALREADY INSTALLED
================================================== */


window.addEventListener(

"appinstalled",

()=>{


    console.log(
        "YTCC INSTALL COMPLETE"
    );



    if(installButton){


        installButton.style.display =
        "none";


    }


});
/* ==================================================
   YTCC BOOT ANIMATION ENGINE
================================================== */


window.addEventListener(

"load",

function(){


    const bootScreen =

    document.getElementById(

        "bootScreen"

    );


    const bootProgress =

    document.getElementById(

        "bootProgress"

    );


    const bootMessage =

    document.getElementById(

        "bootMessage"

    );


    const bootStatus =

    document.getElementById(

        "bootStatus"

    );


    const bootChecks =

    document.querySelectorAll(

        ".boot-check"

    );


    if(

        !bootScreen

    ){


        return;


    }


    const bootSteps = [


        {

            progress:"20%",


            message:

            "INITIALIZING COMMAND CORE..."


        },


        {

            progress:"42%",


            message:

            "CONNECTING NETWORK SYSTEMS..."


        },


        {

            progress:"64%",


            message:

            "VERIFYING SECURITY PROTOCOLS..."


        },


        {

            progress:"84%",


            message:

            "ACTIVATING OFFLINE ENGINE..."


        },


        {

            progress:"100%",


            message:

            "COMMAND CENTER READY..."


        }


    ];


    let currentStep = 0;


    function runBootStep(){


        if(

            currentStep >=

            bootSteps.length

        ){


            bootStatus.textContent =

            "SYSTEM ONLINE";


            setTimeout(

                function(){


                    bootScreen.classList.add(

                        "boot-finished"

                    );


                },


                900

            );


            return;


        }


        const step =

        bootSteps[

            currentStep

        ];


        bootProgress.style.width =

        step.progress;


        bootMessage.textContent =

        step.message;


        if(

            bootChecks[

                currentStep

            ]

        ){


            bootChecks[

                currentStep

            ].classList.add(

                "active"

            );


        }


        currentStep++;


        setTimeout(

            runBootStep,

            650

        );


    }


    setTimeout(

        runBootStep,

        300

    );


}
);
/* ==================================================
YTCC ACHIEVEMENT ENGINE
================================================== */

const YTCC_ACHIEVEMENT_KEY =

"YTCC_ACHIEVEMENTS_V1";

const ytccAchievements = {

```
firstCommand:{

    card:

    "achievementFirstCommand",


    name:

    "FIRST COMMAND"


},


systemOnline:{

    card:

    "achievementSystemOnline",


    name:

    "SYSTEM ONLINE"


},


coreDefender:{

    card:

    "achievementCoreDefender",


    name:

    "CORE DEFENDER"


},


gameOperator:{

    card:

    "achievementGameOperator",


    name:

    "GAME OPERATOR"


},


dataKeeper:{

    card:

    "achievementDataKeeper",


    name:

    "DATA KEEPER"


}
```

};

function getYTCCAchievements(){

```
try{


    return JSON.parse(

        localStorage.getItem(

            YTCC_ACHIEVEMENT_KEY

        )

    ) || {};


}


catch(error){


    return {};


}
```

}

function saveYTCCAchievements(

achievements

){

```
localStorage.setItem(

    YTCC_ACHIEVEMENT_KEY,

    JSON.stringify(

        achievements

    )

);
```

}

function updateAchievementCount(){

```
const saved =

getYTCCAchievements();


const unlockedCount =

Object.keys(

    saved

).length;


const countElement =

document.getElementById(

    "achievementCount"

);


if(

    countElement

){


    countElement.textContent =

    unlockedCount +

    " / 5 UNLOCKED";


}
```

}

function showAchievementPopup(

achievementName

){

```
const popup =

document.getElementById(

    "achievementPopup"

);


const popupName =

document.getElementById(

    "achievementPopupName"

);


if(

    !popup ||

    !popupName

){


    return;


}


popupName.textContent =

achievementName;


popup.classList.add(

    "show"

);


setTimeout(


    function(){


        popup.classList.remove(

            "show"

        );


    },


    4000


);
```

}

function unlockYTCCAchievement(

achievementId

){

```
const achievement =

ytccAchievements[

    achievementId

];


if(

    !achievement

){


    return;


}


const saved =

getYTCCAchievements();


if(

    saved[

        achievementId

    ]

){


    return;


}


saved[

    achievementId

] = true;


saveYTCCAchievements(

    saved

);


const card =

document.getElementById(

    achievement.card

);


if(

    card

){


    card.classList.add(

        "unlocked"

    );


    const label =

    card.querySelector(

        ".achievement-label"

    );


    if(

        label

    ){


        label.textContent =

        "UNLOCKED";


    }


}


updateAchievementCount();


showAchievementPopup(

    achievement.name

);
```

}

function loadYTCCAchievements(){

```
const saved =

getYTCCAchievements();


Object.keys(

    saved

).forEach(


    function(

        achievementId

    ){


        const achievement =

        ytccAchievements[

            achievementId

        ];


        if(

            !achievement

        ){


            return;


        }


        const card =

        document.getElementById(

            achievement.card

        );


        if(

            card

        ){


            card.classList.add(

                "unlocked"

            );


            const label =

            card.querySelector(

                ".achievement-label"

            );


            if(

                label

            ){


                label.textContent =

                "UNLOCKED";


            }


        }


    }


);


updateAchievementCount();
```

}

/* ==================================================
START ACHIEVEMENT SYSTEM
================================================== */

document.addEventListener(

"DOMContentLoaded",

function(){

```
loadYTCCAchievements();


setTimeout(


    function(){


        unlockYTCCAchievement(

            "systemOnline"

        );


    },


    2500


);
```

}
);

/* ==================================================
FIRST COMMAND TRACKER
================================================== */

document.addEventListener(

"click",

function(

event

){

```
const clickedControl =

event.target.closest(


    "button"


);


if(

    clickedControl

){


    unlockYTCCAchievement(

        "firstCommand"

    );


}
```

}
);

/* ==================================================
MINI-GAME TRACKER
================================================== */

const ytccStartGameButton =

document.getElementById(

"startGameButton"

);

if(

ytccStartGameButton

){

```
ytccStartGameButton.addEventListener(

"click",

function(){


    unlockYTCCAchievement(

        "coreDefender"

    );


}

);
```

}

/* ==================================================
SAVE NOTE TRACKER
================================================== */

const ytccSaveNoteButton =

document.getElementById(

"saveNoteButton"

);

if(

ytccSaveNoteButton

){

```
ytccSaveNoteButton.addEventListener(

"click",

function(){


    unlockYTCCAchievement(

        "dataKeeper"

    );


}

);
```

}

/* ==================================================
GAME SCORE TRACKER
================================================== */

function checkYTCCGameScore(

score

){

```
if(

    Number(

        score

    ) >= 100

){


    unlockYTCCAchievement(

        "gameOperator"

    );


}
```

}
