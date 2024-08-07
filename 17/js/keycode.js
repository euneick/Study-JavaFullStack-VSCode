
const body = document.body;
const result = document.querySelector("#result");

body.addEventListener("keypress", (e) => {
    /*
        매개변수 - 이벤트가 발생한 키의 정보가 담겨있는 객체 (Object)
            * e.type        - 이벤트의 유형
            * e.target      - 이벤트가 발생한 DOM 요소
            * e.code        - 키의 물리적 키 코드
            * e.key         - 키의 실제 값
            * e.altkey      - alt키 작동 여부를 반환
            * e.ctrlkey     - ctrl키 작동 여부를 반환
            * e.shiftkey    - shift키 작동 여부를 반환
            * 
            * e.preventDefault()        - 링크 클릭 시 페이지 이동을 막는 메소드
            * e.stopPropagation()       - 이벤트가 상위요소로 전파되는 것을 막는 메소드
     */
    result.innerText = `code : ${e.code}\nkey : ${e.key}`;
});