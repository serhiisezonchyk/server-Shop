import db from "../models/index.js";

const Type = db.type;

export const create = async (req, res) => {
  const type = {
    name: req.body.name,
  };
  await Type.create(type)
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Type.",
      });
    });
};

export const getAll = async (req, res) => {
  await Type.findAll()
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving types.",
      });
    });
};

export const destroy = async(req, res)=>{
    const id = req.params.id;
    await Type.destroy({id: id})
    .then((num)=>{
        if(num == 1){
            res.status(200).send({
                message: "Type was deleted successfully!"
            })
        } else {
            res.status(401).send({
              message: `Cannot delete type with id=${id}. Maybe Tutorial was not found!`
            });
          }
    }).catch((err)=>{
        res.status(500).send({
            message: "Could not delete type with id=" + id
          });
    })
}

export const edit = async(req, res)=>{
    const id = req.params.id;
    await Type.update(req.body)
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
        res.status(500).send({
            message: "Could not delete type with id=" + id
          });
    })
}

export const getOne = async (req, res) => {
  const { id } = req.params;
  await Type.findOne({ 
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