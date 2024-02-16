var Generic = require("../models/Generic");

class GenericController {
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
    var address = 'Rua Camé, 1040 São Paulo';// req.params.address;
    
    var geo = await Generic.geocode(address);
    res.json(geo);
  }
}
module.exports = new GenericController();
