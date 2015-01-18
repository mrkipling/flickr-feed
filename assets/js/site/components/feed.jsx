var App = App || {};

/**
 * The main photo feed (index page).
 */

App.Feed = React.createClass({

    render: function() {
        var photos = this.props.photos;

        return (
            <div id="feed">
                <h1 id="feed-title">Flickr Public Feed</h1>
                <App.PhotoList photos={photos} />
            </div>
        );
    }

});





/**
 * PhotoList (the list of photos in the feed).
 */

App.PhotoList = React.createClass({

    /**
     * Resizes the feed node (which is scrollable) so that it fits on the screen
     * perfectly.
     */

    resizeNode: function() {
        $(this.getDOMNode()).height($(window).innerHeight() - 125);
    },

    componentDidMount: function() {
        // resize the feed node on initial page load
        this.resizeNode();

        // also resize it on window resize so that it's always the correct height
        $(window).on('resize', function() {
            this.resizeNode();
        }.bind(this));
    },

    render: function() {
        var photo_list = this.props.photos.map(function(photo) {
            return (
                <App.PhotoListItem photo={photo} />
            );
        });

        return (
            <ul id="photo-list" className="listfix">
                {photo_list}
            </ul>
        );
    }

});





/**
 * PhotoListItem (a row in the list of photos in the feed).
 */

App.PhotoListItem = React.createClass({
    render: function() {
        var photo = this.props.photo;

        // the image needs to be a background-image because we're using
        // background-size: cover in order to make it fit nicely

        var thumb_style = {
            'background-image': 'url(' + photo.media.m + ');'
        };

        // take the author name from the JSON and format it nicely, removing the
        // nobody@flickr.com stuff and brackets (but only if they exist,
        // otherwise just use what we have

        var author_name = photo.author;
        if (author_name.indexOf('nobody@flickr.com (') !== -1) {
            author_name = author_name.replace('nobody@flickr.com (', '').slice(0, -1);
        }

        return (
            <li>
                <div className="thumb" style={thumb_style} />
                <div className="inner clearfix">
                    <h2>{photo.title}</h2>
                    <div className="details">
                        <a className="author" href={'https://www.flickr.com/people/' + photo.author_id + '/'} target="_blank">{author_name}</a>
                    </div>
                </div>
            </li>
        );
    }

});
