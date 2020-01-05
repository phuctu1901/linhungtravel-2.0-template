$(function() {
	
		$('input.time-pick').timepicker({
			minuteStep: 15,
			showInpunts: false
		});
	$('#cat_nav').mobileMenu();
	$('input').iCheck({
		   checkboxClass: 'icheckbox_square-grey',
		   radioClass: 'iradio_square-grey'
		 });
		get_list_transfers();
});
function show_list_transfers(data) {
	let list = $('#list_transfer_list');
	list.empty();
	if(data['total_record']==0){
		list.append("<p class='noti-filter__result'><strong>Không có kết quả nào cho tìm kiếm của bạn</strong><br/><span>Thử xóa những tiêu chí bạn đã chọn xem sao!</span></p>");
	}
	else
	{
		for (let i = 0; i < data['total_record']/2; i++) {
			let tr = $('<ul class="strip_all_tour_list wow fadeIn" data-wow-delay="0.1s" style="visibility: visible; animation-delay: 0.1s; animation-name: fadeIn;">');
			let r=$('<div class="row"></div>');
			let col4=$('<div class="col-lg-4 col-md-4"></div>');
			let col6=$('<div class="col-lg-6 col-md-6"></div>');
			let col2=$('<div class="col-lg-2 col-md-2"></div>');
		
					if(data[i].car_label!=null){
						if(data[i].car_label=="phổ biến"){
							col4.append('<div class="ribbon_3 popular"><span>'+data[i].car_label+'</span></div>');
						}else{
							col4.append('<div class="ribbon_3"><span>'+data[i].car_label+'</span></div>');
						}
					}		
					col4.append('<div class="wishlist">'+
						'<a class="tooltip_flip tooltip-effect-1" href="javascript:void(0);">+<span class="tooltip-content-flip">'+
						'<span class="tooltip-back">Add to wishlist</span>'+
						'</span></a></div>');
					col4.append('<div class="img_list">'+
									'<a href="detail/'+data[i].car_slug+'"><img data-src="'+data[i].car_thumnail+'" alt="'+data[i].car_name+'" class="lazyload">'+
									'<div class="short_info"></div>'+
									'</a>'+
								'</div>');
					
	
					let transfer_list_desc=$('<div class="tour_list_desc"></div>');
					let vote="";
					for(let j=0;j<5;j++){
						if(data[i].avg_rev>j)
							vote+='<i class="icon-smile voted"></i>';
						else
							vote+='<i class="icon-smile"></i>';
					}
					transfer_list_desc.append('<div class="rating">'+vote+
											'<small>('+data[i].num_rev+')</small>'+
										'</div>');
					transfer_list_desc.append('<h3><strong>'+data[i].car_name+'</strong></h3>');
					
					let except="";
					if(data[i].car_except==null){
						except=getWords(data[i].car_description,30)+'...';
					}else{
						except=getWords(data[i].car_except,30)+'...';
					}
					transfer_list_desc.append('<p>'+except+'</p>');

					let add_info=$('<ul class="add_info"></ul>');
					add_info.append('<li><div class="tooltip_styled tooltip-effect-4">'+
						'<span class="tooltip-item"><i class=" icon_set_1_icon-29"></i></span>'+
						'<div class="tooltip-content">'+
							'<h4>Chỗ ngồi</h4>'+data[i].num_sits+
								'</div>'+
							'</div>'+
						'</li>');
					if(data[i].car_convenient!=null){
						
						add_info.append('<li><div class="tooltip_styled tooltip-effect-4">'+
							'<span class="tooltip-item"><i class="icon-rss"></i></span>'+
							'<div class="tooltip-content">'+
								'<h4>WiFi</h4>'+
									'</div>'+
								'</div>'+
							'</li>');
					
					}
					transfer_list_desc.append(add_info);
		
					col6.append(transfer_list_desc);
		
					col2.append('<div class="price_list">'+
									'<div><sup>$'+data[i].car_saving_price+'</sup><span class="normal_price_list">$'+data[i].car_price+'</span><small>*From/Per person</small></small>'+
										'<p><a href="single_transfer.html" class="btn_1">Details</a>'+
										'</p>'+
									'</div>'+
								'</div>');
					r.append(col4);
					r.append(col6);
					r.append(col2);
		
					tr.append(r);
					list.append(tr);
				}
				pagination(1,2);
			}
		}

function pagination(num_post,page_size){
	let total_page=num_post/page_size;
	if(num_post>page_size){
		let nav= $('#pagination-list__post');
		nav.empty();
		let ul=$('<ul class="pagination justify-content-center"></ul>');
		let previous=$('<li class="page-item">'+
							'<a class="page-link" onclick="go_to_page(1)" aria-label="First">'+
								'<span aria-hidden="true">«</span>'+
								'<span class="sr-only">Đầu tiên</span>'+
							'</a>'+
						'</li>');
		let next=$('<li class="page-item">'+
						'<a class="page-link" onclick="go_to_page('+total_page+')" aria-label="Last">'+
							'<span aria-hidden="true">»</span>'+
							'<span class="sr-only">Cuối cùng</span>'+
						'</a>'+
					'</li>');
		ul.append(previous);
		let data=get_list_query();
		let current_page=data.page==undefined?1: data.page;
		
		if(current_page==1){
			for(let i=current_page;i<4;i++){
				if(total_page<i) break;
				else{
					if(current_page==i){
						ul.append('<li class="page-item active"><span class="page-link">'+i+'<span class="sr-only">(current)</span></span></li>');
					}else{
						ul.append('<li class="page-item"><a class="page-link" onclick="go_to_page('+i+')">'+i+'</a></li>');
					}
					
				}
			}
		}else{
			for(let i=current_page-1;i<3;i++){
				if(total_page<i) break;
				else{
					if(current_page==i){
						ul.append('<li class="page-item active"><span class="page-link">'+i+'<span class="sr-only">(current)</span></span></li>');
					}else{
						ul.append('<li class="page-item"><a class="page-link" onclick="go_to_page('+i+')">'+i+'</a></li>');
					}
					
				}
			}
		}
		

		ul.append(next);
		nav.append(ul);
	}
	else{
		return;
	}

}		
$( document ).ready(function() {

	//sự kiện chọn thứ tự hiển thị theo giá
	$('#sort_price').on('change',function(e){
		let value=$(this).val();
		if(value!=""){
			add_query_string_filter('orderby',value);
		}
		
	});
	
	//Su kien thay doi gia tri filter gia
    $("#range").on('change',function(){
    	let slider = $("#range").data("ionRangeSlider");
    	let from = slider.result.from;
    	let to = slider.result.to;
    	let content= 'gia tu '+from+' den '+to;
    	add_filter_items('price',0,content);
    	//thêm query string vào input hidden filter
    	add_query_string_filter('maxprice',to);
    	add_query_string_filter('minprice',from);

    });

    //Su kien xoa filter items
    $(document).on('click','.remove-filter',function(e){
    	e.preventDefault();
    	let type= $(this).data('type');
    	let id= $(this).data('id');
        $('span.filter-item').has('a[data-type='+type+'][data-id='+id+']').remove();

        if(type=='rating'){
        	$('input.filter-rating[data-id='+id+']').iCheck('uncheck');
        }
		remove_query_string_filter(type,id);
    });


   	//Su kien check vao checkbox filter rating
    $(document).on('ifChecked','.filter-rating',function(e){
    	let id= $(this).data('id');
	    let content="";
    	
	    switch(id){
	    		case 1:
	    			content="Đánh giá: 1";
	    			break;
	    		case 2:
	    			content="Đánh giá: 2";
	    			break;
	    		case 3:
	    			content="Đánh giá: 3";
	    			break;
	    		case 4:
	    			content="Đánh giá: 4";
	    			break;
	    		case 5:
	    			content="Đánh giá: 5";
	    			break;
	    }
	    add_filter_items('rating',id,content);
    	//thêm query string vào input hidden filter
    	add_query_string_filter('rating',id);
    	
    	
    });
    //Su kien uncheck checkbox rating
    $(document).on('ifUnchecked','.filter-rating',function(e){
    	e.preventDefault();
    	let id= $(this).data('id');
        $('span.filter-item').has('a[data-type=rating][data-id='+id+']').remove();
		remove_query_string_filter('rating', id);
	});
	//Su kien check checkbox convenient
	$(document).on('ifChecked','.filter-convenient',function(e){
    	let id= $(this).data('id');
	    let content="";
    	
	    switch(id){
	    		case 6:
	    			content="Điều hòa không khí";
	    			break;
	    		case 7:
	    			content="WiFi";
	    			break;
	    		
	    }
	    add_filter_items('convenient',id,content);
    	//thêm query string vào input hidden filter
    	add_query_string_filter('convenient',id);
    	
    	
    });
    //Su kien uncheck checkbox convenient
    $(document).on('ifUnchecked','.filter-convenient',function(e){
    	e.preventDefault();
    	let id= $(this).data('id');
        $('span.filter-item').has('a[data-type=convenient][data-id='+id+']').remove();
		remove_query_string_filter('convenient', id);
    });   
});
function add_query_string_filter(key_query,value_query){
	let query_string= $('#querystring_filter').val();
	let list_query_string=query_string.split('&');
	if(query_string.indexOf(key_query)===-1){
		if(query_string===''){
			$('#querystring_filter').val(key_query+'='+value_query);
		}else{
			$('#querystring_filter').val(query_string+'&'+key_query+'='+value_query);
		}

			
	}
	else{
		let arr_query=[];
		for (let i = list_query_string.length - 1; i >= 0; i--) {

			let key=list_query_string[i].split('=')[0];
	    	let value=list_query_string[i].split('=')[1];
			arr_query[key]=value;
		}

		if(arr_query[key_query]===undefined){
			arr_query[key_query]=value_query;
		}
		else{
			let value=arr_query[key_query];
			if(value.indexOf(value_query)===-1){
				if(key_query!=="minprice"&&key_query!=="maxprice"&&key_query!=="page"&&key_query!=="orderby"){
		     		value=value+','+value_query;
				}else{
					value=value_query;
				}
		     }
		     arr_query[key_query]=value;
		}
		let query_string_new="";
		for (x in arr_query) {
		  	if(query_string_new===""){
				query_string_new=x+"="+arr_query[x];
			}else
				query_string_new=query_string_new+"&"+x+"="+arr_query[x];
		}
		
		$('#querystring_filter').val(query_string_new);
		
	}
	//lấy danh sách tours theo query string
	get_list_transfers(get_list_query());
}
function remove_query_string_filter(key_query,value_query){
	let query_string= $('#querystring_filter').val();
	let list_query_string=query_string.split('&');
	if(query_string.indexOf(key_query)===-1){
		return;
	}
	let arr_query=[];
	let list__value=[];
	for (let i = list_query_string.length - 1; i >= 0; i--) {
		let key=list_query_string[i].split('=')[0];
	    let value=list_query_string[i].split('=')[1];
	    if(key_query==key){
	    	list__value=value.split(',');
	    }
	    
		arr_query[key]=value;
	}

	if(key_query==="price"){
		delete arr_query["minprice"];
		delete arr_query["maxprice"];
	}
	else{
		
		for (let i = list__value.length - 1; i >= 0; i--) {
			if(list__value[i]==value_query){
				list__value.splice(i,1);
				break;
			}	
		}
		if(list__value.length==0){
			delete arr_query[key_query];
		}else{
			arr_query[key_query]=list__value.toString();
		}
	}

	let query_string_new="";
	for (x in arr_query) {
		if(query_string_new===""){
			query_string_new=x+"="+arr_query[x];
		}else
			query_string_new=query_string_new+"&"+x+"="+arr_query[x];
		}
		
	$('#querystring_filter').val(query_string_new);
	//lấy danh sách tours theo query string
	get_list_transfers(get_list_query());
}
function add_filter_items(type,id, content){
	let filter=$('#row-filter');
	//add filter category
	if(type=='rating'){
		let filter_item=$('.filter-item a[data-id='+id+'][data-type=category]');
		if(!filter_item.length)
			filter.append('<span class="filter-item">'+
				'<a  href="#" class="remove-filter" data-type="category" data-id="'+id+'" data-content="'+content+'">X</a>'+
				content+'</span>');

	}
	if(type=='price'){
		let filter_item=$('.filter-item a[data-id='+id+'][data-type=price]');
		if(!filter_item.length){
			filter.append('<span class="filter-item">'+
				'<a  href="#" class="remove-filter" data-type="price" data-id="0" data-content="'+content+'">X</a>'+
				content+'</span>');
		}
		else{
			$('span.filter-item').has('a[data-type=price]').remove();
			filter.append('<span class="filter-item">'+
				'<a  href="#" class="remove-filter" data-type="price" data-id="0" data-content="'+content+'">X</a>'+
				content+'</span>');
		}
	}
	if(type=='convenient'){
		let filter_item=$('.filter-item a[data-id='+id+'][data-type=category]');
		if(!filter_item.length)
			filter.append('<span class="filter-item">'+
				'<a  href="#" class="remove-filter" data-type="category" data-id="'+id+'" data-content="'+content+'">X</a>'+
				content+'</span>');

	}
	
}
function get_parameter(name){
	let url_string = window.location.href;
	let url = new URL(url_string);
	return  url.searchParams.get(name);

}
function get_list_query()
{
    let query_string= $('#querystring_filter').val();
    let data={};
    let list_query_string=query_string.split('&');
    for (let i = list_query_string.length - 1; i >= 0; i--) {
    		let key=list_query_string[i].split('=')[0];
    		let value=list_query_string[i].split('=')[1];
    		switch (key){
    			case "category":
    				data.category=value;
    				break;
    			case "maxprice":
    				data.maxprice=value;
    				break;
    			case "minprice":
    				data.minprice=value;
    				break;
    			case "rating":
    				data.rating=value;
					break;
				case "page":
    				data.page=value;
					break;
				case "orderby":
    				data.orderby=value;
    				break;
    			
    		}
    			
    }
    return data;
}
async function get_list_transfers(data) {
	let result;
	
	let url = base_url+"/transfer/get_list_transfer";
	let success = function(result) {
		let json_data = $.parseJSON(result);
		if(get_parameter('view')==1){
		show_list_transfers(json_data);
		}
		// else{
		// show_list_tours_grid(json_data);
	 	// }
		
	};
	try {
		result = await $.get(url, data, success);
	}
	catch (error) {
		console.error(error);
	}

 }