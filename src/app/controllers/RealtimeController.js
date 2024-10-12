const { writeRealtime, readRealtime } = require("../../common/firebase");

class RealtimeController {
  // [POST] /write
  async write(req, res) {
    try {
      const data = req.body;
      await writeRealtime(data.ref, {
        data: data.value,
      });
      res.status(200).json({ message: "write successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Center creation failed" });
    }
  }

  // [POST] /read
  async read(req, res) {
    try {
      const ref = req.body.ref;
      const data = await readRealtime(ref);

      console.log(data);
      res.status(200).json({ message: data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Center creation failed" });
    }
  }
}

module.exports = new RealtimeController();
