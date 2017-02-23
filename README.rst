====================
Spotify Party Player
====================

Party Player interface for Spotify. Does not replace the current song ever.

Only works on Linux right now, because the current song information can only be
requested via DBUS.

Building & Developing The Software
==================================

The build system of the Spotify Player is based on ant. You must have **ant >=
1.8** installed. To be able to use it you should first initilaize the submodule
containing the build commons::

    git submodule update --init

To develop the Spotify Player we heavily depend on a JavaScript build stack.
For this you must have ``node`` and ``npm`` installed. All other required tools
will be installed by the build tool.  This also means JavaScript and CSS will
be compiled by commands like ``ant serve``.

Running The Tests
-----------------

You can run the tests by executing ``ant``.

It will run run tests through Karma & Jasmine for parts of the JavaScript stack
and PHPUnit tests for the PHP stack (once we have some).

Building CSS & JavaScript
-------------------------

The project uses ECMAScript 6 and transpiles it using Babel. Thus we need to
update the `bundle.js` when working on the client. This is done when the
project is prepared but can also be executed continuously using::

    ant watch

This also compiles the SASS from the project and Bootstrap file into a single
CSS file.

Trying Out The Project
----------------------

If you want to try out the project you can serve the root directory with
basically any webserver. The webserver should rewrite all requests to unknown
resources to the index.html file which does the routing using JavaScript.

For your convenience we included a working server setup using PHPs internal
webserver. You can start it using::

    ant serve

..
   Local Variables:
   mode: rst
   fill-column: 79
   End: 
   vim: et syn=rst tw=79
