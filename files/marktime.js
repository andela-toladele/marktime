//Set company name
document.getElementById("companyname").innerHTML = "Andela"; 
	mytime = new Date ();
//Set the current date
	weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	thisday = weekdays[mytime.getDay()];
	thismonth = months[mytime.getMonth()];
	today = thisday + ", "+ thismonth + " " + mytime.getDate() + ", " + mytime.getFullYear();
	document.getElementById("todaysdate").innerHTML = today;
document.getElementById("todaysdate2").innerHTML = today;
//Currenttime

var myVar = setInterval(function(){ myTimer() }, 1000);

function myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    document.getElementById("currenttime").innerHTML = "<h1>" + t + "</h1>";
}


//count
count = 0;
var updateCounter = function () {
	count++;
	if (count==1) {
		document.getElementById("counter").innerHTML = "<h4>" + count + " person currently signed in</h4>";
	}
	else
document.getElementById("counter").innerHTML = "<h4>" + count + " people currently signed in</h4>";
};


var decreaseCounter = function () {
	count--;
	if (count==1) {
		document.getElementById("counter").innerHTML = "<h4>" + count + " person currently signed in</h4>";
	}
	else
document.getElementById("counter").innerHTML = "<h4>" + count + " people currently signed in</h4>";
};

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


//An array for today's signers
var todaysRegister = [];


//Class of one user
function user (name,email,password,phone) {
	this.name = name;
	this.email = email;
	this.password = password;
	this.phone = phone;
	this.type = "Employee";
}

//List of users
var jide = new user("Jide Banks", "jide@andela.co", "jide", "080123456");
var musk = new user("Mr. Musk", "musk@andela.co", "musk", "080123456");
var ejiro = new user("Ejiro Winifred", "ejiro@andela.co", "ejiro", "080123456");


//An array for everybody
var database = [jide,ejiro,musk];

var outputresult;
var outpass;
var outemail;
var check = false;
var currentuser;
var timein;
var currentuser = {};
var username;
var useremail;

//NEW CODE
var emptyError = function () {
	outputresult = "<h2>Please fill the required fields</h2>";
	document.getElementById("output").innerHTML = outputresult;
};

//Function to check today's register
var checkPresence = function () {
		for (i=0;i<todaysRegister.length; i++) {
			if (useremail == todaysRegister[i].email) {
				currentuser = todaysRegister[i];
				position = i;
				check = true;
			}
		}
		if (outpass == currentuser.password) {
			correctPass = true;
			}
		return check;
	}

//Function to search for the currect user's data with email & password
var checkDatabase = function () {
	for (i=0;i<database.length;i++) {
		if (useremail == database[i].email && password == database[i].password) {
			currentuser = database[i];
		}
	}
};

var wrongInfoError = function () {
	outputresult = "<h3>User not found. Please input the correct email and password or sign in as a guest</h3>";
	document.getElementById("output").innerHTML = outputresult;
};

var signIn = function (type) {
	if (type == "employee") {
			now = new Date();
			currentuser.timein = now.getHours() + ":" + now.getMinutes();
			currentuser.latestStateChangeDay = mytime.getDate();
			currentuser.latestStateChange = currentuser.timein;
			currentuser.status = "Present";
			todaysRegister.push(currentuser);
			updateCounter();
			outputresult = "<h1> Welcome "+ currentuser.name +"</h1><h2> You signed in at " + currentuser.latestStateChange+ "</h2>";
		}

		else if (type == "guest") {
			currentuser.name = username;
			currentuser.email = useremail;
			now = new Date();
			currentuser.type = "Guest";
			currentuser.latestStateChange = now.getHours() + ":" + now.getMinutes();
			currentuser.timein = currentuser.latestStateChange;
			currentuser.latestStateChangeDay = mytime.getDate();
			currentuser.status = "Present";
			currentuser.password = Math.floor(Math.random() * 10000);
			todaysRegister.push(currentuser);
			updateCounter();
			outputresult = "<h1> Welcome "+ currentuser.name +"</h1><h2> You signed in at " + currentuser.timein + "</br>Your passcode is <b>" + currentuser.password + "</b>. Please record this number as you will need it to sign out</h2>";
	}
		document.getElementById("output").innerHTML = outputresult;

};

var signOut = function (type) {
	if (type == "guest") {
		outemail = useremail;
		outpass = document.getElementById('guestcode').value;
	}
	else if (type == "employee") {
	outemail = document.getElementById('useremail').value;
	outpass = document.getElementById('password').value;
	}
	currentuser = {};
	currentuser.email = outemail;
	check = false;
	correctPass = false;
	checkPresence();
			now = new Date();
			currentuser.status = "Absent";
			currentuser.timeout = now.getHours() + ":" + now.getMinutes();
			currentuser.latestStateChangeDay = mytime.getDate();
			currentuser.latestStateChange = currentuser.timeout;
			decreaseCounter();
			outputresult = "<h2>Goodbye, " + currentuser.name + ". " + "You have successfully signed out.</h2>";

		document.getElementById("output").innerHTML = outputresult;
};




document.getElementById('signin').onclick = function() {
event.preventDefault();
	useremail = document.getElementById('useremail').value;
	password = document.getElementById('password').value;
	currentuser = {};
		if (useremail != "" && password != "") {
			checkDatabase();
			if (currentuser.email != undefined) {
				checkPresence(); 
				if (check == true) {
				signOut("employee");
				}

				else {
					signIn("employee");
				}  //searches for currentuser in todaysRegister
			}

		else {
			wrongInfoError();
		}

		}

		else  emptyError(); //searches for user in database and assigns currentuser if email & password are found else it stays as null


		$('#confirmModal').modal('show');
};



//Guests
document.getElementById('guestsignin').onclick = function() {
event.preventDefault();
	username = document.getElementById('guestname').value;
	useremail = document.getElementById('guestemail').value;
	currentuser = {};
if (useremail != "" && password != "") {
				checkPresence(); 
				if (check == true) {
					$('#passcodeModal').modal('show');
					document.getElementById('guestcodeconfirm').onclick = function() {
						event.preventDefault();
						outpass = document.getElementById('guestcode').value;
						if (outpass == currentuser.password) {
							signOut("guest");
							$('#passcodeModal').modal('hide');
						$('#confirmModal').modal('show');
						}
						else {
							$('#passcodeModal').modal('hide');
							wrongInfoError();
							$('#confirmModal').modal('show');
						}
					}
				}
				else if (check == false) {
					signIn("guest");
					$('#confirmModal').modal('show');
				}  
			}
		else  emptyError(); 

	
};






document.getElementById('viewregister').onclick = function() {
		var register = "<thead><tr><th>Name</th><th>Time In</th><th>Time Out</th><th>Category</th></tr></thead><tbody>";
		for (i=0;i<todaysRegister.length;i++) {
			if (todaysRegister[i].timeout == undefined || todaysRegister[i].timeout == "Present") {
				todaysRegister[i].timeout = "Present";
				register = register + "<tr>" + "<td>" + todaysRegister[i].name + "</td>" + "<td>" + todaysRegister[i].timein + "</td>"+ "<td>" + todaysRegister[i].timeout + "</td>" + "<td>" + todaysRegister[i].type + "</td>" + "</tr></tbody>";
			}
			else 
			register = register + "<tr  class='danger'>" + "<td>" + todaysRegister[i].name + "</td>" + "<td>" + todaysRegister[i].timein + "</td>"+ "<td>" + todaysRegister[i].timeout + "</td>" + "<td>" + todaysRegister[i].type + "</td>" + "</tr></tbody>";
		} 
		document.getElementById("todaysregister").innerHTML = "";     //Clear initial register
		document.getElementById("todaysregister").innerHTML = register;
	};