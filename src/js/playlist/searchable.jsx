'use strict'

import React from "react"

import Playlist from "./playlist.js"
import PlaylistDecorator from "./decorator.jsx"

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
            {_.map(this.props.playlist.data.tracks.items, function (track) {
                return (<li key={track.track.id}>
                    <span className="bright">{track.track.name}</span><br />
                    <span className="dark">by {_.map(track.track.artists, 'name').join(', ')}</span>
                </li>)
            })}
            </ul>
        </div>)
    },
})

export default PlaylistDecorator(SearchablePlaylist)
