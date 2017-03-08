'use strict'

import React from "react"

let Controls = React.createClass({
    render: function () {
        return (<div className="text-center">
            <div className="clearfix" />
            <div className="btn-group">
                <button className="btn btn-default">
                    <span className="glyphicon glyphicon-step-backward" />
                </button>
                <button className="btn btn-default">
                    <span className="glyphicon glyphicon-pause" />
                </button>
                <button className="btn btn-primary">
                    <span className="glyphicon glyphicon-play" />
                </button>
                <button className="btn btn-default">
                    <span className="glyphicon glyphicon-step-forward" />
                </button>
            </div>
        </div>)
    },
})

export default Controls
