'use strict'

import React from "react"

import NowPlaying from './nowPlaying.jsx'

let Overview = React.createClass({
    render: function () {
        return (<main className="layout-row">
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
        </main>)
    },
})

export default Overview
