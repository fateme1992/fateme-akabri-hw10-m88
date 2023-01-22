$(() => {

    $('#autoSizingSelect').on('change', function () {
        console.log(this);
        if (this.value == 'get') {
            $('#responseBody').css('display', 'block')
        } else if (this.value == 'post') {
            $('#requestBody').css('display', 'block')
            $('#responseBody').css('display', 'block')
        }
    })
    $('#btn').on('click', function () {
        console.log($('#autoSizingSelect').val());
        if ($('#autoSizingSelect').val() == 'get') {
            getRequest()
        } else if (($('#autoSizingSelect').val() == 'post')) {
            console.log("hi");
            postRequest()
        }
    })

    function getRequest() {
        let URL = $('#autoSizingInput').val()
        console.log(URL);
        $.ajax({
            url: URL,
            type: 'GET',
            success: function (response, _status, jqXHR) {
                $('#responseBodyText').text(JSON.stringify(response, null, 2))
                $('#status').text(jqXHR.status)
            },
            error: function (err) {
                $('#responseBodyText').text(JSON.stringify(err))
                $('#status').text('-1')
            },
        });
    }
    function postRequest() {
        let URL = $('#autoSizingInput').val()
        const postData = $("#requestBodyText").val();

        $.ajax({
            url: URL,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: postData,
            success: function (response, _status, jqXHR) {
                $('#responseBodyText').text(JSON.stringify(response))
                $('#status').text(jqXHR.status)

            },
        });
    }

})

