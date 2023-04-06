const request = require("supertest");
import app from "../src/app";
import { Server } from "http";
const mongoose = require("mongoose");
import ProductModel from "../src/models/productModel";
import CategoryModel from "../src/models/categoryModel";
const dotenv = require("dotenv");
dotenv.config();

let server: Server;

beforeAll((done) => {
  server = app.listen(3000, () => {
    done();
  });
});

afterAll((done) => {
  server.close((err) => {
      done();
  });
});

describe("Products API", () => {
  let productId;
  let token: string;
  let newCategory;

  beforeAll(async () => {
    await mongoose.connect(
      process.env.DATABASE || "mongodb://localhost:27017/product_db"
    );
    // autentique-se e obtenha um token de autenticação válido
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "admin@admin.com",
      password: "123456@admin",
    });
    token = response.body.token;

    newCategory = await CategoryModel.create({
      name: "Nova Categoria",
    });
  });

  afterAll(async () => {
    await ProductModel.deleteMany({});
    await CategoryModel.deleteMany({});
    await mongoose.connection.close();
  });

  describe("POST /api/v1/products", () => {
    it("should create a new product", async () => {
      const product = {
        name: "Product 1",
        description: "This is product 1",
        price: 9.99,
        qty: 12,
        category: newCategory._id.toString(),
      };

      const response = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `Bearer ${token}`)
        .send(product)
        .expect(201);

      expect(response.body.data.product).toMatchObject(product);
      expect(response.body.data.product._id).toBeTruthy();

      productId = response.body.data.product._id;
    });

    it("should not create a new product with invalid payload", async () => {
      const product = {
        description: "This is product 2",
        price: 19.99,
        qty: 12,
        category: newCategory._id.toString(),
      };

      const response = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `Bearer ${token}`)
        .send(product)
        .expect(400);

      expect(response.body.err.message).toBe(
        "Product validation failed: name: The product must have a name"
      );
    });
  });

  describe("GET /api/v1/products", () => {
    it("should retrieve all products", async () => {
      const response = await request(app).get("/api/v1/products").expect(200);

      expect(response.body.data.products.length).toBe(1);
      expect(response.body.data.products[0]._id).toBe(productId);
    });
  });

  describe("GET /api/v1/products/:id", () => {
    it("should retrieve a single product by id", async () => {
      const response = await request(app)
        .get(`/api/v1/products/${productId}`)
        .expect(200);

      expect(response.body.data.product._id).toBe(productId);
    });

    it("should return an error if product is not found", async () => {
      const response = await request(app)
        .get("/api/v1/products/5ff5ab5aa5a83d13d441fca9")
        .expect(404);

      expect(response.body.message).toBe("Product not found");
    });
  });

  describe("PUT /api/v1/products/:id", () => {
    it("should update a product", async () => {
      const newProduct = {
        name: "New Product",
        description: "New Description",
        price: 50,
        qty: 12,
        category: newCategory._id.toString(),
      };

      // Create a new product
      const createResponse = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `Bearer ${token}`)
        .send(newProduct)
        .expect(201);

      const productId = createResponse.body.data.product._id;

      // Update the product
      const updatedProduct = {
        name: "Updated Product",
        description: "Updated Description",
        price: 75,
        qty: 12,
        category: newCategory._id.toString(),
      };

      const response = await request(app)
        .patch(`/api/v1/products/${productId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedProduct)
        .expect(200);

      // Check if the response body matches the updated product information
      expect(response.body.data.product.name).toBe(updatedProduct.name);
      expect(response.body.data.product.description).toBe(
        updatedProduct.description
      );
      expect(response.body.data.product.price).toBe(updatedProduct.price);
      expect(response.body.data.product.category).toBe(updatedProduct.category);

      // Check if the product was actually updated in the database
      const updatedProductFromDB = await ProductModel.findById(productId);

      expect(updatedProductFromDB?.name).toBe(updatedProduct.name);
      expect(updatedProductFromDB?.description).toBe(
        updatedProduct.description
      );
      expect(updatedProductFromDB?.price).toBe(updatedProduct.price);
      expect(updatedProductFromDB?.category.toString()).toBe(
        updatedProduct.category
      );
    });
  });
});
