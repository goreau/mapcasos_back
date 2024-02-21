var Poligono = require("../models/Poligono");


class PoligonoController{
    async create(req, res) {
        try {
          var dados = req.body;
          var result = await Poligono.create(dados);

          res.status(200);
          res.json({ msg: "Polígono cadastrado!" });
        } catch (error) {
          res.status(400).send(error);
        }
    }


    async getRelat(req, res){
      var id = req.params.id;
      var filter = req.body;
    

      var regs = [];

      switch (id) {
        case '1':
          regs = await Poligono.getListagem(filter);
          break;
        case '2':
          regs = await Poligono.getSemanal(filter);
          break;
        default:
          regs = [];
          break;
      }

      var filtro = Poligono.strFilter;
      var filt = filtro.length > 0 ? 'Filtros: ' +  filtro.join(', ') : '';
      var ret = {data: regs, filter: filt};

      res.json(ret);
    }

    async getExport(req, res){
      var id = req.params.id;
      var filter = req.body;

      var regs = [];

      switch (id) {
        case '1':
          regs = await Poligono.getCapturaExp(filter);
          break;
        case '2':
          regs = await Poligono.getIdentificacaoExp(filter);
          break;
        default:
          regs = [];
          break;
      }

      
      res.json(regs);
    }
    
}

module.exports = new PoligonoController();