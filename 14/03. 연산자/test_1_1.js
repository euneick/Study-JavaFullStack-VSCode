/*
    하루 지출 내역
        교통비 3000원, 식비 6000원, 음료비 3000원
        1만원 초과 했을 경우 000초과출력, 아닐경우 "돈 관리 잘했어요!" 출력
*/
let price1 = 3000;
let price2 = 6000;
let price3 = 3000;

let total = price1 + price2 + price3;
let standard = 10000;

console.log(total > standard ? `${total - standard}원 초과` : "돈 관리 잘했어요!");
