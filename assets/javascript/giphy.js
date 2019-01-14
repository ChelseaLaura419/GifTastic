var queensArray = ["RuPaul", "Adore Delano","Bianca Del Rio", "Tatianna", "Bob the Drag Queen", "Alyssa Edwards", "Shangela", "Roxxxy Andrews", "Monet X Change"];

$(document).ready(function() {
    for (var i = 0; i < queensArray.length; i++) {
        $("#queen-buttons").append("<button type='button' onclick='searchGif(\"" + queensArray[i] + "\")' class='btn btn-primary' value=' " + queensArray[i] + "'> " + queensArray[i] + " </button>");
    }
});

function queenButtonClicked() {
    var userInput = $('#queen-input').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#queen-input').val();

    if (userInput) {
        $('#queen-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(gifName) {
    $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?q=" + gifName + "&api_key=dc6zaTOxFJmzC&limit=10",
            type: "GET",
        })
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('#queens').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:450px; height:250px">';

        image = '<div class="col-md-5">' + image + "</div>";
        $('#queens').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}