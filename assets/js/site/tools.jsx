var App = App || {};
App.Tools = {};

/**
 * Navigate to a #! URL (the navigate function in react-mini-router seems to
 * want to force HTML5 history, which doesn't work on a local HTML file).
 */

App.Tools.navigate = function (url) {
    window.location.hash = '!/' + url;
};
