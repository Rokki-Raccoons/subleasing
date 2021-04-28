# API endpoints for the Subletty Project

GET /listings/{searchID}
    gets listings with the search Id mentioned in the name or details. 
    returns a json file with the details on these listings

GET /saved/{uid}
    gets the favorited listings from a specific user ID
    returns a json file including the building ID
    (note: could be improved to actually return the buildings)

GET /offers/{uid}}
    gets the offers given to a specific person
    returns a json file with the user ids of the sender and reciever in addition to the message

POST /{uid}/saved/{savedID}

GET /{uid}/offers/{listingID}


