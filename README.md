# VKR_Landscape_Geographics


Тема: Разработка системы поддержки исследований в области ландшафтной географии. Модуль хранения и обработки данных

Автор: Болычев Леонид Игоревич

Группа: М9123-09.04.04рпис

Научный руководитель: Артемьева Ирина Леонидовна

"VKR_landscape_design" - это серверная часть, её делаю я. 

"VKR_landscape_react_front-main" - это клиентская часть, её делает мой напарник Цветков Станислав Олегович из группы М9124-09.04.04рпис, который защищается в следующем году.

Как запустить серверную часть:
 1) Скачиваем проект
 2) Заходим в командной строке в папку с файлом docker-compose.yml
 3) Вводим "docker-compose up" в командной строке
 4) Идём в сваггер по пути http://localhost:8000/docs#/
 5) Всё, мы запустили серверную часть и можем проверять любые методы :)

Как запустить клиентскую часть:
 1) Скачиваем проект
 2) Запускаем серверную часть согласно руководству выше, так как клиентская часть без серверной работать в полной мере не будет
 3) Заходим в командной строке в папку "VKR_landscape_react_front-main"
 4) Вводим "npm install --legacy-peer-deps" в командной строке
 5) Вводим "npm start" в командной строке
 6) У нас автоматически откроется клиентская часть по пути http://localhost:3000/


Авторизоваться в приложении можно под этими клиентами ("root", "geoadmin" и "svt1939" являются администраторами):
 1) Логин "root"        -   Пароль "root"
 2) Логин "geoadmin"    -   Пароль "a5B4!yr"
 3) Логин "emo2007"     -   Пароль "Verni2007!"
 4) Логин "krokodiller" -   Пароль "gttw4S!weg"
 5) Логин "svidetel"    -   Пароль "te!Dw9twx"
 6) Логин "killthebill" -   Пароль "fe1g!wHwg"
 7) Логин "pocik"       -   Пароль "we3Arq!gq"
 8) Логин "svt1939"     -   Пароль "qcq!Tv7eg"
 9) Логин "slava80"     -   Пароль "j5yjB!rje"

Вводим логин и пароль в метод POST /login, получаем токен авторизации. Его вводим в "Authorize". Теперь мы авторизированы и нам доступен функционал авторизированного пользователя.
