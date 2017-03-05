'use strict'

import React from "react"

import Playlist from "./playlist.js"
import PlaylistDecorator from "./decorator.jsx"
import Track from "./track.jsx"

let SearchablePlaylist = React.createClass({
    propTypes: {
        playlist: React.PropTypes.object.isRequired,
    },

    render: function () {
        if (!this.props.playlist.data) {
            return null
        }

        return (<div>
            <h1>Songs</h1>
            <ul className="playlist list-unstyled">
            {_.map(this.props.playlist.data.tracks.items, (function (track) {
                return <Track track={track.track} current={this.props.playlist.current} key={track.track.id} />
            }).bind(this))}
            </ul>
        </div>)
    },
})

export default PlaylistDecorator(SearchablePlaylist)
