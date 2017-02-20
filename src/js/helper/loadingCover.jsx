'use strict'

import React from "react"

let LoadingCover = React.createClass({
    propTypes: {
        text: React.PropTypes.string,
    },

    getDefaultProps: function () {
        return {
            text: 'Einen Moment Geduld, bitte…',
        }
    },

    render: function () {
        return (<div className="cover cover-loading">
            <big>
                <span className="glyphicon glyphicon-hourglass"></span> {this.props.text}
            </big>
        </div>)
    },
})

export default LoadingCover
