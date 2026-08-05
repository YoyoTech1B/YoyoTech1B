/* ==================================================
   YTCC FIREBASE CONNECTION
================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDP_PMEdF9C5qpbb8fQDJ17dbJ2CMrt_TU",
    authDomain: "ytcc-analytics.firebaseapp.com",
    projectId: "ytcc-analytics",
    storageBucket: "ytcc-analytics.firebasestorage.app",
    messagingSenderId: "516249060788",
    appId: "1:516249060788:web:51d4c43b7ad171cc6dee1"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);


/* ==================================================
   FIRESTORE ANALYTICS READER
================================================== */


async function loadYTCCAnalytics(){

    const visitsRef = doc(
        db,
        "analytics",
        "visits"
    );


    await updateDoc(
        visitsRef,
        {
            total: increment(1)
        }
    );


    const visitsSnap = await getDoc(
        visitsRef
    );


    if(visitsSnap.exists()){


        const total =
        visitsSnap.data().total;


        console.log(
            "Total visits:",
            total
        );


        const totalElement =
        document.getElementById(
            "totalVisits"
        );


        if(totalElement){

            totalElement.textContent =
            total;

        }

    }

}

loadYTCCAnalytics();



/* ==================================================
   YTCC CORE DEFENDER MINI GAME
================================================== */


let score = 0;

let time = 30;

let gameRunning = false;

let timer;



const scoreText =
document.getElementById(
    "gameScore"
);


const timeText =
document.getElementById(
    "gameTime"
);


const attackBox =
document.getElementById(
    "attackBox"
);


const statusText =
document.getElementById(
    "gameStatus"
);



const startGameButton =
document.getElementById(
    "startGameButton"
);



if(startGameButton){


    startGameButton.onclick = function(){


        score = 0;

        time = 30;

        gameRunning = true;



        if(scoreText)
            scoreText.textContent = score;


        if(timeText)
            timeText.textContent = time;



        if(statusText)
            statusText.textContent =
            "DEFEND THE CORE";



        if(attackBox)
            attackBox.textContent =
            "WAITING FOR ATTACK";



        timer = setInterval(()=>{


            time--;


            if(timeText)
                timeText.textContent = time;



            if(time <= 0){


                clearInterval(timer);


                gameRunning = false;


                if(statusText)
                    statusText.textContent =
                    "GAME OVER SCORE: " + score;



                if(attackBox)
                    attackBox.textContent =
                    "CORE SECURED";


            }


        },1000);



        spawnAttack();


    };


}





function spawnAttack(){


    if(!gameRunning)
        return;



    if(attackBox){


        attackBox.textContent =
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


}
/* ==================================================
   YTCC DEFEND BUTTON
================================================== */


const defendButton =
document.getElementById(
    "defendButton"
);



if(defendButton){


    defendButton.onclick = function(){


        if(!gameRunning)
            return;



        score += 10;



        if(scoreText)
            scoreText.textContent =
            score;



        if(attackBox){

            attackBox.textContent =
            "✓ ATTACK BLOCKED";

        }



        setTimeout(
            spawnAttack,
            1000
        );


    };


}





/* ==================================================
   YTCC APP INSTALL SYSTEM
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


    }

);





if(installButton){


    installButton.addEventListener(

        "click",

        async ()=>{


            if(!installPrompt)
                return;



            installPrompt.prompt();



            const result =
            await installPrompt.userChoice;



            if(
                result.outcome === "accepted"
            ){


                console.log(
                    "YTCC INSTALLED"
                );


                installButton.style.display =
                "none";


            }



            installPrompt = null;


        }

    );


}





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


    }

);





/* ==================================================
   YTCC BOOT ANIMATION ENGINE
================================================== */


window.addEventListener(

"load",

()=>{


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



    if(!bootScreen)
        return;



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


            if(bootStatus)
                bootStatus.textContent =
                "SYSTEM ONLINE";



            setTimeout(()=>{


                bootScreen.classList.add(
                    "boot-finished"
                );


            },900);



            return;


        }



        const step =
        bootSteps[currentStep];



        if(bootProgress)
            bootProgress.style.width =
            step.progress;



        if(bootMessage)
            bootMessage.textContent =
            step.message;



        if(
            bootChecks[currentStep]
        ){


            bootChecks[currentStep]
            .classList.add(
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


});
/* ==================================================
   YTCC ACHIEVEMENT ENGINE
================================================== */


const YTCC_ACHIEVEMENT_KEY =
"YTCC_ACHIEVEMENTS_V1";



const ytccAchievements = {


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


};





function getYTCCAchievements(){


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


}





function saveYTCCAchievements(
    achievements
){


    localStorage.setItem(

        YTCC_ACHIEVEMENT_KEY,

        JSON.stringify(
            achievements
        )

    );


}





function updateAchievementCount(){


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



    if(countElement){


        countElement.textContent =
        unlockedCount +
        " / 5 UNLOCKED";


    }


}





function showAchievementPopup(
    achievementName
){


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



    setTimeout(()=>{


        popup.classList.remove(
            "show"
        );


    },4000);


}





function unlockYTCCAchievement(
    achievementId
){


    const achievement =
    ytccAchievements[
        achievementId
    ];



    if(!achievement)
        return;



    const saved =
    getYTCCAchievements();



    if(
        saved[achievementId]
    ){

        return;

    }



    saved[achievementId] =
    true;



    saveYTCCAchievements(
        saved
    );



    const card =
    document.getElementById(
        achievement.card
    );



    if(card){


        card.classList.add(
            "unlocked"
        );



        const label =
        card.querySelector(
            ".achievement-label"
        );



        if(label){


            label.textContent =
            "UNLOCKED";


        }


    }



    updateAchievementCount();



    showAchievementPopup(
        achievement.name
    );


}





function loadYTCCAchievements(){


    const saved =
    getYTCCAchievements();



    Object.keys(
        saved
    ).forEach(
        (achievementId)=>{


            const achievement =
            ytccAchievements[
                achievementId
            ];



            if(!achievement)
                return;



            const card =
            document.getElementById(
                achievement.card
            );



            if(card){


                card.classList.add(
                    "unlocked"
                );



                const label =
                card.querySelector(
                    ".achievement-label"
                );



                if(label){


                    label.textContent =
                    "UNLOCKED";


                }


            }


        }

    );



    updateAchievementCount();


}





/* ==================================================
   START ACHIEVEMENTS
================================================== */


document.addEventListener(

"DOMContentLoaded",

()=>{


    loadYTCCAchievements();



    setTimeout(()=>{


        unlockYTCCAchievement(
            "systemOnline"
        );


    },2500);


});
/* ==================================================
   FIRST COMMAND TRACKER
================================================== */


document.addEventListener(

    "click",

    (event)=>{


        const clickedControl =
        event.target.closest(
            "button"
        );



        if(clickedControl){


            unlockYTCCAchievement(
                "firstCommand"
            );


        }


    }

);





/* ==================================================
   MINI GAME ACHIEVEMENT TRACKER
================================================== */


const ytccStartGameButton =
document.getElementById(
    "startGameButton"
);



if(ytccStartGameButton){


    ytccStartGameButton.addEventListener(

        "click",

        ()=>{


            unlockYTCCAchievement(
                "coreDefender"
            );


        }

    );


}





/* ==================================================
   SAVE NOTE TRACKER
================================================== */


const ytccSaveNoteButton =
document.getElementById(
    "saveNoteButton"
);



if(ytccSaveNoteButton){


    ytccSaveNoteButton.addEventListener(

        "click",

        ()=>{


            unlockYTCCAchievement(
                "dataKeeper"
            );


        }

    );


}





/* ==================================================
   GAME SCORE ACHIEVEMENT
================================================== */


function checkYTCCGameScore(
    currentScore
){


    if(
        Number(currentScore) >= 100
    ){


        unlockYTCCAchievement(
            "gameOperator"
        );


    }


}





/* ==================================================
   AUTO CHECK SCORE
================================================== */


setInterval(()=>{


    if(
        typeof score !== "undefined"
    ){


        checkYTCCGameScore(
            score
        );


    }


},1000);





/* ==================================================
   YTCC SYSTEM STATUS
================================================== */


function YTCC_SystemStatus(){


    return {

        name:
        "YOYOTECH COMMAND CONTROL CENTER",


        version:
        "2.0.0",


        status:
        "ONLINE",


        firebase:
        "CONNECTED"


    };


}



console.log(
    YTCC_SystemStatus()
);
/* ==================================================
   YTCC OFFLINE STATUS MONITOR
================================================== */


function updateYTCCConnectionStatus(){


    const status =
    document.getElementById(
        "connectionStatus"
    );



    if(!status)
        return;



    if(navigator.onLine){


        status.textContent =
        "ONLINE";


    }
    else{


        status.textContent =
        "OFFLINE MODE";


    }


}





window.addEventListener(

    "online",

    ()=>{


        updateYTCCConnectionStatus();


        console.log(
            "YTCC NETWORK RESTORED"
        );


    }

);





window.addEventListener(

    "offline",

    ()=>{


        updateYTCCConnectionStatus();


        console.log(
            "YTCC OFFLINE MODE ENABLED"
        );


    }

);





updateYTCCConnectionStatus();





/* ==================================================
   YTCC COMMAND LOGGER
================================================== */


const YTCC_COMMAND_LOG_KEY =
"YTCC_COMMAND_HISTORY";



function saveYTCCCommand(
    command
){


    let commands =
    JSON.parse(

        localStorage.getItem(
            YTCC_COMMAND_LOG_KEY
        )

    ) || [];



    commands.push({

        command:
        command,


        time:
        new Date().toLocaleString()


    });



    localStorage.setItem(

        YTCC_COMMAND_LOG_KEY,

        JSON.stringify(
            commands
        )

    );


}





function getYTCCCommands(){


    return JSON.parse(

        localStorage.getItem(
            YTCC_COMMAND_LOG_KEY
        )

    ) || [];


}





/* ==================================================
   COMMAND BUTTON TRACKER
================================================== */


document.addEventListener(

    "click",

    (event)=>{


        const button =
        event.target.closest(
            "button"
        );



        if(button){


            saveYTCCCommand(

                button.textContent.trim()

            );


        }


    }

);





/* ==================================================
   YTCC STARTUP MESSAGE
================================================== */


window.addEventListener(

"load",

()=>{


    console.log(
        "================================"
    );


    console.log(
        "YTCC COMMAND CENTER ONLINE"
    );


    console.log(
        "VERSION 2.0.0"
    );


    console.log(
        "ALL SYSTEMS READY"
    );


    console.log(
        "================================"
    );


});

/* ==================================================
   YTCC ADMIN LOGIN SYSTEM
================================================== */


const adminLoginButton =
document.getElementById(
    "adminLoginButton"
);


if(adminLoginButton){


    adminLoginButton.addEventListener(
        "click",
        async ()=>{


            const email =
            document.getElementById(
                "adminEmail"
            ).value;


            const password =
            document.getElementById(
                "adminPassword"
            ).value;



            const status =
            document.getElementById(
                "adminLoginStatus"
            );


            try{


                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


                status.textContent =
                "ACCESS GRANTED";


                document.getElementById(
                    "adminAnalyticsPanel"
                ).style.display =
                "block";


                console.log(
                    "YTCC ADMIN LOGIN SUCCESS"
                );


            }


            catch(error){


                status.textContent =
                "ACCESS DENIED";


                console.log(
                    error.message
                );


            }


        }
    );


}
