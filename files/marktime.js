document.getElementById('guest').onclick = function() {
	document.getElementById('login').style.display = "none";
	document.getElementById('guestlogin').style.display = "block";
	document.getElementById('askguest').style.display = "none";
	document.getElementById('guestback').style.display = "block";
};

document.getElementById('guestback').onclick = function() {
	document.getElementById('login').style.display = "block";
	document.getElementById('guestlogin').style.display = "none";
	document.getElementById('askguest').style.display = "block";
	document.getElementById('guestback').style.display = "none";
};

$('#signInModal').on('hidden.bs.modal', function (e) {
  document.getElementById('login').style.display = "block";
	document.getElementById('guestlogin').style.display = "none";
	document.getElementById('askguest').style.display = "block";
	document.getElementById('guestback').style.display = "none";
	document.getElementById("loginForm").reset();
	document.getElementById("guestloginForm").reset();
});


//Class of one user
function user (name,email,password,phone) {
	this.name = name;
	this.email = email;
	this.password = password;
	this.phone = phone;
}

var jide = new user("Jide Banks", "jide@andela.co", "jide", "080123456");
var musk = new user("Mr. Musk", "musk@andela.co", "musk", "080123456");
var ejiro = new user("Ejiro Winifred", "ejiro@andela.co", "ejiro", "080123456");


//An array for everybody
var database = [jide,ejiro,musk];

document.getElementById('signin').onclick = function() {
	event.preventDefault();
	var useremail = document.getElementById('useremail').value;
	var password = document.getElementById('password').value;
	var username;

	for (i=0;i<database.length;i++) {
		if (useremail == database[i].email && password == database[i].password) {
			username = database[i].name;
		}
	};

	$('#myModal').modal('hide');
	$('#myModal').on('hidden', function () {
	  // Load up a new modal...
	  $('#myModalNew').modal('show')
	})


	if (username == null) {
		console.log("Sorry, user not found. Please try again or sign in as a guest");
	}
	else console.log("Welcome " + username);




};

document.getElementById('guestsignin').onclick = function() {
	var guestname = document.getElementById('guestname').value;
	var guestemail = document.getElementById('guestemail').value;
};
