# Task Runners With Domino/XPages

A repository to contain the front-end assets and instructions for how to utilize Grunt or gulp with a front-end to a Domino/XPages application.

## Installation

You must have:

* [git](http://git-scm.com/)
* a current version of [Node](https://nodejs.org/en/) ~~or [io.js](https://iojs.org/en/)~~ (with npm package manager) *note: [io.js merged with Node](http://www.linuxfoundation.org/news-media/announcements/2015/06/nodejs-foundation-advances-community-collaboration-announces-new) again (ca. June 2015), so probably skip io.js
* Internet access

Run `npm install` which will install some npm dependencies (including `json-server`, then run `bower install`, which will install the front-end libraries needed. Lastly, you need to symlink a `public/` path to the `NSF/WebContent/` directory.

* for *nix and Mac operating systems, the command is `ln -s NSF/WebContent/ public`
* for Windows, you'll need to start up the command prompt (from the Start/search, "cmd", right-click and select "run as administrator")
  * change directory to the root of the working git repository we set up, then run `mklink /d public NSF\WebContent`
* don't worry about duplicate data, these are both methods for a symbolic link, meaning it's the same file, with multiple path pointers (and the `.gitignore` file is set up to ignore the public path, so we won't pollute our repository with duplicates)

## Usage

Read up on the blog series on task runners on Domino on [edm00se.io](https://edm00se.io) or try running `npm start` for the original front-end application with back-end mock. Then t

## IBM Connect 2016

This content, along with much more, will be component to an application development session at IBM Connect 2016, [#1380: A Beard, An App, A Blender: One Developer's Take on Building Apps With Domino/XPages](https://www-950.ibm.com/events/global/connect/sessions/preview.html?sessionid=CBEM-1380).

## History

The want/need to reconcile the concerns involved in modern front-end tooling combined with Domino/XPages back-end performance is born of a love for the web and automation. For more, read up on my chronicles on [edm00se.io](https://edm00se.io).

## Credits

Considerable credit should go to:

* [Grunt](http://gruntjs.com/)
* [gulp](http://gulpjs.com/)
* [json-server](https://github.com/typicode/json-server)
* [egghead.io's video lesson on using json-server](https://egghead.io/lessons/nodejs-creating-demo-apis-with-json-server)
* [scotch.io](https://scotch.io) for having great tutorials on getting started with Grunt and gulp

## License

As is my norm for my blog and my GitHub repositories, the work contained herein is licensed under a [Creative Commons Attribution 4.0 ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). You may use, alter, and redistribute the code herein (with citation), while expecting no warranty for its use.