'use strict'

import React from "react"

import PlaylistDecorator from "./decorator.jsx"

let Selector = React.createClass({
    propTypes: {
        playlist: React.PropTypes.object.isRequired,
    },

    getInitialState: function () {
        return {
            playlistId: '',
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
                        <button type="submit" className="btn btn-default">Save</button>
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
                <div className="row">
                    <div className="col-xs-8">
                        <big className="bright">{this.props.playlist.data.name}</big>
                        <p>{this.props.playlist.data.description}</p>
                    </div>
                    <div className="col-xs-4">
                        <img src={this.props.playlist.data.images[0].url}
                            className="img-responsive img-thumbnail pull-right" />
                    </div>
                </div>
            </div>)}
        </div>)
    },
})

export default PlaylistDecorator(Selector)
