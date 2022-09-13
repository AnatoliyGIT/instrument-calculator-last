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
    });
})
