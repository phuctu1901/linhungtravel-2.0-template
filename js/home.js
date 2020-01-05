var tpj = jQuery;
    var revapi54;
    tpj(document).ready(function () {
      if (tpj("#rev_slider_54_1").revolution == undefined) {
        revslider_showDoubleJqueryError("#rev_slider_54_1");
      } else {
        revapi54 = tpj("#rev_slider_54_1").show().revolution({
          sliderType: "standard",
          jsFileLocation: "./assets/default/rev-slider-files/js/",
          sliderLayout: "fullwidth",
          dottedOverlay: "none",
          delay: 9000,
          navigation: {
              keyboardNavigation:"off",
              keyboard_direction: "horizontal",
              mouseScrollNavigation:"off",
                             mouseScrollReverse:"default",
              onHoverStop:"off",
              touch:{
                touchenabled:"on",
                touchOnDesktop:"off",
                swipe_threshold: 75,
                swipe_min_touches: 50,
                swipe_direction: "horizontal",
                drag_block_vertical: false
              }
              ,
              arrows: {
                style:"uranus",
                enable:true,
                hide_onmobile:true,
                hide_under:778,
                hide_onleave:true,
                hide_delay:200,
                hide_delay_mobile:1200,
                tmp:'',
                left: {
                  h_align:"left",
                  v_align:"center",
                  h_offset:20,
                                    v_offset:0
                },
                right: {
                  h_align:"right",
                  v_align:"center",
                  h_offset:20,
                                    v_offset:0
                }
              }
            },
          responsiveLevels: [1240, 1024, 778, 480],
          visibilityLevels: [1240, 1024, 778, 480],
          gridwidth: [1240, 1024, 778, 480],
          gridheight: [700, 550, 860, 480],
          lazyType: "none",
          parallax: {
            type: "mouse",
            origo: "slidercenter",
            speed: 2000,
            levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50, 47, 48, 49, 50, 51, 55],
            disable_onmobile: "on"
          },
          shadow: 0,
          spinner: "off",
          stopLoop: "on",
          stopAfterLoops: 0,
          stopAtSlide: 1,
          shuffle: "off",
          autoHeight: "off",
          disableProgressBar: "on",
          hideThumbsOnMobile: "off",
          hideSliderAtLimit: 0,
          hideCaptionAtLimit: 0,
          hideAllCaptionAtLilmit: 0,
          debugMode: false,
          fallbacks: {
            simplifyAll: "off",
            nextSlideOnWindowFocus: "off",
            disableFocusListener: false,
          }
        });
      }
    });

    
$(function() {
  get_list_tours();
});

    async function get_list_tours(data) {
      let result;
        let url = base_url+"/index/get_list_tours";
        let success = function(responce) {
          let json_data = $.parseJSON(responce);
          show_list_tours_grid(json_data);
        };
        try {
        result = await $.get(url, data, success);
      }
      catch (error) {
            console.error(error);
        }
    }

    function show_list_tours_grid(data){
      let list = $('#list_tour_list');
      list.empty();
      if(data['total_record']==0){
        list.append("<p class='noti-filter__result'><strong>Không có dữ liệu</strong></p>");
      }else{
        
        for (let i = 0; i < data['total_record']/3; i++) {
          let row=$('<div class="row"></div>');
          //post1 in row
          for( let j=0;j<=2;j++){
            if(data[3*i+j]!=null){
              let col_4=$('<div class="col-lg-4 col-md-6 wow zoomIn" data-wow-delay="0.1s"></div>');
              let container=$('<div class="tour_container"></div>');
              if(data[3*i+j].tour_label!=null){
                if(data[3*i+j].tour_label=="phổ biến"){
                  container.append('<div class="ribbon_3 popular"><span>'+data[3*i+j].tour_label+'</span></div>');
                }else{
                  container.append('<div class="ribbon_3"><span>'+data[3*i+j].tour_label+'</span></div>');
                }
              }

              let img_container=$('<div class="img_container"></div>');
                let a=$('<a href="'+base_url+'/tour/detail/'+data[3*i+j].tour_slug+'"></a>');
                a.append('<img src="'+data[3*i+j].tour_thumnail+'" width="800" height="533" class="img-fluid" alt="'+data[3*i+j].tour_name+'">');
                if(data[3*i+j].tour_price!=null&&data[3*i+j].tour_saving_price!=null){
                  let price=Math.round(((data[3*i+j].tour_price-data[3*i+j].tour_saving_price)/data[3*i+j].tour_price)*100);
                  if(price>5){
                    a.append('<div class="badge_save">Giảm<strong>'+price+'%</strong></div>');
                  }
                }
              
                a.append('<div class="short_info">'+
                            '<i class="icon-calendar"></i>'+data[3*i+j].tour_duration+'<span class="price">'+format_curency(data[3*i+j].tour_saving_price)+'<sup>đ</sup></span>'+
                          '</div>');
              img_container.append(a);
              container.append(img_container);
              let tour_title=$('<div class="tour_title"></div>');
              tour_title.append('<h3><strong>'+data[3*i+j].tour_name+'</h3>');
              let vote="";
              for(let j=0;j<5;j++){
                if(data[i].avg_rev>j)
                  vote+='<i class="icon-smile voted"></i>';
                else
                  vote+='<i class="icon-smile"></i>';
              }
              tour_title.append('<div class="rating">'+vote+'<small>('+data[3*i+j].num_rev+')</small></div>');
              container.append(tour_title);
              col_4.append(container);
              row.append(col_4);
            }
            
          }
          list.append(row);
        }
      }
    }