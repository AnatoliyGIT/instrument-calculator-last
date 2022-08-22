$(function($){

// PRESSURE
    let select_press_l = $("#press-units-left")[0]
    let select_press_r = $("#press-units-right")[0]
    let input = 0
    let unit_l = 10
    let unit_r = 10

// Обходим левый селектор в input записываем введенное значение, в unit_l записываем value текущего селектора в Мегапаскалях
    $.each(select_press_l, function(i) {
        select_press_l.options[i].foo = function() {
            input = Number($("#input-press").val())
            unit_l = Number(this.value)
        }
    })

// Обходим правый селектор в unit_r записываем value текущего селектора в Мегапаскалях
    $.each(select_press_r, function(i) {
        select_press_r.options[i].foo = function() {
            unit_r = Number(this.value)
        }
    })

// Функция калькулятор. Записывает в output вычисленное значение
    $("#calc-press").on("click", function() {
        select_press_l.options[select_press_l.selectedIndex].foo()
        select_press_r.options[select_press_r.selectedIndex].foo()
        $("#output-press").val( function() {
            if (input !== 0) {
                return Math.round((input * unit_r / unit_l) * 1000) / 1000
            }
            return 0
        })
    })


// TEMPERATURE
    let select_type = $("#temp-selector")[0]
    let select_type_termocouple = $("#termocouple")[0]
    let select_type_rtd = $("#rtd")[0]
    let type_temp
    let input_temp = 0
    let input_mv = 0
    let input_ohm = 0
    let rtd = false
    let rtd_100 = false
    let rtd_1000 = false
    let thermocouple = true
    let t = "type_k"
    let res = 0
    const obj_types = {
        "type_k": {
            "-250":-6.404,
            "-200":-5.891,
            "-150":-4.913,
            "-100":-3.554,
            "-50":-1.889,
            "0":0.000,
            "50":2.023,
            "100":4.096,
            "150":6.138,
            "200":8.138,
            "250":10.153,
            "300":12.209,
            "350":14.293,
            "400":16.397,
            "450":18.516,
            "500":20.644,
            "550":22.776,
            "600":24.905,
            "650":27.025,
            "700":29.129,
            "750":31.213,
            "800":33.275,
            "850":35.313,
            "900":37.326,
            "950":39.314,
            "1000":41.276,
            "1050":43.211,
            "1100":45.119,
            "1150":46.995,
            "1200":48.838,
            "1250":50.644,
            "1300":52.410,
            "1350":54.138
        },
        "type_j":{
            "0":0,
            "50":2.585,
            "100":5.269,
            "150":8.01,
            "200":10.779,
            "250":13.555,
            "300":16.327,
            "350":19.09,
            "400":21.848,
            "450":24.61,
            "500":27.393,
            "550":30.216,
            "600":33.102,
            "650":36.071,
            "700":39.132,
            "750":42.281,
            "800":45.494,
            "850":48.715,
            "900":51.877,
            "950":54.956,
            "1000":57.953,
            "1050":60.89,
            "1100":63.792,
            "1150":66.679,
            "1200":69.553
        },
        "type_t":{
            "-250":-6.180,
            "-200":-5.603,
            "-150":-4.648,
            "-100":-3.379,
            "-50":-1.819,
            "0":0.000,
            "50":2.036,
            "100":4.279,
            "150":6.704,
            "200":9.218,
            "250":12.013,
            "300":14.862,
            "350":17.898,
            "400":20.872
        },
        "type_r":{
            "0":0.000,
            "50":0.296,
            "100":0.647,
            "150":1.041,
            "200":1.469,
            "250":1.923,
            "300":2.401,
            "350":2.896,
            "400":3.408,
            "450":3.933,
            "500":4.471,
            "550":5.021,
            "600":5.583,
            "650":6.157,
            "700":6.743,
            "750":7.340,
            "800":7.950,
            "850":8.571,
            "900":9.205,
            "950":9.850,
            "1000":10.506,
            "1050":11.173,
            "1100":11.850,
            "1150":12.535,
            "1200":13.228,
            "1250":13.926,
            "1300":14.629,
            "1350":15.334,
            "1400":16.040,
            "1450":16.746,
            "1500":17.451,
            "1550":18.152,
            "1600":18.849,
            "1650":19.540,
            "1700":20.222,
            "1750":20.877
        },
        "type_s":{
            "0":0.000,
            "50":0.299,
            "100":0.646,
            "150":1.029,
            "200":1.441,
            "250":1.874,
            "300":2.323,
            "350":2.786,
            "400":3.259,
            "450":3.742,
            "500":4.233,
            "550":4.732,
            "600":5.239,
            "650":5.753,
            "700":6.275,
            "750":6.806,
            "800":7.345,
            "850":7.893,
            "900":8.449,
            "950":9.014,
            "1000":9.587,
            "1050":10.168,
            "1100":10.757,
            "1150":11.351,
            "1200":11.951,
            "1250":12.554,
            "1300":13.159,
            "1350":13.766,
            "1400":14.373,
            "1450":14.978,
            "1500":15.582,
            "1550":16.182,
            "1600":16.777,
            "1650":17.366,
            "1700":17.947,
            "1750":18.503
        },
        "type_e":{
            "-250":-9.718,
            "-200":-8.825,
            "-150":-7.279,
            "-100":-5.237,
            "-50":-2.787,
            "0":0.000,
            "50":3.048,
            "100":6.319,
            "150":9.789,
            "200":13.421,
            "250":17.181,
            "300":21.036,
            "350":24.964,
            "400":28.946,
            "450":32.965,
            "500":37.005,
            "550":41.053,
            "600":45.093,
            "650":49.116,
            "700":53.112,
            "750":57.080,
            "800":61.017,
            "850":64.922,
            "900":68.787,
            "950":72.603,
            "1000":76.373
        },
        "type_b":{
            "0":0.000,
            "50":0.002,
            "100":0.033,
            "150":0.092,
            "200":0.178,
            "250":0.291,
            "300":0.431,
            "350":0.596,
            "400":0.787,
            "450":1.002,
            "500":1.242,
            "550":1.505,
            "600":1.792,
            "650":2.101,
            "700":2.431,
            "750":2.782,
            "800":3.154,
            "850":3.546,
            "900":3.957,
            "950":4.387,
            "1000":4.834,
            "1050":5.299,
            "1100":5.780,
            "1150":6.276,
            "1200":6.786,
            "1250":7.311,
            "1300":7.848,
            "1350":8.397,
            "1400":8.956,
            "1450":9.524,
            "1500":10.099,
            "1550":10.679,
            "1600":11.263,
            "1650":11.848,
            "1700":12.433,
            "1750":13.014,
            "1800":13.591
        }
    }

    const obj_rtds = {
        "rtd_100": {
            "-200":[18.52,39.722],
            "-150":[39.723,60.255],
            "-100":[60.256,80.305],
            "-50":[80.306,99.999],
            "0":[100,119.396],
            "50":[119.397,138.504],
            "100":[138.505,157.324],
            "150":[157.325,175.855],
            "200":[175.856,194.097],
            "250":[194.098,212.051],
            "300":[212.052,229.715],
            "350":[229.716,247.091],
            "400":[247.092,264.179],
            "450":[264.180,280.979],
            "500":[280.980,297.489],
            "550":[297.490,313.709],
            "600":[313.710,329.639],
            "650":[329.640,345.279],
            "700":[345.280,360.639],
            "750":[360.640,375.699],
            "800":[375.700,390.479],
            "850":[390.480,390.481],
        },
        "rtd_1000": {
            "-200":[185.20,397.229],
            "-150":[397.23,602.559],
            "-100":[602.56,803.059],
            "-50":[803.06,999.999],
            "0":[1000,1193.969],
            "50":[1193.97,1385.049],
            "100":[1385.05,1573.249],
            "150":[1573.25,1758.559],
            "200":[1758.56,1940.979],
            "250":[1940.98,2120.519],
            "300":[2120.52,2297.159],
            "350":[2297.16,2470.919],
            "400":[2470.92,2641.799],
            "450":[2641.80,2809.799],
            "500":[2809.80,2974.899],
            "550":[2974.90,3137.099],
            "600":[3137.10,3296.399],
            "650":[3296.40,3452.799],
            "700":[3452.80,3606.399],
            "750":[3606.40,3756.999],
            "800":[3757.00,3904.799],
            "850":[3904.80,3904.801],
        }
    }

    $.each(select_type, function(i) {
        select_type.options[i].foo = function() {
            type_temp = this.value
            $("#input-termocouple").val(function() {
                return ""
            })
            $("#input-rtd").val(function() {
                return ""
            })
            if (i === 0) {
                rtd = false
                rtd_100 = false
                rtd_1000 = false
                thermocouple = true
            } else {
                rtd = true
                rtd_100 = true
                rtd_1000 = false
                thermocouple = false
            }
        }
    })

    let obj_thermocouples = {
        "k": "(-200...+1250)",
        "j": "(0...+750)",
        "t": "(-200...+350)",
        "r": "(0...+1450)",
        "s": "(0...+1450)",
        "e": "(-200...+900)",
        "b": "(0...+1700)"
    }

    let type_thermocouple = "k"

    $("#temp-selector").on("change", function() {
        select_type.options[select_type.selectedIndex].foo()
        if (type_temp === "termocouple") {
            $("#termocouple-div").css( "display", "block" );
            $("#rtd-div").css( "display", "none" );
            $("#temp-right").text("(-200...+1250)")

        } else {
            $("#termocouple-div").css( "display", "none" );
            $("#rtd-div").css( "display", "block" );
            $("#temp-right").text("(-200...+850)")
        }

        $("#input-termocouple").val(function() {return ""})
        $("#input-rtd").val(function() {return ""})
    })

    $.each(select_type_termocouple, function(i) {
        select_type_termocouple.options[i].foo = function() {
            type_thermocouple = this.value
            for (const temp in obj_thermocouples) {
                if (type_thermocouple === temp) {
                    $("#temp-right").text(obj_thermocouples[temp])
                }
            }

            switch(type_thermocouple) {
                case "j":
                    t = "type_j"
                    break;
                case "t":
                    t = "type_t"
                    break;
                case "r":
                    t = "type_r"
                    break;
                case "s":
                    t = "type_s"
                    break;
                case "e":
                    t = "type_e"
                    break;
                case "b":
                    t = "type_b"
                    break;
                default:
                    t = "type_k"
            }
        }
    })

    $.each(select_type_rtd, function(i) {
        select_type_rtd.options[i].foo = function() {
            $("#temp-right").text("(-200...+850)")
            if (i === 0) {
                rtd_100 = true
                rtd_1000 = false
                thermocouple = false
            } else {
                rtd_100 = false
                rtd_1000 = true
                thermocouple = false
            }
        }
    })

    let ohm_mv_calc = function(input_temp) {
        const inp = Number(input_temp)
        $("#input-rtd").val(function() {
            let output = 18.5
            if (rtd && !thermocouple) {
                if (inp < -200 || inp === "") {
                    $("#input-temp").val(function() {
                        if (rtd_100 && !rtd_1000) {
                            output = 18.5
                            return -200
                        }
                        if (!rtd_100 && rtd_1000) {
                            output = 185.2
                            return -200
                        }
                    })
                    return output
                }
                if (inp > 850) {
                    $("#input-temp").val(function() {
                        if (rtd_100 && !rtd_1000) {
                            output = 390.5
                            return 850
                        }
                        if (!rtd_100 && rtd_1000) {
                            output = 3904.8
                            return 850
                        }
                    })
                    return output
                }
                if (rtd_100 && !rtd_1000) {
                    for (let temp in obj_rtds.rtd_100) {
                        temp = Number(temp)
                        if (inp >= temp && inp < temp + 50) {
                            const start = Math.round((obj_rtds.rtd_100[temp][0]) * 10) / 10
                            const stop = Math.round((obj_rtds.rtd_100[temp][1]) * 10) / 10
                            return Math.round((start + ((stop - start) / 50) * (inp - temp)) * 10) / 10
                        }
                    }
                }
                if (!rtd_100 && rtd_1000) {
                    for (let temp in obj_rtds.rtd_1000) {
                        temp = Number(temp)
                        if (inp >= temp && inp < temp + 50) {
                            const start = Math.round((obj_rtds.rtd_1000[temp][0]) * 10) / 10
                            const stop = Math.round((obj_rtds.rtd_1000[temp][1]) * 10) / 10
                            return Math.round((start + ((stop - start) / 50) * (inp - temp)) * 10) / 10
                        }
                    }
                }
            }
            if (!rtd && thermocouple) {
                $("#input-termocouple").val(function() {
                    for (let type in obj_types) {
                        for (let temp in obj_types[type]) {
                            temp = Number(temp)
                            if (inp >= temp && inp <= temp + 50) {
                                const start = Math.round((obj_types[t][temp]) * 1000) / 1000
                                const stop = Math.round((obj_types[t][temp + 50]) * 1000) / 1000
                                res = Math.round((start + ((stop - start) / 50) * (inp - temp)) * 1000) / 1000
                                // console.log(start, ',', stop)
                                return res
                            }
                        }
                    }
                })
            }
            return "error"
        })
    }

    let temp_calc = function(ohm_mv) {
        $("#input-temp").val(function() {
            ohm_mv = Number(ohm_mv)
            if (rtd && !thermocouple) {
                if (rtd_100 && !rtd_1000) {
                    if (ohm_mv <= 18.5) {
                        ohm_mv = 18.5
                        $("#input-rtd").val(function() {
                            return 18.5
                        })
                    }
                    if (ohm_mv >= 390.48) {
                        ohm_mv = 390.48
                        $("#input-rtd").val(function() {
                            return 390.5
                        })
                    }
                    for (let temp in obj_rtds.rtd_100) {
                        if (ohm_mv >= obj_rtds.rtd_100[temp][0] && ohm_mv <= obj_rtds.rtd_100[temp][1]) {
                            temp = Number(temp)
                            // y = ((x - b) / a) + temp
                            const x = ohm_mv
                            const a = (obj_rtds.rtd_100[temp][1] - obj_rtds.rtd_100[temp][0]) / 50
                            const b = obj_rtds.rtd_100[temp][0]
                            const y = (x - b) / a
                            return Math.round((y + temp) * 10) / 10
                        }
                    }
                }
                if (rtd_1000 && !rtd_100) {
                    if (ohm_mv < 185.2) {
                        ohm_mv = 185.2
                        $("#input-rtd").val(function() {
                            return 185.2
                        })
                    }
                    if (ohm_mv > 3904.80) {
                        ohm_mv = 3904.80
                        $("#input-rtd").val(function() {
                            return 3904.80
                        })
                    }
                    for (let temp in obj_rtds.rtd_1000) {
                        if (ohm_mv >= obj_rtds.rtd_1000[temp][0] && ohm_mv <= obj_rtds.rtd_1000[temp][1]) {
                            temp = Number(temp)
                            const x = ohm_mv
                            const a = (obj_rtds.rtd_1000[temp][1] - obj_rtds.rtd_1000[temp][0]) / 50
                            const b = obj_rtds.rtd_1000[temp][0]
                            const y = (x - b) / a
                            return Math.round((y + temp) * 10) / 10
                        }
                    }
                }
            }
            if (!rtd && thermocouple) {
                for (let type in obj_types) {
                    for (let temp in obj_types[type]) {
                        temp = Number(temp)
                        // console.log(temp)
                        if (ohm_mv >= obj_types[t][temp] && ohm_mv <= obj_types[t][temp + 50]) {
                            const x = ohm_mv
                            const a = (obj_types[t][temp + 50] - obj_types[t][temp]) / 50
                            const b = obj_types[t][temp]
                            const y = (x - b) / a
                            return Math.round((y + temp) * 10) / 10
                        }

                    }
                }
            }
            return "error"
        })
    }

    $("#termocouple").on("change", function() {
        select_type_termocouple.options[select_type_termocouple.selectedIndex].foo()
    })

    $("#rtd").on("change", function() {
        select_type_rtd.options[select_type_rtd.selectedIndex].foo()
    })


    $("#calc-temp-left").on("click", function() {
        ohm_mv_calc($("#input-temp").val())
    })

    $("#calc-temp-right").on("click", function() {
        input_mv = 0
        input_ohm = 0
        Number($("#input-termocouple").val()) ? input_mv = $("#input-termocouple").val() : input_mv
        Number($("#input-rtd").val()) ? input_ohm = $("#input-rtd").val() : input_ohm
        if (!rtd && thermocouple) {
            temp_calc(input_mv)
        } else {
            temp_calc(input_ohm)
        }
    })

})
