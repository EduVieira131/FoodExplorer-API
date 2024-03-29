const knex = require("../../database/knex");

class ProductsRepository {
  async findProductByName(name) {
    const product = await knex("products")
      .whereLike("products.name", `%${name}%`)
      .first();

    return product;
  }

  async findProductById(id) {
    const product = await knex("products").where({ id }).first();

    return product;
  }

  async create({ name, ingredients, category, price, description, image }) {
    const [product_id] = await knex("products").insert({
      name,
      price,
      description,
      image,
    });

    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        product_id,
        name: ingredient,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    const categoriesInsert = {
      product_id,
      name: category,
    };

    await knex("categories").insert(categoriesInsert);

    return { product_id };
  }

  async update({ updatedProductData }) {
    const updatedProduct = await knex("products")
      .update({
        name: updatedProductData.name,
        price: updatedProductData.price,
        description: updatedProductData.description,
        image: updatedProductData.image,
      })
      .where({ id: updatedProductData.id });

    const updatedCategory = await knex("categories")
      .update({
        name: updatedProductData.category,
      })
      .where({ product_id: Number(updatedProductData.id) });

    await knex("ingredients")
      .where({ product_id: updatedProductData.id })
      .delete();

    const updatedIngredients = updatedProductData.ingredients.map(
      async (ingredient) => {
        await knex("ingredients").insert({
          name: ingredient,
          product_id: updatedProductData.id,
        });
      }
    );

    return { updatedProduct, updatedCategory, updatedIngredients };
  }

  async indexProducts() {
    const productsList = await knex("products");
    const categoriesList = await knex("categories");

    const productsListWithCategories = productsList.map((product) => {
      const productCategory = categoriesList.find(
        (category) => category.product_id === product.id
      );

      return {
        ...product,
        category: productCategory,
      };
    });

    return productsListWithCategories;
  }

  async indexByName(searchTerm) {
    const productsList = await knex("products").whereLike(
      "products.name",
      `%${searchTerm}%`
    );
    const categoriesList = await knex("categories");

    const productsListWithCategories = productsList.map((product) => {
      const productCategory = categoriesList.find(
        (category) => category.product_id === product.id
      );

      return {
        ...product,
        category: productCategory,
      };
    });

    return productsListWithCategories;
  }

  async indexByIngredients(searchTerm) {
    const productsList = await knex("ingredients")
      .select([
        "products.id",
        "products.name",
        "products.price",
        "products.description",
        "products.image",
      ])
      .whereIn("ingredients.name", searchTerm)
      .innerJoin("products", "products.id", "ingredients.product_id")
      .groupBy("products.id")
      .orderBy("products.name");

    const categoriesList = await knex("categories");

    const productsListWithCategories = productsList.map((product) => {
      const productCategory = categoriesList.find(
        (category) => category.product_id === product.id
      );

      return {
        ...product,
        category: productCategory,
      };
    });

    return productsListWithCategories;
  }

  async delete(id) {
    await knex("products").where({ id }).delete();
  }

  async show(id) {
    const product = await knex("products").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ product_id: id })
      .orderBy("name");
    const categories = await knex("categories").where({ product_id: id });

    return { ...product, ingredients, categories };
  }

  async updateProductImage(product) {
    const updatedProduct = await knex("products")
      .update(product)
      .where({ id: product.id });

    return updatedProduct;
  }
}

module.exports = ProductsRepository;
