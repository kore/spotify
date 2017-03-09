'use strict'

import React from "react"
import Highlighter from "react-highlight-words"
import _ from "lodash"

let Track = React.createClass({
    propTypes: {
        track: React.PropTypes.object.isRequired,
        current: React.PropTypes.string,
        highlight: React.PropTypes.string,
    },

    render: function () {
        return (<li className={this.props.track.uri === this.props.current ? 'current' : ''}>
            <span className="bright">
                <Highlighter searchWords={[this.props.highlight]}
                    textToHighlight={this.props.track.name} />
            </span><br />
            <span className="dark">
                by <Highlighter searchWords={[this.props.highlight]}
                    textToHighlight={_.map(this.props.track.artists, 'name').join(', ')} />
            </span>
        </li>)
    },
})

export default Track
