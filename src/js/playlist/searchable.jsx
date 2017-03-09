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
                    <div className="input-group-btn">
                        <a className="btn btn-danger"
                            onClick={(function () {
                                this.setState({ filter: '' })
                            }).bind(this)}>
                            <span className="glyphicon glyphicon-remove" />
                        </a>
                    </div>
                </div>
            </form>

            <ul className="playlist list-unstyled">
            {_.map(
                _.filter(
                    this.props.playlist.data.tracks.items,
                    (function (track) {
                        let searchString = track.track.name + _.map(track.track.artists, 'name').join(' ')
                        return searchString.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1
                    }).bind(this)
                ),
                (function (track) {
                    return (<Track key={track.track.id}
                        track={track.track}
                        current={this.props.playlist.current}
                        highlight={this.state.filter} />)
                }).bind(this)
            )}
            </ul>
        </div>)
    },
})

export default PlaylistDecorator(SearchablePlaylist)
