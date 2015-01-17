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

    componentDidMount: function() {
        $(this.getDOMNode()).height($(window).innerHeight() - 125);
    },

    render: function() {
        var photo_list = this.props.photos.map(function(photo) {
            return (
                <App.PhotoListItem photo={photo} />
            );
        });

        return (
            <ul id="photo-list">
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

        var thumb_style = {
            'background-image': 'url(' + photo.media.m + ');'
        };

        return (
            <li>
                <div className="inner clearfix">
                    <div className="thumb" style={thumb_style}>

                    </div>
                </div>
            </li>
        );
    }

});
