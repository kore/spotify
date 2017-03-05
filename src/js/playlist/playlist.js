'use strict'

import _ from 'lodash'

let Playlist = function () {
    this.id = null
    this.songs = null
    this.current = null

    this.setCurrentSong = function (id) {
        console.log("Set current song", id)

        // @TODO: Check if song is actually in playlist?
        this.current = id
    }
}

Playlist.get = function () {
    if (!window.spotifyPlaylist) {
        window.spotifyPlaylist = new Playlist()
    }

    return window.spotifyPlaylist
}

export default Playlist
