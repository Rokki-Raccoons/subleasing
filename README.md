# subleasing
Code and related artifacts to the student subleasing app

# Installation Instructions

To begin, clone this repository to your machine.
Navigate to the root directory from the command line and run ```npm i```
Once that completes, cd into the subleasing sub-directory, and run ```npm i``` once again.
After installation, run ```ng build``` once from the subleasing directory
Once the build completes, return to the root directory and run ```node server``` to run it, then navigate to localhost:3000 from your browser of choice.

An example of installation commands is below, but may vary by operating system or version

1. git clone https://github.com/Rokki-Raccoons/subleasing
2. ```npm i```
3. ```cd subleasing```
4. ```npm i```
5. ```ng build```
6. ```cd ..```
7. ```node server```
8. Open your browser at http://localhost:3000


# Code Documentation:

## Back-end:
The login system leverages Bcrypt encryption to safely store the hashes of passwords in the database.
The server manages interactions between the front end and the database, pulling information such as listing data for the listing cards, handling login verification, and other assorted transactions such as logging favorites and messages being sent.

## Front end:
There are a variety of components to handle different portions of the web-page.

### Auth:
Handles authentication functionality by guarding routes and checking login status

### Edit-listing: 
<aliza>
  
### Header:
The header component is the header of the page, and has redirects to other pages, such as login and listings. Redirects to pages like My Properties will simply redirect to the login page until the user is authenticated.

### Landing: 
This component represents the login page, and sends queries to the back-end server to verify that login details are valid, and ensuring that registration will only work for a new, unique username, and not a username already in the database. 

### Listings:
This component is the entire listing page, and instantiates instances of the listing-card component based on data from the database. 

### Listing-Card:
This component contains a Bootstrap card that is populated with data from the database, representing a single listing. The data is stored within a listing-model service.

### Renter-view:
This page is where users can create new listings, upload images, and view offers from users.

### Message-box:
This represents a message sent, either from a renter or to a renter.

### Profile:
This represents the user's profile, which is not complete due to time issues.

### path-error-page: 
This is a 404 page for users who manage to get themselves lost
 
