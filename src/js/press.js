$(function ($) {

// PRESSURE
    const select_press_l = $("#press-units-left")
    const select_press_r = $("#press-units-right")
    const select_l = select_press_l[0]
    const select_r = select_press_r[0]
    const select_type_left = $("#press-type-left")
    const select_type_right = $("#press-type-right")
    const select_type_l = select_type_left[0]
    const select_type_r = select_type_right[0]
    const input_press = $("#input-press")
    const output_press = $("#output-press")
    let input = Number(input_press.val())
    let unit_l = 10
    let unit_r = 10
    let additive_l = 0
    let additive_r = 0

// Обходим левый селектор в input записываем введенное значение, в unit_l записываем value текущего селектора в Мегапаскалях
    $.each(select_l, function (i) {
        select_l.options[i].foo = function () {
            input = input_press.val()
            unit_l = Number(this.value)
        }
    })

// Обходим правый селектор в unit_r записываем value текущего селектора в Мегапаскалях
    $.each(select_r, function (i) {
        select_r.options[i].foo = function () {
            unit_r = Number(this.value)
        }
    })

// Обходим левый тип давления
    $.each(select_type_l, function (i) {
        select_l.options[select_l.selectedIndex].foo()
        select_type_l.options[i].foo = function () {
            if (i === 1) {
                additive_l = Number(unit_r) / 101.97
            }
        }
    })

// Обходим правый тип давления
    $.each(select_type_r, function (i) {
        select_type_r.options[i].foo = function () {
            if (i === 1) {
                additive_r = Number(unit_r) / 101.97
            }
        }
    })

// Функция калькулятор. Записывает в output вычисленное значение
    let result = function () {
        select_l.options[select_l.selectedIndex].foo()
        select_r.options[select_r.selectedIndex].foo()
        select_type_l.options[select_type_l.selectedIndex].foo()
        select_type_r.options[select_type_r.selectedIndex].foo()
        let add_l = additive_l
        let add_r = additive_r
        additive_l = 0
        additive_r = 0
        output_press.val(function () {
            return Math.round(((input * unit_r / unit_l) + add_r - add_l) * 1000) / 1000
        })
    }

    select_press_l.on("change", function () {
        window.navigator.vibrate(10)
        return result()
    })
    select_press_r.on("change", function () {
        window.navigator.vibrate(10)
        return result()
    })
    input_press.on("input", function () {
        return result()
    })
    select_type_left.on("change", function () {
        return result()
    })
    select_type_right.on("change", function () {
        return result()
    })

    // Start KEYBOARD
    let keyboard = new bootstrap.Modal(document.getElementById('keyboard'), {})
    let html = undefined
    let focus = undefined
    let res = ""
    let data = {}

    let get_focus = function (i_html, focus, k_board) {
        $("#keyboard_input").children("span").html(i_html.val())
        const width = window.screen.width
        const height = window.screen.height
        if (width <= 1200) {
            let max_width_value = "95vw"
            if (width > height) {
                max_width_value = "50vw"
                $("button")
                    .css("height", "60px")
                    .css("display", "flex")
                    .css("justify-content", "center")
                    .css("align-items", "center")
                $("button span").css("font-size","2rem")
                $("i").css("font-size","2rem")
            }
            $("#modal-dialog").css("max-width", max_width_value)
            html = i_html
            html.val() === "0" ? res = "" : res = html.val()
            k_board.show()
        }
        return {
            "html": i_html,
            "focus": focus,
            "result": res
        }
    }

    input_press.on("focus", function () {
        data = get_focus(input_press, "inp_press", keyboard)
        html = data.html
        res = data.result
        focus = data.focus
    })

    $("#one").on("click", function () {
        window.navigator.vibrate(10)
        res = res + "1"
        $("#keyboard_input").children("span").html(res)
        html.val(() => {
            return res
        })
    })
    $("#two").on("click", function () {
        window.navigator.vibrate(10)
        res = res + "2"
        $("#keyboard_input").children("span").html(res)
        html.val(() => {
            return res
        })
    })
    $("#three").on("click", function () {
        window.navigator.vibrate(10)
        res = res + "3"
        $("#keyboard_input").children("span").html(res)
        html.val(() => {
            return res
        })
    })
    $("#for").on("click", function () {
        window.navigator.vibrate(10)
        res = res + "4"
        $("#keyboard_input").children("span").html(res)
        html.val(() => {
            return res
        })
    })
    $("#fife").on("click", function () {
        window.navigator.vibrate(10)
        res = res + "5"
        $("#keyboard_input").children("span").html(res)
        html.val(() => {
            return res
        })
    })
    $("#six").on("click", function () {
        window.navigator.vibrate(10)
        res = res + "6"
        $("#keyboard_input").children("span").html(res)
        html.val(() => {
            return res
        })
    })
    $("#seven").on("click", function () {
        window.navigator.vibrate(10)
        res = res + "7"
        $("#keyboard_input").children("span").html(res)
        html.val(() => {
            return res
        })
    })
    $("#eight").on("click", function () {
        window.navigator.vibrate(10)
        res = res + "8"
        $("#keyboard_input").children("span").html(res)
        html.val(() => {
            return res
        })
    })
    $("#nine").on("click", function () {
        window.navigator.vibrate(10)
        res = res + "9"
        $("#keyboard_input").children("span").html(res)
        html.val(() => {
            return res
        })
    })
    $("#zero").on("click", function () {
        window.navigator.vibrate(10)
        res = res + "0"
        $("#keyboard_input").children("span").html(res)
        html.val(() => {
            return res
        })
    })
    $("#dot").on("click", function () {
        window.navigator.vibrate(10)
        if (!res.includes(".")) {
            res = res + ".";
        }
        $("#keyboard_input").children("span").html(res)
        html.val(() => {
            return res
        })
    })
    $("#minus").on("click", function () {
        window.navigator.vibrate(10)
        if (res[0] !== '-') {
            res = "-" + res
        } else {
            res = res.slice(1)
        }
        $("#keyboard_input").children("span").html(res);
        html.val(() => {
            return res
        })
    })
    $("#backspace").on("click", function () {
        window.navigator.vibrate(10)
        res = res.substring(0, res.length - 1)
        $("#keyboard_input").children("span").html(res)
        html.val(() => {
            return res
        })
    })
    $("#erase").on("click", function () {
        window.navigator.vibrate(10)
        $("#keyboard_input").children("span").html("")
        res = ""
        html.val(() => {
            return res
        })
    })
    $("#enter").on("click", function () {
        window.navigator.vibrate(10)
        $("#keyboard_input").children("span").html("")
        html.val(() => {
            return res
        })
        keyboard.hide()
        switch (focus) {
            case "inp_press":
                result()
        }
    })
    // End KEYBOARD
})
