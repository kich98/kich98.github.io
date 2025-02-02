<?php
// Получаем данные из формы
$name = $_POST['name'];
$with_guest = $_POST['with_guest'];
$guest_name = isset($_POST['guest_name']) ? $_POST['guest_name'] : 'Не указано';
$attendance = $_POST['attendance'];
$alcohol = isset($_POST['alcohol']) ? implode(", ", $_POST['alcohol']) : 'Не указано';

// Формируем сообщение для Telegram
$message = "Новое подтверждение:\n";
$message .= "Имя: $name\n";
$message .= "Приведет ли гостя: $with_guest\n";
$message .= "Имя гостя: $guest_name\n";
$message .= "Придёт ли: $attendance\n";
$message .= "Алкоголь: $alcohol\n";

// Токен вашего бота и chat_id
$botToken = '7938944125:AAEnVj7bZnmu0NUcquTSONHH2nBCEtXnUIY';
$chatId = '-1002333419014';

// Отправляем сообщение в Telegram
$url = "https://api.telegram.org/bot$botToken/sendMessage";
$data = [
    'chat_id' => $chatId,
    'text' => $message,
];

$options = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data),
    ],
];

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

// Возвращаем ответ
if ($result !== false) {
    echo "Успешно отправлено!";
} else {
    echo "Ошибка при отправке.";
}
?>
