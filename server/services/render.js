const axios = require('axios')

exports.home = (req,res) =>{
    res.render('home');
}

exports.search = (req,res) =>{
    res.render('search');
}

exports.change = (req,res) =>{
    res.render('change');
}

exports.homeRoutes = (req, res) => {
    // make a get request to /api/items
    axios.get('http://localhost:3000/api/items')
        .then(function (response) {
            res.render('index', { items: response.data });
        })
        .catch(err => {
            res.send(err);
        })
}

exports.add_item = (req, res) => {
    res.render('add_item');
}

exports.update_item = (req, res) => {
    axios
        .get('http://localhost:3000/api/items', { params: { id: req.query.id } })
        .then(function (itemdata) {
            res.render("update_item", { item: itemdata.data })
        })
        .catch(err => {
            res.send(err);
        })
}