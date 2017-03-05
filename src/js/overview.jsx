'use strict'

import React from "react"

import NowPlaying from './nowPlaying.jsx'
import PlaylistSelector from './playlist/selector.jsx'
import SearchablePlaylist from './playlist/searchable.jsx'
import Queue from './playlist/queue.jsx'

let Overview = React.createClass({
    render: function () {
        return (<main className="layout-row">
            <div className="layout-column">
                <div className="layout-cell">
                    <h1>Now Playing</h1>
                    <NowPlaying />
                </div>
                <div className="layout-cell scroll" style={{ overflowY: 'hidden' }}>
                    <Queue />
                </div>
            </div>
            <div className="layout-column">
                <div className="layout-cell">
                    <PlaylistSelector />
                </div>
                <div className="layout-cell scroll">
                    <SearchablePlaylist />
                </div>
            </div>
            <div className="layout-column">
                <div className="layout-cell">
                    <h1>Search</h1>
                    <ul className="playlist list-unstyled">
                    </ul>
                </div>
            </div>
        </main>)
    },
})

export default Overview
