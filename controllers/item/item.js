const {
    item,
    Sequelize
} = require("./../../models");

const Op = Sequelize.Op;

let self = {};

self.getAll = async(req, res) => {
    try {
        let data = await item.findAll();
        return res.json(data)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

self.getWithItems = async(req, res) => {
    try {
        let data = await item.findAll({
            attributes: ["id", "name"],
            // include:[
            // 	{
            // 		model:item,
            // 		as:'items',
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
        let data = await item.findOne({
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
        let data = await item.findAll({
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
        let data = await item.create(body);
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
        let data = await item.update(body, {
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
        let data = await item.destroy({
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