import db from "../models/index.js";

const Brand = db.brand;

import ApiError from "../error/ApiError.js";

export const create = async (req, res) => {

  const brand = {
    name: req.body.name,
  };
  await Brand.create(brand)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Brand.",
      });
    });
};

export const getAll = async (req, res) => {
    await Brand.findAll()
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving brands.",
      });
    });
};

export const destroy = async(req, res)=>{
    const id = req.params.id;
    await Brand.destroy({id: id})
    .then((num)=>{
        if(num == 1){
            res.status(200).send({
                message: "Brand was deleted successfully!"
            })
        } else {
            res.status(401).send({
              message: `Cannot delete brand with id=${id}. Maybe Tutorial was not found!`
            });
          }
    }).catch((err)=>{
        res.status(500).send({
            message: "Could not delete brand with id=" + id
          });
    })
}

export const edit = async(req, res)=>{
    const id = req.params.id;
    await Brand.update(req.body)
    .then((num)=>{
        if(num == 1){
            res.status(200).send({
                message: "Brand was updated successfully!"
            })
        } else {
            res.status(401).send({
              message: `Cannot update brand with id=${id}. Maybe Tutorial was not found!`
            });
          }
    }).catch((err)=>{
        res.status(500).send({
            message: "Could not delete brand with id=" + id
          });
    })
}

export const getOne = async (req, res) => {
  const { id } = req.params;
  await Brand.findOne({ 
    where: { id },
  })
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving type.",
      });
    });
};