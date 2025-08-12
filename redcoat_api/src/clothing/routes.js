const { Router } = require('express')
const controller = require('./controller');

const router = Router();

//route for get active clothing
router.get("/active", controller.getClothing);

//route for getting all clothing
router.get("/all", controller.getAllClothing);

//route to get single clothing item
router.get("/:id", controller.getClothingById);

//route for post or adding
router.post("/", controller.addClothing);

//route for updating
router.put("/:id", controller.updateClothes);

//archive clothing
router.delete("/:id", controller.softDeleteClothing);

//restore archived
router.patch("/restore/:id", controller.restoreClothing);

module.exports = router;