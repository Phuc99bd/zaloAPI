"use strict";
const OfiicalServices = use("App/Services/OfficalServices")

class OfficalAPIController {
  
  /**
   * @swagger
   * /api/v1/offical-api/webhook:
   *   post:
   *     tags:
   *       - Ofiical API
   *     summary: Sample API
   *     responses:
   *       200:
   *         description: Send hello message
   *         example:
   *           message: Hello Guess
   */
  async webhook({ request, response }) {
    const data = request.all();
    const user_id = data.sender.id;
    switch(data.event_name){
      case "#contributors":
          OfiicalServices.contributors(user_id)
          break;
      default: OfiicalServices.default(user_id)
    }
    return response.send({});
  }
}

module.exports = OfficalAPIController;
