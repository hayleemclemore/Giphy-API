$(document).ready(function () {

var animals = ["Cat", "Dog", "Horse", "Pig"];
// Event listener for all button elements


    $(document).on("click", ".animal", function() {
    $("#gifs-appear-here").empty();
    // In this case, the "this" keyword refers to the button that was clicked
    var animal = $(this).attr("data-animal");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    console.log(animals)

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {

      // After the data comes back from the API
        // Storing an array of results in the results variable
        var results = response.data;
        console.log(results)

        // Looping over every result item
        for (var i = 0; i < 10; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div for the gif
            var gifDiv = $("<div>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var animalImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            animalImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(animalImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          }
        }
    });
});

         // Function for displaying animal data
      function renderButtons() {

        // Deleting the buttons prior to adding new movies
        $("#buttons-view").empty();
        // (this is necessary otherwise you will have repeat buttons)
        // $("#buttons-view").empty();
        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {
          // Then dynamically generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("animal btn btn-dark");
          // Adding a data-attribute
          a.attr("data-animal", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }


      $(".gif").on("click", function() {
        event.preventDefault();
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

        $("#add-animal").on("click", function(event) {
            event.preventDefault();
    
            // This line grabs the input from the textbox
            var animal = $("#animal-input").val().trim();
    
            // Adding the movie from the textbox to our array
            animals.push(animal);
            console.log(animals);
    
            // Calling renderButtons which handles the processing of our movie array
            renderButtons();
          });

          renderButtons();
      
  });
    
   