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

document.getElementById('weddingForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('send_to_telegram.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Показываем ответ от сервера
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке формы.');
    });
});

document.getElementById('statusMessage').innerText = 'Ваша форма успешно отправлена!';