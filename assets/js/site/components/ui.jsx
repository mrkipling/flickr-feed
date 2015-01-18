var App = App || {};

/**
 * The main UI for the entire app.
 * This is where the state lives.
 */

App.UI = React.createClass({

    mixins: [ReactMiniRouter.RouterMixin],

    /**
     * Define #! URL routes.
     */

    routes: {
        '/': 'feed',
        '/photo/:id': 'detail'
    },

    getInitialState: function() {
        return {
            photos: []
        };
    },

    /**
    * Load Flickr photos using JSONP and add them to the state.
    */

    loadPhotos: function () {
        $.ajax({
            url: "https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=?",
            type: "GET",
            cache: true,
            dataType: 'jsonp',
            success: function(data) {
                var photos;

                if (typeof data.items !== 'undefined') {
                    photos = data.items.map(function(item) {
                        var urlbits = item.link.split('/');
                        item.id = urlbits[urlbits.length - 2];
                        return item;
                    });
                } else {
                    photos = [];
                }

                // add retrieved Flickr photos to the state
                this.setState({
                    photos: photos
                });
            }.bind(this)
        });
    },

    componentDidMount: function() {
        this.loadPhotos();
    },

    render: function() {
        return this.renderCurrentRoute();
    },

    /**
     * Main photo feed.
     * Found in ./components
     */

    feed: function() {
        return (
            <App.Feed photos={this.state.photos} />
        );
    },

    /**
     * Detail view.
     * Found in ./components
     */

    detail: function(id) {
        return (
            <App.Detail id={id} />
        );
    }

});
