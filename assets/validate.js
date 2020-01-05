/* <![CDATA[ */
/// Jquery validate newsletter
jQuery(document).ready(function(){

	$('#newsletter_2').submit(function(){

		var action = $(this).attr('action');

		$("#message-newsletter_2").slideUp(750,function() {
		$('#message-newsletter_2').hide();
		
		$('#submit-newsletter_2')
			.after('<i class="icon-spin4 animate-spin loader"></i>')
			.attr('disabled','disabled');

		$.post(action, {
			email_newsletter_2: $('#email_newsletter_2').val()
		},
			function(data){
				document.getElementById('message-newsletter_2').innerHTML = data;
				$('#message-newsletter_2').slideDown('slow');
				$('#newsletter_2 .loader').fadeOut('slow',function(){$(this).remove()});
				$('#submit-newsletter_2').removeAttr('disabled');
				if(data.match('success') != null) $('#newsletter_2').slideUp('slow');

			}
		);

		});

		return false;

	});

});
// Jquery validate form contact
jQuery(document).ready(function(){

	$('#contactform').submit(function(){
	'use strict';
		var action = $(this).attr('action');

		$("#message-contact").slideUp(750,function() {
		$('#message-contact').hide();

 		$('#submit-contact')
			.after('<i class="icon-spin4 animate-spin loader"></i>')
			.attr('disabled','disabled');
			
		$.post(action, {
			name_contact: $('#name_contact').val(),
			lastname_contact: $('#lastname_contact').val(),
			email_contact: $('#email_contact').val(),
			phone_contact: $('#phone_contact').val(),
			message_contact: $('#message_contact').val(),
			verify_contact: $('#verify_contact').val()
		},
			function(data){
				document.getElementById('message-contact').innerHTML = data;
				$('#message-contact').slideDown('slow');
				$('#contactform .loader').fadeOut('slow',function(){$(this).remove()});
				$('#submit-contact').removeAttr('disabled');
				if(data.match('success') != null) $('#contactform').slideUp('slow');

			}
		);

		});

		return false;

	});
		});
		
/// Jquery validate review tour
jQuery(document).ready(function(){

	$('#review_tour').submit(function(){
		let action = base_url+"/tour/submit_review_tour";

		$("#message-review").slideUp(750,function() {
			$('#message-review').hide();
			
			$('#submit-review')
				.after('<i class="icon-spin4 animate-spin loader"></i>')
				.attr('disabled','disabled');
			let validate = validate_review_tour(
				$('#name_review').val(),
				$('#email_review').val(),
				$('#position_review').val(),
				$('#guide_review').val(),
				$('#price_review').val(),
				$('#quality_review').val(),
				$('#review_text').val()
			);

			if(validate.match('success') != null){
				let date_get_tour= new Date($('#date_get_tour').datepicker('getDate'));
				let string_date=date_get_tour.getFullYear()+'-'+date_get_tour.getMonth()+'-'+date_get_tour.getDate();
				$.post(action, {
					tour_id: $('#tour_id').val(),
					name_review: $('#name_review').val(),
					date_get_tour: string_date,
					email_review: $('#email_review').val(),
					position_review: $('#position_review').val(),
					guide_review: $('#guide_review').val(),
					price_review: $('#price_review').val(),
					quality_review: $('#quality_review').val(),
					review_text: $('#review_text').val(),
					
				},
				
					function(data){
						let json_data=$.parseJSON(data);
						document.getElementById('message-review').innerHTML = json_data['message'];
						$('#message-review').slideDown('slow');
						$('#review_tour .loader').fadeOut('slow',function(){$(this).remove()});
						$('#submit-review').removeAttr('disabled');
						if(json_data['status']) $('#review_tour').slideUp('slow');
		
					}
				);
			}
			else{
				document.getElementById('message-review').innerHTML = validate;
				$('#message-review').slideDown('slow');
				$('#review_tour .loader').fadeOut('slow',function(){$(this).remove()});
				$('#submit-review').removeAttr('disabled');
			}
		

		});

		return false;

	});

});

function validate_review_tour(
								name_review,
								email_review,
								position_review,
								guide_review,
								price_review,
								quality_review,
								review_text)
{
	let result="";
	if(name_review.trim() == '') {
		result = '<div class="error_message">Bạn phải nhập tên của bạn.</div>';
	}else if(email_review.trim() == '') {
		result = '<div class="error_message">Vui lòng nhập một địa chỉ email hợp lệ.</div>';
		
	} else if(!isEmail(email_review)) {
		result = '<div class="error_message">Bạn đã nhập một địa chỉ email không hợp lệ, hãy thử lại.</div>';	
	} else if(position_review.trim() == '') {
		result = '<div class="error_message">Vui lòng đánh giá địa điểm.</div>';
		
	} else if(guide_review.trim() == '') {
		result = '<div class="error_message">Vui lòng đánh giá hướng dẫn viên du lịch.</div>';
		
	} else if(price_review.trim() == '') {
		result = '<div class="error_message">Vui lòng đánh giá giá tour.</div>';
		
	} else if(quality_review.trim() == '') {
		result = '<div class="error_message">Vui lòng đánh giá chất lượng.</div>';
		
	} else if(review_text.trim() == '') {
		result = '<div class="error_message">Vui lòng nhập đánh giá của bạn.</div>';
	}
	else{
		// Success message
		result="<div id='success_page' style='padding:20px 0'>"+
			+"<strong >Email Sent.</strong>"+
			+"Thank you <strong>$name_review</strong>,<br> your review has been submitted."+
			+"</div>";
	}
	return result;
}

function isEmail(email){
	let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(email)) {
		return true;
	} else {
		return false;
	}
}
// Jquery validate review hotel
jQuery(document).ready(function(){

	$('#review_hotel').submit(function(){

		var action = $(this).attr('action');

		$("#message-review").slideUp(750,function() {
		$('#message-review').hide();
		
		$('#submit-review')
			.after('<i class="icon-spin4 animate-spin loader"></i>')
			.attr('disabled','disabled');

		$.post(action, {
			hotel_name: $('#hotel_name').val(),
			name_review: $('#name_review').val(),
			lastname_review: $('#lastname_review').val(),
			email_review: $('#email_review').val(),
			room_type_review: $('#room_type_review').val(),
			cleanliness_review: $('#cleanliness_review').val(),
			comfort_review: $('#comfort_review').val(),
			price_review: $('#price_review').val(),
			quality_review: $('#quality_review').val(),
			review_text: $('#review_text').val(),
			verify_review: $('#verify_review').val()
		},
		
			function(data){
				document.getElementById('message-review').innerHTML = data;
				$('#message-review').slideDown('slow');
				$('#review_hotel .loader').fadeOut('slow',function(){$(this).remove()});
				$('#submit-review').removeAttr('disabled');
				if(data.match('success') != null) $('#review_hotel').slideUp('slow');

			}
		);

		});

		return false;

	});

});
// Jquery validate review transfer
jQuery(document).ready(function(){

	$('#review_transfer').submit(function(){

		var action = $(this).attr('action');

		$("#message-review").slideUp(750,function() {
		$('#message-review').hide();
		
		$('#submit-review')
			.after('<i class="icon-spin4 animate-spin loader"></i>')
			.attr('disabled','disabled');

		$.post(action, {
			transfer_name: $('#transfer_name').val(),
			name_review: $('#name_review').val(),
			lastname_review: $('#lastname_review').val(),
			email_review: $('#email_review').val(),
			comfort_review: $('#comfort_review').val(),
			punctuality_review: $('#punctuality_review').val(),
			price_review: $('#price_review').val(),
			kindness_review: $('#kindness_review').val(),
			review_text: $('#review_text').val(),
			verify_review: $('#verify_review').val()
		},
		
			function(data){
				document.getElementById('message-review').innerHTML = data;
				$('#message-review').slideDown('slow');
				$('#review_transfer .loader').fadeOut('slow',function(){$(this).remove()});
				$('#submit-review').removeAttr('disabled');
				if(data.match('success') != null) $('#review_transfer').slideUp('slow');

			}
		);

		});

		return false;

	});

});
/// Jquery validate review restaurant
jQuery(document).ready(function(){

	$('#review_restaurant').submit(function(){

		let action = base_url+"/restaurant/submit_review_restaurant";

		$("#message-review").slideUp(750,function() {
			$('#message-review').hide();
			
			$('#submit-review')
					.after('<i class="icon-spin4 animate-spin loader"></i>')
					.attr('disabled','disabled');
				let validate = validate_review_restaurant(
					$('#name_review').val(),
					$('#email_review').val(),
					$('#view_review').val(),
					$('#waiter_review').val(),
					$('#quality_review').val(),
					$('#review_text').val()
				);
			if(validate.match('success')!=null){
				$.post(action, {
					restaurant_id:$('#restaurant_id').val(),
					name_review: $('#name_review').val(),
					email_review: $('#email_review').val(),
					view_review:$('#view_review').val(),
					waiter_review:$('#waiter_review').val(),
					quality_review: $('#quality_review').val(),
					review_text: $('#review_text').val(),
				},
				
				function(data){
					let json_data=$.parseJSON(data);
					document.getElementById('message-review').innerHTML = json_data['message'];
					$('#message-review').slideDown('slow');
					$('#review_restaurant .loader').fadeOut('slow',function(){$(this).remove()});
					$('#submit-review').removeAttr('disabled');
					if(json_data['status']) $('#review_restaurant').slideUp('slow');

				}
				);
			}
			else{
				document.getElementById('message-review').innerHTML = validate;
				$('#message-review').slideDown('slow');
				$('#review_restaurant .loader').fadeOut('slow',function(){$(this).remove()});
				$('#submit-review').removeAttr('disabled');
			}
		});

		return false;

	});

});
  /* ]]> */
  function validate_review_restaurant(
										name_review,
										email_review,
										view_review,
										waiter_review,
										quality_review,
										review_text)
	{
	let result="";
	if(name_review.trim() == '') {
	result = '<div class="error_message">Bạn phải nhập tên của bạn.</div>';
	}else if(email_review.trim() == '') {
	result = '<div class="error_message">Vui lòng nhập địa chỉ email liên hệ của bạn.</div>';

	} else if(!isEmail(email_review)) {
	result = '<div class="error_message">Bạn đã nhập một địa chỉ email không hợp lệ, hãy thử lại.</div>';	
	} else if(view_review.trim() == '') {
	result = '<div class="error_message">Vui lòng đánh giá cảnh của nhà hàng.</div>';

	} else if(waiter_review.trim() == '') {
	result = '<div class="error_message">Vui lòng đánh giá nhân viên phục vụ nhà hàng.</div>';

	} else if(quality_review.trim() == '') {
	result = '<div class="error_message">Vui lòng đánh giá chất lượng.</div>';

	} else if(review_text.trim() == '') {
	result = '<div class="error_message">Vui lòng nhập đánh giá của bạn.</div>';
	}
	else{
	// Success message
	result="<div id='success_page' style='padding:20px 0'>"
	+"<strong >Email Sent.</strong>"
	+"Thank you <strong>"+name_review+"</strong>,<br> your review has been submitted."
	+"</div>";
	}
	return result;
	}
  /* ]]> */