/*
    Class for proper pages results

    Functionality
    1) Looping through search results
    2) Use correct piece of information in right place
    3) Append final <div> into main file
 */

function Image(obj) {

    this.result = obj;
    this.title = obj.title;
    this.displayLink = obj.displayLink;
    this.link = obj.link;
    this.width = obj.image.width;
    this.height = obj.image.height;
    this.thumbnail = obj.image.thumbnailLink;


    this.printImage();
};

Image.prototype = {

    result: null,
    title: null,
    displayLink: null,
    link: null,
    width: null,
    height: null,
    thumbnail: null,

printImage: function () {

    var container = document.querySelector('.images .results');

    var div = document.createElement('div');
    div.className = 'image-result';
    div.innerHTML = '<div class="thumbnail"><img src="' + this.thumbnail + '" alt="' + this.title + '"></div>' +
        '<div class="size-link">' + this.width + 'x' + this.height + ' - ' + this.displayLink + '</div>';

    container.appendChild(div);
}
}
;