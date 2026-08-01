/* ==================================================
   YOYOTECH COMMAND CONTROL CENTER
   YTCC OFFLINE UPGRADE
   SERVICE WORKER
   ================================================== */


/* ==================================================
   CACHE CONFIGURATION
   ================================================== */


const CACHE_NAME =

"YTCC-OFFLINE-V12";





const FILES_TO_CACHE = [


    "./",


    "./index.html",


    "./style.css",


    "./manifest.json",


    "./favicon.png"


];







/* ==================================================
   INSTALL SYSTEM
   ================================================== */


self.addEventListener(

"install",

event => {


    event.waitUntil(


        caches
        .open(

            CACHE_NAME

        )

        .then(

            cache => {


                return cache
                .addAll(

                    FILES_TO_CACHE

                );


            }

        )


    );



    self
    .skipWaiting();



}

);







/* ==================================================
   ACTIVATE SYSTEM
   ================================================== */


self.addEventListener(

"activate",

event => {


    event.waitUntil(


        caches
        .keys()

        .then(

            cacheNames => {


                return Promise
                .all(


                    cacheNames
                    .map(

                        cache => {


                            if(

                                cache !== CACHE_NAME

                            ){


                                return caches
                                .delete(

                                    cache

                                );


                            }


                        }

                    )


                );


            }

        )


    );



    self
    .clients
    .claim();



}

);







/* ==================================================
   FETCH OFFLINE ENGINE
   ================================================== */


self.addEventListener(

"fetch",

event => {



    event
    .respondWith(


        caches
        .match(

            event.request

        )

        .then(

            cachedResponse => {


                if(

                    cachedResponse

                ){


                    return cachedResponse;


                }



                return fetch(

                    event.request

                )

                .then(

                    response => {



                        return caches
                        .open(

                            CACHE_NAME

                        )

                        .then(

                            cache => {


                                cache
                                .put(

                                    event.request,

                                    response
                                    .clone()

                                );



                                return response;


                            }

                        );



                    }


                )

                .catch(

                    () => {


                        return caches
                        .match(

                            "./index.html"

                        );


                    }

                );


            }

        )


    );



}

);







/* ==================================================
   BACKGROUND UPDATE SYSTEM
   ================================================== */


self.addEventListener(

"message",

event => {


    if(

        event.data ===

        "UPDATE_YTCC"

    ){


        self
        .skipWaiting();



    }


}

);







/* ==================================================
   OFFLINE STATUS MESSAGE
   ================================================== */


self.addEventListener(

"sync",

event => {


    if(

        event.tag ===

        "ytcc-sync"

    ){


        console
        .log(

            "YTCC offline sync completed"

        );


    }


}

);







/* ==================================================
   PUSH NOTIFICATION FOUNDATION
   ================================================== */


self.addEventListener(

"push",

event => {


    const data =


    event.data

    ?

    event.data.text()

    :

    "YTCC System Notification";





    event
    .waitUntil(


        self
        .registration
        .showNotification(

            "YOYOTECH COMMAND CENTER",

            {


                body:

                data,


                icon:

                "./favicon.png",


                badge:

                "./favicon.png"


            }


        )


    );


}

);







/* ==================================================
   YTCC SERVICE WORKER ONLINE
   ================================================== */


console
.log(

"YTCC SERVICE WORKER ACTIVE"

);
