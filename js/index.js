let userNameInput = document.getElementById("username");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let confirmPasswordInput = document.getElementById("confirmPassword");
let registerForm = document.getElementById("registerForm");
let btnlog = document.getElementById("loginBtn"); 
let emailLogInput = document.getElementById("emaillog");
let passwordLogInput = document.getElementById("passwordlog");
let loginForm = document.getElementById("loginForm");

// Array Users
let Users = [];

// validateEmail
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}



// Function for registering new users
function UsersObj() {
  let storedUsers = JSON.parse(localStorage.getItem("u")) || [];
  Users = storedUsers;

  if (!validateEmail(emailInput.value)) {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: "يرجى إدخال بريد إلكتروني صالح.",
    });
    return;
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: "كلمة المرور غير متطابقة.",
    });
    return;
  }

  let existingUser = Users.find(user => user.email === emailInput.value);
  if (existingUser) {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: "البريد الإلكتروني مسجل مسبقًا!",
    });
    return;
  }

  let eUsers = {
    userName: userNameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  Users.push(eUsers);
  localStorage.setItem("u", JSON.stringify(Users));
  localStorage.setItem("currentUser", eUsers.userName);

  Swal.fire({
    icon: "success",
    title: "تم التسجيل بنجاح!",
    text: `مرحبًا بك ${eUsers.userName}!`,
  }).then(() => {
    window.location.href = "welcome.html";
  });

  console.log(Users);
}

document.getElementById("signup").addEventListener("click", function (Event){
  Event.preventDefault();
  UsersObj()
})
// Sign-up handler
function signUp(event) {
  event.preventDefault();
  UsersObj();
  clearForm();
}

// Clear form fields
function clearForm() {
  userNameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
}

// Function for logging in users
function logIn(finde, findP) {
  const storedUsers = JSON.parse(localStorage.getItem("u")) || [];
  Users = storedUsers;
  console.log("Users from localStorage:", Users);
  console.log("Input Email:", finde);
  console.log("Input Password:", findP);



  if (!validateEmail(finde)) {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: "يرجى إدخال بريد إلكتروني صالح.",
    });
    return;
  }

  let userFound = false;

  for (let i = 0; i < Users.length; i++) {
    if (Users[i].email.toLowerCase() === finde.toLowerCase() && Users[i].password === findP) {
      userFound = true;
    }
     {
      userFound = true;

      localStorage.setItem("currentUser", Users[i].userName);

      Swal.fire({
        position: "center",
        icon: "success",
        title: `مرحبًا ${Users[i].userName}!`,
        text: "تم تسجيل الدخول بنجاح.",
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        window.location.href = "welcome.html";
      });

      break;
    }
  }

  if (!userFound) {
    Swal.fire({
      icon: "error",
      title: "خطأ",
      text: "البريد الإلكتروني أو كلمة المرور غير صحيحة!",
    });
  }
}

function logOut() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("u"); 

  Swal.fire({
    icon: "success",
    title: "تم تسجيل الخروج بنجاح!",
    text: "تم تسجيل الخروج، سيتم إعادة توجيهك إلى صفحة تسجيل الدخول.",
    showConfirmButton: true,
  }).then(() => {
    window.location.href = "index.html";
  });
}

// document.getElementById("logoutBtn").addEventListener("click", logOut);






// Add login event listener
// document.getElementById("btnlog").addEventListener("click", function (event) {
//   event.preventDefault();

//   const finde = emailLogInput.value.trim(); // Email from input
//   const findP = passwordLogInput.value.trim(); // Password from input

//   if (!finde || !findP) {
//     Swal.fire({
//       icon: "error",
//       title: "خطأ",
//       text: "يرجى ملء جميع الحقول!",
//       showConfirmButton: true,
//       allowOutsideClick: false,
//       allowEscapeKey: false,
//     });
//     return;
//   }

//   logIn(finde, findP);
// });

// function loginUser(userCredentials) {
//   const { email, password } = userCredentials;
//   const user = Users.find(user => user.email === email);

//   if (!user) {
//     Swal.fire({
//       icon: 'error',
//       title: 'خطأ',
//       text: 'الإيميل غير موجود!',
//     });
//     return; 
//   }

//   if (user.password !== password) {
//     Swal.fire({
//       icon: 'error',
//       title: 'خطأ',
//       text: 'كلمة المرور غير صحيحة!',
//     });
//     return; 
//   }

//   localStorage.setItem("loggedInUser", JSON.stringify(user));
//   Swal.fire({
//     icon: 'success',
//     title: 'تم تسجيل الدخول بنجاح!',
//     text: `مرحبًا بك ${user.userName}!`,
//   }).then(() => {
//     location.replace('welcome.html'); 
//   });
// }

// btnlog.addEventListener("click", function (event) {
//   event.preventDefault(); 

//   if (!emailLogInput.value || !passwordLogInput.value) {
//     Swal.fire({
//       icon: 'error',
//       title: 'خطأ',
//       text: 'يجب إدخال البريد الإلكتروني وكلمة المرور!',
//     });
//     return;
//   }

//   const userCredentials = {
//     email: emailLogInput.value,
//     password: passwordLogInput.value
//   };

//   loginUser(userCredentials);
// });


// btnlog.addEventListener("click", function () {
//   console.log("Button clicked!");
// });


// function loginUser(eUsers) {



//   const { email, password } = userCredentials;
//   const user = Users.find(user => user.email === email);
  
//   if (!user) {
//     Swal.fire({
//       icon: 'error',
//       title: 'خطأ',
//       text: 'الإيميل غير موجود!',
//     });
//     return;
//   }
  
//   if (user.password !== password) {
//     Swal.fire({
//       icon: 'error',
//       title: 'خطأ',
//       text: 'كلمة المرور غير صحيحة!',
//     });
//     return;
//   }
  
//   localStorage.setItem("loggedInUser", JSON.stringify(user));
  
//   Swal.fire({
//     icon: 'success',
//     title: 'تم تسجيل الدخول بنجاح!',
//     text: `مرحبًا بك ${user.userName}!`,
//   }).then(() => {
//     location.replace('welcome.html'); 
//   });
// };




// function loginUser(userCredentials) {
//   const { email, password } = userCredentials;

//   const user = Users.find(user => user.email === email);

//   if (!user) {
//     Swal.fire({
//       icon: 'error',
//       title: 'خطأ',
//       text: 'الإيميل غير موجود!',
//     });
//     return;
//   }

//   if (user.password !== password) {
//     Swal.fire({
//       icon: 'error',
//       title: 'خطأ',
//       text: 'كلمة المرور غير صحيحة!',
//     });
//     return;
//   }

// localStorage.setItem("loggedInUser", JSON.stringify(user));

//   Swal.fire({
//     icon: 'success',
//     title: 'تم تسجيل الدخول بنجاح!',
//     text: `مرحبًا بك ${user.userName}!`,
//   }).then(() => {
//     location.replace('welcome.html'); 
//   });
// }




// btnlog.addEventListener("click", function (event) {
//   event.preventDefault(); 

//   const userCredentials = {
//     email: emailLogInput.value,
//     password: passwordLogInput.value
//   };

//   loginUser(userCredentials); 
// });

