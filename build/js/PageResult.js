/*
    Class for proper pages results

    Functionality
    1) Looping through search results
    2) Use correct piece of information in right place
    3) Append final <div> into main file
 */

function Page(obj) {

    this.result = obj;
    this.displayLink = obj.displayLink;
    this.title = obj.htmlTitle;
    this.snippet = obj.htmlSnippet;
    this.url = obj.link;

    this.printPage();
};

Page.prototype = {

    result: null,
    displayLink: null,
    title: null,
    snippet: null,
    url: null,
    image: null,
    results: null,
    time: null,

    printPage: function() {

        var container = document.querySelector('.pages .results');

        var div = document.createElement('div');
        div.className = 'page-result';
        div.innerHTML = '<div class="title"><a href="' + this.url + '">' + this.title + '</a></div>' +
            '<div class="link"><a href="' + this.url + '">' + this.url + '</a></div>' +
            '<div class="snippet"><p>' + this.snippet + '</p></div>';

        container.appendChild(div);
    }
};