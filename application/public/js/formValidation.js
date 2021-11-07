

var userNameInput = document.getElementById("userName");
var passwordInput = document.getElementById("password");
var passwordValidInput = document.getElementById("conPass");
var emailValidInput = document.getElementById("email")
var combTrue = true;

userNameInput.onfocus = function() {                                                            // username validation
   document.getElementById("userNameMessage").style.display = "block";
}

userNameInput.onblur = function() {
    document.getElementById("userNameMessage").style.display = "none";
}

userNameInput.onkeyup = function() {                                                            
    if(userNameInput.value.charAt(0) >= 'a' && userNameInput.value.charAt(0) <= 'z') {          // check if first char is a letter
        uFirstLetter.classList.remove("invalid");
        uFirstLetter.classList.add("valid");
    } else {
        uFirstLetter.classList.remove("valid");
        uFirstLetter.classList.add("invalid");
    }

    var threeChar = /.{3,}/;                                                                    // check if longer than three char
    if(userNameInput.value.match(threeChar)) {
        uThreeChar.classList.remove("invalid");
        uThreeChar.classList.add("valid");
    } else {
        uThreeChar.classList.remove("valid");
        uThreeChar.classList.add("invalid");
    }

}

passwordInput.onfocus = function() {                                                            // password validation
    document.getElementById("passwordMessage").style.display = "block";
}
 
 passwordInput.onblur = function() {
     document.getElementById("passwordMessage").style.display = "none";
}
 
 passwordInput.onkeyup = function() {     

    var lowerCase = /[a-z]/g;                                                        
    if(passwordInput.value.match(lowerCase)) {                                                    // check if has lowercase letter
        pLower.classList.remove("invalid");
        pLower.classList.add("valid");
    } else {
        pLower.classList.remove("valid");
        pLower.classList.add("invalid");
    }

    var upperCase = /[A-Z]/g;                                                        
    if(passwordInput.value.match(upperCase)) {                                                      // check if has uppercase letter
        pCapital.classList.remove("invalid");
        pCapital.classList.add("valid");
    } else {
        pCapital.classList.remove("valid");
        pCapital.classList.add("invalid");
    }

    var numberValid = /[0-9]/g;                                                        
    if(passwordInput.value.match(numberValid)) {                                                      // check if has number
        pNumber.classList.remove("invalid");
        pNumber.classList.add("valid");
    } else {
        pNumber.classList.remove("valid");
        pNumber.classList.add("invalid");
    }

    var specialChar = /(?=.*[!-+/@#$%^&*])/;                                                        
    if(passwordInput.value.match(specialChar)) {                                                      // check if has special character 
        pSpecial.classList.remove("invalid");
        pSpecial.classList.add("valid");
    } else {
        pSpecial.classList.remove("valid");
        pSpecial.classList.add("invalid");
    }
 
    var eightChar = /.{8,}/;                                                                    // check if longer than eight char
    if(passwordInput.value.match(eightChar)) {
        pEightChar.classList.remove("invalid");
        pEightChar.classList.add("valid");
    } else {
        pEightChar.classList.remove("valid");
        pEightChar.classList.add("invalid");
    }

    if(passwordValidInput.value == passwordInput.value) {
        pValid.classList.remove("invalid");
        pValid.classList.add("valid");
    } else {
        pValid.classList.remove("valid");
        pValid.classList.add("invalid");
    }


}

passwordValidInput.onfocus = function() {                                                            // password confirmation
    document.getElementById("passwordValidMessage").style.display = "block";
}

passwordValidInput.onblur = function() {
     document.getElementById("passwordValidMessage").style.display = "none";
}

passwordValidInput.onkeyup = function() {
    if(passwordValidInput.value == passwordInput.value) {
        pValid.classList.remove("invalid");
        pValid.classList.add("valid");
    } else {
        pValid.classList.remove("valid");
        pValid.classList.add("invalid");
    }
}

emailValidInput.onfocus = function() {                                                            // email confirmation
    document.getElementById("emailValidMessage").style.display = "block";
}

emailValidInput.onblur = function() {
     document.getElementById("emailValidMessage").style.display = "none";
}

emailValidInput.onkeyup = function() {
    if(emailValidInput.value.match("[@]")) {
        eValid.classList.remove("invalid");
        eValid.classList.add("valid");
    } else {
        eValid.classList.remove("valid");
        eValid.classList.add("invalid");
    }
}

var submitInput = document.getElementById("submit");

document.getElementById("submit").onclick = function(event) {
    if(uThreeChar.classList.contains("invalid")||uFirstLetter.classList.contains("invalid")) {
        combTrue = false;
        alert("The username is invalid");
    } else if(!(pLower.classList.contains("valid")&&pCapital.classList.contains("valid")&&pEightChar.classList.contains("valid")&&pNumber.classList.contains("valid"))){
        combTrue = false;
        alert("The password is invalid");
    } else if(pValid.classList.contains("invalid")) {
        combTrue = false;
        alert("The passwords do not match");
    } else if(eValid.classList.contains("invalid")) {
        combTrue = false;
        alert("The email is invalid");
    } else {
        combTrue = true;
    }
    if(!combTrue) {
        event.preventDefault();
    }
}