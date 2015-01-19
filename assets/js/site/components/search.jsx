/**
 * Search for tags.
 */

App.Search = React.createClass({
    handleKeyPress: function (e) {
        this.props.updateSearchTerm(this.refs.searchInput.getDOMNode().value);
    },

    render: function() {
        return (
            <div id="search">
                <input type="text" placeholder="Search tags..." ref="searchInput" onChange={this.handleKeyPress} />
            </div>
        );
    }
});
