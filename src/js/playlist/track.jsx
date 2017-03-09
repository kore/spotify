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

    getDefaultProps: function () {
        return {
            current: null,
            highlight: '',
        }
    },
    

    render: function () {
        let highlights = this.props.highlight.split(/[ \t\n\r,;]+/)
        return (<li className={this.props.track.uri === this.props.current ? 'current' : ''}>
            <span className="bright">
                <Highlighter searchWords={highlights}
                    textToHighlight={this.props.track.name} />
            </span><br />
            <span className="dark">
                by <Highlighter searchWords={highlights}
                    textToHighlight={_.map(this.props.track.artists, 'name').join(', ')} />
            </span>
        </li>)
    },
})

export default Track
