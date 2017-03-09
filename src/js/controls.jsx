'use strict'

import React from "react"

import Api from './api.js'

let Controls = React.createClass({
    render: function () {
        return (<div className="text-center">
            <div className="clearfix" />
            <div className="btn-group">
                <button className="btn btn-default" onClick={function () {
                    Api.get().request('POST', 'spotify.api.previous')
                }}>
                    <span className="glyphicon glyphicon-step-backward" />
                </button>
                <button className="btn btn-default" onClick={function () {
                    Api.get().request('POST', 'spotify.api.pause')
                }}>
                    <span className="glyphicon glyphicon-pause" />
                </button>
                <button className="btn btn-primary" onClick={function () {
                    Api.get().request('POST', 'spotify.api.play')
                }}>
                    <span className="glyphicon glyphicon-play" />
                </button>
                <button className="btn btn-default" onClick={function () {
                    Api.get().request('POST', 'spotify.api.next')
                }}>
                    <span className="glyphicon glyphicon-step-forward" />
                </button>
            </div>
        </div>)
    },
})

export default Controls
