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
})
