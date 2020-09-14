const Env = use("Env");

module.exports={
    SEND_MESSAGE:"https://openapi.zalo.me/v2.0/oa/message",
    API_CONTRIBUTORS: Env.get("API_CONTRIBUTORS"),
    API_SUBJECTS: Env.get("API_SUBJECTS"),
    API_COURSES: Env.get("API_COURSES"),
    API_DETAIL_COURSE: Env.get("API_DETAIL_COURSE")
}
   