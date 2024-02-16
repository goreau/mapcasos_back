var Casos = require("../models/Casos");

class CasosController {
    async getCasos(req, res){
        var filter =  req.params.filter;

        var lista = await Casos.getCasos(filter);
        res.json(lista);
    }

    async getCaso(req, res){
        var sinan =  req.params.sinan;

        var caso = await Casos.getCaso(sinan);
        res.json(caso);
    }

    async update(req, res) {
        try {
          var dados = req.body;
          var result = await Casos.update(dados);
          res.status(200);
          res.json({ msg: "Dados alterados!" });
        } catch (error) {
          res.status(400).send(error);
        }
    }

    async getSemanas(req, res){
        var filter =  req.params.filter;

        var lista = await Casos.getSemanas(filter);
        res.json(lista);
    }

    async getAgravos(req, res){

        var lista = await Casos.getAgravos();
        res.json(lista);
    }

    async getResultados(req, res){

        var lista = await Casos.getResultados();
        res.json(lista);
    }
}

module.exports = new CasosController();