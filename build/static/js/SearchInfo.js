function SearchResult(obj) {
    this.search = obj;
    this.results = obj.searchInformation.formattedTotalResults;
    this.time = obj.searchInformation.formattedSearchTime;

};

SearchResult.prototype = {

    printPagesInfo: function () {
        var info =
            '<div class="page-result-info">' +
            '   <div class="info"><span>Total pages found: ' + this.results + ' (' + this.time + ' s)</span></div>' +
            '</div>';

        $('.pages .info').append(info);
    },

    printImagesInfo: function () {
        var info =
            '<div class="page-result-info">' +
            '   <div class="info"><span>Total images found:  ' + this.results + ' (' + this.time + ' s)</span></div>' +
            '</div>';

        $('.images .info').append(info);
    }
};