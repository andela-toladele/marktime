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

$('#signInModal').on('hidden.bs.modal', function (e) {
  document.getElementById('login').style.display = "block";
	document.getElementById('guestlogin').style.display = "none";
	document.getElementById('askguest').style.display = "block";
	document.getElementById('guestback').style.display = "none";
	document.getElementById("loginForm").reset();
	document.getElementById("guestloginForm").reset();
});


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


//User Sign In
document.getElementById('signin').onclick = function() {
	event.preventDefault();
	var useremail = document.getElementById('useremail').value;
	var password = document.getElementById('password').value;
	var currentuser = null ;

//Search for the currect user's data
	for (i=0;i<database.length;i++) {
		if (useremail == database[i].email && password == database[i].password) {
			currentuser = database[i];
		}
	}

//Function to get the right response
	var getOutput = function () {
		if (currentuser == null) {
			outputresult = "<h2>Sorry, user not found. Please try again or sign in as a guest</h2>";  //If user could not be found
		}

		else if (currentuser.status == "Present" && currentuser.latestStateChangeDay == mytime.getDate()) {
				outputresult = "<h2>Hello " + currentuser.name + ". " + "You already signed in at " + currentuser.timein + "</h2>";					//If user has been present today
			}

			else {																		//First occurence of current user today
			now = new Date();
			currentuser.timein = now.getHours() + ":" + now.getMinutes();
			currentuser.latestStateChangeDay = mytime.getDate();
			currentuser.latestStateChange = currentuser.timein;
			currentuser.status = "Present";
			todaysRegister.push(currentuser);
			updateCounter();
			outputresult = "<h1> Welcome "+ currentuser.name +"</h1><h2> You signed in at " + currentuser.latestStateChange+ "</h2>";
			}
			return outputresult;
	}
		document.getElementById("output").innerHTML = getOutput();

	//Show confirmation modal
	$('#signInModal').modal('hide');
	$('#confirmModal').modal('show');

//Go back to signin on error
	document.getElementById('errorback').onclick = function() {
		$('#confirmModal').modal('hide');
		$('#signInModal').modal('show');
	};

};
//End of onclick sign in button

var checkPresence = function () {
		for (i=0;i<todaysRegister.length; i++) {
			if (currentuser.email == todaysRegister[i].email) {
				currentuser = todaysRegister[i];
				position = i;
				check = true;
			}
		}
		return check;
	}




//Guest Sign In
document.getElementById('guestsignin').onclick = function() {
	event.preventDefault();
	check = false;
	var guestname = document.getElementById('guestname').value;
	var guestemail = document.getElementById('guestemail').value;
	 currentuser = {};
	if (guestname == "" || guestemail == "") {
		document.getElementById("output").innerHTML = "<h2>Please input a valid name and email address</h2>";
	}
	
	else {
		currentuser.name = guestname;
		currentuser.email = guestemail;
	}
		checkPresence();
	if (check == true) {
		outputresult = "<h2>Hello " + currentuser.name + ". " + "You already signed in at " + currentuser.timein + "</h2>";
	}

	else {
			now = new Date();
			currentuser.type = "Guest";
			currentuser.latestStateChange = now.getHours() + ":" + now.getMinutes();
			currentuser.timein = currentuser.latestStateChange;
			currentuser.latestStateChangeDay = mytime.getDate();
			currentuser.status = "Present";
			todaysRegister.push(currentuser);
			updateCounter();
			outputresult = "<h1> Welcome "+ currentuser.name +"</h1><h2> You signed in at " + currentuser.timein + "</h2>";
	}
	document.getElementById("output").innerHTML = outputresult;

	//Show confirmation modal
	$('#signInModal').modal('hide');
	$('#confirmModal').modal('show');

//Go back to guest signin on error
	document.getElementById('errorback').onclick = function() {
		$('#confirmModal').modal('hide');
		$('#signInModal').modal('show');
		document.getElementById('login').style.display = "none";
	document.getElementById('guestlogin').style.display = "block";
	document.getElementById('askguest').style.display = "none";
	document.getElementById('guestback').style.display = "block";
	};
};


//Sign Out
document.getElementById('signout').onclick = function() {
	event.preventDefault();
	var outemail = document.getElementById('outemail').value;
	currentuser = {};
	currentuser.email = outemail;
	check = false;
	checkPresence();
	if (check == true) {
			now = new Date();
			currentuser.status = "Absent";
			currentuser.timeout = now.getHours() + ":" + now.getMinutes();
			currentuser.latestStateChangeDay = mytime.getDate();
			currentuser.latestStateChange = currentuser.timeout;
			decreaseCounter();
			outputresult = "<h2>Goodbye, " + currentuser.name + ". " + "You have successfully signed out.</h2>";
			}
		else {
			outputresult = "<h2>Sorry, you have not signed in today. Please sign in and try again</h2>";
		}

		document.getElementById("output").innerHTML = outputresult;

	//Show confirmation modal
		$('#signOutModal').modal('hide');
		$('#confirmModal').modal('show');

};




document.getElementById('viewtoday').onclick = function() {
		var register = "";
		for (i=0;i<todaysRegister.length;i++) {
			if (todaysRegister[i].timeout == undefined) {
				todaysRegister[i].timeout = "Present";
			}
			register = register + "<tr>" + "<td>" + todaysRegister[i].name + "</td>" + "<td>" + todaysRegister[i].timein + "</td>"+ "<td>" + todaysRegister[i].timeout + "</td>" + "<td>" + todaysRegister[i].type + "</td>" + "</tr>";
		} 
		document.getElementById("todaysregister").innerHTML = "";     //Clear initial register
		document.getElementById("todaysregister").innerHTML = register;
	};






