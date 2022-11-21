$(function ($) {
    
    const lang = $("#lang-selector")
    const query_url = String(document.location.href).split('?')
    const title_main = $("#title-main")
    const card_title_press = $("#card-press").children(".card-body").children(".card-title")
    const card_title_temp = $("#card-temp").children(".card-body").children(".card-title")
    const card_title_flow = $("#card-flow").children(".card-body").children(".card-title")
    const card_title_level = $("#card-level").children(".card-body").children(".card-title")
    const card_title_output = $("#card-output").children(".card-body").children(".card-title")
    const card_title_manuals = $("#card-manuals").children(".card-body").children(".card-title")
    const link_press = $("#link-press")
    const link_temp = $("#link-temp")
    const link_flow = $("#link-flow")
    const link_level = $("#link-level")
    const link_output = $("#link-output")
    const link_manuals = $("#link-manuals")
    let lang_selected



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
    
    // Устанавливаем язык страницы в селекторе
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

    let set_language = function() {
        lang_val ? link_press.attr("href", "press.html?lang=" + lang_val) : link_press.attr("href", "press.html?lang=en")
        lang_val ? link_temp.attr("href", "temp.html?lang=" + lang_val) : link_temp.attr("href", "temp.html?lang=en")
        lang_val ? link_flow.attr("href", "flow.html?lang=" + lang_val) : link_flow.attr("href", "flow.html?lang=en")
        lang_val ? link_level.attr("href", "level.html?lang=" + lang_val) : link_level.attr("href", "level.html?lang=en")
        lang_val ? link_output.attr("href", "output.html?lang=" + lang_val) : link_output.attr("href", "output.html?lang=en")
        lang_val ? link_manuals.attr("href", "manuals.html?lang=" + lang_val) : link_manuals.attr("href", "manuals.html?lang=en")
    }

    let translate = function() {
        if (lang_val === "en") {
            title_main.html("Instrumentation calculator")
            card_title_press.html("Pressure")
            card_title_temp.html("Temperature")
            card_title_flow.html("Flow")
            card_title_level.html("Level")
            card_title_output.html("Output")
            card_title_manuals.html("Manuals")
        }
        if (lang_val === "he") {
            title_main.html("מחשבון מכשור")
            card_title_press.html("לחץ")
            card_title_temp.html("טמפרטורה")
            card_title_flow.html("זרימה")
            card_title_level.html("מפלס")
            card_title_output.html("יציאה")
            card_title_manuals.html("הוראות")
        }
        if (lang_val === "ru") {
            title_main.html("Калькулятор КИПиА")
            card_title_press.html("Давление")
            card_title_temp.html("Температура")
            card_title_flow.html("Расход")
            card_title_level.html("Уровень")
            card_title_output.html("Выход")
            card_title_manuals.html("Инструкции")
        }
    }

    let language = get_value_of_change_select(lang[0])

    let setLocation = function(curLoc){
        try {
            history.pushState(null, null, curLoc)
            return
        } catch(e) {}
        location.hash = '#' + curLoc
    }

    let lang_val = getURLVarArr().lang

    if (!lang_val) {
        lang_val = "en"
        setLocation("?lang=en")
    }

    set_language()
  
    lang.on("change", function() {
        language = get_value_of_change_select(lang[0])
        lang_val = getURLVarArr().lang
        if (lang_val !== language) {
            setLocation("?lang=" + language)
            lang_val = getURLVarArr().lang
        }
        translate()
        set_language()
    })
    translate()

    set_select_by_value("lang-selector", lang_val)
})
