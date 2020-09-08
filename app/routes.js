'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(()=>{
    Route.get("/me","SocialController.profile")
    Route.get("/list-friend","SocialController.listFriend")
    Route.get("/list-not-use","SocialController.listNotUse")
    Route.get("/post-status","SocialController.postStatus")
    Route.get("/invite-friend","SocialController.inviteFriend")
    Route.get("/get-oauth","SocialController.getOauth")
    Route.get("/send-message","SocialController.sendMessage")
})
.prefix("api/v1")