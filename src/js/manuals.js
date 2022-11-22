$(function ($) {

    // Устанавливаем язык страницы в селекторе из адресной строки и наоборот
    const lang = $("#lang-selector")
    const link_back = $("#link-back")
    const title_main = $("#title-main")
    const title_manual_instrument = $("#title-manual-instrument")

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

    let translate = function() {
        if (lang_val === "en") {
            title_main.html("Manuals")
        }
        if (lang_val === "he") {
            title_main.html("הוראות")
        }
        if (lang_val === "ru") {
            title_main.html("Инструкции")
        }
    }

    let lang_val = getURLVarArr().lang
    // !lang_val ? lang_val = "en" : lang_val

    set_select_by_value("lang-selector", lang_val)

    let language = get_value_of_change_select(lang[0])

    lang.on("change", function() {
        language = get_value_of_change_select(lang[0])
        lang_val = getURLVarArr().lang
        if (lang_val !== language) {
            setLocation("?lang=" + language)
            lang_val = getURLVarArr().lang
            link_back.attr("href", "index.html?lang=" + lang_val)
            title_manual_instrument.html() ? link_back.attr("href", "manuals.html?lang=" + lang_val) : link_back
        }
        translate()
    })
    translate()

    link_back.attr("href", "index.html?lang=" + lang_val)
    // End

    // Создаем кнопочки на страницы разных производителей
    const id_cards_manuals = $("#card-manuals")

    const arr_manuals = ["yokogawa", "rosemount", "peperl-fuchs", "emerson-fisher", "masonelian", "ABB", "schneider-electric", "others"]

    $.each(arr_manuals, function(i, elem) {
        const manufacture = elem.charAt(0).toUpperCase() + elem.slice(1)
        title_manual_instrument.html() === manufacture ? link_back.attr("href", "manuals.html?lang=" + lang_val) : link_back
        
        const tag_a = $('<a class="col col-4 card text-white bg-primary m-2" id="link-' + i + '" href="' + elem + '.html?lang=' + lang_val + '">')
        const class_card_manuals = $('<div class="card-manuals">')
        const class_card_body = $('<div class="card-body">')
        const class_card_title = $('<h5 class="card-title_manuals">' + manufacture + '</h5>')
        id_cards_manuals.append(tag_a.append(class_card_manuals.append(class_card_body.append(class_card_title))))
    })

    // Создаем кнопки со ссылками на инструкции
    const div_links = $("#links")

    const obj_links = {
        "Yokogawa": {
            "EJX-Series_en": "https://web-material3.yokogawa.com/IM01C25A01-01EN.pdf",
            "EJX110A_EN": "https://web-material3.yokogawa.com/GS01C25B01-01EN.pdf",
            "EJX210A_EN": "https://web-material3.yokogawa.com/GS01C25C01-01EN.pdf",
            "EJX310A_EN": "https://web-material3.yokogawa.com/GS01C25D01-01EN.pdf",
            "EJX430A_EN": "https://web-material3.yokogawa.com/GS01C25E01-01EN.pdf",
            "EJX530A_EN": "https://web-material3.yokogawa.com/GS01C25F01-01EN.pdf",
        },
        "Rosemount": {
            "3051": "https://www.instrumart.com/assets/rosemount_3051_datasheet.pdf"
        },
        "Peperl-fuchs": {
            "KFD2-STC4-Ex1-connection": "https://docs.rs-online.com/4178/0900766b80b0ca09.pdf",
            "KFD2-STC4-Ex1": "https://files.pepperl-fuchs.com/webcat/navi/productInfo/pds/283672_eng.pdf",
            "KFD2-STC5-Ex1": "https://files.pepperl-fuchs.com/webcat/navi/productInfo/pds/70124109_eng.pdf",
            "Overview-Interface-Technology": "https://files.pepperl-fuchs.com/webcat/navi/productInfo/doct/tdoct2486e_eng.pdf"
        }
    }

    for (const [title, value] of Object.entries(obj_links)) {
        for (const [key, link] of Object.entries(value)) {
            console.log(title_manual_instrument.html(), title)
            if (title_manual_instrument.html() === title) {
                const tag_a = $('<a class="col col-4 card text-white bg-info m-2 pt-2 fs-1" href="' + link + '">')
                const class_link_manuals = $('<div class="link-manuals">')
                const class_link_body = $('<div class="link-body">')
                const class_link_title = $('<h5 class="link-title_manuals">' + key + '</h5>')
                div_links.append(tag_a.append(class_link_manuals.append(class_link_body.append(class_link_title))))
            }
        }
    }
})
