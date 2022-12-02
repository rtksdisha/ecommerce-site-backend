const Chance = require("chance");

const OrdersController = require("../orders-controller");
const OrderService = require("../../services/orders-service");

const chance = new Chance();

jest.mock("../../services/orders-service");

describe("when calling saveOrder", () => {
  let order;

  //setup before the test cases start
  beforeEach(() => {
    order = {
      name: chance.string(),
      price: chance.integer(),
    };

    req = {
      body: order,
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    OrderService.saveOrder = jest.fn().mockResolvedValue(order);
  });

  it("should call orderServer.saveorder with order data", async () => {
    await OrdersController.saveOrder(req, res);

    expect(OrderService.saveOrder).toBeCalledWith(order);
  });

  it("should call res.json  with save order data", async () => {
    await OrdersController.saveOrder(req, res);

    expect(res.json).toBeCalledWith(order);
  });

  it("should call res.json  with save order data", async () => {
    await OrdersController.saveOrder(req, res);

    expect(res.status).toBeCalledWith(201);
  });

  it("should call res.status with 500 when the Orderservice.saveOrder service fails", async () => {
    const error = new Error();

    OrderService.saveOrder = jest.fn().mockRejectedValue(error);

    await OrdersController.saveOrder(req, res);

    expect(res.status).toBeCalledWith(500);
  });
});
