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
    switch(data.event_name){
      case "user_send_text":
        let message = data.message.text.toLowerCase();
        if(["hi","hello","chào","xin chào","chao"].indexOf(message) !== -1){
          OfiicalServices.sendMessageText(data.sender.id,"Chào mừng bạn đã đến với Viezon. Chương trình giáo dục và đạo tạo học tập online được triển khai Viezon.vn")
        }
    }
    return response.send({});
  }
}

module.exports = OfficalAPIController;
