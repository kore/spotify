'use strict'

import React from "react"
import _ from "lodash"

import Api from "./api.js"
import Track from "./playlist/track.jsx"

let Search = React.createClass({
    propTypes: {
    },

    getInitialState: function () {
        return {
            search: '',
            result: null,
        }
    },

    handleChange: function (event) {
        this.setState({ search: event.target.value })

        if (this.interval) {
            window.clearTimeout(this.interval)
        }

        this.interval = window.setTimeout(this.search, 200)
    },

    search: function () {
        if (!this.state.search) {
            this.setState({ result: null })
        } else {
            Api.get().request(
                'GET',
                'spotify.api.search',
                { query: this.state.search },
                null,
                (function (data) {
                    this.setState({ result: data })
                }).bind(this)
            )
        }
    },

    interval: null,

    render: function () {
        return (<div>
            <h1>Search Spotify</h1>

            <form>
                <div className="input-group">
                    <span className="input-group-addon">
                        <span className="glyphicon glyphicon-search" />
                    </span>
                    <input type="text" className="form-control" placeholder="Search"
                        value={this.state.search} onChange={this.handleChange} />
                </div>
            </form>

            <ul className="playlist list-unstyled">
            {!this.state.result ? null : _.map(
                this.state.result.tracks.items,
                (function (track) {
                    return <Track key={track.id}
                        track={track}
                        highlight={this.state.search} />
                }).bind(this)
            )}
            </ul>
        </div>)
    },
})

export default Search
