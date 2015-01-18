var App = App || {};
App.Tools = {};

/**
 * Navigate to a #! URL (the navigate function in react-mini-router seems to
 * want to force HTML5 history, which doesn't work on a local HTML file).
 */

App.Tools.navigate = function(url) {
    window.location.hash = '!/' + url;
};





/**
 * Resizes the supplied element (which is scrollable) so that it fits on the screen
 * perfectly.
 */

App.Tools.resizeElement = function(node, onresize) {
    if (typeof onresize === 'undefined') {
        onresize = true;
    }

    // resize the element's height, taking into account its padding

    node = $(node);
    var padding_top = parseInt(node.css('padding-top').slice(0,-2));
    var padding_bottom = parseInt(node.css('padding-top').slice(0,-2));
    node.height($(window).innerHeight() - 125 - (padding_top + padding_bottom));

    // if onresize, also resize it on window resize so that it's always the
    // correct height

    if (onresize) {
        $(window).on('resize.node', function() {
            App.Tools.resizeElement(node, false);
        }.bind(this));
    }
};
