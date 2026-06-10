function signup() {
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
   const errorElement = document.getElementById('error-message');
    
    if (!user || !password || !confirmPassword) {
        showMessage('נא למלא את כל השדות');
        return;
    }

    if (password !== confirmPassword) {
       errorElement.innerText="הסיסמאות אינן תואמות"; 
        return;
     } else if (password.length < 6) {
        errorElement.innerText="הסיסמה חייבת להיות לפחות 6 תווים"; 
        return;
    } else {
        let usersList = JSON.parse(localStorage.getItem('allUsers')) || [];
        const isUserExists = usersList.some(u => u.username === user);

        if (isUserExists) {
            errorElement.innerText="שם המשתמש כבר קיים. אנא בחר שם אחר"; 
            return;
        } else {
            usersList.push({ username: user, password: password });
            localStorage.setItem('allUsers', JSON.stringify(usersList));
            
            
              errorElement.innerText="ההרשמה הצליחה! מעביר להתחברות...";
            
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        }
    }
}