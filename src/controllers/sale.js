"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Stock API
------------------------------------------------------- */

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

    const data = await res.getModelList(Sale);

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
            "username": {type:String, example:"test"},
            "password": "1234",
            "email": "test@site.com",
            "isActive": true,
            "isStaff": false,
            "isAdmin": false,    
            },
    */

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
        req?.body?.password
      )
    ) {
      res.errorStatusCode = 401;
      throw new Error(
        "Password must be at least 8 characters long and contain at least one special character and  at least one uppercase character"
      );
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
            "username": "test",
            "password": "1234",
            "email": "test@site.com",
            "isActive": true,
            "isStaff": false,
            "isAdmin": false,    
            },
    */

    const data = await Sale.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    if ((!result, modifiedCount)) {
      res.errorStatusCode = 404;
      throw new Error("Data is not updated.");
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
