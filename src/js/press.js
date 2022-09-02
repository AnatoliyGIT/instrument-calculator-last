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
    let additive = 0

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
                // additive = Math.round((-1 * 101.97 / unit_l) * 1000) / 1000
            }
        }
    })

// Обходим правый тип давления
    $.each(select_type_r, function (i) {
        select_type_r.options[i].foo = function () {
            if (i === 1) {
                // console.log("additive")
            }
        }
    })

// Функция калькулятор. Записывает в output вычисленное значение
    let result = function () {
        let add = additive
        additive = 0
        select_l.options[select_l.selectedIndex].foo()
        select_r.options[select_r.selectedIndex].foo()
        select_type_l.options[select_type_l.selectedIndex].foo()
        select_type_r.options[select_type_r.selectedIndex].foo()
        output_press.val(function () {
            return Math.round((input * unit_r / unit_l) * 1000) / 1000 + add
        })
    }

    select_press_l.on("change", function () {
        return result()
    })
    select_press_r.on("change", function () {
        return result()
    })
    input_press.on("input", function () {
        return result()
    })
})
