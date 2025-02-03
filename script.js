document.addEventListener("DOMContentLoaded", function () {
    // Настройка задержек для всех элементов с классом fade-in
    const fadeElements = document.querySelectorAll('.fade-in-left,.fade-in,.fade-in-right');
    fadeElements.forEach((el, index) => {
        el.style.setProperty('--i', index + 1);
    });

    // Обратный отсчет до свадьбы
    const weddingDate = new Date("August 29, 2025 12:00:00").getTime();

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    const countdownFunction = setInterval(function () {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = "Свадьба уже состоялась!";
            return;
        }

        daysEl.innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        hoursEl.innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutesEl.innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        secondsEl.innerText = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);

    // Управление полем для гостя
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
        const message = `
            📨 Новое подтверждение:<br>
            👤 Имя: ${formData.name}<br>
            👥 Гость: ${formData.with_guest}${formData.with_guest === 'Да' ? ` (${formData.guest_name})` : ''}<br>
            ✅ Присутствие: ${formData.attendance}<br>
            🍷 Алкоголь: ${formData.alcohol}
        `;

        try {
            // Отправка в Telegram
            const response = await fetch('https://api.telegram.org/botYOUR_BOT_TOKEN/sendMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: 'YOUR_CHAT_ID',
                    text: message,
                    parse_mode: 'HTML'
                })
            });

            if (response.ok) {
                alert('✅ Ваш ответ успешно отправлен!');
                document.getElementById('weddingForm').reset();
                document.getElementById('guest_name_field').style.display = 'none';
            } else {
                throw new Error('Ошибка сервера');
            }
        } catch (error) {
            console.error('Ошибка:', error.message);
            alert('❌ Произошла ошибка при отправке. Пожалуйста, проверьте интернет-соединение и попробуйте ещё раз.');
        }
    });
});
