/* ==================================================
   YTCC SERVICE WORKER
   OFFLINE COMMAND CORE ENGINE
   VERSION 1.0
================================================== */


const CACHE_NAME = "YTCC-OFFLINE-v13";


const FILES_TO_CACHE = [

    "./",

    "./index.html",

    "./style.css",

    "./manifest.json",

    "./favicon.png"

];





/* ==================================================
   INSTALL EVENT
================================================== */


self.addEventListener(
"install",

event => {


    console.log(
        "YTCC SERVICE WORKER INSTALLED"
    );


    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(

            cache => {


                return cache.addAll(
                    FILES_TO_CACHE
                );


            }

        )


    );


    self.skipWaiting();


});








/* ==================================================
   ACTIVATE EVENT
================================================== */


self.addEventListener(
"activate",

event => {


    console.log(
        "YTCC SERVICE WORKER ACTIVE"
    );



    event.waitUntil(

        caches.keys()

        .then(

            cacheNames => {


                return Promise.all(


                    cacheNames.map(

                        cache => {


                            if(

                                cache !== CACHE_NAME

                            ){


                                console.log(

                                    "Removing old cache:",

                                    cache

                                );


                                return caches.delete(
                                    cache
                                );


                            }


                        }


                    )


                );


            }


        )


    );


    return self.clients.claim();


});








/* ==================================================
   FETCH EVENT
================================================== */


self.addEventListener(

"fetch",

event => {



    event.respondWith(


        caches.match(

            event.request

        )

        .then(

            response => {


                if(response){


                    return response;


                }



                return fetch(

                    event.request

                )

                .then(

                    networkResponse => {



                        return caches.open(

                            CACHE_NAME

                        )

                        .then(

                            cache => {


                                cache.put(

                                    event.request,

                                    networkResponse.clone()

                                );


                                return networkResponse;


                            }

                        );



                    }


                )

                .catch(


                    () => {


                        return caches.match(

                            "./index.html"

                        );


                    }


                );


            }


        )


    );


});








/* ==================================================
   MESSAGE SYSTEM
================================================== */


self.addEventListener(

"message",

event => {



    if(

        event.data === "UPDATE"

    ){


        self.skipWaiting();


    }



});








console.log(

"YTCC OFFLINE ENGINE READY"

);
