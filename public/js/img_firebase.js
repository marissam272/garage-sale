$(document).ready(function(){
	//FIREBASE=========================================================
	var config = {
        apiKey: "AIzaSyDDT8K7hsQWz-j34R93v-2TpjR1LrgpoTA",
        authDomain: "mebay-24213.firebaseapp.com",
        databaseURL: "https://mebay-24213.firebaseio.com",
        projectId: "mebay-24213",
        storageBucket: "mebay-24213.appspot.com",
        messagingSenderId: "907993179232"
	  };
    firebase.initializeApp(config);
	//VARIABLES=========================================================
    var database = firebase.database();
    var storage = firebase.storage();
    // Create a root reference
    var storageRef = firebase.storage().ref();
    
$("#upload").on("click", function() {

var file = document.querySelector('#photo').files[0]; // use the Blob or File API
console.log(file);
var name = file.name;
var name = (+new Date()) + '-' + file.name;
var metadata = { contentType: file.type };
var task = ref.child(name).put(file, metadata);
// Pause the upload
task.pause();

// Resume the upload
task.resume();

// Cancel the upload
task.cancel();
task
  .then(snapshot => snapshot.ref.getDownloadURL())
  .then(url => console.log(url))

// ref.put(file).then(function(snapshot) {
//   console.log('Uploaded a blob or file!');
// });

});
});
