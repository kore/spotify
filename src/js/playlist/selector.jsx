'use strict'

import React from "react"
import _ from "lodash"

import PlaylistDecorator from "./decorator.jsx"
import Router from '../router.js'

let Selector = React.createClass({
    propTypes: {
        playlist: React.PropTypes.object.isRequired,
    },

    getInitialState: function () {
        return {
            playlistId: _.head(_.toArray(Router.get().getSession().playlists)) || ''
        }
    },

    handleChange: function (event) {
        this.setState({ playlistId: event.target.value })
    },

    render: function () {
        return (<div>
            <h1>Current Playlist</h1>

            <form onSubmit={(function (event) {
                event.preventDefault(true)
                event.stopPropagation(true)

                this.props.playlist.setCurrentPlaylist(this.state.playlistId)
            }).bind(this)}>
                <div className="input-group">
                    <input type="playlist" className="form-control" placeholder="spotify:user:?:playlist:?"
                        value={this.state.playlistId} onChange={this.handleChange} />
                    <div className="input-group-btn">
                    {_.map(Router.get().getSession().playlists, (function (id, name) {
                        return (<button key={id} type="submit" className="btn btn-default"
                            onClick={(function () {
                                this.setState({ playlistId: id })
                            }).bind(this)} title={name}>
                            <span className="glyphicon glyphicon-music" />
                        </button>)
                    }).bind(this))}
                        <button type="submit" className="btn btn-primary">
                            <span className="glyphicon glyphicon-play" />
                        </button>
                    </div>
                </div>
            </form>

            {!this.props.playlist.data ? (<div>
                <p>
                    Please enter the spotify ID of the currently playing
                    playlist. The spotify API does not allow to retrieve this
                    information. Go into your Spotify client, right click the
                    playlist and select &quot;Copy Spotify URI&quot;.
                </p>
            </div>) : (<div>
                <big className="bright">{this.props.playlist.data.name}</big>
                <p>{this.props.playlist.data.description}</p>
            </div>)}
        </div>)
    },
})

export default PlaylistDecorator(Selector)
