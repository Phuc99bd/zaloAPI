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
    console.log(data);
    switch(data.event_name){
      default: OfiicalServices.default(data.sender.id)
    }
    return response.send({});
  }
}

module.exports = OfficalAPIController;
