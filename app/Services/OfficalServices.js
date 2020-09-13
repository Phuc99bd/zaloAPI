const axios = require("axios");
const {
    SEND_MESSAGE
} = use("Offical");
const Env = use("Env");

class OfficalServices{
    static async sendMessageText(user_id,message){
        axios.post(`${SEND_MESSAGE}?access_token=${Env.get("APP_ACCESS_CODE")}`,{
            "recipient":{
                "user_id": user_id
              },
              "message":{
                "text": message
              }
        })
    }
}

module.exports = OfficalServices;