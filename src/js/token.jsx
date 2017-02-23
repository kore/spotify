'use strict'

import React from "react"

import Link from './link.jsx'
import ParameterDecorator from './helper/parameterDecorator.jsx'

let Token = React.createClass({
    propTypes: {
        parameters: React.PropTypes.object.isRequired,
    },

    render: function () {
        return (<main className="layout-row">
            <div className="layout-cell">
            </div>
            <div className="layout-cell">
                <div className="box">
                    <h1>Spotify Client Token</h1>
                    <p>Add the following to your <code>environment.local</code> file:</p>
                    <pre><code>
spotify.token.access={this.props.parameters.code}
                    </code></pre>
                    <p>And the go back to the <Link route="spotify.frontend.index">main interface</Link></p>
                </div>
            </div>
            <div className="layout-cell">
            </div>
        </main>)
    },
})

export default ParameterDecorator(
    Token,
    { used: ['code'] }
)
