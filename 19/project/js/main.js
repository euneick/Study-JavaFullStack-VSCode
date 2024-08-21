/*
콘텐츠 영역 개발하기
-콘텐츠 영역은 크게 
  비주얼배너, 
  알림판, 
  최근게시물, 
  알림배너, 
  베스트Book, 
  페이스북,
  마케팅, 
  온라인서점
 으로 나뉩니다.
 
-레이아웃은 비주얼 배너가 들어가는 visual영역과
  나머지 주제 소스들이 들어가는 content영역으로 나뉘었음.  
*/

$(function () {
    //#region Visual Banner Touch Slide
    // https://github.com/bradbirdsall/Swipe 플러그인 이용           - 개발자 지원 중단, 대체 사이트 https://swiperjs.com/
    window.mySwipe = $("#mySwipe").Swipe({
        auto: 3000,                                 // 슬라이드의 자동 전환 시간 간격 (단위 : ms), 값을 설정하지 않으면 자동 전환 비활성화
        continuous: true,                           // 마지막 슬라이드 이후 재시작 여부 (true, false)
        callback: function (index, element) {       // 하나의 슬라이드가 전환된 직후 호출되는 콜백함수
            /*
            매개변수
                * index     - 현재 슬라이드의 index
                * element   - 현재 슬라이드의 요소
             */
            $(".touch_bullet .active").attr("src", "images/visual_bullet_off.png").removeClass("active");
            $(".touch_bullet img").eq(index).attr("src", "images/visual_bullet_on.png").addClass("active");
        }
    }).data("Swipe");

    $(".touch_left_btn a").on("click", function () { mySwipe.prev(); return false; });
    $(".touch_right_btn a").on("click", function () { mySwipe.next(); return false; });
    //#endregion

    //#region Best Book Slider
    // https://bxslider.com 에서 제공하는 자동 슬라이드 배너 플러그인 이용
    let mySlider = $("#best_bg ul").bxSlider({
        mode: "horizontal",         // 슬라이드 모드 (horizontal, vertical, fade)
        auto: true,                 // 슬라이드의 자동전환 여부 (true, false)
        speed: 500,                 // 슬라이드의 속도 (단위 : ms) [슬라이드 간격이 아님]
        slideWidth: 125,            // 슬라이드 영역의 너비값 (단위 : px) (default : 0px)
        moveSlide: 1,               // 한 번에 이동할 슬라이드 수
        minSlides: 1,               // 최소 노출 할 슬라이드 수
        maxSlides: 2,               // 최대 노출 할 슬라이드 수
        slideMargin: 30,            // 슬라이드 간의 간격 (단위 : px)
        autoControls: false,        // 슬라이드 자동전환의 재생,정지 버튼 노출 여부 (true, false)
        autoHover: true,            // 마우스 hover시 슬라이드 자동 정지 여부 (true, false)
        pager: false,               // 페이지 불릿 기호 노출 여부 (true, false)
        controls: false             // 이전, 다음 화살표 버튼 노출 여부 (true, false)
    });

    $(".prev_btn").on("click", function () {
        // bxSlider 에서 제공하는 goToPrevSlide() 메소드 활용
        mySlider.goToPrevSlide();

        return false;
    });

    $(".next_btn").on("click", function () {
        // bxSlider 에서 제공하는 goToNextSlide() 메소드 활용
        mySlider.goToNextSlide();

        return false;
    });
    //#endregion

    //#region Popup Window
    /*  
        주제 : 제이쿼리 UI플러그인과 쿠키 플러그인 사용 하기
        - 팝업창을 드래그 하여 이동시키 위해 제이쿼리 UI플러그인을 사용함.
        - [하루동안 이창 열지 않기]버튼 기능을 하용하기 위해서는 쿠키 플러그인을 사용함
        
        참고 : 쿠키 플러그인 사용법
                    
                <쿠키를 생성 하는 기본 사용법>
                    $.cookie("쿠키명","쿠키값",{expires:만료일});
                    설명 : 쿠키명은 나중에 저장된 쿠키의 값을 불러올때 구분하기 위한 이름임.
                            생성된 쿠키는 현재 부터 며칠동안 클라이언트 컴퓨터의 웹브라우저에 보관할건지 만료일(expires)을 지정할수 있음.

                예) $.cookie("pop","no",1);
                    설명: 브라우저에는 "pop"라는 이름으로 "no"라는 값이 1일 동안 쿠키가 보관 됩니다.
                    
            <쿠키 플러그인을 이용하여  브라우저에 저장된 쿠키를 불러오는 기본 사용법>
            $.cookie("쿠키명");
            
            저장된 쿠키값인 "no" 불러오는 방법의 예)
                $.cookie("pop");
            
            <쿠키 플러그인을 이용하여 브라우저에 저장된 쿠키를 삭제하는 기본 사용법>
            $.cookie("쿠키명",null);
            
            "pop"에 저장된 쿠키값 삭제의 예)
                $.cookie("pop",null);
    */
    if ($.cookie("pop") !== "no") {
        $("#pop_wrap").show();
    }

    $("#pop_wrap").css("cursor", "move").draggable();       // JQuery UI 의 draggable() 메소드를 통해 선택한 요소 이동

    $("#pop_wrap area:eq(0)").on("click", function () {
        $("#pop_wrap").fadeOut("slow");

        return false;       // href 이벤트 제거
    });

    $("#pop_wrap area:eq(1)").on("click", function () {
        $.cookie("pop", "no", 1);
        $("#pop_wrap").fadeOut("slow");

        return false;
    });
    //#endregion

    //#region Notice Roll Banner
    // dd - 이미지  //  dt - 버튼
    $("#roll_banner_wrap dd").not(":first").hide();

    const $rollBannerButtons = $("#roll_banner_wrap dt a");
    $rollBannerButtons.on("click", function () {
        // button
        let activedBtn = $("#roll_banner_wrap .active");
        let path = activedBtn.children("img").attr("src");
        path = path.replace("over.gif", "out.gif");
        activedBtn.children("img").attr("src", path);
        activedBtn.removeClass("active");

        path = $(this).children("img").attr("src");
        path = path.replace("out.gif", "over.gif");
        $(this).children("img").attr("src", path);
        $(this).addClass("active");

        // image
        $("#roll_banner_wrap dd:visible").hide();
        $(this).parent().next().show();

        return false;
    });

    let _autoPlay = window.setTimeout(autoPlay, 3000);

    let buttonNumber = 0;
    function autoPlay() {
        if(++buttonNumber >= $rollBannerButtons.length) buttonNumber = 0;

        $rollBannerButtons.eq(buttonNumber).trigger("click");       // 미리 등록한 click 이벤트 강제 실행
        
        _autoPlay = window.setTimeout(autoPlay, 4000);
    }

    $(".playBtn").on("click", function () {
        // 여러번 클릭 시 stack memory 영역에 setTimeOut 메소드 들이 쌓여 문제가 발생 할 가능성이 있기에 clearTimeout() 메소드 호출
        clearTimeout(_autoPlay);
        _autoPlay = setTimeout(autoPlay, 1000);

        $("img", this).attr("src", "images/pop_btn_play_on.gif");
        $(".stopBtn img").attr("src", "images/pop_btn_stop_off.gif");

        return false;
    });

    $(".stopBtn").on("click", function () {
        clearTimeout(_autoPlay);
        
        $("img", this).attr("src", "images/pop_btn_stop_on.gif");
        $(".playBtn img").attr("src", "images/pop_btn_play_off.gif");

        return false;
    });
    //#endregion

    //-----------------------------------------------------------
    /*
     주제 : 탭 메뉴를 이용해 최근 게시물 리스트 만들기
    
    - 탭메뉴의 경우 최초 탭버튼인[공지사항]이 활성화되어 보입니다.
          만일 방문자가 [질문과답변]탭을 클릭했을 때는 [공지사항]은 숨겨져야 하고,
      [질문과 답변]의 내용은 활성화되어 보여야 합니다.
      
    - 먼저 탭버튼에 <a>에 on()메서드를 사용하여 mouseover,focus,click이벤트를 등록하였고,
          이벤트 핸들러에는 이벤트가 발생 했을때 마우스를 올린 탭 버튼과 탭에 해당하는 게시물 목록이 활성화되어 보이도록 만들자. 
     */

    //#region Recently Post List
    
    //#endregion
});

