document.getElementById('addItemForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;

    // 1. שליפת המשתמש המחובר מהדפדפן וניקוי גרשיים
    let currentUser = localStorage.getItem('currentUser') || localStorage.getItem('currentuser');
    if (currentUser) {
        currentUser = currentUser.replace(/^["']|["']$/g, '');
    }

    // הגנה: אם המשתמש לא מחובר, לא נותנים לו להוסיף חפץ
    if (!currentUser) {
        alert('אינך מחובר! אנא התחבר כדי לפרסם חפץ.');
        window.location.href = 'login.html';
        return;
    }

    try {
        // 2. שליחת הנתונים לשרת
        const response = await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                price: price,
                description: description,
                user_email: currentUser // <--- זה החלק הכי חשוב! שולח את יוסי או אר לשרת
            })
        });

        if (response.ok) {
            alert('החפץ פורסם בהצלחה!');
            window.location.href = 'profile.html'; // מעביר ישירות לאזור האישי
        } else {
            const errorData = await response.json();
            alert('שגיאה בפרסום החפץ: ' + errorData.error);
        }

    } catch (error) {
        console.error('שגיאה בתקשורת עם השרת:', error);
        alert('שגיאה בחיבור לשרת.');
    }
});