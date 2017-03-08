'use strict'

import _ from 'lodash'

import Api from '../api.js'
import Router from '../router.js'

let Playlist = function () {
    this.data = null
    this.current = null
    let handlers = []

    this.attach = function (handler) {
        handlers.push(handler)
        handler(this)
    }

    this.detach = function (handler) {
        let index = handlers.indexOf(handler)
        if (index > -1) {
            handlers.splice(index)
        }
    }

    this.trigger = function () {
        for (let i = 0; i < handlers.length; ++i) {
            handlers[i](this)
        }
    }

    this.setCurrentPlaylist = function (id) {
        Api.get().request('GET', 'spotify.api.playlist', { playlist: id }, null, (function (data) {
            this.data = data
            this.trigger()
        }).bind(this))
    }

    this.setCurrentSong = function (id) {
        this.current = id.replace('spotify:track:', '')
        this.trigger()
    }

    this.getQueue = function () {
        if (!this.current || !this.data) {
            return []
        }

        let queuePosition = _.findIndex(this.data.tracks.items, { track: { id: this.current } })
        return this.data.tracks.items.slice(queuePosition, queuePosition + 10)
    }

    let playlistId = _.head(_.toArray(Router.get().getSession().playlists))
    if (playlistId) {
        this.setCurrentPlaylist(playlistId)
    }
}

Playlist.get = function () {
    if (!window.spotifyPlaylist) {
        window.spotifyPlaylist = new Playlist()
    }

    return window.spotifyPlaylist
}

export default Playlist
