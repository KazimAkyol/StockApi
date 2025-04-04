"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Stock API
------------------------------------------------------- */

const Brand = require("../models/brand");

module.exports = {
  list: async (req, res) => {
    /* 
            #swagger.tags = ['Brands']
            #swagger.summary = 'List Brands'
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

    const data = await res.getModelList(Brand);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Brand),
      data,
    });
  },

  create: async (req, res) => {
    /* 
        #swagger.tags = ['Brands']
        #swagger.summary = 'Create Brand'
        #swagger.parameters['body']={
            in:"body",
            require:true,
            schema:{
                $ref: "#/definitions/Brand"    
            },
    */

    const data = await Brand.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /* 
        #swagger.tags = ['Brands']
        #swagger.summary = 'Get Single Brand'
    */

    const data = await Brand.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /* 
        #swagger.tags = ['Brands']
        #swagger.summary = 'Update Brand'
        #swagger.parameters['body']={
            in:"body",
            require:true,
            schema:{
                $ref: "#/definitions/Brand"   
            },
    */

    const data = await Brand.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Brand.findById(req.params.id),
    });
  },

  deletee: async (req, res) => {
    /* 
        #swagger.tags = ['Brands']
        #swagger.summary = 'Delete Brand'
    */

    const data = await Brand.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      message: data.deletedCount
        ? "Data deleted."
        : " Data is not found or already deleted",
      data,
    });
  },
};
