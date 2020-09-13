"use strict";

const Env = use("Env");
const SocialServices = use("App/Services/SocialServices");

class SocialController {
  /**
   * @swagger
   * /api/v1/me:
   *   get:
   *     tags:
   *       - API
   *     summary: Sample API
   *     responses:
   *       200:
   *         description: Send hello message
   *         example:
   *           message: Hello Guess
   */
  async profile({ request, response }) {
    let profile = await SocialServices.getProfile();
    return response.send(profile);
  }
  /**
   * @swagger
   * /api/v1/list-friend:
   *   get:
   *     tags:
   *       - API
   *     summary: Sample API
   *     parameters:
   *       - name: page
   *         description: page
   *         in: query
   *         type: integer
   *       - name: limit
   *         description: limit
   *         in: query
   *         type: integer
   *     responses:
   *       200:
   *         description: Send hello message
   *         example:
   *           message: Hello Guess
   */
  async listFriend({ request, response }) {
    const data = request.all();
    let page = data.page || 1,
      limit = data.limit || 10;
    page = (page - 1 )* 10;
    let friends = await SocialServices.getListFriends(page,limit);
    return response.send(friends);
  }
  /**
   * @swagger
   * /api/v1/list-not-use:
   *   get:
   *     tags:
   *       - API
   *     summary: Sample API
   *     parameters:
   *       - name: page
   *         description: page
   *         in: query
   *         type: integer
   *       - name: limit
   *         description: limit
   *         in: query
   *         type: integer
   *     responses:
   *       200:
   *         description: Send hello message
   *         example:
   *           message: Hello Guess
   */
  async listNotUse({ request, response }) {
    const data = request.all();
    let page = data.page || 1,
      limit = data.limit || 10;
    page = (page - 1 ) * limit;
    let friends = await SocialServices.getListNotUse(page,limit);
    return response.send(friends);
  }
  /**
   * @swagger
   * /api/v1/post-status:
   *   get:
   *     tags:
   *       - API
   *     summary: Sample API
   *     parameters:
   *       - name: message
   *         description: limit
   *         in: query
   *         type: string
   *     responses:
   *       200:
   *         description: Send hello message
   *         example:
   *           message: Hello Guess
   */
  async postStatus({ request, response }) {
    const data = request.all();
    let status = await SocialServices.postStatus(data.message || "");
    return response.send(status);
  }
  /**
   * @swagger
   * /api/v1/invite-friend:
   *   get:
   *     tags:
   *       - API
   *     summary: Sample API
   *     parameters:
   *       - name: message
   *         description: limit
   *         in: query
   *         type: string
   *       - name: id
   *         description: id
   *         in: query
   *         type: integer
   *     responses:
   *       200:
   *         description: Send hello message
   *         example:
   *           message: Hello Guess
   */
  async inviteFriend({ request, response }) {
    const data = request.all();
    let obj = await SocialServices.inviteFriend(data.message || "" , data.id);
    return response.send(obj);
  }
  /**
   * @swagger
   * /api/v1/get-oauth:
   *   post:
   *     tags:
   *       - API
   *     summary: Sample API
   *     responses:
   *       200:
   *         description: Send hello message
   *         example:
   *           message: Hello Guess
   */
  async getOauth({ request, response }) {
    
    let data = await SocialServices.initOAuthCode();
    return response.send({url : data});
  }

  /**
   * @swagger
   * /api/v1/send-message:
   *   get:
   *     tags:
   *       - API
   *     summary: Sample API
   *     parameters:
   *       - name: message
   *         description: limit
   *         in: query
   *         type: string
   *       - name: id
   *         description: id
   *         in: query
   *         type: integer
   *     responses:
   *       200:
   *         description: Send hello message
   *         example:
   *           message: Hello Guess
   */
  async sendMessage({ request, response }) {
    const data = request.all();
    let obj = await SocialServices.sendMessage(data.message || "",data.id);
    return response.send(obj);
  }
}

module.exports = SocialController;
