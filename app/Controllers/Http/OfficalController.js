
class OfficalController{
    /**
   * @swagger
   * /api/v1/offical/webhook:
   *   post:
   *     tags:
   *       - Offical API
   *     summary: Sample API
   *     parameters:
   *     responses:
   *       200:
   *         description: Send hello message
   *         example:
   *           message: Hello Guess
   */
  async Webhook({ request, response }) {
    return response.status(200).send({});
  }
}

module.exports = OfficalController;