/* ==================================================
   YTCC FIREBASE CONNECTION
================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import { 
    getFirestore,
    doc,
    getDoc,
    updateDoc,
    increment,
    setDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


import { 
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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

onAuthStateChanged(
    auth,
    (user)=>{

        if(user){

            loadYTCCProfile();

        }

    }
);

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

/* ==================================================
   YTCC PRIVATE ANALYTICS LOADER
================================================== */


async function loadAdminAnalytics(){

    const visitsRef = doc(
        db,
        "analytics",
        "visits"
    );


    const visitsSnap = await getDoc(
        visitsRef
    );


    if(visitsSnap.exists()){


        const total =
        visitsSnap.data().total;


        const adminTotal =
        document.getElementById(
            "adminTotalVisits"
        );


        if(adminTotal){

            adminTotal.textContent =
            total;

        }


        console.log(
            "ADMIN TOTAL VISITS:",
            total
        );


    }

}





const adminPanel =
document.getElementById(
    "adminAnalyticsPanel"
);



if(adminLoginButton){


    adminLoginButton.addEventListener(
        "click",
        async ()=>{


            setTimeout(()=>{


                loadAdminAnalytics();


            },1000);


        }
    );


}
/* ==================================================
   YTCC FREE PROFILE SIGNUP
================================================== */


const signupButton =
document.getElementById(
    "signupButton"
);



if(signupButton){


    signupButton.addEventListener(

        "click",

        async ()=>{


            const username =
            document.getElementById(
                "signupUsername"
            ).value;



            const email =
            document.getElementById(
                "signupEmail"
            ).value;



            const password =
            document.getElementById(
                "signupPassword"
            ).value;



            const status =
            document.getElementById(
                "signupStatus"
            );



            try{


                const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


                const user =
                userCredential.user;



                console.log(
                    "ACCOUNT CREATED:",
                    user.uid
                );
await setDoc(
    doc(
        db,
        "profiles",
        user.uid
    ),
    {
        username: username,
        rank: "Recruit",
        level: 1,
        xp: 0
    }
);


                status.textContent =
                "ACCOUNT CREATED";


            }


            catch(error){


                status.textContent =
                "ERROR: " + error.message;


                console.log(
                    error
                );


            }


        }

    );


}
/* ==================================================
   YTCC PROFILE LOADER
================================================== */


async function loadYTCCProfile(){


    const user =
    auth.currentUser;



    if(!user){

        return;

    }



    const profileRef =
    doc(
        db,
        "profiles",
        user.uid
    );



    const profileSnap =
    await getDoc(
        profileRef
    );



    if(profileSnap.exists()){


        const profile =
        profileSnap.data();
const savedAvatar =
localStorage.getItem("YTCC_AVATAR");


const finalAvatar =
savedAvatar || profile.avatar || "avatars/commander.png";


if(profileAvatar){

    profileAvatar.src = finalAvatar;

}


if(dashboardAvatar){

    dashboardAvatar.src = finalAvatar;

}


        const username =
        document.getElementById(
            "profileUsername"
        );


        const rank =
        document.getElementById(
            "profileRank"
        );


        const level =
        document.getElementById(
            "profileLevel"
        );


        const xp =
        document.getElementById(
            "profileXP"
        );



        if(username)
            username.textContent =
            profile.username;



        if(rank)
            rank.textContent =
            profile.rank;



        if(level)
            level.textContent =
            profile.level;



        if(xp)
            xp.textContent =
            profile.xp;



        console.log(
            "YTCC PROFILE LOADED",
            profile
        );


    }


}


/* ==================================================
   YTCC LOGOUT SYSTEM
================================================== */


const logoutButton =
document.getElementById(
    "logoutButton"
);



if(logoutButton){


    logoutButton.addEventListener(

        "click",

        async ()=>{


            await signOut(auth);



            console.log(
                "YTCC USER LOGGED OUT"
            );



            location.reload();


        }

    );


}
/* ==================================================
   YTCC PROFILE EDIT OPEN
================================================== */

const editProfileButton =
document.getElementById(
    "editProfileButton"
);


const profileEditBox =
document.getElementById(
    "profileEditBox"
);


if(editProfileButton && profileEditBox){

    editProfileButton.addEventListener(
        "click",
        ()=>{

            profileEditBox.style.display =
            "block";

        }
    );

}
/* ==================================================
   YTCC SAVE USERNAME
================================================== */

const saveUsernameButton =
document.getElementById(
    "saveUsernameButton"
);

if(saveUsernameButton){

    saveUsernameButton.addEventListener(

        "click",

        async ()=>{

            const user = auth.currentUser;

            if(!user){
                return;
            }

            const newUsername =
            document.getElementById(
                "newUsernameInput"
            ).value.trim();

            if(newUsername === ""){

                document.getElementById(
                    "profileEditStatus"
                ).textContent =
                "ENTER A USERNAME";

                return;
            }

            try{

                await updateDoc(

                    doc(
                        db,
                        "profiles",
                        user.uid
                    ),

                    {
                        username: newUsername
                    }

                );

document.getElementById(
    "profileEditStatus"
).textContent =
"✅ USERNAME UPDATED";

document.getElementById(
    "newUsernameInput"
).value = "";

setTimeout(()=>{

    profileEditBox.style.display =
    "none";

    document.getElementById(
        "profileEditStatus"
    ).textContent = "";

},1500);

loadYTCCProfile();

            }

            catch(error){

                console.log(error);

                document.getElementById(
                    "profileEditStatus"
                ).textContent =
                "UPDATE FAILED";

            }

        }

    );

}
/* ==================================================
   YTCC PROFILE AVATAR SYSTEM
================================================== */

const avatarButtons =
document.querySelectorAll(
    ".avatarChoice"
);

avatarButtons.forEach(

    (button)=>{

        button.addEventListener(

            "click",

            async ()=>{

                const user =
                auth.currentUser;

                if(!user){
                    return;
                }

                const avatar =
                button.dataset.avatar;

                try{

                    await updateDoc(

                        doc(
                            db,
                            "profiles",
                            user.uid
                        ),

                        {
                            avatar: avatar
                        }

                    );

                    const avatarDisplay =
                    document.getElementById(
                        "profileAvatar"
                    );

                    if(avatarDisplay){

                        avatarDisplay.textContent =
                        avatar;

                    }

                    console.log(
                        "Avatar updated!"
                    );

                }

                catch(error){

                    console.log(error);

                }

            }

        );

    }

);
const dashboardProfileButton =
document.getElementById("dashboardProfileButton");

const userProfilePanel =
document.getElementById("userProfilePanel");

if(dashboardProfileButton){

    dashboardProfileButton.addEventListener("click",()=>{

        if(userProfilePanel){

            userProfilePanel.style.display = "block";

        }

    });

}

/* ==================================================
   YTCC AVATAR SYSTEM
================================================== */

const avatarButtons = document.querySelectorAll(".avatarChoice");

const profileAvatar = document.getElementById("profileAvatar");
const dashboardAvatar = document.getElementById("dashboardAvatar");


avatarButtons.forEach(button => {

    button.addEventListener("click", () => {

        const avatar = button.getAttribute("data-avatar");


        if(profileAvatar){
            profileAvatar.src = avatar;
        }


        if(dashboardAvatar){
            dashboardAvatar.src = avatar;
        }


        localStorage.setItem(
            "YTCC_AVATAR",
            avatar
        );


        console.log(
            "Avatar changed:",
            avatar
        );

    });

});


// Load saved avatar

const savedAvatar = localStorage.getItem(
    "YTCC_AVATAR"
);


if(savedAvatar){

    if(profileAvatar){
        profileAvatar.src = savedAvatar;
    }


    if(dashboardAvatar){
        dashboardAvatar.src = savedAvatar;
    }

}
