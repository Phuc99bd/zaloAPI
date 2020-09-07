'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(()=>{
    Route.get("/hello","WebhookController.hello")
})
.prefix("api/v1")