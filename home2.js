document.addEventListener('DOMContentLoaded', () => {

    const loggedInUser = localStorage.getItem('currentUser');

    

    
    const usernamePlaceholder = document.getElementById('username-placeholder');
    if (usernamePlaceholder) {
        usernamePlaceholder.textContent = loggedInUser;
    }


    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault(); 
            
      
            localStorage.removeItem('currentUser');
            
          
            window.location.href = 'home.html';
        });
    }
});
