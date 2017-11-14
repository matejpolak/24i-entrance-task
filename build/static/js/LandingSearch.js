/*
    Class for LandingSearch container behaviour

    Functionality
    1) Show input after clicking the search icon
    2) hide input after clicking outside of the LandingSearch
 */

function landingSearch(button) {
    this.icon = button;
    this.env = $('.landing');
    this.container = $('.search');

    var self = this;

    this.icon.click(function() {
        self.PrepareInput();
    });

    this.env.click(function() {
        self.CloseInput();
    });

    this.container.click(function(e) {
        self.PreventClosing(e);
    })
}

landingSearch.prototype = {
    icon: null,

    PrepareInput: function() {
        $('#landing-search').toggleClass('open');
        $('#landing-search button').hide();
    },

    CloseInput: function() {
        $('#landing-search').removeClass('open');
    },

    PreventClosing: function(e) {
        e.stopPropagation();
    }
};