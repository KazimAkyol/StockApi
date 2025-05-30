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

        const data = await res.getModelList(Purchase, {}, [
            { path: "userId", select: "username firstName lastName" },
            { path: "firmId", select: "name" },
            { path: "brandId", select: "name" },
            { path: "productId", select: "name" },
        ]);

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
                   $ref: "#/definitions/Purchase"   
                },
        */

        //* Set userId from loggedIn user
        req.body.userId = req.user._id;

        const data = await Purchase.create(req.body);

        //* Increase the quantity of product which is bought
        await Product.updateOne(
            { _id: data.productId },
            { $inc: { quantity: data.quantity } }
        );

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

        const data = await res.getModelList(Purchase, {}, [
            { path: "userId", select: "username firstName lastName" },
            { path: "firmId", select: "name" },
            { path: "brandId", select: "name" },
            { path: "productId", select: "name" },
        ]);

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
                    $ref: "#/definitions/Purchase"    
                },
        */

        //? Update stocks
        if (req.body.quantity) {
            // get currentSale
            const currentPurchase = await Purchase.findById(req.params.id);

            // Calculate the difference
            const difference = req.body.quantity - currentPurchase.quantity;

            // Decrease quantity from product
            await Product.updateOne(
                { _id: currentPurchase.productId },
                { $inc: { quantity: +difference } }
            );
        }

        const data = await Purchase.updateOne({ _id: req.params.id }, req.body, {
            runValidators: true,
        });

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

        //* Decrease quantity of product back
        if (data.deletedCount) {
            await Product.updateOne(
                { _id: currentPurchase.productId },
                { $inc: { quantity: -currentPurchase, quantity } }
            );
        }

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            message: data.deletedCount
                ? "Data deleted."
                : " Data is not found or already deleted",
            data,
        });
    },
};
