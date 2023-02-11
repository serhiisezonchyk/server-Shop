import db from "../models/index.js";

const Basket = db.basket;
const BasketProduct = db.basketProduct;
const Product = db.product

export const create = async (req, res) => {
  const { userId, productId } = req.body;

  const basket = await Basket.findOne({ where: { userId: userId } });
  const basketProduct = {
    productId: productId,
    basketId: basket.id,
  };

  await BasketProduct.create(basketProduct)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Some error occurred while creating the BasketProduct.",
      });
    });
};

export const getAll = async (req, res) => {
  let { userId } = req.query;
  const basket = await Basket.findOne({ where: { userId: userId } });

  await BasketProduct.findAndCountAll({
    where: { basketId: basket.id },
    include: [{ model: Product, as: "product" }]
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

export const destroy = async (req, res) => {
    const { id } = req.params;
    let { userId}  = req.query;
    const basket = await Basket.findOne({ where: { userId: userId } });

  await BasketProduct.destroy({where:{ productId:id, basketId: basket.id}})
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "BasketProduct was deleted successfully!",
        });
      } else {
        res.status(401).send({
          message: `Cannot delete basketProduct with id=${id}. Maybe product was not found!`,
        });
      }
    })
    .catch((err) => {
        console.log(err);
      res.status(500).send({
        message: "Could not delete basketProduct with id=" + id,
      });
    });
};

export const getOne = async (req, res) => {
    const { id } = req.params;
    let { userId}  = req.query;
    const basket = await Basket.findOne({ where: { userId: userId } });

    console.log("basket  "+ basket.id + " prodId" + id)

    await BasketProduct.findOne({
      where: { productId:id, basketId: basket.id },
    })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving product.",
        });
      });
  };