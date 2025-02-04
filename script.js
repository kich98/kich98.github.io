document.addEventListener("DOMContentLoaded", function() {
    // Настройка задержек для всех элементов с классом fade-in
    const fadeElements = document.querySelectorAll('.fade-in-left, .fade-in, .fade-in-right');
    fadeElements.forEach((el, index) => {
        el.style.setProperty('--i', index + 1);
    });

    // Создаем Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Прекращаем наблюдение после появления
            }
        });
    }, {
        threshold: 0.1 // Элемент считается видимым, когда 10% его площади находится в области видимости
    });

    // Наблюдаем за всеми элементами с классами fade-in, fade-in-left, fade-in-right
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });

    // Обратный отсчет до свадьбы
    const weddingDate = new Date("August 29, 2025 13:45:00").getTime();
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
    const guestInput = document.getElementById('guest_name');
    guestField.style.display = show ? 'block' : 'none';
    if (!show) guestInput.value = '';
}

document.getElementById('weddingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
  // Сбор данных формы
    const formData = {
        name: document.getElementById('name').value,
        with_guest: document.querySelector('input[name="with_guest"]:checked').value,
        guest_name: document.getElementById('guest_name').value || 'Не указано',
        attendance: document.querySelector('input[name="attendance"]:checked').value,
        alcohol: Array.from(document.querySelectorAll('input[name="alcohol"]:checked'))
                   .map(checkbox => checkbox.value)
                   .join(', ') || 'Не указано'
    };

    // Форматирование сообщения
    const message = `📨 Новое подтверждение:\n
👤 Имя: ${formData.name}
👥 Гость: ${formData.with_guest}${formData.with_guest === 'Да' ? ` (${formData.guest_name})` : ''}
✅ Присутствие: ${formData.attendance}
🍷 Алкоголь: ${formData.alcohol}`;

    try {
        // Отправка в Telegram
        const response = await fetch('https://api.telegram.org/bot7938944125:AAEnVj7bZnmu0NUcquTSONHH2nBCEtXnUIY/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: '-1002333419014',
                text: message,
                parse_mode: 'HTML'
            })
        });

        // Обработка ответа
        if (response.ok) {
            alert('✅ Ваш ответ успешно отправлен!');
            document.getElementById('weddingForm').reset();
            document.getElementById('guest_name_field').style.display = 'none';
        } else {
            throw new Error('Ошибка сервера');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('❌ Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз.');
    }
});

// Управление полем для гостя
function toggleGuestField(show) {
    const guestField = document.getElementById('guest_name_field');
    const guestInput = document.getElementById('guest_name');
    guestField.style.display = show ? 'block' : 'none';
    if (!show) guestInput.value = '';
}
