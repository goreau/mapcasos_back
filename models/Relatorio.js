var knex = require("../database/connection");
const moment = require('moment');


class Relatorio{
  strFilter = [];

  async getListagem(filter){
    try{
        var filtros = await this.createFilter(filter,'captura', true);

        var result =  knex.select(['a.nome as agravo', 's.id_sinan as sinan', 's.nome', 's.endereco', 's.semana', 's.observacao'])
        .column(knex.raw("CASE id_resultado WHEN 1 THEN 'Conf' WHEN 2 THEN 'Desc' ELSE 'Inv' END as resultado"))
        .column(knex.raw("st_asText(coordenadas) as coordenadas"))
        .column(knex.raw("trim(m.nome) as municipio"))
        .table("sinan as s")
        .join('municipio as m','m.id_municipio','=','s.id_municipio')
        .join('agravo as a','a.id_agravo','=','s.id_agravo')
        .orderBy('a.nome')
        .orderBy('m.nome')
        .orderBy('s.semana')
        .modify(function(queryBuilder) {
          filtros.forEach(el => {
            queryBuilder.where(el.field, el.operator, el.value);
          });
        })

        return result;
    }catch(err){
        console.log(err);
        return [];
    }
  } 
    
  async getSemanal(filter){
      try{
        var filtros = await this.createFilter(filter,'identificacao', true);

        var parc = await knex('sinan as s')
        .column(knex.raw("distinct semana"))
        .orderBy('semana')
        .modify(function(queryBuilder) {
          filtros.forEach(el => {
            queryBuilder.where(el.field, el.operator, el.value);
          });
        });
        
        var result = await knex.column(knex.raw("trim(m.nome) as municipio"))
          .table("sinan as s")
          .join('municipio as m','m.id_municipio','=','s.id_municipio')
          .modify(function(queryBuilder) {
            parc.forEach(el => {
              queryBuilder.column(knex.raw("sum(CASE when semana='"+el.semana+"' THEN 1 ELSE 0 END) as \""+ el.semana+"\""));
            });
          })
          .modify(function(queryBuilder) {
            filtros.forEach(el => {
              queryBuilder.where(el.field, el.operator, el.value);
            });
          })
          .groupBy('m.nome');

          return result;
      }catch(err){
        console.log(err);
        return [];
      }
    }

    async createFilter(filter, tipo, isStr) {
      var filtros = [];
      if (isStr)
        this.strFilter = [];

      if (filter.id_municipio && filter.id_municipio > 0){

        filtros.push({field: 's.id_municipio', operator: '=', value: filter.id_municipio});

        var mun = await knex('municipio').where('id_municipio',filter.id_municipio).first();

        if (isStr)
          this.strFilter.push('Município: ' + mun.nome.trim());
      } 

      if (filter.agravo && filter.agravo > 0){

          filtros.push({field: 's.id_agravo', operator: '=', value: filter.agravo});
  
          var agr = await knex('agravo').where('id_agravo',filter.agravo).first();
  
          if (isStr)
            this.strFilter.push('Agravo: ' + agr.nome.trim());
      } 

      if (filter.semana && filter.semana > 0){

         filtros.push({field: 'semana', operator: '=', value: filter.semana});

    } 

      if (filter.status){
          filtros.push({field: 's.id_resultado', operator: 'IN', value: filter.status})
          for (var item of filter.status){
              var res = await knex('resultado').where('id_resultado',item).first();
         
              this.strFilter.push('Resultado: ' + res.descricao.trim());
          }
      } 

      if (filter.dt_inicio){
        
          filtros.push({field: 'dt_sintomas', operator: '>=',value: filter.dt_inicio});
          if (isStr)
          this.strFilter.push('Data Início Sintomas >= ' + this.formatDate(filter.dt_inicio));
        
      }

      if (filter.dt_final){
        
          filtros.push({field: 'dt_sintomas', operator: '<=',value: filter.dt_final});
          if (isStr)
          this.strFilter.push('Data Início Sintomas <= ' + this.formatDate(filter.dt_final));
       
      }

      return filtros;
    }

    formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    }
}

module.exports = new Relatorio();