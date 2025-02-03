document.addEventListener("DOMContentLoaded", function() {
    // Настройка задержек для всех элементов с классом fade-in
    const fadeElements = document.querySelectorAll('.fade-in-left,.fade-in,.fade-in-right');
    fadeElements.forEach((el, index) => {
        el.style.setProperty('--i', index + 1);
    });

    // Обратный отсчет до свадьбы
    const weddingDate = new Date("August 29, 2025 12:00:00").getTime();
    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = "Свадьба уже состоялась!";
        }
    }, 1000);
});
function toggleGuestField(show) {
    const guestField = document.getElementById('guest_name_field');
    if (show) {
        guestField.style.display = 'block';
    } else {
        guestField.style.display = 'none';
    }
}

document.getElementById('weddingForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Останавливаем стандартную отправку формы

    // Собираем данные формы
    const formData = new FormData(this);

    // Отправляем данные на сервер
    fetch('send_to_telegram.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text()) // Обрабатываем ответ от сервера
    .then(data => {
        console.log('Успешно отправлено:', data);
        alert('Ваша форма успешно отправлена!'); // Уведомление пользователю
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке формы.'); // Уведомление об ошибке
    });
});

document.getElementById('weddingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Собираем данные формы
    const formData = {
        name: document.getElementById('name').value,
        with_guest: document.querySelector('input[name="with_guest"]:checked').value,
        guest_name: document.getElementById('guest_name').value || 'Не указано',
        attendance: document.querySelector('input[name="attendance"]:checked').value,
        alcohol: Array.from(document.querySelectorAll('input[name="alcohol"]:checked'))
                   .map(checkbox => checkbox.value)
                   .join(', ') || 'Не указано'
    };

    // Формируем сообщение
    const message = `Новое подтверждение:\n
Имя: ${formData.name}
Приведет ли гостя: ${formData.with_guest}
Имя гостя: ${formData.guest_name}
Придёт ли: ${formData.attendance}
Алкоголь: ${formData.alcohol}`;

    try {
        // Отправляем в Telegram
        const response = await fetch('https://api.telegram.org/bot7938944125:AAEnVj7bZnmu0NUcquTSONHH2nBCEtXnUIY/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: '-1002333419014',
                text: message
            })
        });

        if (response.ok) {
            alert('Спасибо! Ваш ответ успешно отправлен!');
            document.getElementById('weddingForm').reset();
        } else {
            alert('Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз.');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка соединения. Проверьте интернет и попробуйте снова.');
    }
});

function toggleGuestField(show) {
    const guestField = document.getElementById('guest_name_field');
    const guestInput = document.getElementById('guest_name');
    guestField.style.display = show ? 'block' : 'none';
    if (!show) guestInput.value = '';
}
