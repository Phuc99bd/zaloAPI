const axios = require("axios");
const { SEND_MESSAGE } = use("Offical");
const Env = use("Env");

class OfficalServices {
  static async sendMessageText(user_id, message) {
    axios
      .post(`${SEND_MESSAGE}?access_token=${Env.get("APP_ACCESS_CODE")}`, {
        recipient: {
          user_id: user_id,
        },
        message: {
          text: message,
        },
      })
      .then((data) => {
      });
  }
  static async sendListButton(user_id, message, buttons) {
    axios
      .post(`${SEND_MESSAGE}?access_token=${Env.get("APP_ACCESS_CODE")}`, {
        recipient: {
          user_id: user_id,
        },
        message: {
          text: message,
          attachment: {
            type: "template",
            payload: {
              template_type: "list",
              buttons: buttons,
            },
          },
        },
      })
      .then((data) => {
        console.log(data.data);
      });
  }
  static async default(user_id) {
    this.sendMessageText(
      user_id,
      "Chào mừng bạn đã đến với Viezon. Chương trình giáo dục và đạo tạo học tập online được triển khai Viezon.vn"
    );
    this.sendListButton(user_id, [
      {
        title: "Button 1",
        type: "oa.query.show",
        payload: "#button1",
      },
      {
        title: "Button 2",
        type: "oa.query.show",
        payload: "#button2",
      }
    ]);
  }
}

module.exports = OfficalServices;
