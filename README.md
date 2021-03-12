# Health_Guardians
 An app that automates the entire process and reduces the time of reaching of medical help.
 It vanishes the need for medical call agents and reduces the medical help reach time by directly connecting the person in need to the hospital's ambulance crew.
 
## Built Using:
* Node.js
* Express.js
* EJS
* ES6 JS
* Socket.io
* WebRTC
* Notivize
* Mapbox

## Functions:

* A Web infrastructure that detects critical patient's locations automatically and identifies the closest hospitals with distance algorithm. 
* After the patient selects one of the nearby hospitals, it automatically sends an email to that hospital using Notivize API.
* Email contains a google coordinate location of the patient and a web link that allows the patient and the Crew to communicate live with each other by video conferencing using Web Sockets.
* Even if the critical patient has difficulty in communication, the web link contains the fastest route to real-time location of the patient using Google Maps.
* The patient can also see the real-time location of the ambulance.
* The location of the users and the ambulance will be monitored by the hospital from the third connection to the socket

## Installation and Running

### Get a Mapbox Token and add it to <Your Mapbox Token>

#### In First Terminal
* npm i 
* npm run devStart

#### In Second Terminal
* peerjs --port 3001

#### Application will run on localhost with a 'Unique' User Id for each Socket.


