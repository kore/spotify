'use strict'

import React from 'react'
import jQuery from 'jquery'

import Router from './router.js'

import NowPlaying from './nowPlaying.jsx'

let App = React.createClass({
    propTypes: {
        route: React.PropTypes.shape({
            public: React.PropTypes.bool,
            path: React.PropTypes.string.isRequired,
        }).isRequired,
    },

    getDefaultProps: function () {
        return {
            route: {
                public: false,
            },
        }
    },

    getInitialState: function () {
        return {
        }
    },

    render: function () {
        return (<div className="application">
            <main className="layout-row">
                <div className="layout-cell">
                    <h1>Now Playing</h1>
					<NowPlaying />
                    <h1>Up Next</h1>
                    <ul className="queue list-unstyled">
                        <li>Track 1</li>
                    </ul>
                </div>
                <div className="layout-cell">
                    <h1>Songs In Playlist</h1>
                    <ul className="playlist list-unstyled">
                        <li>Track 1</li>
                    </ul>
                </div>
                <div className="layout-cell">
                    <h1>Search</h1>
                    <ul className="playlist list-unstyled">
                    </ul>
                </div>
            </main>
        </div>)
    },
})

export default App
