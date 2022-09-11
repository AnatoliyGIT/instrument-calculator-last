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

    selector_output.on("change", function (i) {
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
})
