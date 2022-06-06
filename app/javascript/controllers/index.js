import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";
import { Autocomplete } from "stimulus-autocomplete";
import Notification from "stimulus-notification";

const application = Application.start();
const context = require.context("controllers", true, /_controller\.js$/);
application.load(definitionsFromContext(context));
application.register("autocomplete", Autocomplete);
application.register('flash_animation', Notification);
