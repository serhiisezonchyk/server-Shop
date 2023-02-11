export default (sequelize, DataTypes) => {
  const BasketProduct = sequelize.define(
    "basket_product",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    { timestamps: false }
  );

  return BasketProduct;
};

