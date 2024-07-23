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
    
*/