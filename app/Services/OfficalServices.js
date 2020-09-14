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
      .then((data) => {});
  }
  static async sendListButton(user_id, elements, buttons) {
    axios
      .post(`${SEND_MESSAGE}?access_token=${Env.get("APP_ACCESS_CODE")}`, {
        recipient: {
          user_id: user_id,
        },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "list",
              elements: elements,
              buttons: buttons,
            },
          },
        },
      })
      .then((data) => {
        console.log(data);
      });
  }
  static async default(user_id) {
    this.sendMessageText(
      user_id,
      "Chào mừng bạn đã đến với Viezon. Chương trình giáo dục và đạo tạo học tập online được triển khai Viezon.vn"
    );
    this.sendListButton(
      user_id,
      [{
          title: "Viezon.vn",
          subtitle: "Học tập cùng Viezon",
          image_url: "https://file.vzfile.vn/684/thumbnail-Banner_9-01.png",
          default_action: {
            "type": "oa.open.url",
            "url": "https://viezon.vn"
            }
      }],
      [
        {
          title: "Xem danh sách giảng viên 💗",
          type: "oa.query.hide",
          payload: "#contributors",
        },
        {
          title: "Xem loại môn học 💗",
          type: "oa.query.hide",
          payload: "#subjects",
        },
        {
          title: "Xem khóa học nổi bật nhất 💗",
          type: "oa.query.show",
          payload: "#courses",
        },
      ]
    );
  }
}

module.exports = OfficalServices;
