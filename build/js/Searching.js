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

function Submitting(button, input, headerSearch) {

    this.button = button;
    this.input = input;
    this.headerSearch = headerSearch;

    var self = this;

    // calling display function when input value is beeing changed
    this.input.addEventListener('keyup', function() {
        self.displayButton();
    });

    // submitting = "Search"
    this.button.addEventListener('click', function() {
        self.Submit();
    })

}

Submitting.prototype = {

    button: null,
    input: null,
    current_page: null,
    headerSearch: null,

    // Display search button in case, that input has at least 1 character
    displayButton: function() {

        if(this.input.value.length >= 1) {
            this.button.classList.remove('fade-out');
            this.button.classList.add('fade-in');
            this.button.style.display = '';
        } else {
            this.button.classList.remove('fade-in');
            this.button.classList.add('fade-out');
            this.button.style.display = 'none';
        }
    },

    // Exchange landing search into header search and Load the page with all results, infos, buttons, etc..
    Submit: function() {
        this.exchangeSearches();
        this.loadPage();
    },

    // Exchange search bars
    exchangeSearches: function() {

        if(!this.headerSearch) {
            this.headerSearch = new HeaderSearch();
            document.getElementsByClassName('content')[0].classList.remove('fade-in');
            document.getElementsByClassName('content')[0].classList.add('fade-out');
            document.getElementsByClassName('content')[0].style.display = 'none';
        }

    },

    // Load page with all info
    loadPage: function(nr) {

        if(nr === undefined) {
            nr = 1;
        }
        // set number of current page
        this.current_page = parseInt(nr);

        // set startIndex for upcoming AJAX call
        var index = (this.current_page - 1) * 10 + 1;

        // hide all results from previous requests
        this.emptyResults();

        // display loading animation until data are received
        this.displayLoading();

        // send AJAX call for images, pages and their search info
        this.sendAjaxCall(this.input.value, index);


    },

    // hide all results from previous requests
    emptyResults: function() {
        document.querySelector('.images .results').innerHTML = '';
        document.querySelector('.images .info').innerHTML = '';
        document.querySelector('.pages .results').innerHTML = '';
        document.querySelector('.pages .info').innerHTML = '';
        document.getElementById('buttons').innerHTML = '';
    },

    // display loading animation until data are received
    displayLoading: function() {

        var imagesContainer = document.querySelector('.images .results');
        var pagesContainer = document.querySelector('.pages .results');

        var loading = document.createElement('span');
        loading.className = 'loading';
        loading.innerHTML = '<i class="loading fa fa-spinner fa-pulse fa-3x fa-fw"></i>';

        var loading2 = document.createElement('span');
        loading2.className = 'loading';
        loading2.innerHTML = '<i class="loading fa fa-spinner fa-pulse fa-3x fa-fw"></i>';

        imagesContainer.appendChild(loading);
        pagesContainer.appendChild(loading2);
    },

    // Ends the loading animation when data are received
    endLoading: function() {
        var pagesLoading = document.querySelector('.pages .results span');
        var pages = document.querySelector('.pages .results');
        var imagesLoading = document.querySelector('.images .results span');
        var images = document.querySelector('.images .results');
        if(pagesLoading) {
            pages.removeChild(pages.firstChild);
        } else if(imagesLoading) {
            images.removeChild(images.firstChild);
        }
    },

    // send AJAX call for images, pages and their search info
    sendAjaxCall: function(value, index) {
        var self = this;

        // AJAX call for normal pages
        var pagesRequest = new XMLHttpRequest();
        pagesRequest.open("GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyCv9Rf2Byyw9TkNyku1ZiHBeUSeFErc_K4&cx=015921586228539547241:8aqkhvwhory&start=" + index + "&q="+ value, true);

        pagesRequest.onload = function() {
            if (pagesRequest.status >= 200 && pagesRequest.status < 400) {

                // JSON.Parse request string
                var data = JSON.parse(pagesRequest.responseText);

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
            } else {

            }
        };

        pagesRequest.send();

        // AJAX call for images
        var imagesRequest = new XMLHttpRequest();
        imagesRequest.open("GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyCv9Rf2Byyw9TkNyku1ZiHBeUSeFErc_K4&cx=015921586228539547241:8aqkhvwhory&start=" + index + "&searchType=image&q="+ value, true);

        imagesRequest.onload = function() {
            if (imagesRequest.status >= 200 && imagesRequest.status < 400) {

                // JSON.Parse request string
                var data = JSON.parse(imagesRequest.responseText);

                // display search info ("xy images in xy seconds founded")
                self.displaySearchInfo('image', data);

                // send data into the function which is going to generate results
                self.displayResults('image', data);

                // hide loading
                self.endLoading();
            } else {

            }
        };

        imagesRequest.send();

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
                new Image(result);
            }
        } else {
            for( var i = 0; i < data.items.length; i++) {
                new Page(data.items[i]);
            }
        }
    },

    // generate pagination buttons when data are received
    generatePaginationButtons: function() {

        var self = this;
        var buttonsContainer = document.getElementById('buttons');
        buttonsContainer.innerHTML = '';

        // Generate buttons with correct values
        for(var i = -2; i <= 2; i++) {
            if(this.current_page + i <= 0) { continue; }

            // create one button
            var btn = document.createElement('button');
            btn.innerHTML = this.current_page + i;
            btn.setAttribute('data-nr', this.current_page + i);

            // add event listener to load the right page
            btn.addEventListener('click', (function(ev) {

                ev.preventDefault();

                self.loadPage(ev.target.getAttribute('data-nr'));

            }).bind(this));

            // append to #buttons
            buttonsContainer.appendChild(btn);
        }
    },

    highlightCurrentPaginationButton: function(data) {
        // get startIndex of current page
        var currentIndex = data.queries.nextPage[0].startIndex;

        // get correct value of current button
        var buttonValue = (currentIndex - 1) / 10;

        // highlight the button
        var buttons = document.getElementById('buttons').children;
            for(var i = 1; i < buttons.length; i++) {
                if(buttons[i].getAttribute('data-nr') == buttonValue) {
                    buttons[i].classList.add('active');
                }
            }


    }
};