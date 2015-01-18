var App = App || {};

/**
 * Photo detail.
 */

App.Detail = React.createClass({

    componentDidMount: function() {
        var node = this.getDOMNode();

        // resize the feed node on initial page load and on window resize
        App.Tools.resizeElement(node);
    },

    componentWillUnmount: function() {
        // get rid of the window onresize binding
        $(window).off('resize.node');
    },

    goBack: function() {
        App.Tools.navigate('');
    },

    render: function() {
        var photo = this.props.photo;

        if (!photo) {
            return (
                <div className="not-found">
                    <p>Photo not found.</p>
                    <p className="go-back" onClick={this.goBack}>Click here to go back.</p>
                </div>
            );
        }

        // the image needs to be a background-image because we're using
        // background-size: cover in order to make it fit nicely

        var thumb_style = {
            backgroundImage: 'url(' + photo.media.m + ');'
        };

        // Annoyingly, the description in the API isn't great. The first two
        // paragraphs are "<User> posted a photo:" followed by an <img> tag
        // containing the photo, with links. The following section of code
        // determines if there are only two <p> tags in the description, and
        // if so we display a "No description was supplied" message instead.
        // We are also hiding the first two paragraphs using CSS.

        var description;

        if ((photo.description.match(/<p>/g) || []).length === 2) {
            description = (
                <p>No description was supplied.</p>
            );
        } else {
            description = (
                <div className="description" dangerouslySetInnerHTML={{__html: photo.description}} />
            );
        }

        return (
            <div id="photo-detail">
                <h2 id="photo-title"><a href={photo.link} target="_blank">{photo.title}</a></h2>
                <div id="go-back" onClick={this.goBack}>Back</div>

                <div className="info">
                    <App.AuthorLink author_id={photo.author_id} author={photo.author} />
                    <span className="separator">|</span>
                    <App.Published published={photo.published} />
                </div>

                <div className="details">
                    <div className="thumb" style={thumb_style} />
                    {description}
                    <App.Tags tags={photo.tags} />
                </div>
            </div>
        );
    }

});





/**
 * Tags (with links).
 */

App.Tags = React.createClass({
    render: function() {
        var tags = this.props.tags.split(' ').map(function(tag) {
            return (
                <a href={'https://www.flickr.com/search/?tags=' + tag} target="_blank">{tag}</a>
            );
        });

        return (
            <div className="tags">
                <span>Tags:</span>
                {tags}
            </div>
        );
    }
});
