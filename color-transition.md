![](http://myjira.biz-apps.ru/wp-content/uploads/2016/09/Screenshot_3.png)

Устанавливаем плагин [JsIncluder](https://marketplace.atlassian.com/plugins/ru.mail.jira.plugins.jsincluder/server/overview)

Вставляем код в секции `General`

```~~~~
function my_hover(my_button, base_color, highlight_color) {
    $(my_button).css($.extend(base_color, {
        'color': 'white',
        'text-shadow': '0 1px 0 black'
    }))
    $(my_button).hover(function() {
        $(this).css(highlight_color)
    }, function() {
        $(this).css(base_color)
    })
}
my_hover('#action_id_31', {
    'background': 'Green'
}, {
    'background': 'LimeGreen'
})
my_hover('#action_id_21', {
    'background': 'Green'
}, {
    'background': 'LimeGreen'
})
my_hover('#action_id_61', {
    'background': 'Green'
}, {
    'background': 'LimeGreen'
})
my_hover('#action_id_41', {
    'background': 'darkred'
}, {
    'background': 'red'
})
my_hover('#action_id_91', {
    'background': 'darkred'
}, {
    'background': 'red'
})
~~~~```
В `#action_id_31` 31 — это ID перехода, который вам нужно подсветить другим цветом. Его можно узнать например, в табличном режиме редактирования бизнес-процесса.

В секции `Bindings` выбираем чекбокс `View`
