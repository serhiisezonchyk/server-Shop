export default (sequelize, DataTypes) => {
  const Raiting = sequelize.define("raiting", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false },
  });

  return Raiting;
};
