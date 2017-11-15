function SearchResult(obj) {
    this.search = obj;
    this.results = obj.searchInformation.formattedTotalResults;
    this.time = obj.searchInformation.formattedSearchTime;

};

SearchResult.prototype = {

    printPagesInfo: function () {

        var container = document.querySelector('.pages .info');

        var info = document.createElement('div');
        info.className = 'page-result-info';
        info.innerHTML = '<div class="info"><span>Total pages found: ' + this.results + ' (' + this.time + ' s)</span></div>';

        container.appendChild(info);
    },

    printImagesInfo: function () {

        var container = document.querySelector('.images .info');

        var info = document.createElement('div');
        info.className = 'page-result-info';
        info.innerHTML = '<div class="info"><span>Total images found:  ' + this.results + ' (' + this.time + ' s)</span></div>';

        container.appendChild(info);
    }
};