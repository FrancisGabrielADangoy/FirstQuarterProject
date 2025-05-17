window.onload = function() {
  if (document.getElementById('profileName')) {
    showProfileData();
  }

  var signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.onsubmit = handleSignup;
  }
};

function handleSignup(event) {
  event.preventDefault();

  var firstName = document.getElementById('firstName').value.trim();
  var lastName = document.getElementById('lastName').value.trim();
  var sex = document.querySelector('input[name="sex"]:checked');
  var email = document.getElementById('email').value.trim();
  var password = document.getElementById('password').value.trim();
  var supportReason = document.getElementById('supportReason').value.trim();

  var errorElements = document.querySelectorAll('.error');
  for (var i = 0; i < errorElements.length; i++) {
    errorElements[i].textContent = '';
  }

  var hasErrors = false;
  
  if (!firstName) {
    document.getElementById('firstNameError').textContent = 'required';
    hasErrors = true;
  }
  
  if (!lastName) {
    document.getElementById('lastNameError').textContent = 'required';
    hasErrors = true;
  }
  
  if (!sex) {
    document.getElementById('sexError').textContent = 'required';
    hasErrors = true;
  }
  
  if (!email) {
    document.getElementById('emailError').textContent = 'required';
    hasErrors = true;
  } else if (!email.includes('@') || !email.includes('.')) {
    document.getElementById('emailError').textContent = 'invalid email';
    hasErrors = true;
  }
  
  if (!password) {
    document.getElementById('passwordError').textContent = 'required';
    hasErrors = true;
  }
  
  if (!supportReason) {
    document.getElementById('supportReasonError').textContent = 'required';
    hasErrors = true;
  }

  if (!hasErrors) {
    var userData = {
      firstName: firstName,
      lastName: lastName,
      sex: sex.value,
      email: email,
      supportReason: supportReason
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    window.location.href = 'proj_profile.html';
  }
}

function showProfileData() {
  var savedData = localStorage.getItem('userData');
  
  if (savedData) {
    var userData = JSON.parse(savedData);
    
    document.getElementById('profileName').textContent = 
      userData.firstName + ' ' + userData.lastName;
    document.getElementById('profileEmail').textContent = userData.email;
    document.getElementById('profileSex').textContent = userData.sex;
    document.getElementById('profileSupportReason').textContent = 
      userData.supportReason;
  } else {
    window.location.href = 'proj_signup.html';
  }
}