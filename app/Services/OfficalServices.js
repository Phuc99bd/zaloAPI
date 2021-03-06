const axios = require("axios");
const {
  SEND_MESSAGE,
  API_CONTRIBUTORS,
  API_SUBJECTS,
  API_COURSES,
  API_DETAIL_COURSE,
} = use("Offical");
const Env = use("Env");
const https = require("https");

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
        console.log(data.config.data);
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
              elements: elements,
            },
          },
        },
      })
      .then((data) => {
        console.log(data.config.data);
        console.log(data.data);
      });
  }
  static async default(user_id) {
    await this.sendMessageText(
      user_id,
      "Chào mừng bạn đã đến với Viezon. Chương trình giáo dục và đạo tạo học tập online được triển khai trên website: Viezon.vn ✌️ ✌️ ✌️"
    );
    await this.sendListTemplate(
      user_id,
      [
        {
          title: "Viezon.vn",
          subtitle: "Học tập cùng Viezon",
          image_url: "https://file.vzfile.vn/684/thumbnail-Banner_9-01.png",
          default_action: {
            type: "oa.open.url",
            url: "https://viezon.vn",
          },
        },
      ],
      [
        {
          title: "Xem top 5 giảng viên nổi bật 💗",
          type: "oa.query.show",
          payload: "#contributors",
        },
        {
          title: "Xem loại môn học 💗",
          type: "oa.query.show",
          payload: "#subjects",
        },
        {
          title: "Xem  5 khóa học nổi bật nhất 💗",
          type: "oa.query.show",
          payload: "#courses",
        },
      ]
    );
  }
  static async contributors(user_id) {
    let data = await axios.get(API_CONTRIBUTORS, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    let contributors = data.data.data.contributors.data;
    let elements = [];
    for (let i = 0; i < 5; i++) {
      elements.push({
        title: contributors[i].title,
        subtitle: contributors[i].description.split(".")[0] + "...",
        image_url: contributors[i].imageFile.thumbnail,
        default_action: {
          type: "oa.open.url",
          url: "https://viezon.vn/trainer/" + contributors[i].id,
        },
      });
    }
    await this.sendListNotButtons(user_id, elements);
  }

  static async subjects(user_id) {
    let data = await axios.get(API_SUBJECTS, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    let subjects = data.data;
    let elements = [];
    for (let i = 0; i < 5; i++) {
      elements.push({
        title: subjects[i].title + " 🌟 ",
        subtitle: "️🎶️ 🎶️ 🎶️ 🎶",
        image_url:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fsubjectevents%2F&psig=AOvVaw30qMPwJYsXuOfScOmovRlr&ust=1600186814700000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJCSg8uG6esCFQAAAAAdAAAAABAL",
        default_action: {
          type: "oa.query.show",
          payload: `#courseBySubjects-${subjects[i].id}`,
        },
      });
    }
    await this.sendListNotButtons(user_id, elements);
  }
  static async courses(user_id) {
    let data = await axios.get(API_COURSES, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    let courses = data.data.data.data;
    let elements = [];
    for (let i = 0; i < 5; i++) {
      elements.push({
        title: courses[i].title + " 🌟 ",
        subtitle: courses[i].description.split(".")[0],
        image_url: courses[i].imageFile.thumbnail,
        default_action: {
          type: "oa.open.url",
          url: `https://viezon.vn/course/${courses[i].slug}`,
        },
      });
    }
    await this.sendListNotButtons(user_id, elements);
  }
  static async coursesBySubject(user_id, id) {
    console.log(user_id, id);
    let data = await axios.get(`${API_COURSES}&subjects=${id}`, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    console.log(data);
    let courses = data.data.data.data;
    let elements = [];
    const length = courses.length > 5 ? 5 : courses.length;
    for (let i = 0; i < length; i++) {
      elements.push({
        title: courses[i].title + " 🌟 ",
        subtitle: courses[i].description.split(".")[0],
        image_url: courses[i].imageFile.thumbnail,
        default_action: {
          type: "oa.open.url",
          url: `https://viezon.vn/course/${courses[i].slug}`,
        },
      });
    }
    await this.sendListNotButtons(user_id, elements);
    if (length == 0) {
      await this.sendMessageText(
        user_id,
        "Loại môn học này vẫn chưa tồn tại khóa học nào"
      );
    }
  }
}

module.exports = OfficalServices;
