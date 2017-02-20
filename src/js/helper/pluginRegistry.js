'use strict'

import jQuery from 'jquery'
import ReactDOM from 'react-dom'

/**
 * jQuery PluginRegistry
 *
 * Register a selector with a plugin and options which are activated on every
 * jQuery element called with. Initially its called on body:
 *
 *    window.pluginRegistry.activate(jQuery('body'));
 *
 * Afterwards on every Ajax call, the reulting html that is attached to the DOM
 * needs to be called again with pluginRegistry.activate($(html)).
 *
 * Registration:
 *
 *    window.pluginRegistry.register({
 *        selector: '[data-moments-ago]',
 *        invoke: 'momentsAgo',
 *        options: {format: 'Y-m-d'},
 *    });
 */
var PluginRegistry = function () {
    let registrations = []

    this.register = function (activator) {
        if (typeof (activator.selector) === 'undefined') {
            throw new Error('Cannot register plugin without "selector" property.')
        }
        activator.invoke = activator.invoke || activator.selector
        activator.options = activator.options || {}
        activator.isReact = !!activator.isReact

        registrations.push(activator)
    }

    this.activate = function (element) {
        for (let i = 0, length = registrations.length; i < length; i++) {
            let activator = registrations[i]
            jQuery(element).find(activator.selector)[activator.invoke](activator.options)
        }
    }

    let tryUnmount = function (index, component) {
        try {
            ReactDOM.unmountComponentAtNode(component)
        } catch (e) {
            // Just ignore failure
        }
    }

    this.unmountReactComponents = function (root) {
        for (let i = 0, length = registrations.length; i < length; i++) {
            let activator = registrations[i]
            if (!activator.isReact) {
                continue
            }

            jQuery(root).find(activator.selector).each(tryUnmount)
        }
    }
}

if (!window.pluginRegistry) {
    window.pluginRegistry = new PluginRegistry()
}
