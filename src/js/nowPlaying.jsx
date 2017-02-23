'use strict'

import React from "react"

import AjaxDecorator from './helper/ajaxDecorator.jsx'
import Box from './helper/box.jsx'

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
            1000
        )
    },
    
    componentWillUnmount: function () {
        window.clearInterval(this.interval)
    },

    interval: null,

    render: function () {
        return (<div className="box now-playing">
            {!this.props.data ? null : <div>
                <img src={this.props.data.song.result['mpris:artUrl']} className="img-responsive img-thumbnail pull-right" />
                <big>{this.props.data.song.result['xesam:title']}</big><br />
                by {this.props.data.song.result['xesam:artist'].join(', ')}<br />
                <small>{this.props.data.song.result['xesam:album']} by {this.props.data.song.result['xesam:albumArtist'].join(', ')}</small>
            </div>}
        </div>)
    },
})

export default AjaxDecorator(NowPlaying, {
        route: 'spotify.spotify.currentSong',
    }
)
