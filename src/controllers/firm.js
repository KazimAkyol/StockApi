"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | Stock API
------------------------------------------------------- */

const Firm = require("../models/firm");

module.exports = {
    list: async (req, res) => {
        /* 
                #swagger.tags = ['Firms']
                #swagger.summary = 'List Firms'
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

        const data = await res.getModelList(Firm);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Firm),
            data,
        });
    },

    create: async (req, res) => {
        /* 
            #swagger.tags = ['Firms']
            #swagger.summary = 'Create Firm'
            #swagger.parameters['body']={
                in:"body",
                require:true,
                schema:{
                   $ref: '#/definitions/Firm'    
                },
        */

        const data = await Firm.create(req.body);

        res.status(201).send({
            error: false,
            data,
        });
    },

    read: async (req, res) => {
        /* 
            #swagger.tags = ['Firms']
            #swagger.summary = 'Get Single Firm'
        */

        const data = await Firm.findById({ _id: req.params.id });

        res.status(200).send({
            error: false,
            data,
        });
    },

    update: async (req, res) => {
        /* 
            #swagger.tags = ['Firms']
            #swagger.summary = 'Update Firm'
            #swagger.parameters['body']={
                in:"body",
                require:true,
                schema:{
                    $ref: '#/definitions/Firm'
                },
        */

        const data = await Firm.updateOne({ _id: req.params.id }, req.body, {
            runValidators: true,
        });

        res.status(202).send({
            error: false,
            data,
            new: await Firm.findById(req.params.id),
        });
    },

    deletee: async (req, res) => {
        /* 
            #swagger.tags = ['Firms']
            #swagger.summary = 'Delete Firm'
        */

        const data = await Firm.deleteOne({ _id: req.params.id });

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            message: data.deletedCount
                ? "Data deleted."
                : " Data is not found or already deleted",
            data,
        });
    },
};
