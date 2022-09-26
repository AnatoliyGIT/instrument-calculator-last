$(function ($) {

    const selector_output = $("#selector-output")
    const input_lover_range = $("#input-lover-range")
    const input_current_range_value = $("#input-current-range-value")
    const input_upper_range = $("#input-upper-range")
    const input_output_range = $("#input-output-range")
    const output_ma = $("#output-ma")
    const output_percents = $("#output-percents")
    let res_ma = 0
    let func = "lin"

    $.each(selector_output[0], function (i) {
        selector_output[0].options[i].foo = function () {
            func = this.value
        }
    })

    selector_output.on("change", function () {
        window.navigator.vibrate(10)
        selector_output[0].options[selector_output[0].selectedIndex].foo()
        calc_ma()
        calc_percents()
    })

    const calc_range = function () {
        input_output_range.val(function () {
            return Math.round((Number(input_upper_range.val()) - Number(input_lover_range.val())) * 10) / 10
        })
    }

    const calc_ma = function () {
        const range = Number(input_output_range.val())
        const lrv = Number(input_lover_range.val())
        const current = Number(input_current_range_value.val())
        const ma = 16 / range
        const sqr_ma = 16 / Math.sqrt(range)
        const curr = current - lrv
        res_ma = 4 + ma * curr
        if (func === "sqr") {
            res_ma = Math.sqrt(curr * sqr_ma * sqr_ma) + 4
        }
        output_ma.val(function () {
            if (res_ma >= 3.6 && res_ma <= 21.6) {
                return Math.round(res_ma * 1000) / 1000
            }
            return ""
        })

    }

    const calc_percents = function () {
        let res = (res_ma * 100 / 16) - 25
        output_percents.val(function () {
            if (res >= -10 && res <= 110) {
                return Math.round(res * 10) / 10
            }
            return ""
        })
    }

    input_upper_range.on("input", function () {
        calc_range()
        calc_ma()
        calc_percents()
    })

    input_lover_range.on("input", function () {
        calc_range()
        calc_ma()
        calc_percents()
    })

    input_output_range.on("input", function () {
        input_upper_range.val(function () {
            return Math.round((Number(input_output_range.val()) + Number(input_lover_range.val())) * 10) / 10
        })
    })

    input_current_range_value.on("input", function () {
        calc_ma()
        calc_percents()
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

    input_lover_range.on("focus", function () {
        data = get_focus(input_lover_range, "lover", keyboard)
        html = data.html
        res = data.result
        focus = data.focus
    })
    input_current_range_value.on("focus", function () {
        data = get_focus(input_current_range_value, "current", keyboard)
        html = data.html
        res = data.result
        focus = data.focus
    })
    input_upper_range.on("focus", function () {
        data = get_focus(input_upper_range, "upper", keyboard)
        html = data.html
        res = data.result
        focus = data.focus
    })
    input_output_range.on("focus", function () {
        data = get_focus(input_output_range, "range", keyboard)
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
        res = ""
        $("#keyboard_input").children("span").html("")
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
            case "lover":
                calc_range()
                calc_ma()
                calc_percents()
                break;
            case "current":
                calc_ma()
                calc_percents()
                break;
            case "upper":
                calc_range()
                calc_ma()
                calc_percents()
                break;
            case "range":
                input_upper_range.val(() => {
                    return Math.round((Number(input_output_range.val()) + Number(input_lover_range.val())) * 10) / 10
                })
                calc_ma()
                calc_percents()
        }
    })
    // End KEYBOARD
})
