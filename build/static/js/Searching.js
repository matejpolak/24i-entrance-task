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

function Submitting(button, input) {

    this.button = button;
    this.input = input;

}

Submitting.prototype = {

    button: null,
    input: null,

    DisplayButton: function() {

    },

    Submit: function() {

    },

    ExchangeSearches: function() {

    },

    DisplayLoading: function() {

    },

    SendAjaxCall: function() {

    },

    HideLoading: function() {

    },

    DisplaySearchInfo: function() {

    },

    DisplayResults: function() {

    },

    DisplayPaginationButtons: function() {

    }
}