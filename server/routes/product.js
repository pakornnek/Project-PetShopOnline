const express = require("express");
const { create, list, read, remove,searchfilters, update, listby } = require("../controllers/product");
const router = express.Router();

router.post("/product",create);
router.get("/products/:count",list);
router.put('/product/:id',update)
router.get("/product/:id",read);
router.delete("/product/:id",remove);
router.post("/productby",listby);
router.post("/search/filters",searchfilters);

module.exports = router;
