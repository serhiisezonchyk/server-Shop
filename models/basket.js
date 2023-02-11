export default (sequelize, DataTypes) => {
  const Basket = sequelize.define(
    "basket",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    { timestamps: false }
  );

  return Basket;
};
