/*
    Class containing all about searching

    Functionality
    1) Display submit button when input values is > 0
    2) Defines what happens after SubmitButton is clicked
    3) Hides "LandignSearch" and shows "HeaderSearch"
    4) Display "LOADING" icons
    5) Sent new AJAX calls for PAGES and IMAGES
    6) Hides "LOADING" when data arrives
    7) Display SearchInfo
    8) Display Pages and Images
    9) Generate PaginationButtons
 */

function Submitting(button, input) {

    this.button = button;
    this.input = input;

    var self = this;

    // calling display function when input value is beeing changed
    this.input.keyup(function() {
        self.displayButton();
    });

    // submitting = "Search"
    this.button.click(function() {
        self.Submit();
    })

}

Submitting.prototype = {

    button: null,
    input: null,
    current_page: null,

    // Display search button in case, that input has at least 1 character
    displayButton: function() {
        if(this.input.val().length >= 1) {
            this.button.fadeIn('slow');
        } else {
            this.button.fadeOut('slow');
        }
    },

    // Exchange landing search into header search and Load the page with all results, infos, buttons, etc..
    Submit: function() {
        this.exchangeSearches()
        this.loadPage();
    },

    // Exchange search bars
    exchangeSearches: function() {

        var headerSearch = new HeaderSearch();
        $('.content').fadeOut();
    },

    // Load page with all info
    loadPage: function(nr = 1) {
        // set number of current page
        this.current_page = parseInt(nr);

        // set startIndex for upcoming AJAX call
        var index = (this.current_page - 1) * 10 + 1;

        // hide all results from previous requests
        this.emptyResults();

        // display loading animation until data are received
        this.displayLoading();

        // send AJAX call for images, pages and their search info
        this.sendAjaxCall(this.input.val(), index);


    },

    // hide all results from previous requests
    emptyResults: function() {
        $('.images .results').empty();
        $('.images .info').empty();
        $('.pages .results').empty();
        $('.pages .info').empty();
        $('#buttons').empty();
    },

    // display loading animation until data are received
    displayLoading: function() {
        var loading = '<i class="loading fa fa-spinner fa-pulse fa-3x fa-fw"></i>';
        $('.images .results').append(loading);
        $('.pages .results').append(loading);
    },

    // Ends the loading animation when data are received
    endLoading: function() {
        $('.pages .results .loading').detach();
        $('.images .results .loading').detach();
    },

    // send AJAX call for images, pages and their search info
    sendAjaxCall: function(value, index) {
        var self = this;
        // AJAX call for normal pages
        $.ajax({
            "url" : "https://www.googleapis.com/customsearch/v1?key=AIzaSyCv9Rf2Byyw9TkNyku1ZiHBeUSeFErc_K4&cx=015921586228539547241:8aqkhvwhory&start=" + index + "&q="+ value,
            "type" : "get",
            "data": {
            }
        }).done(function(data) {
            // display search info ("xy images in xy seconds founded")
            self.displaySearchInfo('page', data);

            // send data into the function which is going to generate results
            self.displayResults('page', data);

            // hide loading
            self.endLoading();

            // generate paggination buttons
            self.generatePaginationButtons();

            // highlight current pagination button
            self.highlightCurrentPaginationButton(data);
        });

        // AJAX call for images
        $.ajax({
            "url" : "https://www.googleapis.com/customsearch/v1?key=AIzaSyCv9Rf2Byyw9TkNyku1ZiHBeUSeFErc_K4&cx=015921586228539547241:8aqkhvwhory&start=" + index + "&searchType=image&q="+ value,
            "type" : "get",
            "data": {
            }
        }).done(function(data) {
            // display search info ("xy images in xy seconds founded")
            self.displaySearchInfo('image', data);

            // send data into the function which is going to generate results
            self.displayResults('image', data);

            // hide loading
            self.endLoading();
        });

    },

    // Display correct search info
    displaySearchInfo: function(type, data) {
        if(type == 'image') {
            var imagesInfo = new SearchResult(data);
            imagesInfo.printImagesInfo();
        } else {
            var PagesInfo = new SearchResult(data);
            PagesInfo.printPagesInfo();
        }
    },

    // display received results when ready
    displayResults: function(type, data) {
        if(type == 'image') {
            for( var i = 0; i < data.items.length; i++) {
                var result = data.items[i];
                var singleImage = new Image(result);
            }
        } else {
            for( var i = 0; i < data.items.length; i++) {
                var singlePage = new Page(data.items[i]);
            }
        }
    },

    // generate pagination buttons when data are received
    generatePaginationButtons: function() {
        var self = this;
        $('#buttons').empty();

        // Gererate buttons with correct values
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

                self.loadPage(ev.target.getAttribute('data-nr'));

            }).bind(this));
        }
    },

    highlightCurrentPaginationButton: function(data) {
        // get startIndex of current page
        var currentIndex = data.queries.nextPage[0].startIndex;

        // get correct value of current button
        var buttonValue = (currentIndex - 1) / 10;

        // highlight the button
        $('#buttons button[data-nr=' + buttonValue + ']').addClass('active');
    }
};