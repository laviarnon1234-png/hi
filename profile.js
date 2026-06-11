document.addEventListener('DOMContentLoaded', () => {
    const myItemsContainer = document.getElementById('myItemsContainer');

    function createItemCard(item) {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <div class="price">מחיר פתיחה: ₪${item.price}</div>
            <div class="desc">${item.description ? item.description : 'אין תיאור לחפץ זה.'}</div>
        `;
        myItemsContainer.appendChild(card);
    }

    async function loadMyItems() {
     let currentUser = localStorage.getItem('currentUser') || localStorage.getItem('currentuser');
    if (currentUser) {
        currentUser = currentUser.replace(/^["']|["']$/g, '');
    }
        console.log("משתמש נוכחי בפרופיל:", currentUser);

        if (!currentUser) {
            if (myItemsContainer) {
                myItemsContainer.innerHTML = '<p>אנא <a href="login.html">התחבר למערכת</a> כדי לצפות בחפצים שפורסמו</p>';
            }
            return;
        }

        try {
            // התיקון: שולחים את המשתמש תחת הפרמטר email שהשרת מצפה לו!
            const response = await fetch(`/api/items?email=${encodeURIComponent(currentUser)}`); 
            const items = await response.json();

            if (myItemsContainer) {
                myItemsContainer.innerHTML = ''; 

                if (items.length === 0) {
                    myItemsContainer.innerHTML = `<p>שלום ${currentUser}, עדיין לא פורסם שום חפץ באתר</p>`;
                    return;
                }

                items.forEach(item => {
                    createItemCard(item);
                });
            }
        } catch (error) {
            console.error('שגיאה בטעינת החפצים:', error);
            if (myItemsContainer) {
                myItemsContainer.innerHTML = '<p>שגיאה בטעינת המידע מהשרת.</p>';
            }
        }
    }

    loadMyItems();
});