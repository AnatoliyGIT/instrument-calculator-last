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
            $.each(arr_manuals, function(i, e) {
                const href = $("#link-" + i)
                const query = String(href.attr("href")).split('?')
                if (query[1]) {
                    href.attr("href", e + ".html?lang=" + lang_val)
                }
            })
        }
        translate()
    })
    translate()

    link_back.attr("href", "index.html?lang=" + lang_val)
    // End

    // Создаем кнопочки на страницы разных производителей
    const id_cards_manuals = $("#card-manuals")

    const arr_manuals = ["yokogawa", "rosemount", "pepperl-fuchs", "emerson-fisher", "masoneilan", "ABB", "siemens", "others"]

    $.each(arr_manuals, function(i, elem) {
        const manufacture = elem.charAt(0).toUpperCase() + elem.slice(1)
        title_manual_instrument.html() === manufacture ? link_back.attr("href", "manuals.html?lang=" + lang_val) : link_back
        
        const div_main = $('<div class="link-manual">')
        const tag_a = $('<a class="card text-white bg-primary m-2" id="link-' + i + '" href="' + elem + '.html?lang=' + lang_val + '">')
        const class_card_manuals = $('<div class="card-manuals">')
        const class_card_body = $('<div class="card-body">')
        const class_card_title = $('<h5 class="card-title_manuals">' + manufacture + '</h5>')
        id_cards_manuals.append(div_main.append(tag_a.append(class_card_manuals.append(class_card_body.append(class_card_title)))))
    })

    // Создаем кнопки со ссылками на инструкции
    const div_links = $("#links")

    const obj_links = {
        "Yokogawa": {
            "YOKOGAWA.site": "https://www.yokogawa.com/",
            "EJX-SERIES_EN.pdf": "https://web-material3.yokogawa.com/IM01C25A01-01EN.pdf",
            "EJX110A_EN.pdf": "https://web-material3.yokogawa.com/GS01C25B01-01EN.pdf",
            "EJX210A_EN.pdf": "https://web-material3.yokogawa.com/GS01C25C01-01EN.pdf",
            "EJX310A_EN.pdf": "https://web-material3.yokogawa.com/GS01C25D01-01EN.pdf",
            "EJX430A_EN.pdf": "https://web-material3.yokogawa.com/GS01C25E01-01EN.pdf",
            "EJX530A_EN.pdf": "https://web-material3.yokogawa.com/GS01C25F01-01EN.pdf",
            "TC-10-L.pdf": "https://web-material3.yokogawa.com/IM05C01E81-12EN.pdf",
            "UT150_TC.pdf": "https://web-material3.yokogawa.com/IM05C01E12-41E_050.pdf?_ga=2.65119590.976040114.1669214526-1699197842.1669214526",
            "YTA-510_TT.pdf": "https://web-material3.yokogawa.com/GS01C50E01-01EN.pdf",
            "YTA-610_TT.pdf": "https://web-material3.yokogawa.com/GS01C50H01-01EN.pdf",
            "YTA-710_TT.pdf": "https://web-material3.yokogawa.com/GS01C50G01-01EN.pdf",
            "YTA-50_TT": "https://web-material3.yokogawa.com/GS01C50C01-00EN.pdf",
            "YTA-70_TT": "https://www.insatech.com/media/ii5pjzij/gs_e_yokogawa-yta70-temperaturtransmitter-specifikationer_gs01c50c03-00en.pdf",
        },
        "Rosemount": {
            "ROSEMOUNT.site": "https://www.emerson.com/en-us/automation/rosemount",
            "3051.pdf": "https://www.emerson.com/documents/automation/reference-manual-rosemount-3051-pressure-transmitter-hart-r-protocol-en-89452.pdf",
            "1151.pdf": "https://www.emerson.com/documents/automation/manual-rosemount-1151-pressure-transmitter-en-76268.pdf",
            "2051.pdf": "https://www.emerson.com/documents/automation/manual-rosemount-2051-selectable-hart-4-20-ma-hart-revision-5-7-protocols-en-89532.pdf",
            "2024.pdf": "https://www.emerson.com/documents/automation/manual-rosemount-2024-differential-pressure-transmitter-en-76036.pdf",
            "2088-2090.pdf": "https://www.emerson.com/documents/automation/manual-rosemount-2088-2090p-2090f-pressure-transmitters-hart-1-5vdc-low-power-protocol-en-76794.pdf",
            "DP-Levels.pdf": "https://www.emerson.com/documents/automation/manual-rosemount-dp-level-transmitters-1199-diaphragm-seal-systems-en-76026.pdf",
            "3144P.pdf": "https://www.emerson.com/documents/automation/manual-rosemount-3144p-temperature-transmitter-en-104720.pdf",
            "644_TT.pdf": "https://www.emerson.com/documents/automation/manual-rosemount-644-temperature-transmitter-hart-en-89604.pdf",
            "248_TT.pdf": "https://www.emerson.com/documents/automation/manual-rosemount-248-temperature-transmitter-en-76052.pdf",
            "148_TT.pdf": "https://www.emerson.com/documents/automation/manual-rosemount-148-temperature-transmitter-en-76044.pdf",
            "648_TT_Wireless": "https://www.emerson.com/documents/automation/manual-rosemount-648-wireless-temperature-transmitter-en-76216.pdf",
            "248_TT_Wireless": "https://www.emerson.com/documents/automation/manual-rosemount-248-wireless-temperature-transmitter-en-87846.pdf",
        },
        "Pepperl-fuchs": {
            "PEPPERL-FUCHS.site": "https://www.pepperl-fuchs.com/global/en/index.htm",
            "Barriers_K-Systems_en.pdf": "https://5.imimg.com/data5/SELLER/Doc/2022/1/BQ/KV/SW/53842997/instrinsic-safe-barriers-analog-output-barrier-stocks.pdf",
            "Barriers_K-Systems_ru.pdf": "https://www.elit.ee/docs/Automation/tdoct0187t_rus.pdf",
            "KFD2-CD.pdf": "https://files.pepperl-fuchs.com/webcat/navi/productInfo/pds/t184291_eng.pdf",
            "KFD2-SR.pdf": "https://www.quicktimeonline.com/assets/images/pdf/PepperlFuchs/KFD2-SR2-Ex1WLB.pdf",
            "KFD2-STC4.pdf": "https://files.pepperl-fuchs.com/webcat/navi/productInfo/pds/283672_eng.pdf",
            "KFD2-STC5.pdf": "https://files.pepperl-fuchs.com/webcat/navi/productInfo/pds/70124109_eng.pdf",
            "KFD2-TR.pdf": "https://www.electrolsupply.com/datasheets/datasheet-multi-85bd211fec.pdf",
            "KFD2-TT.pdf": "http://www.sm-industry.ru/titan_img/pepperl-fuchs/071827_eng.pdf",
            "KFD2-RO.pdf": "https://files.pepperl-fuchs.com/webcat/navi/productInfo/pds/038975_eng.pdf",
            "Overview.pdf": "https://files.pepperl-fuchs.com/webcat/navi/productInfo/doct/tdoct2486e_eng.pdf",
        },
        "Emerson-fisher": {
            "EMERSON.site": "https://www.emerson.com",
            "Control-Valves-catalog": "https://www.emerson.com/en-us/catalog/control-valves",
            "GX-Control-Valve": "https://www.emerson.com/en-us/catalog/fisher-gx",
            "DVC6200_en.pdf": "https://www.emerson.com/documents/automation/instruction-manual-fieldvue-dvc6200-hw2-digital-valve-controller-en-123052.pdf",
            "DVC6200_ru.pdf": "https://www.emerson.com/documents/automation/quick-start-guide-fisher-fieldvuedvc6200-dvc6200-series-digital-valve-controllers-russian-ru-122588.pdf",
            "POS-3582_en.pdf": "https://www.emerson.com/documents/automation/instruction-manual-fisher-3582-3582i-positioners-582i-electro-pneumatic-converter-en-124114.pdf",
            "POS-3582_ru.pdf": "https://www.emerson.com/documents/automation/instruction-manual-fisher-3582-3582i-russian-ru-124088.pdf",
            "POS-3610_en.pdf": "https://www.emerson.com/documents/automation/instruction-manual-fisher-3610j-3620j-positioners-3622-electro-pneumatic-converter-en-123350.pdf",
            "POS-3660_en.pdf": "https://www.askalon.com/uploads/downloads/manual_fisher_3660_3661_position.pdf",
            "POS-3582_en.video(1)": "https://www.youtube.com/watch?v=BAcQ93eUtHY",
            "POS-3582_en.video(2)": "https://www.youtube.com/watch?v=daKehqhrgPw",
        },
        "Masoneilan": {
            "MASONELIAN.site": "https://valves.bakerhughes.com/masoneilan",
            "28000.pdf": "https://dam.bakerhughes.com/m/4a9c46a2d75b2679/original/mn-28000-series-varipak-iom-gea30857b-english-pdf.pdf",
            "41005.pdf": "https://www.serkon.com.tr/wp-content/uploads/2016/02/41005-Instruction-manual.pdf",
            "21000.pdf": "https://dam.bakerhughes.com/m/3817a5822d17af37/original/BHMN-21000-IOM-19821E-0620-English-pdf.pdf",
            "SVI-2(en).pdf": "https://valves.bakerhughes.com/sites/g/files/cozyhq631/files/2018-12/mn-svi-ii-ap-qsg-gea19679-revw-english.pdf",
            "SVI-2(ru).pdf": "https://dam.bakerhughes.com/m/765a3c443a62ec7f/original/BHMN-SVI2AP-QSG-19679AC-1221-RU-Russian.pdf",
        },
        "ABB": {
            "ABB.site": "https://global.abb/group/en",
            "TZIDC-1_en.pdf": "https://library.e.abb.com/public/3bd4ee70ba52d4f8c125765d0034e4e8/45_18-79-EN-C-10_2009.pdf",
            "TZIDC-110_en.pdf": "https://www.pumpeng.co.uk/wp-content/uploads/2015/05/Manual-ABB-TZIDC-operating-instuctions.pdf",
            "TZIDC-200_en.pdf": "https://library.e.abb.com/public/7799a20a59aba5d4c1257b0c0054a1f0/45_18-79-EN-B-03_2009.pdf",
            "TZIDC-200_ru.pdf": "https://library.e.abb.com/public/c3b86fe6dcf50613c125791900475481/3KXE341008R4222_42_18-85-RU-B-09_2011.pdf",
            "TZIDC_RU_D.pdf": "https://library.e.abb.com/public/754fe659cc084a549c9395a072c16339/OI_TZIDC_RU_D.pdf?x-sign=zSqmAYHhkPjzCPUuYuXCn9zeGueG+gET81pfMIUv4tsbXowaR2jPttKlaXJi+OCc",
            "TZIDC.video": "https://www.youtube.com/watch?v=uPmXrqetMpw",
        },
        "Siemens": {
            "SIEMENS.global": "https://www.siemens.com/global/en.html",
            "SIEMENS.PS2": "https://new.siemens.com/global/en/products/automation/process-instrumentation/positioners/sipart-ps2-valve-positioner.html",
            "PS2_en.pdf": "https://cache.industry.siemens.com/dl/files/419/109782419/att_1034214/v1/A5E00074631-AFen_PS2HART_OI_en-US.pdf",
            "PS2_ru.pdf": "https://www.siemens-pro.ru/docs/kip/Positioners_Recorders_Regulators/Positioners/Pozitioner_Sipart_PS2/Instruction_RUS/Rukovodstvo_SipartPS2_FF_RUS.pdf",
            "PS2.video": "https://www.youtube.com/watch?v=nXSO6290P6w",
        },
        "Others": {
            "Orifice-Flow-Meter.video": "https://www.youtube.com/watch?v=94113fz1j84&list=RDCMUCCfcObpcllzM8b9oc0PD5JA&index=11",
            "Level-Meter-DP.video": "https://www.youtube.com/watch?v=XWfwg9WcWfo",
            "I/P-converter.video": "https://www.youtube.com/watch?v=_afkPYymJl0",
            "RTD.video": "https://www.youtube.com/watch?v=yNryBIe5kEg",
            "Venturimeter.video": "https://www.youtube.com/watch?v=WzPQuOilmCM",
            "Pressure.video": "https://www.youtube.com/watch?v=Gd648AoNcYk",
            "Pressure-switch.video": "https://www.youtube.com/watch?v=ktYFDe1qNp8",
            "CV-actuator.video": "https://www.youtube.com/watch?v=PsZOtcdVG6o",
            "Proximity-sensor.video": "https://www.youtube.com/watch?v=s2na8CumNR0&list=PLACN6YPGs9C-GSTus9XgvzNSQBeVPuXjk&index=2",
            "NPN-Inductive-proximity-sensor.video": "https://www.youtube.com/watch?v=7CUj3ZE88FQ&list=PLACN6YPGs9C-GSTus9XgvzNSQBeVPuXjk&index=3",
            "Magnetic-flow-meter.video": "https://www.youtube.com/watch?v=m5urJRUvmOw&list=RDCMUCCfcObpcllzM8b9oc0PD5JA&index=2",
        }
    }

    for (const [title, value] of Object.entries(obj_links)) {
        for (const [key, link] of Object.entries(value)) {
            if (title_manual_instrument.html() === title) {
                const div_main = $('<div class="link-manual">')
                const tag_a = $('<a class="card text-white bg-info m-2 pt-2" href="' + link + '">')
                const class_link_manuals = $('<div class="link-manuals">')
                const class_link_body = $('<div class="link-body">')
                const class_link_title = $('<h5 class="link-title_manuals text-white">' + key + '</h5>')
                div_links.append(div_main.append(tag_a.append(class_link_manuals.append(class_link_body.append(class_link_title)))))
            }
        }
    }
})
