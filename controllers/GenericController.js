var Generic = require("../models/Generic");
const fs = require("fs");
//const csv = require("csv-parser");


class GenericController {
  async postFile(req, res){
    try{
      var file = req.file;

      Generic.insertCasos(file.path);
      
      res.status(200);
      res.json({ msg: "Arquivo salvo!"});

    } catch (error) {
      res.status(400).send(error);
    }
  }

  async postFileCsvSemUso(req, res){
    try{
      var file = req.file;
      var results = [];
      await fs.createReadStream(file.path)
      .pipe(csv({ separator: ';' }))
      .on("data", data => results.push(data))
      .on("end", async () => {
        var ret = Generic.insertCasos(results);
//tirei o async pra não ficar esperando
      //  if (ret) {
          res.status(200);
          res.json({ msg: "Arquivo salvo!"});
  //      } else {
  //        res.status(400).send('Erro na importação');
  //      }
      }); 
    
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async listFiles(req, res) {
   const {  promises: fs } = require("fs");
    const path = require("path");

    async function walk(dir) {
      const entries = await fs.readdir(dir);
      let ret = [];
      for (const entry of entries) {
          const fullpath = path.resolve(dir, entry);
          const info = await fs.stat(fullpath);
          if (info.isDirectory()) {
              ret = [...ret, ...(await walk(fullpath))];
          } else {
              ret = [...ret, fullpath];
          }
      }
      return ret;
    }

    (async function () {
      var ret = await walk("../backend/sinan"); 
      res.json({files: JSON.stringify(ret)});
  })();
  }


  async getFile(req, res) {
    const fs  = require("fs");
    var directoryName = '../backend/sinan/' + req.params.file;
    await fs.readFile(directoryName,"utf8",function(err,html) {
      res.send(html);
    });
  }

  async geocode(req, res) {
    var address = req.params.address; //'Rua Camé, 1040 - São Paulo - SP - Brazil';// 
    var geo = await Generic.geocode(address);
    res.json(geo);
  }
}
module.exports = new GenericController();
