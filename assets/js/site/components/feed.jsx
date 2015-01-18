var App = App || {};

/**
 * PhotoList (the list of photos in the feed).
 */

App.PhotoList = React.createClass({

    componentDidMount: function() {
        // resize the feed node on initial page load and on window resize
        App.Tools.resizeElement(this.getDOMNode());
    },

    componentWillUnmount: function() {
        // get rid of the window onresize binding
        $(window).off('resize.node');
    },

    render: function() {
        var photo_list = this.props.photos.map(function(photo, i) {
            return (
                <App.PhotoListItem key={'photo-li-' + i} photo={photo} />
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
    showDetail: function() {
        App.Tools.navigate('photo/' + this.props.photo.id);
    },

    render: function() {
        var photo = this.props.photo;

        // the image needs to be a background-image because we're using
        // background-size: cover in order to make it fit nicely

        var thumb_style = {
            backgroundImage: 'url(' + photo.media.m + ');'
        };

        // N.B. this is perhaps slightly hacky, but in order to change the order
        // of elements based on screen width we're going to display the
        // 'published' details twice

        return (
            <li>
                <div className="thumb" style={thumb_style} onClick={this.showDetail} />
                <div className="inner">
                    <h2 onClick={this.showDetail}>{photo.title || "Untitled"}</h2>
                    <div className="details">
                        <App.Published published={photo.published} />
                        <App.AuthorLink author_id={photo.author_id} author={photo.author} />
                        <App.Published published={photo.published} />
                        <a className="view" href={photo.link} target="_blank">View on Flickr</a>
                    </div>
                </div>
            </li>
        );
    }

});
