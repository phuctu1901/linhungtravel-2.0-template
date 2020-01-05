$(function() {
	$('#cat_nav').mobileMenu();
		
		$('input').iCheck({
		   checkboxClass: 'icheckbox_square-grey',
		   radioClass: 'iradio_square-grey'
		 });
	get_list_restaurants();
});

$( document ).ready(function() {


	//Su kien click vao category tour
	$('.filter_by_category').on('click',function(e){
		e.preventDefault();
		let id= $(this).data('id'); //id category
		let content= $(this).data('content');

		add_filter_items('category',id,content);
		//thêm query string vào input hidden filter
		add_query_string_filter('category',id);
		
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

});

async function get_list_restaurants(data) {
		let result;
    let url = base_url+"/restaurant/get_list_restaurant";
    let success = function(result) {
			var json_data = $.parseJSON(result);
			if(get_parameter('view')==2){
				show_grid_restaurant(json_data);
				
			}else{
				show_list_restaurant(json_data);
			}
    };
    try {
			result = await $.get(url, data, success);
		}
		catch (error) {
					console.error(error);
			}
}

function add_filter_items(type,id,content){
	let filter=$('#row-filter');
	if(type=='category'){
		let filter_item=$('.filter-item a[data-id='+id+'][data-type=category]');
		if(!filter_item.length)
			filter.append('<span class="filter-item">'+
				'<a  href="#" class="remove-filter" data-type="category" data-id="'+id+'" data-content="'+content+'">X</a>'+
				content+'</span>');

	}
	
	if(type=='rating'){
		let filter_item=$('.filter-item a[data-id='+id+'][data-type=rating]');
		if(!filter_item.length){
			filter.append('<span class="filter-item">'+
				'<a  href="#" class="remove-filter" data-type="rating" data-id="'+id+'" data-content="'+content+'">X</a>'+
				content+'</span>');
		}
		
	}
}

//thêm query string vào input hidden filter
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
		for (var i = list_query_string.length - 1; i >= 0; i--) {

			let key=list_query_string[i].split('=')[0];
	    let value=list_query_string[i].split('=')[1];
			arr_query[key]=value;
		}

		if(arr_query[key_query]===undefined){
			arr_query[key_query]=value_query;
		}
		else{
			let value=arr_query[key_query];
			if(value.indexOf(value_query)===-1)
				{
					if(key_query!=="page"){
					value=value+','+value_query;}
					else value=value_query;
				}
		    arr_query[key_query]=value;
		}
		var query_string_new="";
		for (x in arr_query) {
		  	if(query_string_new===""){
				query_string_new=x+"="+arr_query[x];
			}else
				query_string_new=query_string_new+"&"+x+"="+arr_query[x];
		}
		
		$('#querystring_filter').val(query_string_new);
	}
	get_list_restaurants(get_list_query());
}

function get_parameter(name){
	let url_string = window.location.href;
	let url = new URL(url_string);
	return  url.searchParams.get(name);

}



function show_list_restaurant(data) {
	let list = $('#list-restaurant');
	list.empty();
	if(data['total_record']==0){
		list.append("<p class='noti-filter__result'><strong>Không có kết quả nào cho tìm kiếm của bạn</strong><br/><span>Thử xóa những tiêu chí bạn đã chọn xem sao!</span></p>");
	}else{
		
		for (let i = 0; i < data['total_record']; i++) {
			let tr = $('<div class="strip_all_tour_list wow fadeIn" data-wow-delay="0.1s" style="visibility: visible; animation-delay: 0.1s; animation-name: fadeIn;"></div>');
			let r=$('<div class="row"></div>');
			let col4=$('<div class="col-lg-4 col-md-4"></div>');
			let col6=$('<div class="col-lg-6 col-md-6"></div>');
			let col2=$('<div class="col-lg-2 col-md-2"></div>');

			if(data[i].res_label!=null){
				if(data[i].res_label=="Phổ biến"){
					col4.append('<div class="ribbon_3 popular"><span>'+data[i].res_label+'</span></div>');
				}else{
					col4.append('<div class="ribbon_3"><span>'+data[i].res_label+'</span></div>');
				}
			}
			
			col4.append('<div class="wishlist">'+
				'<a class="tooltip_flip tooltip-effect-1" href="javascript:void(0);">+<span class="tooltip-content-flip">'+
				'<span class="tooltip-back">Thêm vào mục yêu thích</span>'+
				'</span></a></div>');
				let image=data[i].res_thumnail;
					if(image==null){
						image=base_url+'/assets/default/img/hotel_1.jpg';
					}
			col4.append('<div class="img_list">'+
							'<a href="'+base_url+'/restaurant/detail/'+data[i].res_slug+'"><img data-src="'+image+'" alt="'+data[i].res_name+'" class="lazyload">'+
							'</a>'+
						'</div>');


			let res_list_desc=$('<div class="tour_list_desc"></div>');
			let vote="";
			for(let j=0;j<5;j++){
				if(data[i].avg_rev>j)
					vote+='<i class="icon-smile voted"></i>';
				else
					vote+='<i class="icon-smile"></i>';
			}
			res_list_desc.append('<div class="rating">'+vote+
							'<small>('+data[i].num_rev+')</small>'+
						'</div>');
			res_list_desc.append('<h3>'+data[i].res_name+'</h3>');
			let except="";
			if(data[i].res_except==null){
				if(data[i].res_description==null)
				{
					except="";
				}
				else{
					if(wordscount(data[i].res_description)>30)
						except=getWords(data[i].res_description,30)+'...';
					else
						except=getWords(data[i].res_description,30);
				}
			}else{
				if(wordscount(data[i].res_except)>30)
					except=getWords(data[i].res_except,30)+'...';
				else
					except=getWords(data[i].res_except,30);
			}
			res_list_desc.append('<p>'+except+'</p>');
			let add_info=$('<ul class="add_info"></ul>');

				add_info.append('<li>'+
								'<div class="tooltip_styled tooltip-effect-4">'+
									'<span class="tooltip-item"><i class=" icon-location"></i></span>'+
									'<div class="tooltip-content">'+
										'<h4>Địa chỉ</h4> '+data[i].res_address+
										'<br>'+
									'</div>'+
								'</div>'+
							'</li>');


				add_info.append('<li>'+
								'<div class="tooltip_styled tooltip-effect-4">'+
									'<span class="tooltip-item"><i class=" icon-phone-squared"></i></span>'+
									'<div class="tooltip-content">'+
										'<h4>Số điện thoại</h4> '+data[i].res_phone+
									'</div>'+
								'</div>'+
							'</li>');


				add_info.append('<li>'+
								'<div class="tooltip_styled tooltip-effect-4">'+
									'<span class="tooltip-item"><i class="icon-eye"></i></span>'+
									'<div class="tooltip-content">'+
										'<h4>Số lượt xem</h4> '+data[i].res_hits+
									'</div>'+
								'</div>'+
							'</li>');

			
			res_list_desc.append(add_info);

			col6.append(res_list_desc);

			col2.append('<div class="price_list">'+
							'<p style="margin-top: 90px;"><a href="'+base_url+'/restaurant/detail/'+data[i].res_slug+'" class="btn_1">Chi tiết</a>'+
							'</p>'+
						'</div>'+
					'</div>');				
			r.append(col4);
			r.append(col6);
			r.append(col2);

			tr.append(r);
			list.append(tr);
		}
		pagination(data['restaurants_count'],data['page_size']);
	}
	
} 


function show_grid_restaurant(data){
	let list = $('#grid-restaurant');
	list.empty();
	if(data['total_record']==0){
		list.append("<p class='noti-filter__result'><strong>Không có kết quả nào cho tìm kiếm của bạn</strong><br/><span>Thử xóa những tiêu chí bạn đã chọn xem sao!</span></p>");
	}else{
		
		for (let i = 0; i < data['total_record']/2; i++) {
			let row=$('<div class="row"></div>');
			//post1 in row
			for( let j=0;j<=1;j++){
				if(data[2*i+j]!=null){
					let col_6=$('<div class="col-md-6 wow zoomIn" data-wow-delay="0.1s"></div>');
					let container=$('<div class="tour_container"></div>');
					if(data[2*i+j].res_label!=null){
						
						if(data[2*i+j].res_label=="phổ biến"){
							container.append('<div class="ribbon_3 popular"><span>'+data[2*i+j].res_label+'</span></div>');
						}else{
							container.append('<div class="ribbon_3"><span>'+data[2*i+j].res_label+'</span></div>');
						}
					}
					let image=data[2*i+j].res_thumnail;
					if(image==null){
						image=base_url+'/assets/default/img/hotel_1.jpg';
					}
					container.append('<div class="img_container">'+
										'<a href="'+base_url+'/restaurant/detail/'+data[2*i+j].res_slug+'">'+
											'<img src="'+image+'" class="img-fluid" alt="'+data[2*i+j].res_name+'" style="width:500px; height:300px;">'+
										'</a>'+
										'<div class="short_info">'+
											'<span class="price">Giá uu đãi</span>'+
										'</div>'+
									'</div>');
					let res_title=$('<div class="tour_title"></div>');
					res_title.append('<h3><strong>'+data[2*i+j].res_name+'</h3>');
					let vote="";
					for(let j=0;j<5;j++){
						if(data[i].avg_rev>j)
							vote+='<i class="icon-smile voted"></i>';
						else
							vote+='<i class="icon-smile"></i>';
					}
					res_title.append('<div class="rating">'+vote+'<small>('+data[2*i+j].num_rev+')</small></div>');
					res_title.append('<div class="wishlist">'+
											'<a class="tooltip_flip tooltip-effect-1" href="#">+<span class="tooltip-content-flip">'+
											'<span class="tooltip-back">Thêm vào mục yêu thích</span>'+
											'</span></a>'+
										'</div>');
					container.append(res_title);
					col_6.append(container);
					row.append(col_6);
				}
				
			}
			list.append(row);
		}
		//phân trang
		pagination(data['restaurants_count'],data['page_size']);
	}
}

//Phân trang
function pagination(num_post,page_size){
let total_page=Math.ceil(num_post/page_size);
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
		let current_page=data.page==undefined?1: parseInt(data.page);
		
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
			for(let i=current_page-1;i<=4;i++){
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

//Lấy ra ds data truy vấn get
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
    			case "rating":
    				data.rating=value;
					break;
				case "page":
    				data.page=value;
					break;
    			
    		}
    			
    }
    return data;
}

//xóa tham số trong data truy vấn get
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
	
	let query_string_new="";
	for (x in arr_query) {
		if(query_string_new===""){
			query_string_new=x+"="+arr_query[x];
		}else
			query_string_new=query_string_new+"&"+x+"="+arr_query[x];
		}
		
	$('#querystring_filter').val(query_string_new);
	//lấy danh sách tours theo query string
	get_list_restaurants(get_list_query());
}

//Chuyển sang trang khác
function go_to_page(page){
	add_query_string_filter('page',page);
	//get_list_restaurants(get_list_query());
}

//function dem so tu cua chuoi
function wordscount(str){
	return str.split(/\s+/).length;
}