function getVal() {
    const val = document.querySelector('.get').innerHTML
    console.log(val);
    console.log('hello');
    $.ajax({
        url: ' https://reqres.in/api/users',
        type: 'POST',
        success: function (response) {
            console.log(response);
        },
        error: function (err) {
            console.log(err);
        },
    });

    return false;
}
// $(() => {
    // $.ajax({
    //     url: ' https://reqres.in/api/users',
    //     type: 'POST',
    //     success: function (response) {
    //         getVal(response)
    //     },
    //     error: function (err) {
    //         console.log(err);
    //     },
//     // });
//     $.ajax({
//         url: ' https://reqres.in/api/users/1',
//         type: 'GET',
//         success: function (response) {
//             console.log(response);
//         },
//         error: function (err) {
//             console.log(err);
//         },
//     })
// })

