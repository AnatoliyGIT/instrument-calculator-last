$(function ($) {

    const selector_calc = $("#selector-calc")
    const selector_liquid = $("#selector-liquid")
    const density_ff = $("#density-ff")
    let density_ff_val = density_ff.val()
    const density_p = $("#density-p")
    let density_p_val = density_p.val()
    const distance_1 = $("#distance-1")
    const distance_2 = $("#distance-2")
    const distance_curr = $("#distance-curr")
    const class_distance_curr = $(".distance-curr")
    const range_mmh2o = $("#range-mmh2o")
    const lrv = $("#lrv")
    const urv = $("#urv")
    const result_ma = $("#result-ma")
    const result_percents = $("#result-percents")
    const result_ma_percents = $(".result-ma-percents")
    let liquid = "gas"
    let calc = "range"
    let res_ma = 0
    result_ma_percents.css("display", "none")
    class_distance_curr.css("display", "none")


    $.each(selector_calc[0], function (i) {
        selector_calc[0].options[i].foo = function () {
            calc = this.value
        }
    })

    $.each(selector_liquid[0], function (i) {
        selector_liquid[0].options[i].foo = function () {
            liquid = this.value
        }
    })

    selector_liquid.on("change", function (i) {
        selector_liquid[0].options[selector_liquid[0].selectedIndex].foo()
        if (liquid === "phase_separation") {
            $(".density-ff").css("display", "block")
        } else {
            $(".density-ff").css("display", "none")
            if (liquid === "water") {
                density_ff_val = "1"
            } else if (liquid === "glycerine") {
                density_ff_val = "1.26"
            }
        }
        calc_ma()
        calc_percents()
    })

    selector_calc.on("change", function (i) {
        selector_calc[0].options[selector_calc[0].selectedIndex].foo()
        switch (calc) {
            case "percents":
                class_distance_curr.css("display", "block")
                result_ma_percents.css("display", "block")
                density_p.removeAttr("disabled")
                range_mmh2o.prop("disabled", "true")
                break
            case "density":
                class_distance_curr.css("display", "none")
                result_ma_percents.css("display", "none")
                density_p.prop("disabled", "true")
                range_mmh2o.prop("disabled", "true")
                calc_distance_1()
                break
            case "current":
                class_distance_curr.css("display", "block")
                result_ma_percents.css("display", "block")
                density_p.removeAttr("disabled")
                range_mmh2o.removeAttr("disabled")
                break
            default:
                class_distance_curr.css("display", "none")
                result_ma_percents.css("display", "none")
                density_p.removeAttr("disabled")
                range_mmh2o.removeAttr("disabled")
        }
    })

    function calc_density_1() {
        density_p.val(function () {
            return Math.round(Number(range_mmh2o.val()) / (Number(distance_1.val()) - Number(distance_2.val())) * 100) / 100
        })
    }

    function calc_percents() {
        let res = (res_ma * 100 / 16) - 25
        result_percents.val(function () {
            if (res >= -10 && res <= 110) {
                return Math.round(res * 10) / 10
            }
            return ""
        })
    }

    function calc_ma() {
        calc_range()
        const range = Number(range_mmh2o.val())
        calc_lrv()
        calc_urv()
        const curr_distance = Number(distance_curr.val()) // %
        const press_current = curr_distance * density_p.val() // mmH20
        const ma = 16 / range // ma/mmH2O
        res_ma = 4 + ma * press_current
        result_ma.val(function () {
            if (res_ma >= 3.6 && res_ma <= 21.6) {
                return Math.round(res_ma * 100) / 100
            }
            return ""
        })

    }

    function calc_press_distance_1() {
        return Number(distance_1.val() * density_p.val())
    }

    function calc_press_distance_2() {
        return Number(distance_2.val() * density_p.val())
    }

    function calc_press_phase_2() {
        return Number(distance_1.val() * density_ff.val())
    }

    function calc_distance_1() {
        const res = Math.round(Number(distance_2.val()) + (Number(range_mmh2o.val()) / Number(density_p.val())))
        if (res) {
            distance_1.val(res);
        } else {
            distance_1.val("0")
        }
    }

    function calc_lrv() {
        let res_l = Number(distance_1.val())
        let res_h = Number(distance_2.val())
        if (calc !== "density") {
            if (liquid !== "gas") {
                if (liquid !== "phase_separation") {
                    lrv.val(function () {
                        res_l = res_l * Number(density_ff_val)
                        res_h = res_h * Number(density_p_val)
                        return -Math.round(res_l - res_h)
                    })
                } else {
                    lrv.val(function () {
                        if (density_ff.val() !== "" || density_ff.val() !== "0") {
                            res_l = res_l * Number(density_ff.val())
                        }
                        if (density_p.val() !== "" || density_p.val() !== "0") {
                            res_h = res_h * Number(density_p.val())
                        }
                        return -Math.round(res_l - res_h)
                    })
                }
            } else {
                lrv.val(function () {
                    return Math.round(Number(distance_2.val()) * Number(density_p_val))
                })
            }
        }
    }

    function calc_urv() {
        if (calc !== "density") {
            urv.val(function () {
                return Math.round((Number(lrv.val()) + Number(range_mmh2o.val())))
            })
        }
    }

    function calc_range() {
        if (liquid !== "phase_separation") {
            range_mmh2o.val(function () {
                return Math.round((calc_press_distance_1() - calc_press_distance_2()))
            })
        } else {
            range_mmh2o.val(function () {
                return Math.round((calc_press_distance_1() - calc_press_distance_2()) - calc_press_phase_2())
            })
        }
    }

    result_percents.on("input", function () {
        //todo
    })

    lrv.on("input", function () {
        range_mmh2o.val(function () {
            return Number(urv.val()) - Number(lrv.val())
        })
        if (calc === "density") {
            calc_density_1()
        }
    })
    urv.on("input", function () {
        range_mmh2o.val(function () {
            return Number(urv.val()) - Number(lrv.val())
        })
        if (calc === "density") {
            calc_density_1()
        }
    })
    distance_1.on("input", function () {
        if (calc === "density") {
            calc_density_1()
        } else {
            calc_ma();
            calc_percents()
        }
    })
    distance_2.on("input", function () {
        if (calc === "density") {
            calc_density_1()
        } else {
            calc_ma();
            calc_percents()
        }
    })
    distance_curr.on("input", function () {
        calc_ma()
        calc_percents()
    })
    density_p.on("input", function () {
        calc_ma()
        calc_percents()
    })
    density_ff.on("input", function () {
        calc_ma()
        calc_percents()
    })
    range_mmh2o.on("input", function () {
        calc_distance_1()
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

    density_p.on("focus", function () {
        data = get_focus(density_p, "density_p", keyboard)
        html = data.html
        res = data.result
        focus = data.focus
    })

    density_ff.on("focus", function () {
        data = get_focus(density_ff, "density_ff", keyboard)
        html = data.html
        res = data.result
        focus = data.focus
    })

    distance_1.on("focus", function () {
        data = get_focus(distance_1, "distance_1", keyboard)
        html = data.html
        res = data.result
        focus = data.focus
    })

    distance_2.on("focus", function () {
        data = get_focus(distance_2, "distance_2", keyboard)
        html = data.html
        res = data.result
        focus = data.focus
    })

    distance_curr.on("focus", function () {
        data = get_focus(distance_curr, "distance_curr", keyboard)
        html = data.html
        res = data.result
        focus = data.focus
    })

    range_mmh2o.on("focus", function () {
        data = get_focus(range_mmh2o, "range_mmh2o", keyboard)
        html = data.html
        res = data.result
        focus = data.focus
    })

    lrv.on("focus", function () {
        data = get_focus(lrv, "lrv", keyboard)
        html = data.html
        res = data.result
        focus = data.focus
    })

    urv.on("focus", function () {
        data = get_focus(urv, "urv", keyboard)
        html = data.html
        res = data.result
        focus = data.focus
    })

    result_percents.on("focus", function () {
        data = get_focus(result_percents, "result_percent", keyboard)
        html = data.html
        res = data.result
        focus = data.focus
    })

    result_ma.on("focus", function () {
        data = get_focus(result_ma, "result_ma", keyboard)
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
    $("#four").on("click", function () {
        window.navigator.vibrate(10)
        res = res + "4"
        $("#keyboard_input").children("span").html(res)
        html.val(() => {
            return res
        })
    })
    $("#five").on("click", function () {
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
            case "density_p":
                calc_ma()
                calc_percents()
                break
            case "density_ff":
                calc_ma()
                calc_percents()
                break
            case "distance_1":
                if (calc === "density") {
                    calc_density_1()
                } else {
                    calc_ma()
                    calc_percents()
                }
                break
            case "distance_2":
                if (calc === "density") {
                    calc_density_1()
                } else {
                    calc_ma();
                    calc_percents()
                }
                break
            case "distance_curr":
                calc_ma()
                calc_percents()
                break
            case "range_mmh2o":
                calc_distance_1()
                break
            case "lrv":
                range_mmh2o.val(function () {
                    return Number(urv.val()) - Number(lrv.val())
                })
                if (calc === "density") {
                    calc_density_1()
                }
                break
            case "urv":
                range_mmh2o.val(function () {
                    return Number(urv.val()) - Number(lrv.val())
                })
                if (calc === "density") {
                    calc_density_1()
                }
                break
            case "result_percent":
                // todo
                break
            case "result_ma":
                // todo
                break
        }
    })
    // End KEYBOARD
})
