const {
    order,
    Sequelize
} = require("./../../models");

const Op = Sequelize.Op;

let self = {};

self.getAll = async(req, res) => {
    try {
        let data = await order.findAll();
        return res.json(data)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

self.getWithorders = async(req, res) => {
    try {
        let data = await order.findAll({
            attributes: ["id", "name"],
            // include:[
            // 	{
            // 		model:order,
            // 		as:'orders',
            // 		attributes:["id","name","price","stock"]
            // 	}
            // ]
        });
        return res.json({
            status: "ok",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            data: error
        })
    }
}

self.get = async(req, res) => {
    try {
        let id = req.params.id;
        let data = await order.findOne({
            where: {
                id: id
            }
        });
        return res.json({
            message: error.message
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

self.search = async(req, res) => {
    try {
        let text = req.query.text;
        let data = await order.findAll({
            where: {
                name: {
                    [Op.like]: "%" + text + "%"
                }
            }
        });
        return res.json(data)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

self.save = async(req, res) => {
    try {
        let body = req.body;
        let data = await order.create(body);
        return res.json(data)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

self.update = async(req, res) => {
    try {
        let id = req.params.id;
        let body = req.body;
        let data = await order.update(body, {
            where: {
                id: id
            }
        });
        return res.json(data)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

self.delete = async(req, res) => {
    try {
        let id = req.params.id;
        let data = await order.destroy({
            where: {
                id: id
            }
        });
        return res.json(data)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = self;