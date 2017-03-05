'use strict'

import React from "react"

let Track = React.createClass({
    propTypes: {
        track: React.PropTypes.object.isRequired,
        current: React.PropTypes.string.isRequired,
    },

    render: function () {
        return (<li className={this.props.track.id === this.props.current ? 'current' : ''}>
            <span className="bright">{this.props.track.name}</span><br />
            <span className="dark">by {_.map(this.props.track.artists, 'name').join(', ')}</span>
        </li>)
    },
})

export default Track
