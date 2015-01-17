var App = App || {};

App.UI = React.createClass({

    mixins: [ReactMiniRouter.RouterMixin],

    routes: {
        '/': 'feed',
        '/photo/:id': 'detail'
    },

    render: function() {
        return this.renderCurrentRoute();
    },

    feed: function() {
        return (
            <App.Feed />
        );
    },

    detail: function(id) {
        return (
            <App.Detail id={id} />
        );
    }

});
