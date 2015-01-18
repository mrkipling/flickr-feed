/**
 * Author link.
 * Links to the author's Flickr profile.
 */

App.AuthorLink = React.createClass({
    render: function() {
        // take the author name from the JSON and format it nicely, removing the
        // nobody@flickr.com stuff and brackets (but only if they exist,
        // otherwise just use what we have

        var author_name = this.props.author;

        if (author_name.indexOf('nobody@flickr.com (') !== -1) {
            author_name = author_name.replace('nobody@flickr.com (', '').slice(0, -1);
        }

        return (
            <a className="author" href={'https://www.flickr.com/people/' + this.props.author_id + '/'} target="_blank">{author_name}</a>
        );
    }
});





/**
 * Nicely-formatted timestamp of when the post was published.
 */

App.Published = React.createClass({
    render: function() {
        return (
            <span className="published">Published: {moment(this.props.published).format('Do MMM [at] HH:mm')}</span>
        );
    }
});
