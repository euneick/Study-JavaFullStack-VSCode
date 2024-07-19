const ver = navigator.userAgent; // 사용자 에이전트 정보 가져오기
console.log(ver); // 사용자 에이전트 정보 콘솔에 출력

const isIE = /trident/i.test(ver); // IE 브라우저인지 확인
console.log(isIE); // IE 브라우저 여부 콘솔에 출력

if (isIE) {
     // IE 브라우저일 경우 경고 메시지 출력
    alert("익스플로러 브라우저로 접속하셨네요. 이 웹 페이지는 익스플로러를 지원하지 않습니다. 다른 브라우저로 접속해주세요.");
}