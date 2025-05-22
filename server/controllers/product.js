const prisma = require("../config/prisma");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUNDINARY_CLUUND_NAME,
  api_key: process.env.CLOUNDINARY_API_KEY,
  api_secret: process.env.CLOUNDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

exports.create = async (req, res) => {
  try {
    // code
    const { title, description, price, quantity, categoryId, images } =
      req.body;
    // console.log(title, description, price, quantity, images)
    const product = await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images: {
          create: images
            .filter(
              (item) =>
                item.asset_id && item.public_id && item.url && item.secure_url
            )
            .map((item) => ({
              asset_id: item.asset_id,
              public_id: item.public_id,
              url: item.url,
              secure_url: item.secure_url,
            })),
        },
      },
    });
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.list = async (req, res) => {
  try {
    const { count } = req.params;
    const products = await prisma.product.findMany({
      take: parseInt(count),
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};
exports.read = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};
exports.update = async (req, res) => {
  try {
    // code
    const { title, description, price, quantity, categoryId, images } =
      req.body;

    await prisma.image.deleteMany({
      where: {
        productId: Number(req.params.id),
      },
    });
    // console.log(title, description, price, quantity, images)
    const product = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url,
          })),
        },
      },
    });
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
      include: { images: true },
    });
    if (!product) {
      return res.status(400).json({ message: "Product not found!!" });
    }
    // console.log(product);

    const deletedImage = product.images.map(
      (image) =>
        new Promise((resoLve, reject) => {
          cloudinary.uploader.destroy(image.public_id, (error, result) => {
            if (error) reject(error);
            else resoLve(result);
          });
        })
    );
    await Promise.all(deletedImage);

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.send("Delete Success");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};
exports.listby = async (req, res) => {
  try {
    const { sort, order, limit } = req.params;
    console.log(sort, order, limit);

    const products = await prisma.product.findMany({
      take: limit,
      orderBy: { [sort]: order },
      include: {
        category: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};
const handleQuery = async (req, res, query) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Search Error" });
  }
};
const handlePrice = async (req, res, priceRange) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        price: {
          gte: priceRange[0],
          lte: priceRange[1],
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Search Error" });
  }
};
const handleCategory = async (req, res, categoryId) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId: {
          in: categoryId.map((id) => Number(id)),
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Search Error" });
  }
};
exports.searchfilters = async (req, res) => {
  try {
    const { query, category, price } = req.body;

    if (query) {
      console.log("query-->", query);
      await handleQuery(req, res, query);
    }
    if (price) {
      console.log("price-->", price);
      await handlePrice(req, res, price);
    }

    if (category) {
      console.log("category-->", category);
      await handleCategory(req, res, category);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

exports.createImages = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `PetS${Date.now()}`,
      resource_type: "auto",
      folder: "PetShopOnline",
    });

    // ✅ ส่งค่าที่ frontend ใช้ได้
    res.json({
      asset_id: result.asset_id,
      public_id: result.public_id,
      url: result.url,
      secure_url: result.secure_url,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.removeImage = async (req, res) => {
  try {
    const { public_id } = req.body;

    cloudinary.uploader.destroy(public_id, (result) => {
      res.send("remove Imaga Success");
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
