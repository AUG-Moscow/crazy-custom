В стандартной поставке JIRA все кнопки выглядят одинаково — они серого цвета. Неопытные пользователи не могут отличить кнопки, относящиеся к действиям с запросом от кнопок, относящихся к переходим workflow (бизнес-процесса).
![](http://myjira.biz-apps.ru/wp-content/uploads/2016/09/Screenshot_2.png)

Устанавливаем плагин [JsIncluder](https://marketplace.atlassian.com/plugins/ru.mail.jira.plugins.jsincluder/server/overview)

Вставляем код в секции `General`

~~~~
function my_hover(my_button, base_color, highlight_color) {
    $(my_button).css($.extend(base_color, {‘
        color’: ‘white’,
        ‘text - shadow’: ‘0 1 px 0 black’
    }))
    $(my_button).hover(function() {
        $(this).css(highlight_color)
    }, function() {
        $(this).css(base_color)
    })
}
my_hover(«.issueaction - workflow - transition», {‘
    background’: ‘#3b7fc4’},{‘background’: ‘# 4796e6’
})
my_hover(«#opsbar - transitions_more», {‘
    background’: ‘#3b7fc4’},{‘background’: ‘# 4796e6’
})
~~~~
В `#action_id_31` 31 — это ID перехода, который вам нужно подсветить другим цветом. Его можно узнать например, в табличном режиме редактирования бизнес-процесса.

В секции `Bindings` выбираем чекбокс `View`
