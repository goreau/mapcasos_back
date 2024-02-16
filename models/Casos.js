var knex = require("../database/connection");
const moment = require('moment');

class Casos{
    async getCasos(filtro) {
        try {
          var result = [];
          var filter = JSON.parse(filtro);

         // console.log(filter)

          var filtros = await this.createFilter(filter,'casos', true);

          //console.log(this.strFilter);

          result = await knex
            .select(["nome","id_resultado","semana","id_sinan","id_agravo"])
            .column(knex.raw("st_x(coordenadas) as latitude"))
            .column(knex.raw("st_y(coordenadas) as longitude"))
            .table("sinan")
            .whereNotNull('coordenadas')
            .limit(1000)
            .offset(0)
            .modify(function(queryBuilder) {
                filtros.forEach(el => {
                  queryBuilder.where(el.field, el.operator, el.value);
                });
              });
    
          return result;
        } catch (err) {
          console.log(err);
          return [];
        }
    }

    async getCaso(sinan) {
      try {
        var result = [];

        result = await knex
          .select(["nome","endereco","bairro","id_sinan","id_municipio"])
          .column(knex.raw("st_x(coordenadas) as latitude"))
          .column(knex.raw("st_y(coordenadas) as longitude"))
          .table("sinan")
          .where('id_sinan',sinan);
  
        return result[0];
      } catch (err) {
        console.log(err);
        return [];
      }
    }

    async update(dados) {
      try {
        var {
          id_sinan,
          nome,
          endereco,
          bairro,
          id_municipio,
          latitude,
          longitude,
        } = dados;

        var coordenadas = knex.raw(
          `ST_GeomFromText('POINT(${latitude} ${longitude})',4326)`
        );
  
        await knex("sinan")
          .where("id_sinan", id_sinan)
          .update({
            nome,
            endereco,
            bairro,
            id_municipio,
            coordenadas
          });
      } catch (err) {
        console.log(err);
      }
    }

    async getAgravos() {
        try {
            var result = [];
            result = await knex
            .select(["nome","id_agravo as id"])
            .table("agravo");
            
            return result;
        } catch (err) {
            console.log(err);
            return [];
          }
    }

    async getSemanas(filtro) {
        try {
            var result = [];

            var filter = JSON.parse(filtro);

            var filtros = await this.createFilter(filter,'casos', true);

            result = await knex
            .column(knex.raw("distinct semana as semana"))
            .table("sinan")
            .whereNotNull('coordenadas')
            .modify(function(queryBuilder) {
                filtros.forEach(el => {
                  queryBuilder.where(el.field, el.operator, el.value);
                });
              });
            
            return result;
        } catch (err) {
            console.log(err);
            return [];
          }
    }

    async getResultados() {
        try {
            var result = [];
            result = await knex
            .select(["descricao as nome","id_resultado as id"])
            .table("resultado");
            
            return result;
        } catch (err) {
            console.log(err);
            return [];
          }
    }

    async createFilter(filter, tipo, isStr) {
        var filtros = [];
        if (isStr)
          this.strFilter = [];

        if (filter.id_municipio && filter.id_municipio > 0){

          filtros.push({field: 'id_municipio', operator: '=', value: filter.id_municipio});
  
          var mun = await knex('municipio').where('id_municipio',filter.id_municipio).first();
  
          if (isStr)
            this.strFilter.push('Município: ' + mun.nome.trim());
        } 

        if (filter.agravo && filter.agravo > 0){

            filtros.push({field: 'id_agravo', operator: '=', value: filter.agravo});
    
            var agr = await knex('agravo').where('id_agravo',filter.agravo).first();
    
            if (isStr)
              this.strFilter.push('Agravo: ' + agr.nome.trim());
        } 

        if (filter.semana && filter.semana > 0){

           filtros.push({field: 'semana', operator: '=', value: filter.semana});
  
      } 

        if (filter.status){
            filtros.push({field: 'id_resultado', operator: 'IN', value: filter.status})
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

module.exports = new Casos();