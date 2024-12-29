import prisma from "../db";

export async function getUpdates(req, res) {
  const updates = await prisma.update.findMany({
    where: {
      product: {
        belongsToId: req.user.id,
      },
    },
  });
  res.json({ data: updates });
}

export async function getUpdateById(req, res) {
  const updateId = req.params.id;
  const update = await prisma.update.findUniqueOrThrow({
    where: {
      id: updateId,
      product: {
        belongsToId: req.user.id,
      },
    },
  });
  res.json({ data: update });
}

export async function createUpdate(req, res) {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
      belongsToId: req.user.id,
    },
  });

  if (!product) {
    res.status(403);
    res.json({ error: `Invalid "productId": ${req.body.productId}` });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      version: req.body.version,
      asset: req.body.asset,
      productId: product.id,
    },
  });
  res.status(201);
  res.json({ data: update });
}

export async function updateUpdate(req, res) {
  const updateId = req.params.id;
  const updatedUpdate = await prisma.update.update({
    where: {
      id: updateId,
      product: {
        belongsToId: req.user.id,
      },
    },
    data: {
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
      version: req.body.version,
      asset: req.body.asset,
      updatedAt: new Date(),
    },
  });
  res.json({ data: updatedUpdate });
}

export async function deleteUpdate(req, res, next) {
  try {
    const updateId = req.params.id;
    await prisma.update.delete({
      where: {
        id: updateId,
        product: {
          belongsToId: req.user.id,
        },
      },
    });
    res.status(204);
    res.send();
  } catch (err) {
    err.type = "input";
    next(err);
  }
}
