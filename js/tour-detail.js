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
	$('#Img_carousel').sliderPro({
				width: 960,
				height: 500,
				fade: true,
				arrows: true,
				buttons: false,
				fullScreen: false,
				smallSize: 500,
				startSlide: 0,
				mediumSize: 1000,
				largeSize: 3000,
				thumbnailArrows: true,
				autoplay: false
	});
	//change value of booking form
	$('input#adults').on('change',function(){
		let num_adults=$(this).val();

		if(num_adults>=20){
			$(this).val(20);
			num_adults=20;
		}
		if(num_adults==''||isNaN(num_adults)){
			$(this).val(0);
			num_adults=0;
		}
		change_value_booking_form('adults',num_adults);
	});
	$('input#childrens').on('change',function(){
		let num=$(this).val();
		if(num>=20){
			$(this).val(20);
			num=20;
		}
		if(num==''||isNaN(num)){
			$(this).val(0);
			num=0;
		}
		change_value_booking_form('childrens',num);
	});
	$('input#childs').on('change',function(){
		let num=$(this).val();
		if(num>=20){
			$(this).val(20);
			num=20;
		}
		if(num==''||isNaN(num)){
			$(this).val(0);
			num=0;
		}
		change_value_booking_form('childs',num);
	});
	//end block change value booking form

	//submit form booking
	$('#btn_booking').on('click',function(e){
		e.preventDefault();
		$('#error-message').empty();
		let tour_id  = $('#tour_id').val();
		let tour_name  = $('#tour_name').val();
		let date_get_tour= new Date($('#date_start').datepicker('getDate'));
		if(isNaN(date_get_tour)){
			$('#error-message').text('Vui lòng chọn ngày đi...');
		}
		else{
			let string_date=date_get_tour.getFullYear()+'-'+date_get_tour.getMonth()+'-'+date_get_tour.getDate();
			let date_start  = string_date;
			let time_start = $('#time_start').val();
			if(time_start==''){
				$('#error-message').text('Vui lòng chọn giờ đi...');
			}
			else{
				let num_adults = $('#adults').val();
				let num_childrens = $('#childrens').val();
				let num_childs = $('#childs').val();
				let price_adult=$('#num_adults').data('price');
				let price_children=$('#num_childrens').data('price');
				let price_child=$('#num_childs').data('price');
				let data= {
					tour_id: tour_id,
					tour_name:tour_name,
					date_start:date_start,
					time_start:time_start,
					num_adults:num_adults,
					num_childrens:num_childrens,
					num_childs:num_childs,
					price_adult:price_adult,
					price_children:price_children,
					price_child:price_child
				};
				submit_booking_form(data);
			}
			
		}
		
	});
});

function change_value_booking_form(target,value){
	$('#num_'+target).text(value);
	let price_adult=$('#num_adults').data('price');
	let price_children=$('#num_childrens').data('price');
	let price_child=$('#num_childs').data('price');
	let total_cost=price_adult*$('#adults').val()+price_children*$('#childrens').val()+price_child*$('#childs').val();
	$('#total_cost').text(format_curency(total_cost.toString()));
}

//submit form booking --> send ajax to server
async function submit_booking_form(data){
	let result;
	
    let url = base_url+"/tour/submit_booking_tour";
    let success = function(responce) {
		let json_data = $.parseJSON(responce);
		if(json_data['status']){
			window.location.href = base_url+"/tour/payment?num_adults="+data.num_adults+"&num_childrens="
			+data.num_childrens+"&num_childs="+data.num_childs+"&tour_id="+data.tour_id+"&date_start="
			+data.date_start+"&tour_name="+data.tour_name;
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


