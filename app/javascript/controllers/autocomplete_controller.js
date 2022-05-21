import { Application } from "stimulus"
import { Autocomplete } from 'stimulus-autocomplete'
import { definitionsFromContext } from "stimulus/webpack-helpers"

const application = Application.start()
const context = require.context("controllers", true, /_controller\.js$/)
application.load(definitionsFromContext(context))
application.register("autocomplete", Autocomplete)