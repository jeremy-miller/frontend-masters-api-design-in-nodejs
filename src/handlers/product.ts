import prisma from "../db";

export async function getProducts(req, res) {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
  });
  res.json({ data: products });
}

export async function getProductById(req, res) {
  const productId = req.params.id;
  const product = await prisma.product.findUniqueOrThrow({
    where: {
      id: productId,
      belongsToId: req.user.id,
    },
  });
  res.json({ data: product });
}

export async function createProduct(req, res) {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });
  res.status(201);
  res.json({ data: product });
}

export async function updateProduct(req, res) {
  const updatedProduct = await prisma.product.update({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
    data: {
      name: req.body.name,
    },
  });
  res.json({ data: updatedProduct });
}

export async function deleteProduct(req, res, next) {
  const productId = req.params.id;
  try {
    await prisma.product.delete({
      where: {
        id: productId,
        belongsToId: req.user.id,
      },
    });
    res.status(204);
    res.send();
  } catch (err) {
    err.type = "input";
    next(err);
  }
}
