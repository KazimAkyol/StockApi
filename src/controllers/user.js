"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Stock API
------------------------------------------------------- */

const User = require("../models/user");

module.exports = {
  list: async (req, res) => {
    /* 
            #swagger.tags = ['Users']
            #swagger.summary = 'List Users'
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

    const data = await res.getModelList(User);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User),
      data,
    });
  },

  //* auth.controller.js'de register islemi yapilacagindan dolayi create islemi silindi!!!

  read: async (req, res) => {
    /* 
        #swagger.tags = ['Users']
        #swagger.summary = 'Get Single User'
    */

    const data = await User.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /* 
        #swagger.tags = ['Users']
        #swagger.summary = 'Update User'
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

    const data = await User.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    if ((!result, modifiedCount)) {
      res.errorStatusCode = 404;
      throw new Error("Data is not updated.");
    }

    res.status(202).send({
      error: false,
      data,
      new: await User.findById(req.params.id),
    });
  },

  deletee: async (req, res) => {
    /* 
        #swagger.tags = ['Users']
        #swagger.summary = 'Delete User'
    */

    const data = await User.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      message: data.deletedCount
        ? "Data deleted."
        : " Data is not found or already deleted.",
      data,
    });
  },
};
