$(document).ready(function ($) {

    //submit form check
    $('#btn-search').on('click',function(e){
        e.preventDefault();
        $('#error-message').empty();
        $('#list_check_booking').empty();
        let keyword=$('#keyword').val();
        if(keyword==''){
            $('#error-message').html('<div class=" col-lg-12 alert alert-danger fix-danger">'+
                                        ' Vui lòng nhập mã đơn đặt tour.'+
                                    '</div>');
        }else submit_check_form(keyword);
    });


    async function submit_check_form(keyword){
        let result;
        let url = base_url+"/check/check_booking";
        let data = {keyword:keyword};
        let success = function(responce) {
            let json_data = $.parseJSON(responce);
            if(json_data['total_record']>0){

                show_check_booking(json_data);
            }else{
                $('#error-message').html('<div class=" col-lg-12 alert alert-danger fix-danger">'+
                                            'Mã đơn đặt tour không tồn tại.'+
                                        '</div>');
            }
        };
        try {
            result = await $.post(url, data, success);
        }
        catch (error) {
            console.error(error);
        }
    }

    function show_check_booking(data){
        let list=$('#list_check_booking');
        list.empty();
        for (let i = 0; i < data['total_record']; i++) {
            let col12=$('<aside class="col-lg-12" id="sidebar"></aside>');
            let theiaStickySidebar=$('<div class="theiaStickySidebar"></div>');
            let box_style_1=$('<div class="box_style_1 expose" id="booking_box"></div>');
            box_style_1.append('<h3 class="inner">Mã đơn đặt:  '+data['result'][i].booking_code +'</h3>');
            box_style_1.append('<br>');
            let table=$('<table class="table table_summary"></table>');
            let tbody=$('<tbody class="text-center"><div>');
            let status="";
            if(data['result'][i].booking_status==1){
                status="Sắp tới";
            } else {
                        if(data['result'][i].booking_status==2) {status="Hoàn thành"}
                        else status="Hủy"
                    }
            
            let number_person=parseInt(data['result'][i].booking_num_adult)+parseInt(data['result'][i].booking_num_children)+parseInt(data['result'][i].booking_num_child);
            tbody.append('<tr><td class="check_table check_person">Người đặt</td><td>'+data['result'][i].cus_name+'<br>'+data['result'][i].cus_phone+'</td></tr>');
            tbody.append('<tr><td class="check_table">Tour</td><td><a href="'+base_url+'/tour/detail/'+data['result'][i].tour_slug+'">'+data['result'][i].tour_name+'</td></tr>');
            tbody.append('<tr><td class="check_table">Trạng thái</td><td>'+status+'</td></tr>');
            tbody.append('<tr><td class="check_table">Thời gian bắt đầu</td><td>'+data['result'][i].booking_start_date+'</td></tr>');
            tbody.append('<tr><td class="check_table">Số người</td><td>'+number_person+'</td></tr>');
            let total=format_curency(data['result'][i].booking_price);
            tbody.append('<tr><td class="check_table">Tổng tiền</td><td>'+total+' VNĐ </td></tr>');
            table.append(tbody);
            box_style_1.append(table);
            theiaStickySidebar.append(box_style_1);
            col12.append(theiaStickySidebar);   
            list.append(col12); 
        }

    }

});