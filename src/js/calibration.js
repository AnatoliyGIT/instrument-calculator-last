$(function ($) {

    // Устанавливаем язык страницы в селекторе из адресной строки и наоборот
    const lang = $("#lang-selector")
    const link_back = $("#link-back")

    let set_select_by_value = function(select_id, option_val) {
        document.getElementById(select_id).value = option_val
    }

    let getURLVarArr = function() {
        var data = []
        var query = String(document.location.href).split('?')
        if (query[1]) {
            var part = query[1].split('&')
            for (i = 0; i < part.length; i++) {
                var dat = part[i].split('=')
                data[dat[0]] = dat[1]
            }
        }
        return data
    }

    let get_value_of_change_select = function(select) {
        let result
        $.each(select, function (i) {
            select.options[i].foo = function () {
                result = this.value
            }
        })
        select.options[select.selectedIndex].foo()
        return result
    }

    let setLocation = function(curLoc){
        try {
            history.pushState(null, null, curLoc)
            return
        } catch(e) {}
        location.hash = '#' + curLoc
    }

    let lang_val = getURLVarArr().lang

    set_select_by_value("lang-selector", lang_val)

    let language = get_value_of_change_select(lang[0])

    lang.on("change", function() {
        language = get_value_of_change_select(lang[0])
        lang_val = getURLVarArr().lang
        if (lang_val !== language) {
            setLocation("?lang=" + language)
            lang_val = getURLVarArr().lang
            link_back.attr("href", "index.html?lang=" + lang_val)
        }
    })

    link_back.attr("href", "index.html?lang=" + lang_val)
// End

})
