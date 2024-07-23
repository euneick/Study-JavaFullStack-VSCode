/*
    null 병합 연산자
        - 값이 저장된(확정된) 변수를 찾을 때 사용하는 연산자
*/
let varA = 10;
let varB = 20;
let varC;

console.log(varA ?? varB);
console.log(varC ?? varB);

let name;
let nickname = "winterlood";
let user = name ?? nickname;    // 변수 name에 값이 있으면 user에 바로 저장, null값이면 변수 nickname값을 user에 저장
console.log(user);
console.log("=====================================");
/*
    동적 타이핑
        - JavaScript는 변수에 값을 저장 할 때마다 자료형이 동적으로 결정 됨

    참고) JavaScript에선 정수형 int, 실수형 float 을 숫자형 number 으로 통괄하고 자료형의 크기는 8 Byte이다.
*/
varA = 1;
varA = "이정환";
console.log(typeof varA);
console.log(varA++);
console.log(typeof varA);
console.log("=====================================");
/*
    삼항 조건 연산자
        - 문법
            조건식 ? 참 일 경우 : 거짓 일 경우;
*/
varA = "hello world!";

typeof varA === "string" ? console.log("문자 자료형") : console.log("문자 자료형이 아님");
console.log(typeof varA === "string" ? "문자 자료형" : "문자 자료형이 아님");

let num = 1;
let result;

result = num % 2 === 0 ? "짝수" : "홀수";
console.log(result);

num = 10;
console.log(num % 2 !== 0 ? "홀수" : "짝수");

const num1 = 10;
const num2 = 20;
const num3 = 15;

console.log(num1 > num2 ?
    num1 > num3 ? num1 : num3 :
    num2 > num3 ? num2 : num3
);

let currentFloor = 1;
let button = '';

button = 'up';
let direction = button === 'up' ? 'up' : 'down';
currentFloor = direction === 'up' ? currentFloor + 1 : currentFloor - 1;
console.log(`엘레베이터가 ${direction === 'up' ? "올라갑니다" : "내려갑니다"}. 현재 층 : ${currentFloor}`);

button = 'down';
direction = button === 'up' ? 'up' : 'down';
currentFloor = direction === 'up' ? currentFloor + 1 : currentFloor - 1;
console.log(`엘레베이터가 ${direction === 'up' ? "올라갑니다" : "내려갑니다"}. 현재 층 : ${currentFloor}`);
