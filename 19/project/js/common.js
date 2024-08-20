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

    // #region Global Navigation Bar
    let beforeEl;

    $("#gnb>li>a").on("mouseover focus", function () {
        // 현재 태그의 자식요소 중 img 선택
        let $img = $("img", this);
        $img.attr("src", $img.attr("src").replace("out.gif", "over.gif"));

        $(this).next().stop().slideDown("normal");

        beforeEl = $(this);
    });

    // #gnb>li>a 로 선택하여 mouseleave 이벤트를 등록할 경우
    // a 태그를 벗어나자마자 sub menu와는 상관없이 sub menu가 slideUp 함.

    // a 태그를 벗어나 sub menu에 mouseover 했을 때
    // a 태그의 정보를 잃어버리지 않게 변수 beforeEl를 미리 저장
    // sub menu도 계속 slideDown 상태를 유지하기 위해 #gnb>li 선택
    $("#gnb>li").on("mouseleave", function () {
        $("#gnb ul:visible").stop().slideUp("fast");

        if (beforeEl) {
            let newSrc = beforeEl.children("img").attr("src").replace("over.gif", "out.gif");
            beforeEl.children("img").attr("src", newSrc);
        }
    });
    // #endregion

    // #region Slide All Menu
    let checkTotalBtnClick = false;

    $("#total_btn>a").on("click", function () {
        checkTotalBtnClick = !checkTotalBtnClick;

        $("#total_menu").stop().slideToggle("normal");
        $("img", this).attr("src", `images/allmenu_btn_${checkTotalBtnClick ? "over.gif" : "out.gif"}`);

        return false;
    });

    $("#total_close>a").on("click", function () {
        checkTotalBtnClick = false;

        $("#total_menu").stop().slideUp("normal");
        $("#total_btn>a>img").attr("src", "images/allmenu_btn_out.gif");

        return false;
    });
    // #endregion

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

    // #region Related Sites Link
    $("form[name='rel_f']").submit(function () {
        let url = $("select", this).val();

        window.open(url);

        return false;
    });
    // #endregion

    // #region Side Quick Menu
    const $quickMenu = $("#quick_menu");
    let originTopPos = parseInt($quickMenu.css("top"));

    $(window).on("scroll", function () {
        $quickMenu.stop().animate({
            top: `${originTopPos + $(this).scrollTop()}px`
        });
    });
    // #endregion 
});