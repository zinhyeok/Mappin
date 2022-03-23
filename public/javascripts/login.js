const button = document.querySelector("#loginButton");
button.addEventListener("click", submitLogin);

function submitLogin(event) {
    event.preventDefault();
    let email = document.querySelector("#userEmail").value;
    let password = document.querySelector("#password").value;
    
    console.log(email, password);

    $.ajax({
        url: "/login",
        data: { email,password },
        type: "POST",
    }).done((response) => {
        console.log(response);
        if (response.result == "emailfalse") {
            alert("잘못된 이메일입니다.");
        }
        else if (response.result == "passwordfalse") {
            alert("잘못된 비밀번호입니다.");
        }
        else if (response.result == "loginsuccess") {
            location.href = "/";
        }
        else {
        }
        
    })
    .fail((error) => {
        alert(error);
    });

}