# Flickr Feed

This is just a weekend project playing around with the [Flickr JSON API](https://www.flickr.com/services/feeds/docs/photos_public/) and [React](http://facebook.github.io/react/).

It pulls in a feed of Flickr photos using their JSON API (using JSONP), populates the React state, and takes things from there. It's not ground-breaking but it was fun to do, and perhaps somebody could find some part of this useful!

## Getting started

Simply load ```./site/index.html``` in the browser of your choice - [as long as they're supported by Google Apps](https://support.google.com/a/answer/33864), which is most browsers - and everything should just work.

## Viewing the code

The main part of the app is the JS, which can be found in ```./assets/js/site```. Components are stored in the ```components``` directory. You might want to start with ```components/ui.jsx```.

The LESS can be found in ```./assets/css/site```. The main file that imports everything is ```base.less```.

## License

This is released under the MIT License. See the LICENSE file for more information.
