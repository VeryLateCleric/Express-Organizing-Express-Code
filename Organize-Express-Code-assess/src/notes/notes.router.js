const router = require("express").Router();
const { list, create, read, update, delete: destroy } = require("./notes.controller");

// Here we define all our routes:
router.get("/", list);              // GET /notes
router.post("/", create);           // POST /notes
router.get("/:noteId", read);       // GET /notes/:noteId
router.put("/:noteId", update);     // PUT /notes/:noteId
router.delete("/:noteId", destroy); // DELETE /notes/:noteId

module.exports = router;
