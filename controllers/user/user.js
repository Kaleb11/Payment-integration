const {
    User,
    Sequelize
} = require("./../../models");
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;

let self = {};

self.getAll = async(req, res) => {
    try {
        let data = await User.findAll();
        return res.json(data)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

self.getWithItems = async(req, res) => {
    try {
        let data = await User.findAll({
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
        let data = await User.findOne({
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
        let data = await User.findAll({
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
        const salt = await bcrypt.genSalt(10);
        var usr = {
            name: req.body.name,
            email: (req.body.email).toLowerCase(),

            password: await bcrypt.hash(req.body.password, salt)
        };
        created_User = await User.create(usr);
        return res.json(created_User)
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
        let data = await User.update(body, {
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
        let data = await User.destroy({
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