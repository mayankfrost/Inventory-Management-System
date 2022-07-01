
$("#add_item").submit(function (event) {
    alert("Data inserted successfully!");
})

$("#update_item").submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })

    var request = {
        "url": `http://localhost:3000/api/items/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert("Data Updated successfully!")
    })
})

if (window.location.pathname == "/index") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:3000/api/items/${id}`,
            "method": "DELETE",
        }

        if (confirm("Are you sure you want to delete this record?")) {
            $.ajax(request).done(function (response) {
                alert("Data Deleted successfully!");
                location.reload();
            })
        }
    })
}

$("#search_item").submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    given_code = unindexed_array[0].value;

    var request = {
        "url": `http://localhost:3000/api/items/`,
        "method": "GET",
    }

    $.ajax(request).done(function (response) {
        var id = -1;

        response.forEach(value => {
            console.log(value);
            if (value.code == given_code) {
                id = value._id;
            }
        });

        if (id == -1) {
            alert("Unique Code not found!");
        } else {
            window.location.href = "/update-item?id=" + id;
        }
    })
})

$("#change_item").submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    given_code = unindexed_array[0].value;
    given_change = unindexed_array[1].value;

    var request = {
        "url": `http://localhost:3000/api/items/`,
        "method": "GET",
    }

    $.ajax(request).done(function (response) {
        var id = -1, data = [];

        response.forEach(value => {
            if (value.code == given_code) {
                id = value._id;

                data = value;
                data.amount = parseInt(data.amount) + parseInt(given_change);
            }
        });

        if (id == -1) {
            alert("Unique Code not found!");
        } else {

            var req = {
                "url": `http://localhost:3000/api/items/${id}`,
                "method": "PUT",
                "data": data
            }

            $.ajax(req).done(function (response) {
                alert("Data Updated successfully!");
                location.reload();
            })
        }
    })
})


$("#index").click(function (event) {
    window.location.href = "/index";
})
$("#search").click(function (event) {
    window.location.href = "/search";
})
$("#change").click(function (event) {
    window.location.href = "/change";
})