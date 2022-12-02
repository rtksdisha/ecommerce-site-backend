const Chance = require("chance");

const OrderService = require("../orders-service");
const ProductService = require("../product-service");

const Order = require("../../models/order");

const chance = new Chance();

jest.mock("../../models/order");
jest.mock("../product-service");

describe("when calling addTotalToOrder", () => {
  let order, product;

  beforeEach(() => {
    order = { products: [chance.guid()] };
    product = {
      price: chance.integer(),
    };

    total = product.price * order.products.length;

    ProductService.getProductById = jest.fn().mockReturnValue(product);
  });

  it("should call productService.getProductById with the productId data", async () => {
    await OrderService.addTotalToOrder(order);

    expect(ProductService.getProductById).toBeCalledWith(order.products[0]);
  });

  it("should call the add the totals of the products to the order object", async () => {
    await OrderService.addTotalToOrder(order);

    //oreder.total got from orders.service function addTotalToOrder
    expect(order.total).toBe(total);
  });
});

describe("when calling saveOrder service method", () => {
  beforeEach(() => {
    //setup object
    order = {
      name: chance.name(),
      address: chance.address(),
      city: chance.city(),
      state: chance.state(),
      zipCode: chance.zipCode,
      email: chance.email(),
      phone: chance.phone(),
      products: [chance.guid()],
      total: chance.integer(),
    };

    //Mark the order service
    OrderService.addTotalToOrder = jest.fn().mockReturnValue(order);

    //mark the saved order
    //to listen to other methods
    OrderSaveSpy = jest
      .spyOn(new Order(), "save")
      .mockImplementation(() => Promise.resolve(order));

    OrderObjectSpy = jest
      .spyOn(new Order(), "toObject")
      .mockImplementation(() => Promise.resolve(order));
  });

  it("should call the OrderService.addToOrder with the order object", async () => {
    await OrderService.saveOrder(order);

    expect(OrderService.addTotalToOrder).toBeCalledWith(order);
  });

  it("should create a new order instance with the order data", async () => {
    await OrderService.saveOrder(order);

    expect(Order).toBeCalledWith(order);
  });

  it("should call the order save instance method", async () => {
    await OrderService.saveOrder(order);

    expect(OrderSaveSpy).toBeCalledWith();
  });

  it("should call the toObject instance method", async () => {
    await OrderService.saveOrder(order);

    expect(OrderObjectSpy).toBeCalled();
  });

  it("should return the saved order to the controller from the DB", async () => {
    const newOrder = await OrderService.saveOrder(order);

    expect(newOrder).toEqual(order);
  });
});
