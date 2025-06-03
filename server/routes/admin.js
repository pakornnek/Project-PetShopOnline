const express = require("express");
const router = express.Router();
const { authCheck } = require("../middlewares/authCheck");

const{ getOrdersAdmin,changeOrderStatus} = require('../controllers/admin')
router.put("/admin/order-status", authCheck,changeOrderStatus);
router.get("/admin/orders",authCheck,getOrdersAdmin);

module.exports = router;
