"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Stock API
------------------------------------------------------- */

const Product = require("../models/product");
const Sale = require("../models/sale");

module.exports = {
  list: async (req, res) => {
    /* 
            #swagger.tags = ['Sales']
            #swagger.summary = 'List Sale'
            #swagger.desription = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples usage:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
    */

    const data = await res.getModelList(Sale, {}, [
      { path: "userId", select: "username firstName lastName" },
      { path: "brandId", select: "name" },
      { path: "productId", select: "name" },
    ]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Sale),
      data,
    });
  },

  create: async (req, res) => {
    /* 
        #swagger.tags = ['Sales']
        #swagger.summary = 'Create Sale'
        #swagger.parameters['body']={
            in:"body",
            require:true,
            schema:{
                $ref: "#/definitions/Sale" 
            },
    */

    //* Set userId from loggedIn user
    req.body.userId = req.user._id;

    const currentProduct = await Product.findById(req.body.productId);

    if (currentProduct.quantity < req.body.quantity) {
      res.errorStatusCode = 422;
      throw new Error("There is not enough product-quantity for this sale", {
        cause: `Quantity in our stock: ${currentProduct.quantity}`,
      });
    }

    const data = await Sale.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /* 
        #swagger.tags = ['Sales']
        #swagger.summary = 'Get Single Sale'
    */

    const data = await Sale.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /* 
        #swagger.tags = ['Sales']
        #swagger.summary = 'Update Sale'
        #swagger.parameters['body']={
            in:"body",
            require:true,
            schema:{
                $ref: "#/definitions/Sale"    
            },
    */

    const data = await Sale.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    //? Update stocks
    if (req.body.quantity) {
      // get currentSale
      const currentSale = await Sale.findById(req.params.id);

      // Calculate the difference
      const difference = req.body.quantity - currentSale.quantity;

      // Decrease quanitity from product
      await Product.updateOne(
        { _id: currentSale.productId },
        { $inc: { quantity: -difference } }
      );
    }

    res.status(202).send({
      error: false,
      data,
      new: await Sale.findById(req.params.id),
    });
  },

  deletee: async (req, res) => {
    /* 
        #swagger.tags = ['Sales']
        #swagger.summary = 'Delete Sale'
    */

    const data = await Sale.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      message: data.deletedCount
        ? "Data deleted."
        : " Data is not found or already deleted",
      data,
    });
  },
};
