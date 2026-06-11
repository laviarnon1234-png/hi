function login() {
    const inputUser = document.getElementById('user').value;
    const inputPassword = document.getElementById('password').value;
    const errorElement = document.getElementById('error-message'); 

    
    const usersList = JSON.parse(localStorage.getItem('allUsers')) || [];

    const userFound = usersList.find(u => u.username === inputUser && u.password === inputPassword);

    if (userFound) {
    errorElement.style.color = "lightgreen";
    errorElement.innerText = "...מתחבר 🚀";


    localStorage.setItem('currentUser', inputUser);

    setTimeout(() => {
        // מעבירים אותו לדף הבית של המחוברים (home2)!
        window.location.href = "home2.html"; 
    }, 1000);
}
      
     else {
        errorElement.style.color = "red";
        errorElement.innerText = "שם משתמש או סיסמה לא נכונים, נסה שוב";
    }
}