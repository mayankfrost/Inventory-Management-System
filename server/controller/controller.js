var itemdb = require('../model/model');

// create and save new item
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can't be empty!" });
        return;
    }

    // new item
    const item = new itemdb({
        name: req.body.name,
        amount: req.body.amount,
        code: req.body.code
    })

    // save item in the database
    item
        .save(item)
        .then(data => {
            // res.send(data)
            res.redirect('/add-item');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating a create operation"
            })
        });
}

// retrieve and return all items/single item
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        itemdb
            .findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: "Not found item with id " + id
                    })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retreiving item with id " + id
                })
            })
    } else {
        itemdb
            .find()
            .then(item => {
                res.send(item)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error occured while retrieving item info"
                })
            })
    }
}

// update a new item identified item by item id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({
                message: "Data to update can't be empty"
            });
    }

    const id = req.params.id;
    itemdb
        .findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update item with id ${id}. item not found.`
                })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error in updating item info"
            })
        })
}

// delete a item with specified item id
exports.delete = (req, res) => {
    const id = req.params.id

    itemdb
        .findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete with id ${id}. Id may be wrong.`
                })
            } else {
                res.send({
                    message: "item was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete item with id=" + id
            })
        })
}