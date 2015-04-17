//Current date
var mytime = new Date ();

var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var thisday = weekdays[mytime.getDay()];
var thismonth = months[mytime.getMonth()];
var today = thisday + ", "+ thismonth + " " + mytime.getDate() + ", " + mytime.getFullYear();
document.getElementById("todaysdate").innerHTML = today;
document.getElementById("todaysdate2").innerHTML = today;  //date in array


//Current time
var myVar = setInterval(function(){ myTimer(); }, 1000);

function myTimer() {
  var d = new Date();
  var t = d.toLocaleTimeString();
  document.getElementById("currenttime").innerHTML = "<h1>" + t + "</h1>";
}

//Set company name
document.getElementById("companyname").innerHTML = "Andela";


//Function to save to storage
var saveToStorage = function () {
  sessionStorage.setItem("todayscount", JSON.stringify(count));
  sessionStorage.setItem("todaysarray", JSON.stringify(todaysRegister));
  sessionStorage.setItem("allEmployees", JSON.stringify(database));
};

//Function to retrieve from storage
var getFromStorage = function () {
  count = JSON.parse(sessionStorage.getItem ("todayscount"));
  todaysRegister = JSON.parse(sessionStorage.getItem ("todaysarray"));
  database = JSON.parse(sessionStorage.getItem ("allEmployees"));
  return [count, todaysRegister, database];
}

//An array for today's register
var todaysRegister;

//count on homepage
var count = getFromStorage()[0] || 0;


//Show count on load
var showCount = function () {
  if (count==1) {
    document.getElementById("counter").innerHTML = "<h4>" + count + " person is currently signed in</h4>";
  }

  else if (isNaN(count)) {
    document.getElementById("counter").innerHTML = "";
  }
  else {
    document.getElementById("counter").innerHTML = "<h4>" + count + " people are currently signed in</h4>";
  }
};
showCount();

var updateCounter = function () {
  count++;
  showCount();
};


var decreaseCounter = function () {
  count--;
  showCount();  
};

//Option to sign in as a guest
document.getElementById('guest').onclick = function() {
  document.getElementById('login').style.display = "none";
  document.getElementById('guestlogin').style.display = "block";
  document.getElementById('askguest').style.display = "none";
  document.getElementById('guestback').style.display = "block";
};

//Go back on cancel
document.getElementById('guestback').onclick = function() {
  document.getElementById('login').style.display = "block";
  document.getElementById('guestlogin').style.display = "none";
  document.getElementById('askguest').style.display = "block";
  document.getElementById('guestback').style.display = "none";
};




//Use constructor class
function user (name,email,password) {
  this.name = name;
  this.email = email;
  this.password = password;
  this.type = "Employee";
}

//List of users
var jide = new user("Jide Banks", "jide@andela.co", "jide", "080123456");
var musk = new user("Mr. Musk", "musk@andela.co", "musk", "080123456");
var ejiro = new user("Ejiro Winifred", "ejiro@andela.co", "ejiro", "080123456");


//An array for everybody
var database;

if (getFromStorage()[2] == null) {
  database = [jide,ejiro,musk];
}

else {
  database = [jide,ejiro,musk];
}

//My variables
var outputresult;
var outpass;
var outemail;
var check = false;
var currentuser;
var timein;
var currentuser = {};
var username;
var useremail;
var todaysname;
var allDays = new Object();
var register = "<thead><tr><th>Name</th><th>Time In</th><th>Time Out</th><th>Category</th></tr></thead><tbody>";
var timein = [];
var timeout = [];

//Function for empty fields
var emptyError = function () {
  outputresult = "<h2>Please fill the required fields</h2>";
  document.getElementById("output").innerHTML = outputresult;
};


//Function to check today's register
var checkPresence = function () {
  check = false;
  todaysRegister = getFromStorage()[1] || [];
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
};


//Function to search for the currect user's data with email & password
var checkDatabase = function () {
  if (getFromStorage()[2] == null) {
  database = [jide,ejiro,musk];
}

  for (i=0;i<database.length;i++) {
    if (useremail == database[i].email && password == database[i].password) {
      currentuser = database[i];
    }
  }
};


//Function to display error on incorrect data
var wrongInfoError = function () {
  outputresult = "<h3>User not found. Please input the correct email and password or sign in as a guest</h3>";
  document.getElementById("output").innerHTML = outputresult;
};


//Function to sign in
var signIn = function (type) {
  now = new Date();
  if (now.getHours() <10) {
    timein[0] = "0" + now.getHours();
  }

  else {
    timein[0] = now.getHours();
  }

  if (now.getMinutes() <10) {
    timein[1] = "0" + now.getHours();
  }

  else {
    timein[1] = now.getHours();
  }

  currentuser.timein = timein[0] + ":" + timein[1];
  currentuser.latestStateChangeDay = mytime.getDate();
  currentuser.latestStateChange = currentuser.timein;
  currentuser.status = "Present";

  if (type == "employee") {
    outputresult = "<h2> Welcome "+ currentuser.name +". </h2></br><h3> You signed in at " + currentuser.latestStateChange+ "</h3>";
    }

  else if (type == "guest") {
    currentuser.name = username;
    currentuser.email = useremail;
    currentuser.type = "Guest";
    currentuser.password = Math.floor(Math.random() * 10000);
    outputresult = "<h2> Welcome "+ currentuser.name +". </h2></br><h3> You signed in at " + currentuser.timein + "</br>Your passcode is <b>" + currentuser.password + "</b>. Please record this number as you will need it to sign out</h3>";
  }
  currentuser.usercount++;
  todaysRegister.push(currentuser);
  updateCounter();
  saveToStorage();
  document.getElementById("output").innerHTML = outputresult;
};


//Function to sign out
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

  if (now.getHours() <10) {
    timeout[0] = "0" + now.getHours();
  }

  else {
    timeout[0] = now.getHours();
  }

  if (now.getMinutes() <10) {
    timeout[1] = "0" + now.getHours();
  }

  else {
    timeout[1] = now.getHours();
  }

  currentuser.timeout = timeout[0] + ":" + timeout[1];
  currentuser.latestStateChangeDay = mytime.getDate();
  currentuser.latestStateChange = currentuser.timeout;
  decreaseCounter();
  outputresult = "<h2>Goodbye, " + currentuser.name + ". " + "</h2></br><h3>You have successfully signed out.</h3>";

  saveToStorage();

  document.getElementById("output").innerHTML = outputresult;
};


//User Sign in
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
          if (currentuser.password == password) {
          outputresult = "<h2>Hello " + currentuser.name + ". " + "</h2><h3>You already signed in at " + currentuser.timein + "</h3>";
          document.getElementById("loginForm").reset();
          document.getElementById("output").innerHTML = outputresult;
          $('#confirmModal').modal('show');
          }
          else {
            wrongInfoError();
          }
        }

        else {
          signIn("employee");
          document.getElementById("loginForm").reset();
        }  
      }

      else {
        wrongInfoError();
      }
    }

    else {
      emptyError();
    }

    $('#confirmModal').modal('show');
};

//User sign out
document.getElementById('signout').onclick = function() {
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
          document.getElementById("loginForm").reset();
        }

        else {
          outputresult = "<h3>You have not signed in today. Please sign in first.";
          document.getElementById("loginForm").reset();
        document.getElementById("output").innerHTML = outputresult;
        $('#confirmModal').modal('show');
        }
      }

      else {
        wrongInfoError();
      }
    }

    else {
      emptyError();
    }

    $('#confirmModal').modal('show');
};


//Guest Sign in
document.getElementById('guestsignin').onclick = function() {
  event.preventDefault();
  username = document.getElementById('guestname').value;
  useremail = document.getElementById('guestemail').value;
  currentuser = {};
  if (useremail != "" && password != "") {
    checkPresence(); 
    if (check == true) {
      outputresult = "<h2>Hello " + currentuser.name + ". " + "</h2><h3>You already signed in at " + currentuser.timein + "</h3>";
      document.getElementById("guestloginForm").reset();
      document.getElementById("output").innerHTML = outputresult;
      $('#confirmModal').modal('show');
    }

    else {
      signIn("guest");
      document.getElementById("guestloginForm").reset();
      $('#confirmModal').modal('show');
    }  
  }
  else {
    emptyError();
  }
};

//Guest Sign out
document.getElementById('guestsignout').onclick = function() {
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
          document.getElementById("guestloginForm").reset();
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

    else {
      outputresult = "<h3>You have not signed in today. Please sign in first.";
      document.getElementById("guestloginForm").reset();
      document.getElementById("output").innerHTML = outputresult;
      $('#confirmModal').modal('show');
    }  
  }
  else {
    emptyError();
  }
};


//Populate register
var displayRegister = function () {
  register = "";
  for (i=0;i<todaysRegister.length;i++) {
    if (todaysRegister[i].timeout == undefined) {
      todaysRegister[i].timeout = "Present";
    }
    register += "<tr>" + "<td>" + todaysRegister[i].name + "</td>" + "<td>" + todaysRegister[i].timein + "</td>"+ "<td>" + todaysRegister[i].timeout + "</td>" + "<td>" + todaysRegister[i].type + "</td>" + "</tr></tbody>";
    }

  document.getElementById("todaysregister").innerHTML = "";     //Clear initial register
  document.getElementById("todaysregister").innerHTML = register;
};

document.getElementById('viewregister').onclick = function() { 
  displayRegister();
}


//Admin
document.getElementById('add').onclick = function() {
  document.getElementById('adminlist').style.display = "none";
  document.getElementById('addemployee').style.display = "block";
}

document.getElementById('addback').onclick = function() {
  document.getElementById('adminlist').style.display = "block";
  document.getElementById('addemployee').style.display = "none";
}


document.getElementById('remove').onclick = function() {
  document.getElementById('adminlist').style.display = "none";
  document.getElementById('removeemployee').style.display = "block";
}

document.getElementById('removeback').onclick = function() {
  document.getElementById('adminlist').style.display = "block";
  document.getElementById('removeemployee').style.display = "none";
}

document.getElementById('clear').onclick = function() {
  sessionStorage.clear();
  window.location.reload(true);
}



//On add employee
document.getElementById('addnow').onclick = function() {
  event.preventDefault();
  employeename = document.getElementById('employeename').value;
  employeeemail = document.getElementById('employeeemail').value;
  employeepass = document.getElementById('employeepass').value;

  objname = employeename;       

  objname = new user (employeename,employeeemail,employeepass);

  database.push(objname);
  outputresult = "<h3> User successfully added.</h3>";
  saveToStorage();
  document.getElementById("output").innerHTML = outputresult;
  $('#adminModal').modal('hide');
  $('#confirmModal').modal('show');

  document.getElementById('adminlist').style.display = "block";
  document.getElementById('addemployee').style.display = "none";
};

//On remove employee
document.getElementById('removenow').onclick = function() {
  event.preventDefault();
  removeemail = document.getElementById('employeeemailremove').value;

  for (i=0; i<database.length; i++) {
    if (removeemail == database[i].email) {
      database[i] = currentuser;
      position = i;
    }
  }

  database.splice(position, 1);
  outputresult = "<h3> User successfully removed.</h3>";
  saveToStorage();
  document.getElementById("output").innerHTML = outputresult;
  $('#adminModal').modal('hide');
  $('#confirmModal').modal('show');

  document.getElementById('adminlist').style.display = "block";
  document.getElementById('removeemployee').style.display = "none";
};