'use strict'

import React from "react"
import _ from "lodash"

import PlaylistDecorator from "./decorator.jsx"
import Track from "./track.jsx"

let SearchablePlaylist = React.createClass({
    propTypes: {
        playlist: React.PropTypes.object.isRequired,
    },

    getInitialState: function () {
        return {
            filter: '',
        }
    },

    handleChange: function (event) {
        this.setState({ filter: event.target.value })
    },

    render: function () {
        if (!this.props.playlist.data) {
            return null
        }

        return (<div>
            <h1>Songs</h1>

            <form>
                <div className="input-group">
                    <span className="input-group-addon">
                        <span className="glyphicon glyphicon-filter" />
                    </span>
                    <input type="text" className="form-control" placeholder="Filter"
                        value={this.state.filter} onChange={this.handleChange} />
                </div>
            </form>

            <ul className="playlist list-unstyled">
            {_.map(this.props.playlist.data.tracks.items, (function (track) {
                return <Track key={track.track.id}
                    track={track.track}
                    current={this.props.playlist.current}
                    highlight={this.state.filter} />
            }).bind(this))}
            </ul>
        </div>)
    },
})

export default PlaylistDecorator(SearchablePlaylist)
