$('input.time-pick').timepicker({
			minuteStep: 15,
			showInpunts: false
		})

jQuery('#sidebar').theiaStickySidebar({
			additionalMarginTop: 80
		});

$('input').iCheck({
		   checkboxClass: 'icheckbox_square-grey',
		   radioClass: 'iradio_square-grey'
		 });

$(document).ready(function ($) {
	$('.btn_checkout').on('click',function(e){
		e.preventDefault();
		//$("#loading").show();
		var x = document.getElementById("loading");
        x.style.display = 'inline-block';
		$('#error-message').empty();
		let tour_id  = $('#tour_id').val();
		let tour_name  = $('#tour_name').val();
		let date_start  = $('#date_start').val();
		let num_adult = $('#num_adult').data('value');
		let num_children = $('#num_children').data('value');
		let num_child = $('#num_child').data('value');
		let name=$('#name').val();
		let email=$('#email_cus').val();
		let phone=$('#phone').val();
		let address=$('#address').val();
		let checkbox = $('#policy_terms');
		if(name==''||email==''||phone==''||address==''){
			$('#error-message').html('<div class=" col-lg-12 alert alert-danger fix-danger">'+
                                        'Vui lòng nhập đầy đủ các thông tin cần thiết.'+
                                    '</div>');
		}else if (!isEmail(email)) {
			$('#error-message').html('<div class=" col-lg-12 alert alert-danger fix-danger">'+
                                        'Địa chỉ email bạn vừa nhập không hợp lệ, vui lòng nhập lại..'+
                                    '</div>');
		}else if(isNaN(phone)){
			$('#error-message').html('<div class=" col-lg-12 alert alert-danger fix-danger">'+
	                                        'Vui lòng nhập số vào trường số điện thoại.'+
	                                    '</div>');
		}else if(phone.length!=10){
			$('#error-message').html('<div class=" col-lg-12 alert alert-danger fix-danger">'+
	                                        'Số điện thoại có 10 chữ số.'+
	                                    '</div>');
		}else if(!$('#policy_terms').is(':checked')){
			$('#error-message').html('<div class=" col-lg-12 alert alert-danger fix-danger">'+
		                                        'Vui lòng đồng ý với các điều khoản của chúng tôi.'+
		                                    '</div>');
		}else{
			let data= {
			tour_id: tour_id,
			tour_name:tour_name,
			date_start:date_start,
			num_adult:num_adult,
			num_children:num_children,
			num_child:num_child,
			name:name,
			email:email,
			phone:phone,
			address:address
			};
			submit_checkout_form(data);
			//$("#loading").hide();
		}
	});
});

function isEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

//submit form booking --> send ajax to server
async function submit_checkout_form(data){
	let result;
	
    let url = base_url+"/tour/submit_checkout_tour";
    let success = function(responce) {
		let json_data = $.parseJSON(responce);
		if(json_data['status']){
			$('#loading').hide();
			window.location.href = base_url+"/tour/confirmation?bookingnumber="+json_data['id'];
		}	
		else
			$('#error-message').text(json_data['message']);
    };
    try {
		result = await $.post(url, data, success);
	}
	catch (error) {
        console.error(error);
    }
}


