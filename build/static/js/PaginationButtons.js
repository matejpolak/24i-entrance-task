/*
    Class for pigination buttons

    Functionality
    1) Create pagination button
    2) Set proper value to those buttons
    3) Sent new AJAX call on click
 */

function paginationButtons() {
    this.current_page = 1;
    this.on_page = 10;
    this.nr = 1;


    if(headerInput.val().length > 0) {
        this.result = headerInput.val();
    } else if(landingInput.val().length > 0) {
        this.result = landingInput.val();
    }

    this.loadPage();

}

paginationButtons.prototype = {

    loadPage: function(nr = 1) {

        this.current_page = nr;
        this.current_page = parseInt(nr);
        this.generateButtons();

        var index = (nr - 1) * 10 + 1;

        $('.images .results').empty();
        $('.images .info').empty();
        $('.pages .results').empty();
        $('.pages .info').empty();

        var loading = '<i class="loading fa fa-spinner fa-pulse fa-3x fa-fw"></i>';
        $('.images .results').append(loading);
        $('.pages .results').append(loading);

        // AJAX call for normal pages
        $.ajax({
            "url" : "https://www.googleapis.com/customsearch/v1?key=AIzaSyCv9Rf2Byyw9TkNyku1ZiHBeUSeFErc_K4&cx=015921586228539547241:8aqkhvwhory&start=" + index + "&q="+ this.result,
            "type" : "get",
            "data": {
            }
        }).done(function(data) {
            var searchInfo = data;
            var PagesInfo = new SearchResult(searchInfo);
            PagesInfo.printPagesInfo();

            for( var i = 0; i < data.items.length; i++) {
                var result = data.items[i];
                var singlePage = new Page(result);
            }

            $('.pages .results .loading').detach();
        });

        // AJAX call for images
        $.ajax({
            "url" : "https://www.googleapis.com/customsearch/v1?key=AIzaSyCv9Rf2Byyw9TkNyku1ZiHBeUSeFErc_K4&cx=015921586228539547241:8aqkhvwhory&start=" + index + "&searchType=image&q="+ this.result,
            "type" : "get",
            "data": {
            }
        }).done(function(data) {
            console.log(data);

            var currentIndex = data.queries.nextPage[0].startIndex;
            var buttonValue = (currentIndex - 1) / 10;
            $('#buttons button[data-nr=' + buttonValue + ']').addClass('active');

            var searchInfo = data;
            var imagesInfo = new SearchResult(searchInfo);
            imagesInfo.printImagesInfo();

            for( var i = 0; i < data.items.length; i++) {
                var result = data.items[i];
                var singleImage = new Image(result);
            }

            $('.images .results .loading').detach();
        });
    },

    generateButtons: function() {
        $('#buttons').empty();

        for(var i = -2; i <= 2; i++) {
            if(this.current_page + i <= 0) { continue; }

            // create one button
            var btn = document.createElement('button');
            btn.innerHTML = this.current_page + i;

            // append to #buttons
            $('#buttons').append($(btn));
            btn.setAttribute('data-nr', this.current_page + i);

            // add event listener to load the right page
            btn.addEventListener('click', (function(ev) {

                ev.preventDefault();

                this.loadPage(ev.target.getAttribute('data-nr'));

            }).bind(this));
        }
    }
}