'use strict'

import React from "react"
import _ from "lodash"

import AjaxDecorator from './helper/ajaxDecorator.jsx'

import Playlist from "./playlist/playlist.js"

let NowPlaying = React.createClass({
    propTypes: {
        data: React.PropTypes.object,
        loader: React.PropTypes.object.isRequired,
    },

    componentDidMount: function () {
        this.interval = window.setInterval(
            (function () {
                this.props.loader.reload()
            }).bind(this),
            5000
        )
    },

    shouldComponentUpdate: function (nextProps) {
        return !this.props.data ||
            !_.isEqual(this.props.data.song.result, nextProps.data.song.result)
    },

    componentDidUpdate: function () {
        if (this.props.data) {
            Playlist.get().setCurrentSong(this.props.data.song.result['mpris:trackid'])
        }
    },

    componentWillUnmount: function () {
        window.clearInterval(this.interval)
    },

    interval: null,

    render: function () {
        return (<div>
            <h1>Now Playing</h1>
            {!this.props.data ? null : <div>
                <img src={this.props.data.song.result['mpris:artUrl']}
                    className="img-responsive img-thumbnail pull-right" />
                <big className="bright">
                    {this.props.data.song.result['xesam:title']}
                </big><br />
                <span className="dark">
                    by {this.props.data.song.result['xesam:artist'].join(', ')}
                </span><br />
                <small className="darker">
                    {this.props.data.song.result['xesam:album']} by
                    &nbsp;{this.props.data.song.result['xesam:albumArtist'].join(', ')}
                </small>
            </div>}
        </div>)
    },
})

export default AjaxDecorator(NowPlaying, {
    route: 'spotify.api.currentSong',
})
