"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Stock API
------------------------------------------------------- */

const Category = require("../models/category");

module.exports = {
    list: async (req, res) => {
        /* 
                #swagger.tags = ['Categories']
                #swagger.summary = 'List Categories'
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

        const data = await res.getModelList(Category);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Category),
            data,
        });
    },

    create: async (req, res) => {
        /* 
            #swagger.tags = ['Categories']
            #swagger.summary = 'Create Category'
            #swagger.parameters['body']={
                in:"body",
                require:true,
                schema:{
                   $ref: '#/definitions/Category'    
                },
        */

        const data = await Category.create(req.body);

        res.status(201).send({
            error: false,
            data,
        });
    },

    read: async (req, res) => {
        /* 
            #swagger.tags = ['Categories']
            #swagger.summary = 'Get Single Category'
        */

        const data = await Category.findOne({ _id: req.params.id });

        res.status(200).send({
            error: false,
            data,
        });
    },

    update: async (req, res) => {
        /* 
            #swagger.tags = ['Categories']
            #swagger.summary = 'Update Category'
            #swagger.parameters['body']={
                in:"body",
                require:true,
                schema:{
                   $ref: '#/definitions/Category'   
                },
        */

        const data = await Category.updateOne({ _id: req.params.id }, req.body, {
            runValidators: true,
        });

        if ((!result, modifiedCount)) {
            res.errorStatusCode = 404;
            throw new Error("Data is not updated.");
        }

        res.status(202).send({
            error: false,
            data,
            new: await Category.findById(req.params.id),
        });
    },

    deletee: async (req, res) => {
        /* 
            #swagger.tags = ['Categories']
            #swagger.summary = 'Delete Category'
        */

        const data = await Category.deleteOne({ _id: req.params.id });

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            message: data.deletedCount
                ? "Data deleted."
                : " Data is not found or already deleted",
            data,
        });
    },
};
