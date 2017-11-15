/*
    Class for displaying Error message when there are no results

    Functionality
    1) Create object of this class
    2) Append "error message" to right parent
 */

function Error(type) {

    this.pages = document.querySelector('.pages .results');
    this.images = document.querySelector('.images .results');

    if(type == 'image') {
        this.imagesMessage();
    } else {
        this.pagesMessage();
    }


}

Error.prototype = {


    imagesMessage: function() {

        var images = document.createElement('div');
        images.className = 'image-error';
        images.innerHTML =
            '<div class="error-message"><h3>Sorry, we didn\'t found any valid images for your searched term</h3>' +
                '<ul>Suggestions' +
                    '<li>Make sure all words are written correctly.</li>' +
                    '<li>Try other keywords.</li>' +
                    '<li>Try more general keywords..</li>' +
                '</ul>' +
            '</div>';

        this.images.appendChild(images);
    },

    pagesMessage: function() {

        var pages = document.createElement('div');
        pages.className = 'image-error';
        pages.innerHTML =
            '<div class="error-message"><h3>Sorry, we didn\'t found any valid pages for your searched term</h3>' +
            '<ul>Suggestions' +
            '<li>Make sure all words are written correctly.</li>' +
            '<li>Try other keywords.</li>' +
            '<li>Try more general keywords..</li>' +
            '</ul>' +
            '</div>';

        this.pages.appendChild(pages);
    }
};
