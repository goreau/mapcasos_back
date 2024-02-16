const TerritorioController = require("../controllers/TerritorioController");
var knex = require("../database/connection");

class Territorio{

    async getMunicipiosNo(id){
        try{
            var currUser = 1;//await User.getUser(id);
            var result = [];
            switch (currUser.role) {
                case 1:
                    result = await knex.select(["id_municipio","nome"]).table("municipio").orderBy('nome', 'asc');
                    break;
                case 2:
                    //TODO: pegar a regional do usuario  e apliicar o filtro
                    result = await knex.select(["id_municipio","nome"]).table("municipio").orderBy('nome', 'asc');
                    break;
                default:
                    result = await knex.select(["id_municipio","nome"]).table("municipio").where({id_municipio: currUser.id_municipio}).orderBy('nome', 'asc');
                    break;
            }
            
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async getCodsis(id){
        try{
            var currUser = 1;// await User.getUser(id);
            var result = [];
            switch (currUser.role) {
                case 1:
                    result = await knex.select(["id_municipio"])
                    .column(knex.raw("concat(to_char(id_municipio, '000'), ' - ', nome) as nome"))
                    .table("municipio").orderBy('id_municipio', 'asc');
                    break;
                case 2:
                    var terr = await this.getTerritorio(currUser.id_municipio);
                    var id_regional =  terr.id_regional;

                    result = await knex.select(["id_municipio"])
                    .column(knex.raw("concat(to_char(id_municipio, '000'), ' - ', nome) as nome"))
                    .table("municipio as m")
                    .join("territorio as t", "m.id_regional", '=' , "t.id_territorio")
                    .where({'t.id_territorio': id_regional})
                    .orderBy('m.id_municipio', 'asc');
                    break;
                default:
                    result = await knex.select(["id_municipio"])
                    .column(knex.raw("concat(to_char(id_municipio, '000'), ' - ', nome) as nome"))
                    .table("municipio").where({id_municipio: currUser.id_municipio}).orderBy('id_municipio', 'asc');
                    break;
            }
            
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async getMunicipios(id){
        try{
            var currUser = await User.getUser(id);
            var result = [];
            switch (currUser.role) {
                case 1:
                    result = await knex.select(["id_municipio","nome"]).table("municipio").orderBy('nome', 'asc');
                    break;
                case 2:
                    var terr = await this.getTerritorio(currUser.id_municipio);
                    var id_regional =  terr.id_regional;

                    result = await knex.select(["id_municipio","m.nome"])
                    .table("municipio as m")
                    .join("territorio as t", "m.id_regional", '=' , "t.id_territorio")
                    .where({'t.id_territorio': id_regional})
                    .orderBy('m.nome', 'asc');
                    break;
                default:
                    result = await knex.select(["id_municipio","nome"]).table("municipio").where({id_municipio: currUser.id_municipio}).orderBy('nome', 'asc');
                    break;
            }
            
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async getMobMunicipios(){
        try{
            var result = [];
            
            result = await knex.select(["id_municipio as id","nome"]).table("municipio").orderBy('nome', 'asc');
                    
            var ret = {'dados': result};
            return ret;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async editPropMunicipio(dados){
        try {
            var {
                tipo,
                local,
                id_prop,
            } = dados;
            console.log(dados);
      
            await knex("municipio")
              .update({
                id_prop
              })
              .modify(function(queryBuilder) {
                switch (tipo) {
                    case '2':
                        queryBuilder.where({id_colegiado: local});
                        break;
                    case '3':
                        queryBuilder.where({id_drs: local});
                        break;
                    case '4':
                        queryBuilder.where({id_regional: local});
                        break;
                    default:
                        queryBuilder.where({id_municipio: local});
                        break;
                }             
              });
          } catch (err) {
            console.log(err);
          }
    }
    

    async getAllCadastro(mun){
        try{
            var result = [];
            
            var res = await knex.select(["id_municipio as id","nome", "codigo", "id_prop"]).table("municipio").where({id_municipio: mun});

            result.push({'municipio': res});

            res = await knex.select(["id_localidade as id", "id_municipio","nome", "codigo"]).table("localidade").where({id_municipio: mun});

            result.push({'localidade': res});

            res = await knex.select(["id_codend as id", "id_municipio", "logradouro", "numero", "complemento", "id_area", "id_quarteirao", "codigo", "fant_area", "fant_quart"]).table("codend").where({id_municipio: mun});

            result.push({'codend': res});

            try {

                var url = process.env.SISAWEB_API;
                
                var response = await fetch(url + `area.php?id=${mun}`);
            
                res = await response.json();

                result.push({'area': res.area});
             

                var response = await fetch(url + `quarteirao_mun.php?id=${mun}`);
            
                res = await response.json();
            

                result.push({'quarteirao': res.quarteirao});
            
            } catch (error) {
                console.log(error);
                result.push({'area': []});
                result.push({'quarteirao': []});
            } 

                  
            var ret = {'dados': result};

            return ret;
        }catch(err){
            console.log(err);
            return [];
        }
    }
    
    async getTerritorio(id){
        try{
            var result =  await knex.select(["id_municipio", "t1.id_territorio as id_regional", "t1.nome as regional", "t2.id_territorio as id_drs", "t2.nome as drs", "t3.id_territorio as id_colegiado", "t3.nome as colegiado"])
            .table("municipio as m")
            .join("territorio as t1", "m.id_regional", '=', "t1.id_territorio")
            .join("territorio as t2", "m.id_drs", '=', "t2.id_territorio") 
            .join("territorio as t3", "m.id_colegiado", '=', "t3.id_territorio")
            .where({'m.id_municipio': id}); 

            return result[0];
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async getTerritorios(tipo, id){
        try{
            if (tipo == 9){
                var result =  await knex.select(["t.id_municipio as id", "t.nome"])
                .table("municipio as t");              
            } else {
                var result =  await knex.select(["t.id_territorio as id", "t.nome"])
                .table("territorio as t")
                .where('tipo', tipo); 
            }
            
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }
}

module.exports = new Territorio();