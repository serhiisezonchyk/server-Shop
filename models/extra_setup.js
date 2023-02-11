export default function applyExtraSetup(db) {
	const {type, brand, product, user, basket, basketProduct,raiting,productInfo} = db;

  basketProduct.belongsTo(basket);
  basketProduct.belongsTo(product);
  basket.hasMany(basketProduct);

  basket.belongsTo(user);
  brand.hasMany(product)
  productInfo.belongsTo(product);

  product.hasMany(raiting);
  product.hasMany(basketProduct);
  product.hasMany(productInfo, {as: 'info'});

  product.belongsTo(brand);
  product.belongsTo(type);

  
  raiting.belongsTo(user);
  raiting.belongsTo(product);

  type.hasMany(product);

  user.hasOne(basket)
  user.hasMany(raiting)
}