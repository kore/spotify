'use strict'

import React from "react"

import Router from './router.js'
import NowPlaying from './nowPlaying.jsx'

let Configuration = React.createClass({
    render: function () {
        let router = Router.get()

        return (<main className="layout-row">
            <div className="layout-cell">
            </div>
            <div className="layout-cell">
                <h1>Configuration Required</h1>
                <p>You need a client ID and a secret from Spotify for this client to work. Please <a href="https://developer.spotify.com/my-applications">register here</a> and add the retrieved keys in the <code>environment.local</code> file in the project root like this:</p>
                <pre><code>
spotify.client.id=&lt;clientId&gt;{'\n'}
spotify.client.secret=&lt;secret&gt;
                </code></pre>
                <p>Also add <code>{router.url('spotify.frontend.token')}</code> as a redirect URL inside your Spotify client configuration.</p>
                <p>You might be required to clear the cache afterwards using <code>php bin/console cache:clear</code>.</p>
            </div>
            <div className="layout-cell">
            </div>
        </main>)
    },
})

export default Configuration
