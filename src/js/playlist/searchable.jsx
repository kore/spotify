'use strict'

import React from "react"

import Playlist from "./playlist.js"

let SearchablePlaylist = React.createClass({
    render: function () {
        let playlist = Playlist.get()

        return (<div>
            <h1>Songs In Playlist</h1>
        </div>)
    },
})

export default SearchablePlaylist
