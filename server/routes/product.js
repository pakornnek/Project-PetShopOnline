const express = require("express");
const {
  create,
  list,
  read,
  remove,
  searchfilters,
  update,
  listby,
  createImages,
  removeImage,
} = require("../controllers/product");
const {authCheck,adminCheck} = require('../middlewares/authCheck')

const router = express.Router();

router.post("/product",create);
router.get("/products/:count", list); // ✅ รองรับ /api/products/20

router.put('/product/:id',update)
router.get("/product/:id",read);
router.delete("/product/:id",remove);
router.post("/productby",listby);
router.post("/search/filters",searchfilters);

router.post('/images',authCheck,adminCheck,createImages)
router.post('/removeimages',authCheck,adminCheck,removeImage)



module.exports = router;
