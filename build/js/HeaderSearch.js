/*
    Class solving displaying and hiding search containers

    Functionality
    1) Create header search
    2) Fade it In
    3) Fade landing search Out
 */
function HeaderSearch() {

    $('.header-search').append('' +
        '            <div class="search-container">\n' +
        '            <div class="logo">\n' +
        '                <h1>Google</h1>\n' +
        '            </div>\n' +
        '            <div class="search">\n' +
        '                <div id="header-search" class="input open">\n' +
        '                    <i class="fa fa-search" aria-hidden="true"></i>\n' +
        '                    <input type="search" placeholder="Search..." value="" autofocus>\n' +
        '                    <button class="btn button"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>');
    $('.header-search').hide();
    $('.header-search').fadeIn('slow');
    $('.content').fadeOut();

    //Create object of class Submittng from newly created elements
    var headerInput = $('#header-search input');
    var headerSubmit = $('#header-search button');
    var header = new Submitting(headerSubmit ,headerInput, 1);
}

