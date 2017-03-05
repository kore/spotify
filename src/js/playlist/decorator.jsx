'use strict'

import React from "react"
import _ from 'lodash'

import Playlist from './playlist.js'

let PlaylistDecorator = function (WrappedComponent, configuration) {
    configuration = _.extend({
    }, configuration)

    let PlaylistActiveComponent = React.createClass({
        getInitialState: function () {
            return {
                playlist: Playlist.get(),
            }
        },

        componentDidMount: function () {
            Playlist.get().attach(this.update)
        },

        componentWillUnmount: function () {
            Playlist.get().detach(this.update)
        },

        update: function (playlist) {
            this.setState({ playlist: playlist })
        },

        render: function () {
            return (<div>
                <WrappedComponent
                    playlist={Playlist.get()}
                    {...this.props}>
                    {this.children}
                </WrappedComponent>
            </div>)
        },
    })

    return PlaylistActiveComponent
}

export default PlaylistDecorator
