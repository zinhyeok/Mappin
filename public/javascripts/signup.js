// const signupButton = document.querySelector("#signupButton");

// signupButton.addEventListener("click", submitSignup);
function submitSignup() {
    let username = document.querySelector("#userName").value;
    let accountName = document.querySelector("#accountName").value;
    let userEmail = document.querySelector("#userEmail").value;
    let password = document.querySelector("#password").value;

    console.log(username, userEmail);
    
    $.ajax({
        url: "/signup",
        data: { username, accountName, password,userEmail },
        type: "POST",
    }).done((response) => {
        console.log("데이터 요청 성공");
        alert("성공");
    })
        .fail((error) => {
            console.log("데이터 요청 실패");
            alert("실패");
        });
}