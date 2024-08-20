$(function () {
    // #region Login Form
    $(".login_wrap>a").on("click", () => {
        // #login_f 영역의 top 속성값이 css에 의해 -500px로 설정되어 있음
        $("#login_f").animate({ top: "20px" }, 500);

        return false;   // a태그 기본 이벤트(href) 제거
    });

    $(".login_wrap .login_close_btn>a, input[alt='로그인버튼']").on("click", () => {
        $("#login_f").animate({ top: "-500px" }, 500);

        return false;
    });

    $("#user_id, #user_pw").on("focus blur", function (event) {
        if (event.type === "focus") {
            // $(this).prev().css("left","-9999px");
            $(this).prev().css("display", "none");
        }
        else if (event.type === "blur" && $(this).val() === "") {
            // $(this).prev().css("left","2px");
            $(this).prev().css("display", "block");
        }
    });
    // #endregion

    // #region Zoom Action
    let baseScale = 100;
    let currerntScale = baseScale;
    let $body = $("body");

    $("#zoom a").on("click", function () {
        let currentIndex = $("#zoom a").index(this);

        if (currentIndex === 0) currerntScale += 10;
        else if (currentIndex === 2) currerntScale -= 10;
        else currerntScale = baseScale;

        /*
            overflow-x: auto             - IE8 버전 이하에서 정상적으로 작동되도록 설정
            transform-origin: 0 0        - 확대/축소의 pivot을 (0, 0) 으로 지정
            transform: scale(number)     - 선택한 요소의 scale을 number 만큼 지정 (단위 : %)
            zoom: number                 - 선택한 요소를 number 만큼 확대 (단위 : %)
         */
        $body.css({
            "overflow-x": "auto",
            "transform-origin": "0 0",
            "transform": `scale(${currerntScale / 100})`,
            "zoom": `${currerntScale}%`
        });
        // $body.css("overflow-x", "auto").css("transform-origin", "0 0").css("transform",`scale(${currerntScale / 100})`).css("zoom", `${currerntScale}%`);

        return false;   // a태그 기본 이벤트(href) 제거
    });
    // #endregion

    // #region Print Button
    $(".print_btn").on("click", () => {
        /*
            print()
                - window 객체에 작성되어 있고, 인쇄 미리보기창을 띄워주는 메소드
         */
        window.print();

        return false;
    });
    // #endregion

    // #region Search Form
    $("#keyword").on({
        "focus": function () {
            $(this).css("background-position", "0 -500px");
        },
        "blur": function () {
            if ($(this).val() === "")
                $(this).css("background-position", "0 0");
        }
    });
    // #endregion





    //-----------------------------------------------------------------------------------------------------

    /*
     주제 : GNB(글로벌 네비게이션 바) 메뉴 만들기
     사이트의 모든 페이지에 노출되는 메뉴를 가리키며,
     보통 사이트 상단에 위치합니다.
     GNB상위 메뉴에 마우스가 올라갔을때, 해당 상위 메뉴 이미지는 활성화(컬러)된 이미지로 바뀌게 됨.
     이어서 마우스를 다른 상위메뉴로 이동하면,
     앞서 활성화된 상위 메뉴 이미지는 다시 비활성화(무채도)된 이미지로 바뀌고,
     현재 마우스가 올라간 상위 메뉴의 이미지는 활성화된 이미지로 바뀌도록 만들자 
     */
    /*GNB 메뉴*/






    //-----------------------------------------------------------------------------------------------------
    /*
     주제: 슬라이드 전체 메뉴 만들기
     - 전체 메뉴를 클릭 했을 때 전체메뉴가 slide효과로 펼쳐지고
       전체 메뉴 버튼 이미지도 바뀌도록 만들어 보자
     - [전체메뉴]버튼을 클릭 했을때 전체 메뉴가 아래로 펼쳐지며
       [CLOSE]버튼을 클릭했을때는 다시 전체메뉴가 위로 접히면서 사라지게 해보자.  
     */









    //-----------------------------------------------------------------------------------------------------

    // #region Current Date
    let today = new Date();

    let initialTime = today.getTime();      // 1970년 1월 1일 00:00:00 부터 현재까지 경과된 시간(타임 스탬프)을 반환
    let elapsedTime = 0;                    // 초기값은 0, 이후 매 초마다 1000 ms 씩 누적

    const oneSecond = 1000; // 단위 ms

    let $dateSpans = $("#date_wrap span");
    let dateArray = new Array($dateSpans.length);

    window.setInterval(() => {
        today.setTime(initialTime + elapsedTime);       // today 객체를 oneSecond 마다 update

        dateArray[0] = today.getFullYear();
        dateArray[1] = ('0' + (today.getMonth() + 1)).slice(-2);        // 현재 월 정보는 -1 월로 나오므로 +1 연산하여 맞춤
        dateArray[2] = ('0' + today.getDate()).slice(-2);
        dateArray[3] = ('0' + today.getHours()).slice(-2);
        dateArray[4] = ('0' + today.getMinutes()).slice(-2);
        dateArray[5] = ('0' + today.getSeconds()).slice(-2);

        for (let i = 0; i < $dateSpans.length; i++)
            $($dateSpans[i]).text(dateArray[i]);

        elapsedTime += oneSecond;
    }, oneSecond);
    // #endregion















    //-----------------------------------------------------------------------------------------------------

    /*
       주제 : 관련 사이트 이동 선택 상자 만들기
       -푸터 영역에는 관련 사이트 이동 선택 상자가 있습니다.
            사이트에 방문객체 관련 사이트를 선택한 후 [이동]버튼을 클릭하였을 때 새창으로 선택한 사이트가 열리도록 할것입니다.
            여기서는 [이동] 버튼을 클릭했을때 <form>태그에서 전송이 일어나므로 submit 이벤트를 적용 하겠습니다.
            이벤트가 발생 했을 때 이벤트 핸들러에 window.open(사이트 경로)메서드를 이용해 새창 으로 지정한 사이트가 열리도록 만들것입니다.  
      */




    //-----------------------------------------------------------------------------------------------------

    /*옆쪽 퀵 메뉴*/
    /*
          클라이언트가 index.html사이트를 웹브라우저로 처음 요청했을떄
          퀵 메뉴 영역인 <div id="quick_menu"></div>요소영역의 CSS설정 top속성의 위치 이동값 100을 구하기 위해
          퀵 메뉴 영역을  선택해서 가져와  css("top")메소드를 호출하면
          미리 설정되어 있는 top 속성값 "100px" 문자열을 얻는다.
          "100px" top속성의 값을 나중에 스크롤막대바가 세로로 이동한 거릿값과 + 계산하기 위해 
          100정수만 추출해서 얻어낸다.
      
      요약 : div에 css문법으로 설정된 기본전체 문서 상단에서 퀵 메뉴영역(div)이 위치한 top속성값 !
            퀵 메뉴가 아래로 위치한 top속성값 얻기 
    */




});