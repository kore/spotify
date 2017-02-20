'use strict'

import React from "react"
import _ from "lodash"

let ErrorCover = React.createClass({
    propTypes: {
        error: React.PropTypes.object.isRequired,
    },

    render: function () {
        return (<div className="cover cover-error">
            <big className="text-center">
                <h3><span className="fa fa-exclamation-circle"></span> Entschuldigung – ein Fehler ist aufgetreten.</h3>
            {!this.props.error.stack || !this.props.error.stack.length ?
                (<p>Der Fehler wurde aufgezeichnet und wir werden versuchen ihn
                    zu beheben. In der Zwischenzeit können Sie gerne neu laden und
                    die Aktion erneut versuchen.</p>) :
                <div className="text-left">
                    <p>{this.props.error.error}</p>
                    <pre>
                        <p>In <code>{this.props.error.file} +{this.props.error.line}</code></p>
                        <ol>
                        {_.map(this.props.error.stack, function (line, key) {
                            return <li key={"stack_" + key}><code>{line}</code></li>
                        })}
                        </ol>
                    </pre>
                </div>}
            </big>
        </div>)
    },
})

export default ErrorCover
