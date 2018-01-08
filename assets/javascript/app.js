//Initial array of grumpy terms
    var grumpies = ["Grumpy Old Men", "Grumpy Cat", "Grumpy Dog", "Grumpy Baby", "Grumpy Man", "Grumpy Teenager", "Grumpy Disney", "Grumpy Good Morning", "Grumpy Princess", "Grumpy Trump"];

    // Function for displaying buttons
    function renderButtons() {
    	console.log('renderButtons')

    $("#gifs-buttons").empty();
       // Looping through the array of grumpies
        for (var i = 0; i < grumpies.length; i++) {
          // Then dynamicaly generating buttons for each term in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("grumpywords");
          // Adding a data-attribute with a value of the term at index i
          a.attr("data-name", grumpies[i]);
          // Providing the button's text with a value of the term at index i
          a.text(grumpies[i]);
          // Adding the button to the HTML
          $("#gifs-buttons").append(a);
        }
  	}

// Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();

// This function handles events where one button is clicked
      $("#add-search").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var grumpyword = $("#topic-input").val().trim();
        // The wordfrom the textbox is then added to our array
console.log(grumpies);
console.log(grumpyword);

      grumpies.push(grumpyword);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

    // Event listener for all button elements
    $("#gifs-buttons").on("click", ".grumpywords", function() {
    	console.log('here');
      // In this case, the "this" keyword refers to the button that was clicked
     string = $(this).attr("data-name");

      // Constructing a URL to search Giphy for the search word
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + string + "&api_key=aFIbh5xXcfpa8GOLVaYcQktBcVOJgztB&limit=10";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
      .done(function(response) {
        console.log(response);
        //   // Storing an array of results in the results variable
        var results = response.data;

        //Looping over every result item
        for (var i = 0; i < results.length; i++) {

        //     // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        //       // Creating a div with the class "item"
       var gifDiv = $("<div>");
       gifDiv.addClass("item");
              

             // Creating a paragraph tag with the result item's rating
      var animated = response.data[i].images.fixed_height.url;
      var still = response.data[i].images.fixed_height_still.url;

        //       // Creating an image tag
      var grumpyImage = $("<img>");

        //       // Giving the image tag an src attribute of a proprty pulled off the
        //       // result item
              grumpyImage.attr("src", still);
              grumpyImage.attr("data-still", still);
              grumpyImage.attr("data-animated", animated);
              grumpyImage.attr("data-state", "still");
              grumpyImage.attr("searchImage");

       // Storing the result item's rating
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(grumpyImage);
              gifDiv.append(p);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-buttons").append(gifDiv);
          

            }}
          })
      })

            $(document).on("click",".item", function(){
              var state = $(this).attr("data-state");
              if(state === "still") {
                $(this).attr("src", $(this).attr("animated"));
                $(this).attr("data-state","animated");
            }else{
                $(this).attr("src",$(this).attr("still"));
                $(this).attr("data-state","still");
            }
            })
