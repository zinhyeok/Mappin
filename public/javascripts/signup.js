function submitSignup() {
    event.preventDefault();
    
    let username = document.querySelector("#userName").value;
    let accountName = document.querySelector("#accountName").value;
    let userEmail = document.querySelector("#userEmail").value;
    let password = document.querySelector("#password").value;

    console.log(username, userEmail);
    
    $.ajax({
        url: "/signup",
        data: { username, accountName, password, userEmail },
        type: "POST",
    }).done((response) => {
        console.log(response);
        if (response.message == "account error") {
            alert("이미 사용중인 계정명입니다.");
            accountName = "";
        }
        else {
            location.href = "/login";
        }
        
    })
    .fail((error) => {
        alert(error);
    });
}