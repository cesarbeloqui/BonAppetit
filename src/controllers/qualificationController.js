const { Qualification, Product } = require("../db");

const qualifyProduct = async (arrQualification) => {
  await arrQualification.map(async (qualification) => {
    await Qualification.create({
      qualification: qualification.points,
      idProduct: qualification.idProduct,
    });

    const productRatings = await Qualification.findAll({
      where: { idProduct: qualification.idProduct },
    });

    let ratingSum = 0;

    await productRatings.map((rating) => {
      ratingSum += rating.qualification;
    });

    const averageRating = Math.ceil(ratingSum / productRatings.length);

    await Product.update(
      { qualification: averageRating },
      { where: { id: qualification.idProduct } }
    );
  });
};

module.exports = qualifyProduct;
