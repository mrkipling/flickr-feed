var App=App||{};App.Tools={},App.Tools.navigate=function(e){window.location.hash="!/"+e},App.Tools.resizeElement=function(e,t){"undefined"==typeof t&&(t=!0),e=$(e);var a=parseInt(e.css("padding-top").slice(0,-2)),n=parseInt(e.css("padding-top").slice(0,-2));e.height($(window).innerHeight()-125-(a+n)),t&&$(window).on("resize.node",function(){App.Tools.resizeElement(e,!1)}.bind(this))},App.Detail=React.createClass({displayName:"Detail",componentDidMount:function(){var e=this.getDOMNode();App.Tools.resizeElement(e)},componentWillUnmount:function(){$(window).off("resize.node")},goBack:function(){App.Tools.navigate("")},render:function(){var e=this.props.photo;if(!e)return React.createElement("div",{className:"not-found"},React.createElement("p",null,"Photo not found."),React.createElement("p",{className:"go-back",onClick:this.goBack},"Click here to go back."));var t,a={backgroundImage:"url("+e.media.m+");"};return t=2===(e.description.match(/<p>/g)||[]).length?React.createElement("p",null,"No description was supplied."):React.createElement("div",{className:"description",dangerouslySetInnerHTML:{__html:e.description}}),React.createElement("div",{id:"photo-detail"},React.createElement("h2",{id:"photo-title"},React.createElement("a",{href:e.link,target:"_blank"},e.title)),React.createElement("div",{id:"go-back",onClick:this.goBack},"Back"),React.createElement("div",{className:"info"},React.createElement(App.AuthorLink,{author_id:e.author_id,author:e.author}),React.createElement("span",{className:"separator"},"|"),React.createElement(App.Published,{published:e.published})),React.createElement("div",{className:"details"},React.createElement("a",{className:"thumb",href:e.link,target:"_blank",style:a}),t,React.createElement(App.Tags,{tags:e.tags})))}}),App.Tags=React.createClass({displayName:"Tags",render:function(){var e=this.props.tags?this.props.tags.split(" ").map(function(e){return React.createElement("a",{href:"https://www.flickr.com/search/?tags="+e,target:"_blank"},e)}):React.createElement("span",null,"No tags provided");return React.createElement("div",{className:"tags"},React.createElement("span",null,"Tags:"),e)}}),App.PhotoList=React.createClass({displayName:"PhotoList",componentDidMount:function(){App.Tools.resizeElement(this.getDOMNode())},componentWillUnmount:function(){$(window).off("resize.node")},render:function(){var e=this.props.search_term,t=this.props.photos;e&&(t=$.grep(t,function(t){return t.tags.indexOf(e)>-1}));var a=t.map(function(e,t){return React.createElement(App.PhotoListItem,{key:"photo-li-"+t,photo:e})});return React.createElement("ul",{id:"photo-list",className:"listfix"},a)}}),App.PhotoListItem=React.createClass({displayName:"PhotoListItem",showDetail:function(){App.Tools.navigate("photo/"+this.props.photo.id)},render:function(){var e=this.props.photo,t={backgroundImage:"url("+e.media.m+");"};return React.createElement("li",null,React.createElement("div",{className:"thumb",style:t,onClick:this.showDetail}),React.createElement("div",{className:"inner"},React.createElement("h2",{onClick:this.showDetail},e.title||"Untitled"),React.createElement("div",{className:"details"},React.createElement(App.Published,{published:e.published}),React.createElement(App.AuthorLink,{author_id:e.author_id,author:e.author}),React.createElement(App.Published,{published:e.published}),React.createElement("a",{className:"view",href:e.link,target:"_blank"},"View on Flickr"))))}}),App.Search=React.createClass({displayName:"Search",handleKeyPress:function(){this.props.updateSearchTerm(this.refs.searchInput.getDOMNode().value)},render:function(){return React.createElement("div",{id:"search"},React.createElement("input",{type:"text",placeholder:"Search tags...",ref:"searchInput",onKeyUp:this.handleKeyPress}))}}),App.AuthorLink=React.createClass({displayName:"AuthorLink",render:function(){var e=this.props.author;return-1!==e.indexOf("nobody@flickr.com (")&&(e=e.replace("nobody@flickr.com (","").slice(0,-1)),React.createElement("a",{className:"author",href:"https://www.flickr.com/people/"+this.props.author_id+"/",target:"_blank"},e)}}),App.Published=React.createClass({displayName:"Published",render:function(){return React.createElement("span",{className:"published"},"Published: ",moment(this.props.published).format("Do MMM [at] HH:mm"))}}),App.UI=React.createClass({displayName:"UI",mixins:[ReactMiniRouter.RouterMixin],routes:{"/":"feed","/photo/:id":"detail"},getInitialState:function(){return{photos:[],searchTerm:""}},loadPhotos:function(){$.ajax({url:"https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=?",type:"GET",cache:!0,dataType:"jsonp",success:function(e){var t;t="undefined"!=typeof e.items?e.items.map(function(e){var t=e.link.split("/");return e.id=t[t.length-2],e}):[],this.setState({photos:t})}.bind(this)})},componentDidMount:function(){this.loadPhotos()},updateSearchTerm:function(e){this.setState({searchTerm:e})},render:function(){return React.createElement("div",null,React.createElement("header",{id:"main-header"},React.createElement("h1",null,"Flickr Public Feed"),React.createElement(App.Search,{updateSearchTerm:this.updateSearchTerm})),this.renderCurrentRoute())},feed:function(){return React.createElement(App.PhotoList,{photos:this.state.photos,search_term:this.state.searchTerm})},detail:function(e){if(0===this.state.photos.length)return React.createElement("p",null,"Loading...");var t=$.grep(this.state.photos,function(t){return t.id===e});return t=0===t.length?null:t[0],React.createElement(App.Detail,{photo:t})}}),React.render(React.createElement(App.UI,null),document.getElementById("app"));