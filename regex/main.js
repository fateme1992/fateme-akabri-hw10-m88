const submitBtn = document.getElementById("submit");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const pass = document.getElementById("pass");

console.log(pass.value);

submitBtn.onclick = function (e) {
    e.preventDefault();
    let success = true;
    if (!(/^.{1,30}$/.test(fname.value))) {
        success = false;
        return alert("invalid name input");
    }

    if (!/^.{1,30}$/.test(lname.value)) {
        success = false;
        return alert("invalid last name input");
    }


    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email.value)) {
        success = false;
        alert('Please provide a valid email address');
        email.focus;
        return false;
    }


    if (
        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            pass.value
        )
    ) {
        success = false;
        return alert("invalid pass input");
    }

    if (success) {
        alert('Hooray! registration was successfull.')
    }
};
