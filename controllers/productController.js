import { v4 } from "uuid";
import { fileURLToPath } from "url";
import path, { resolve } from "path";
import ApiError from "../error/ApiError.js";
import db from "../models/index.js";

const Product = db.product;
const ProductInfo = db.productInfo;

export const create = async (req, res, next) => {
  try {
    let { info } = req.body;
    const { img } = req.files;
    let fileName = v4() + ".jpg";
    img.mv(
      resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        "..",
        "static",
        fileName
      )
    );
    const product = {
      name: req.body.name,
      price: req.body.price,
      brandId: req.body.brandId,
      typeId: req.body.typeId,
      img: fileName,
    };
    console.log(product)
    await Product.create(product)
      .then((data) => {
        if (info) {
          info = JSON.parse(info);
          info.forEach((i) =>
            ProductInfo.create({
              title: i.title,
              description: i.description,
              productId: data.id,
              //productId: product.id,
            })
          );
        }
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || "Some error occurred while creating the Product.",
        });
      });
  } catch (e) {
    next(ApiError.badRequest(e.message));
  }
};

export const getAll = async (req, res) => {
  let { brandId, typeId, limit, page } = req.query;
  page = page || 1;
  limit = limit || 9;
  let offset = page * limit - limit;
  if (!brandId && !typeId) {
    await Product.findAndCountAll({ limit, offset })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products.",
        });
      });
  }
  if (brandId && !typeId) {
    await Product.findAndCountAll({
      where: { brandId },
      limit,
      offset,
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
  }
  if (!brandId && typeId) {
    await Product.findAndCountAll({
      where: { typeId },
      limit,
      offset,
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
  }
  if (brandId && typeId) {
    await Product.findAndCountAll({
      where: { typeId, brandId },
      limit,
      offset,
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
  }
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  await Product.findOne({
    where: { id },
    include: [{ model: ProductInfo, as: "info" }],
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

export const destroy = async (req, res) => {
  console.log("delete")
  const id = req.params.id;
  await Product.destroy({ where: {id: id},
    truncate: { cascade: true }})
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Product was deleted successfully!",
        });
      } else {
        res.status(401).send({
          message: `Cannot delete product with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Could not delete type with id=" + id,
      });
    });
};

export const edit = async(req, res)=>{
  const id = req.params.id;
  const { img } = req.files;
  const {info} = req.body; 
  let obj = JSON.parse(info);

  let fileName = v4() + ".jpg";
  img.mv(
    resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "static",
      fileName
    )
  );
  ProductInfo.destroy({where:{productId: id}});
  obj.map(data=>{
    let product_info = {
      title: data.title,
      description:data.description,
      productId:id
    }
    console.log(product_info)
    ProductInfo.create(product_info);
  })

  const product = {
    name: req.body.name,
    price: req.body.price,
    brandId: req.body.brandId,
    typeId: req.body.typeId,
    img: fileName,
  };

    await Product.update(product, {where: {id:id}})
  .then((num)=>{
      if(num == 1){
          res.status(200).send({
              message: "Type was updated successfully!"
          })
      } else {
          res.status(401).send({
            message: `Cannot update type with id=${id}. Maybe Tutorial was not found!`
          });
        }
  }).catch((err)=>{
    console.log(err)
      res.status(500).send({
          message: "Could not update type with id=" + id
        });
  })
}