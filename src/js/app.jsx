'use strict'

import React from 'react'

let App = React.createClass({
    propTypes: {
        route: React.PropTypes.shape({
            public: React.PropTypes.bool,
            path: React.PropTypes.string.isRequired,
        }).isRequired,
    },

    render: function () {
        return (<div className="application">
            <this.props.route.subcomponent {...this.props} />}
        </div>)
    },
})

export default App
