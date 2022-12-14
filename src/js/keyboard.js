$(function ($) {

    const body = $("body")
    const modal = $('<div class="modal" id="keyboard" tabindex="-1" aria-labelledby="keyboard_label" aria-hidden="true">')
    const modal_dialog = $('<div class="modal-dialog modal-dialog-centered" id="modal-dialog">')
    const modal_content = $('<div class="modal-content">')
    const modal_body = $('<div class="modal-body">')
    const container_lg = $('<div class="container-lg">')

    const row_1 = $('<div class="row d-flex justify-content-center">')
    const col_1_1 = $('<div class="col d-flex justify-content-center m-2">')
    const keyboard_input_id = $('<a href="#" id="keyboard_input" class="fs-1 w-100 btn" disabled><span></span></a>')

    const row_2 = $('<div class="row d-flex justify-content-center">')
    const col_2_1 = $('<div class="col d-flex justify-content-center m-1">')
    const one_id = $('<a href="#" id="one" class="fs-1 w-100 btn m-1"><span>1</span></a>')
    const col_2_2 = $('<div class="col d-flex justify-content-center m-1">')
    const two_id = $('<a href="#" id="two" class="fs-1 w-100 btn m-1"><span>2</span></a>')
    const col_2_3 = $('<div class="col d-flex justify-content-center m-1">')
    const three_id = $('<a href="#" id="three" class="fs-1 w-100 btn m-1"><span>3</span></a>')
    const col_2_4 = $('<div class="col d-flex justify-content-center m-1">')
    const backspace_id = $('<a href="#" id="backspace" class="fs-1 w-100 btn m-1"><i class="fa fa-solid fa-delete-left"></i></a>')

    const row_3 = $('<div class="row d-flex justify-content-center">')
    const col_3_1 = $('<div class="col d-flex justify-content-center m-1">')
    const four_id = $('<a href="#" id="four" class="fs-1 w-100 btn m-1"><span>4</span></a>')
    const col_3_2 = $('<div class="col d-flex justify-content-center m-1">')
    const five_id = $('<a href="#" id="five" class="fs-1 w-100 btn m-1"><span>5</span></a>')
    const col_3_3 = $('<div class="col d-flex justify-content-center m-1">')
    const six_id = $('<a href="#" id="six" class="fs-1 w-100 btn m-1"><span>6</span></a>')
    const col_3_4 = $('<div class="col d-flex justify-content-center m-1">')
    const erase_id = $('<a href="#" id="erase" class="fs-1 w-100 btn m-1"><i class="fa-solid fa-eraser"></i></a>')

    const row_4 = $('<div class="row d-flex justify-content-center">')
    const col_4_1 = $('<div class="col d-flex justify-content-center m-1">')
    const seven_id = $('<a href="#" id="seven" class="fs-1 w-100 btn m-1"><span>7</span></a>')
    const col_4_2 = $('<div class="col d-flex justify-content-center m-1">')
    const eight_id = $('<a href="#" id="eight" class="fs-1 w-100 btn m-1"><span>8</span></a>')
    const col_4_3 = $('<div class="col d-flex justify-content-center m-1">')
    const nine_id = $('<a href="#" id="nine" class="fs-1 w-100 btn m-1"><span>9</span></a>')
    const col_4_4 = $('<div class="col d-flex justify-content-center m-1">')
    const btn_free = $('<button class="fs-1 w-100 btn m-1"></a>')

    const row_5 = $('<div class="row d-flex justify-content-center">')
    const col_5_1 = $('<div class="col d-flex justify-content-center m-1">')
    const minus_id = $('<a href="#" id="minus" class="fs-1 w-100 btn m-1"><i class="fa-solid fa-plus-minus"></i></a>')
    const col_5_2 = $('<div class="col d-flex justify-content-center m-1">')
    const zero_id = $('<a href="#" id="zero" class="fs-1 w-100 btn m-1"><span>0</span></a>')
    const col_5_3 = $('<div class="col d-flex justify-content-center m-1">')
    const dot_id = $('<a href="#" id="dot" class="w-100 btn m-1"><span>.</span></a>')
    const col_5_4 = $('<div class="col d-flex justify-content-center m-1">')
    const enter_id = $('<a href="#" id="enter" class="fs-1 w-100 btn m-1"><i class="fa fa-solid fa-check"></i></a>')

    modal.append(modal_dialog.append(modal_content.append(modal_body.append(container_lg))))
    container_lg
        .append(row_1
            .append(col_1_1.append(keyboard_input_id)))
        .append(row_2
            .append(col_2_1.append(one_id))
            .append(col_2_2.append(two_id))
            .append(col_2_3.append(three_id))
            .append(col_2_4.append(backspace_id)))
        .append(row_3
            .append(col_3_1.append(four_id))
            .append(col_3_2.append(five_id))
            .append(col_3_3.append(six_id))
            .append(col_3_4.append(erase_id)))
        .append(row_4
            .append(col_4_1.append(seven_id))
            .append(col_4_2.append(eight_id))
            .append(col_4_3.append(nine_id))
            .append(col_4_4.append(btn_free)))
        .append(row_5
            .append(col_5_1.append(minus_id))
            .append(col_5_2.append(zero_id))
            .append(col_5_3.append(dot_id))
            .append(col_5_4.append(enter_id)))

    body.append(modal)

})
