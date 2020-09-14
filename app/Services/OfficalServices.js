const axios = require("axios");
const { SEND_MESSAGE, API_CONTRIBUTORS , API_SUBJECTS , API_COURSES , API_DETAIL_COURSE } = use("Offical");
const Env = use("Env");

class OfficalServices {
  static async sendMessageText(user_id, message) {
    await axios
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
  static async sendListTemplate(user_id, elements, buttons) {
    await axios
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
  static async sendListNotButtons(user_id, elements) {
    await axios
      .post(`${SEND_MESSAGE}?access_token=${Env.get("APP_ACCESS_CODE")}`, {
        recipient: {
          user_id: user_id,
        },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "list",
              elements: elements
            },
          },
        },
      })
      .then((data) => {
        console.log(data);
      });
  }
  static async default(user_id) {
    await this.sendMessageText(
      user_id,
      "Chào mừng bạn đã đến với Viezon. Chương trình giáo dục và đạo tạo học tập online được triển khai trên website: Viezon.vn ✌️ ✌️ ✌️"
    );
    await this.sendListTemplate(
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
          title: "Xem top 5 giảng viên nổi bật 💗",
          "type": "oa.query.hide",
          payload: "#contributors",
        },
        {
          title: "Xem loại môn học 💗",
          "type": "oa.query.hide",
          payload: "#subjects",
        },
        {
          title: "Xem  5 khóa học nổi bật nhất 💗",
          "type": "oa.query.hide",
          payload: "#courses",
        },
      ]
    );
  }
  static async contributors(user_id){
    let data = await axios.get(API_CONTRIBUTORS);
    let contributors = data.contributors.data;
    const elements = contributors.map(e=>{
        return {
          title: e.title,
          subtitle: e.description,
          image_url: e.imageFile.thumbnail,
          default_action: {
            "type": "oa.open.url",
            "url": "https://viezon.vn/trainer/"+ e.id
            }
        }
    })
    await this.sendListNotButtons(user_id , 
        elements
    )
  }
}

module.exports = OfficalServices;
