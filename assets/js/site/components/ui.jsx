/**
 * The main UI for the entire app.
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
            photos: [],
            searchTerm: ''
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

                // if photos were returned
                if (typeof data.items !== 'undefined') {
                    photos = data.items.map(function(item) {
                        // we don't have an ID in the JSON, so let's create one
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

    /**
     * Updates the search term in the state.
     * @param {string} term - The search term to update.
     */

    updateSearchTerm: function(term) {
        this.setState({
            searchTerm: term
        });
    },

    render: function() {
        return (
            <div>
                <header id="main-header">
                    <h1>Flickr Public Feed</h1>
                    <App.Search updateSearchTerm={this.updateSearchTerm} />
                </header>
                {this.renderCurrentRoute()}
            </div>
        );
    },

    /**
     * Main photo feed.
     * Found in ./components
     */

    feed: function() {
        return (
            <App.PhotoList photos={this.state.photos} search_term={this.state.searchTerm} />
        );
    },

    /**
     * Detail view.
     * Found in ./components
     */

    detail: function(id) {
        if (this.state.photos.length === 0) {
            return (
                <p>Loading...</p>
            );
        }

        // find the photo in the state based on the ID that we constructed,
        // using jQuery's grep function
        var photo = $.grep(this.state.photos, function(item) {
            return item.id === id;
        });

        if (photo.length === 0) {
            photo = null;
        } else {
            photo = photo[0];
        }

        return (
            <App.Detail photo={photo} updateSearchTerm={this.updateSearchTerm} />
        );
    }

});
