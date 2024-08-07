
const selectMenu = document.querySelector("#major");

function displaySelect () {
    // <select> 요소의 selectedIndex - 현재 선택된 option의 index를 반환하는 속성
    let selectedText = selectMenu.options[selectMenu.selectedIndex].innerText;
    alert(`${selectedText}를 선택하셨습니다.`);
}

selectMenu.onchange = displaySelect;