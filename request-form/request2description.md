После создания запроса из любой формы SD копируем все заполненные поля в стандартное текстовое поле «Описание», чтобы потом легко отправить стандартное письмо. Или легко вывести в таблицу (отчёт).

## Установка

1. Устанавливаем плагин Scripting Suite https://marketplace.atlassian.com/plugins/com.quisapps.jira.jss/server/overview 
2. Скачиваем файл `pf_request2description.py`, кладём в папку `atlassian/jira-data/jss/jython/sys/`
3. Делаем «технический» переход из `Open` в `Open` (ограничив видимость) с постфункцией типа `Jython Post Function`
4.В постфункции выбираем файл `pf_request2description.py`, 
5. Средством автоматизации (Automation или встроенный в SD) делаем переход при условии JQL `description is EMPTY``
