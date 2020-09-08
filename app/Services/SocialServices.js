const axios = require("axios");
const {
  URL_ACCESS_TOKEN,
  URL_PROFILE,
  URL_LIST_FRIEND,
  URL_LIST_NOT_USE,
  URL_POST_STATUS,
  URL_INVITE_FRIEND,
  URL_AUTH_OAUTH,
  URL_SEND_MESSAGE
} = use("Constants");
const Env = use("Env");

class SocialServices {
  constructor() {
    this.access_token = null;
    this.OAUTH_CODE = null;
  }
  static async initOAuthCode(){
      const url = `${URL_AUTH_OAUTH}?app_id=${Env.get("APP_ID")}&redirect_uri=https://developers.zalo.me/&state=zalo`;
     return url;
  }
  static async getAccessToken() {
      this.initOAuthCode()
    let data = await axios.get(`${URL_ACCESS_TOKEN}`, {
      params: {
        app_id: Env.get("APP_ID"),
        app_secret: Env.get("APP_SECRECT"),
        code: Env.get("APP_OATH_CODE"),
      },
    });
    this.access_token = data.data.access_token;
  }

  static async getProfile() {
    await this.getAccessToken();
    let data = await axios.get(URL_PROFILE, {
      params: {
        access_token: this.access_token,
        fields: "id,birthday,gender,picture,name",
      },
    });
    return data.data;
  }

  static async getListFriends(page, limit) {
    await this.getAccessToken();
    let data = await axios.get(URL_LIST_FRIEND, {
      params: {
        access_token: this.access_token,
        from: page,
        limit: limit,
        fields: "id,birthday,gender,picture,name",
      },
    });
    return data.data;
  }

  static async getListNotUse(page, limit) {
    await this.getAccessToken();
    let data = await axios.get(URL_LIST_NOT_USE, {
      params: {
        access_token: this.access_token,
        offset: page,
        limit: limit,
        fields: "id,birthday,gender,picture,name",
      },
    });
    return data.data;
  }

  static async postStatus(message) {
    await this.getAccessToken();
    let data = await axios.post(
      `${URL_POST_STATUS}?access_token=${this.access_token}&message=${message}&link=https://developers.zalo.me/`
    );
    return data.data;
  }

  static async inviteFriend(message,id) {
    await this.getAccessToken();
    let data = await axios.post(
      `${URL_INVITE_FRIEND}?access_token=${this.access_token}&message=${message}&to=${id}`
    );
    console.log(data);
    return data.data;
  }

  static async sendMessage(message,id) {
    await this.getAccessToken();
    let data = await axios.post(
      `${URL_SEND_MESSAGE}?access_token=${this.access_token}&message=${message}&to=${id}`
    );
    return data.data;
  }
}

module.exports = SocialServices;
