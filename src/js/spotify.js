import moment from 'moment'
import 'moment/locale/de'

import './helper/pluginRegistry.js'
import './app.jquery.js'

moment.locale('de')
window.pluginRegistry.activate('body')
