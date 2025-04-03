"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Stock API
------------------------------------------------------- */

const Purchase = require("../models/purchase");

module.exports = {
  list: async (req, res) => {
    /* 
            #swagger.tags = ['Purchases']
            #swagger.summary = 'List Purchase'
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

    const data = await res.getModelList(Purchase);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Purchase),
      data,
    });
  },

  create: async (req, res) => {
    /* 
        #swagger.tags = ['Purchases']
        #swagger.summary = 'Create Purchase'
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

    const data = await Purchase.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /* 
        #swagger.tags = ['Purchases']
        #swagger.summary = 'Get Single Purchase'
    */

    const data = await Purchase.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /* 
        #swagger.tags = ['Purchases']
        #swagger.summary = 'Update Purchase'
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

    const data = await Purchase.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    if ((!result, modifiedCount)) {
      res.errorStatusCode = 404;
      throw new Error("Data is not updated.");
    }

    res.status(202).send({
      error: false,
      data,
      new: await Purchase.findById(req.params.id),
    });
  },

  deletee: async (req, res) => {
    /* 
        #swagger.tags = ['Purchases']
        #swagger.summary = 'Delete Purchase'
    */

    const data = await Purchase.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      message: data.deletedCount
        ? "Data deleted."
        : " Data is not found or already deleted",
      data,
    });
  },
};
