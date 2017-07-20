# Настройка пользовательской формы

Пользовательская форма запроса доступна по ссылке https://your-jira.site/servicedesk/customer/user/requests?status=open, после выбора запроса

## Требования для кастомизации:
- Полный перевод элементов формы (русская локализация)
- Обязательный комментарий при отклонении согласования
- Добавление текста из формы комментария при нажатии кнопок согласования или отклонения

## Реализация

### Проблема 
Нет функционала кастомизации пользовательской формы в джира

### Решение
Добавить функционал кастомизации на уровне nginx
- добавляем в конфиг `/etc/nginx/conf.d/jira.conf`

```
location /servicedesk/customer/ {
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Server $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://your-jira.site:8080/servicedesk/customer/;
    proxy_buffer_size 64k;
    client_max_body_size 100M;
    sub_filter '</body>' '<script type="text/javascript" src="/decorators/jirasd.js"></script></body>';
    sub_filter_once on;
 }
```

Файл `jirasd.js` содержит скрипт модификации пользовательской формы javascript + jQuery

Находится тут:

- `https://your-jira.site/decorators/jirasd.js`
- `/opt/atlassian/jira-install/atlassian-jira/decorators/jirasd.js`
