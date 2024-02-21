var Grafico = require("../models/Grafico");


class GraficoController{
    async getDiagrama(req, res){
        var filter = req.body;
      
        var lista = await Grafico.getDiagrama(filter);
  
        var title = Grafico.strTitle;
        var subt = Grafico.strSubt;
        
        var ret = {data: lista, title: title, subt: subt};
  
        res.json(ret);
    }

    async getHisto(req, res){
        var filter = req.body;
      
        var lista = await Grafico.getAnos(filter);
  
        var title = Grafico.strTitle;
        var subt = Grafico.strSubt;
        
        var ret = {data: lista, title: title, subt: subt};
  
        res.json(ret);
    }
    
    async getAnos(req, res){
        var filter = req.body;
      
        var lista = await Grafico.getAnos(filter);
  
        res.json(lista);
    }  
}

module.exports = new GraficoController();