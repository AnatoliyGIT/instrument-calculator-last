$(function ($) {

    const selector_liquid = $("#selector-liquid")
    const density_ff = $("#density-ff")
    const density_p = $("#density-p")
    const distance_1 = $("#distance-1")
    const distance_2 = $("#distance-2")
    const distance_curr = $("#distance-curr")
    const range = $("#range")
    const lrv = $("#lrv")
    const urv = $("#urv")
    const result_ma = $("#result-ma")
    const result_percents = $("#result-percents")
    let liquid = "gas"
    let res_ma = 0



    $.each(selector_liquid[0], function (i) {
        selector_liquid[0].options[i].foo = function () {
            liquid = this.value
        }
    })

    selector_liquid.on("change", function (i) {
        selector_liquid[0].options[selector_liquid[0].selectedIndex].foo()
    })

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

    }

    function calc_distance_1() {

    }

    function calc_distance_2() {

    }

    function calc_lrv() {
        let res_l = 0
        let res_h = 0
        let res = 0
        if (liquid !== "gas") {
            lrv.val(function () {
                res_l = Number(distance_1.val())
                res_h = Number(distance_2.val())
                if (density_ff.val() !== "") {
                    res_l = res_l * Number(density_ff.val())
                }
                if (density_p.val() !== "") {
                    res_h = res_h * Number(density_p.val())
                }
                res = res_l - res_h
                console.log(res_l, res_h, res)
                return -res;
            });
        } else {
            lrv.val(function () {
                console.log(distance_2.val(), density_p.val())
                return -Number(distance_2.val()) * Number(density_p.val())
            });
        }
    }

    function calc_urv() {
        urv.val(function () {
            return Number(lrv.val()) + Number(range.val())
        });
    }

    result_percents.on("input", function () {
        calc_lrv()
        calc_urv()
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
            if (width > height) {
                $("#modal-dialog").css("max-width", function () {
                    return "60vw"
                })
            } else {
                $("#modal-dialog").css("max-width", function () {
                    return "95vw"
                })
            }
            html = i_html
            res = html.val()
            k_board.show()
        }
        return {
            "html": i_html,
            "focus": focus,
            "result": res
        }
    }

    result_percents.on("focus", function () {
        data = get_focus(result_percents, "result_percent", keyboard)
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
            case "result_percent":
                calc_lrv()
                calc_urv()
        }
    })
    // End KEYBOARD
})
