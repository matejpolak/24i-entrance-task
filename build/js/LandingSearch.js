/*
    Class for LandingSearch container behaviour

    Functionality
    1) Show input after clicking the search icon
    2) hide input after clicking outside of the LandingSearch
 */

function landingSearch(button) {
    this.icon = button;
    this.env = document.getElementsByTagName('body')[0];
    this.container = document.getElementById('landing-search');

    var self = this;

    this.icon.addEventListener('click', function() {
        self.PrepareInput();
    });


    this.env.addEventListener('click', function() {
        console.log('env-click');
        self.CloseInput();
    });


    this.container.addEventListener('click', function(e) {
        console.log('cont-clicked');
        self.PreventClosing(e);
    })
}

landingSearch.prototype = {
    icon: null,

    PrepareInput: function() {
        document.getElementById('landing-search').classList.add('open');
        document.querySelector('#landing-search button').style.display = 'none';
    },

    CloseInput: function() {
        document.getElementById('landing-search').classList.remove('open');
    },

    PreventClosing: function(e) {
        e.stopPropagation();
    }
};