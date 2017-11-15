/*
    Class solving displaying and hiding search containers

    Functionality
    1) Create header search
    2) Fade it In
    3) Fade landing search Out
 */
function HeaderSearch() {
    var headerParent = document.getElementsByClassName("header-search")[0];

    var headerSearch = document.createElement("div");
    headerSearch.innerHTML = '<div class="logo">\n' +
        '                <h1>Google</h1>\n' +
        '            </div>\n' +
        '            <div class="search">\n' +
        '                <div id="header-search" class="input open">\n' +
        '                    <i class="fa fa-search" aria-hidden="true"></i>\n' +
        '                    <input type="search" placeholder="Search..." value="" autofocus>\n' +
        '                    <button class="btn button"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>\n' +
        '                </div>\n' +
        '            </div>';
    headerSearch.className = 'search-container';

    headerParent.appendChild(headerSearch);
    headerParent.classList.add('fade-in');
    var content = document.getElementsByClassName('content')[0];
    content.classList.add('fade-out');

    //Create object of class Submitting from newly created elements

    // var headerInput = $('#header-search input');
    // var headerSubmit = $('#header-search button');
    // new Submitting(headerSubmit, headerInput, 1);

    var headerInput = document.querySelector('#header-search input');
    var headerSubmit = document.querySelector('#header-search button');
    new Submitting(headerSubmit, headerInput, 1);
}



