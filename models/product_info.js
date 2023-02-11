export default (sequelize, DataTypes) => {
  const ProductInfo = sequelize.define("product_info", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
  });
  return ProductInfo;
};
