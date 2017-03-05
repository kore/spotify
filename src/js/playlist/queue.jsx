'use strict'

import React from "react"
import _ from "lodash"

import PlaylistDecorator from "./decorator.jsx"
import Track from "./track.jsx"

let Queue = React.createClass({
    propTypes: {
        playlist: React.PropTypes.object.isRequired,
    },

    render: function () {
        if (!this.props.playlist.data) {
            return null
        }

        console.log(this.props.playlist.data)
        let tracks = this.props.playlist.getQueue()

        return (<div>
            <h1>Play Queue</h1>
            <ul className="playlist list-unstyled">
            {_.map(tracks, (function (track) {
                return <Track track={track.track} current={this.props.playlist.current} key={track.track.id} />
            }).bind(this))}
            </ul>
        </div>)
    },
})

export default PlaylistDecorator(Queue)
