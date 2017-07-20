var approve_dict = {
    "Decline": "Отклонить",
    "Approve": "Согласовать",
    "Your approval": "Ваше согласование"
};
var feed_dict = {
    "1 approval needed": "Требуется 1 согласование",
    "Declined": "Отклонено",
    "Approved": "Согласовано",
    "Approve": "Визирование",
    "Agreement": "Согласование"
};
var approve_selectors = [
    "#content > div > div > section > section.cv-request-top-panels > div > div > div > h4",
    "#content > div > div > section > section.cv-request-top-panels > div > div > div > form > button.aui-button.aui-button-primary.js-approve-approval",
    "#content > div > div > section > section.cv-request-top-panels > div > div > div > form > button.aui-button.js-decline-approval",
    "#content > div > div > aside > div > div"
];
var translate = false;
var update = false;
var clicked = false;
var enabled = false;

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function translate_all() {
    if(!translate){
        translate = true;        
        setTimeout(function(){
            var feed = jQuery('.cv-request-options');
            feed.find('h5,span,p').each(function(){
                if(feed_dict[jQuery(this).text()]){
                    jQuery(this).text(feed_dict[jQuery(this).text()]);
                }
            })
            jQuery('.cv-request-top-panels *').each(function(){
                if(approve_dict[jQuery(this).text()]){
                    jQuery(this).text(approve_dict[jQuery(this).text()]);
                }
            })
            translate = false
        },100)
    }
};

function comment_b4_decline() {
    var comment_area = jQuery("#comment-on-request");
    if (comment_area.length) {
        jQuery(document.body).off('DOMSubtreeModified', comment_debounced);

        var approve = jQuery("button.aui-button.aui-button-primary.js-approve-approval");
        var decline = jQuery("button.aui-button.js-decline-approval");
        var comment_input = jQuery("#comment-form > form > div.buttons > input");
        var comment_form = jQuery("#comment-form");
        var spinner = jQuery("div.spinner.sd-add-comment-spinner");
        comment_area = jQuery("#comment-on-request");
        var cancel = jQuery("#comment-form > form > div.buttons > button");
        var approve_head = jQuery("#content > div > div > section > section.cv-request-top-panels > div > div > div > h4");

        approve.on('click', function() {jQuery(this).text('Согласую...').attr('disabled', false)});
        decline.on('click', function() {jQuery(this).text('Отклоняю...').attr('disabled', false)});
        decline.attr("disabled", true);
        decline.attr("title", "Необходимо добавить комменатрий");

        function renew () {
            approve = jQuery("button.aui-button.aui-button-primary.js-approve-approval");
            decline = jQuery("button.aui-button.js-decline-approval");
            comment_input = jQuery("#comment-form > form > div.buttons > input");
            spinner = jQuery("div.spinner.sd-add-comment-spinner");
            comment_area = jQuery("#comment-on-request");
            comment_form = jQuery("#comment-form");
            cancel = jQuery("#comment-form > form > div.buttons > button");
            approve_head = jQuery("#content > div > div > section > section.cv-request-top-panels > div > div > div > h4");
        };

        function on_approve(event) {
            event.preventDefault();
            event.stopPropagation();
            comment_form.on("DOMSubtreeModified", start_approve).attr("disabled", true);
            comment_input.click();
        };

        function on_decline(event) {
            event.preventDefault();
            event.stopPropagation();
            comment_form.on("DOMSubtreeModified", start_decline).attr("disabled", true);
            comment_input.click();
        };

        function start_approve() {
            comment_form.off("DOMSubtreeModified", start_approve).attr("disabled", false);
            approve.off("click", on_approve);
            approve.attr('disabled', false);
            approve.click();
            approve.attr('disabled', true);
            decline.attr('disabled', true);
        };

        function start_decline() {
            comment_form.off("DOMSubtreeModified", start_decline).attr("disabled", false);
            decline.off("click", on_decline);
            decline.attr('disabled', false);
            decline.click();
            approve.attr('disabled', true);
            decline.attr('disabled', true);
        };

        function enable_send() {
            decline.attr("disabled", false);
            approve.on("click", on_approve);
            approve.attr("title", "Отправить комментарий и согласовать")
            decline.on("click", on_decline);
            decline.attr("title", "Отправить комментарий и отклонить")
        };

        function disable_send() {
            decline.attr("disabled", true);
            approve.off("click", on_approve);
            approve.attr("title", "")
            decline.off("click", on_decline);
            decline.attr("title", "Необходимо добавить комменатрий")
        };

        function depend_on(e) {
            if (e.target.value !== '') {
                if (!enabled) {
                    enable_send();
                    enabled = true;
                }
            } else {
                disable_send();
                enabled = false;
            };
        };

        function on_cancel() {
            setTimeout(function() {
                renew(); 
                disable_send();
                comment_area.bind('input propertychange', depend_on);
                cancel.on('click', on_cancel)
            }, 100);
        };
        comment_area.bind('input propertychange', depend_on);
        cancel.on('click', on_cancel);
        comment_input.on('click', on_cancel);
    };

};

var comment_debounced = debounce(comment_b4_decline, 100);
var translate_debounced = debounce(translate_all, 100, true);
var title = jQuery(document).find("title");

title.on("DOMSubtreeModified", function(e){
    if (window.location.href.indexOf("portal") !== -1) {
        jQuery(document.body).on('DOMSubtreeModified', translate_debounced);
        jQuery(document.body).on('DOMSubtreeModified', comment_debounced);
    }
});
