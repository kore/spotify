'use strict'

import React from "react"

import NowPlaying from './nowPlaying.jsx'
import Controls from './controls.jsx'
import PlaylistSelector from './playlist/selector.jsx'
import SearchablePlaylist from './playlist/searchable.jsx'
import Queue from './playlist/queue.jsx'
import Search from './search.jsx'

let Overview = React.createClass({
    render: function () {
        return (<main className="layout-row">
            <div className="layout-column">
                <div className="layout-cell">
                    <NowPlaying />
                </div>
                <div className="layout-cell">
                    <Controls />
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
                    <Search />
                </div>
            </div>
        </main>)
    },
})

export default Overview
