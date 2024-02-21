var knex = require("../database/connection");
const moment = require('moment');


class Relatorio{
    strTitle = '';
    strSubt = '';

    async getDiagrama(filter){
        try{
            var mun = await knex('municipio').where('id_municipio',filter.id_municipio).first();
            this.strTitle = 'Município: ' + mun.nome.trim();

            this.strSubt = 'Série histórica entre ' + filter.anos[0] + ' e ' + filter.anos[filter.anos.length-1];

            var anos = filter.anos.join();

            var sql = "SELECT "+
                "percentile_disc(0.25) within group (order by s_1 asc) as s1_25, percentile_disc(0.50) within group (order by s_1 asc) as s1_50, percentile_disc(0.75) within group (order by s_1 asc) as s1_75,"+
                "percentile_disc(0.25) within group (order by s_2 asc) as s2_25, percentile_disc(0.50) within group (order by s_2 asc) as s2_50, percentile_disc(0.75) within group (order by s_2 asc) as s2_75,"+
                "percentile_disc(0.25) within group (order by s_3 asc) as s3_25, percentile_disc(0.50) within group (order by s_3 asc) as s3_50, percentile_disc(0.75) within group (order by s_3 asc) as s3_75,"+
                "percentile_disc(0.25) within group (order by s_4 asc) as s4_25, percentile_disc(0.50) within group (order by s_4 asc) as s4_50, percentile_disc(0.75) within group (order by s_4 asc) as s4_75,"+
                "percentile_disc(0.25) within group (order by s_5 asc) as s5_25, percentile_disc(0.50) within group (order by s_5 asc) as s5_50, percentile_disc(0.75) within group (order by s_5 asc) as s5_75,"+
                "percentile_disc(0.25) within group (order by s_6 asc) as s6_25, percentile_disc(0.50) within group (order by s_6 asc) as s6_50, percentile_disc(0.75) within group (order by s_6 asc) as s6_75,"+
                "percentile_disc(0.25) within group (order by s_7 asc) as s7_25, percentile_disc(0.50) within group (order by s_7 asc) as s7_50, percentile_disc(0.75) within group (order by s_7 asc) as s7_75,"+
                "percentile_disc(0.25) within group (order by s_8 asc) as s8_25, percentile_disc(0.50) within group (order by s_8 asc) as s8_50, percentile_disc(0.75) within group (order by s_8 asc) as s8_75,"+
                "percentile_disc(0.25) within group (order by s_9 asc) as s9_25, percentile_disc(0.50) within group (order by s_9 asc) as s9_50, percentile_disc(0.75) within group (order by s_9 asc) as s9_75,"+
                "percentile_disc(0.25) within group (order by s_10 asc) as s10_25, percentile_disc(0.50) within group (order by s_10 asc) as s10_50, percentile_disc(0.75) within group (order by s_10 asc) as s10_75,"+
                "percentile_disc(0.25) within group (order by s_11 asc) as s11_25, percentile_disc(0.50) within group (order by s_11 asc) as s11_50, percentile_disc(0.75) within group (order by s_11 asc) as s11_75,"+
                "percentile_disc(0.25) within group (order by s_12 asc) as s12_25, percentile_disc(0.50) within group (order by s_12 asc) as s12_50, percentile_disc(0.75) within group (order by s_12 asc) as s12_75,"+
                "percentile_disc(0.25) within group (order by s_13 asc) as s13_25, percentile_disc(0.50) within group (order by s_13 asc) as s13_50, percentile_disc(0.75) within group (order by s_13 asc) as s13_75,"+
                "percentile_disc(0.25) within group (order by s_14 asc) as s14_25, percentile_disc(0.50) within group (order by s_14 asc) as s14_50, percentile_disc(0.75) within group (order by s_14 asc) as s14_75,"+
                "percentile_disc(0.25) within group (order by s_15 asc) as s15_25, percentile_disc(0.50) within group (order by s_15 asc) as s15_50, percentile_disc(0.75) within group (order by s_15 asc) as s15_75,"+
                "percentile_disc(0.25) within group (order by s_16 asc) as s16_25, percentile_disc(0.50) within group (order by s_16 asc) as s16_50, percentile_disc(0.75) within group (order by s_16 asc) as s16_75,"+
                "percentile_disc(0.25) within group (order by s_17 asc) as s17_25, percentile_disc(0.50) within group (order by s_17 asc) as s17_50, percentile_disc(0.75) within group (order by s_17 asc) as s17_75,"+
                "percentile_disc(0.25) within group (order by s_18 asc) as s18_25, percentile_disc(0.50) within group (order by s_18 asc) as s18_50, percentile_disc(0.75) within group (order by s_18 asc) as s18_75,"+
                "percentile_disc(0.25) within group (order by s_19 asc) as s19_25, percentile_disc(0.50) within group (order by s_19 asc) as s19_50, percentile_disc(0.75) within group (order by s_19 asc) as s19_75,"+
                "percentile_disc(0.25) within group (order by s_20 asc) as s20_25, percentile_disc(0.50) within group (order by s_20 asc) as s20_50, percentile_disc(0.75) within group (order by s_20 asc) as s20_75,"+
                "percentile_disc(0.25) within group (order by s_21 asc) as s21_25, percentile_disc(0.50) within group (order by s_21 asc) as s21_50, percentile_disc(0.75) within group (order by s_21 asc) as s21_75,"+
                "percentile_disc(0.25) within group (order by s_22 asc) as s22_25, percentile_disc(0.50) within group (order by s_22 asc) as s22_50, percentile_disc(0.75) within group (order by s_22 asc) as s22_75,"+
                "percentile_disc(0.25) within group (order by s_23 asc) as s23_25, percentile_disc(0.50) within group (order by s_23 asc) as s23_50, percentile_disc(0.75) within group (order by s_23 asc) as s23_75,"+
                "percentile_disc(0.25) within group (order by s_24 asc) as s24_25, percentile_disc(0.50) within group (order by s_24 asc) as s24_50, percentile_disc(0.75) within group (order by s_24 asc) as s24_75,"+
                "percentile_disc(0.25) within group (order by s_25 asc) as s25_25, percentile_disc(0.50) within group (order by s_25 asc) as s25_50, percentile_disc(0.75) within group (order by s_25 asc) as s25_75,"+
                "percentile_disc(0.25) within group (order by s_26 asc) as s26_25, percentile_disc(0.50) within group (order by s_26 asc) as s26_50, percentile_disc(0.75) within group (order by s_26 asc) as s26_75,"+
                "percentile_disc(0.25) within group (order by s_27 asc) as s27_25, percentile_disc(0.50) within group (order by s_27 asc) as s27_50, percentile_disc(0.75) within group (order by s_27 asc) as s27_75,"+
                "percentile_disc(0.25) within group (order by s_28 asc) as s28_25, percentile_disc(0.50) within group (order by s_28 asc) as s28_50, percentile_disc(0.75) within group (order by s_28 asc) as s28_75,"+
                "percentile_disc(0.25) within group (order by s_29 asc) as s29_25, percentile_disc(0.50) within group (order by s_29 asc) as s29_50, percentile_disc(0.75) within group (order by s_29 asc) as s29_75,"+
                "percentile_disc(0.25) within group (order by s_30 asc) as s30_25, percentile_disc(0.50) within group (order by s_30 asc) as s30_50, percentile_disc(0.75) within group (order by s_30 asc) as s30_75,"+
                "percentile_disc(0.25) within group (order by s_31 asc) as s31_25, percentile_disc(0.50) within group (order by s_31 asc) as s31_50, percentile_disc(0.75) within group (order by s_31 asc) as s31_75,"+
                "percentile_disc(0.25) within group (order by s_32 asc) as s32_25, percentile_disc(0.50) within group (order by s_32 asc) as s32_50, percentile_disc(0.75) within group (order by s_32 asc) as s32_75,"+
                "percentile_disc(0.25) within group (order by s_33 asc) as s33_25, percentile_disc(0.50) within group (order by s_33 asc) as s33_50, percentile_disc(0.75) within group (order by s_33 asc) as s33_75,"+
                "percentile_disc(0.25) within group (order by s_34 asc) as s34_25, percentile_disc(0.50) within group (order by s_34 asc) as s34_50, percentile_disc(0.75) within group (order by s_34 asc) as s34_75,"+
                "percentile_disc(0.25) within group (order by s_35 asc) as s35_25, percentile_disc(0.50) within group (order by s_35 asc) as s35_50, percentile_disc(0.75) within group (order by s_35 asc) as s35_75,"+
                "percentile_disc(0.25) within group (order by s_36 asc) as s36_25, percentile_disc(0.50) within group (order by s_36 asc) as s36_50, percentile_disc(0.75) within group (order by s_36 asc) as s36_75,"+
                "percentile_disc(0.25) within group (order by s_37 asc) as s37_25, percentile_disc(0.50) within group (order by s_37 asc) as s37_50, percentile_disc(0.75) within group (order by s_37 asc) as s37_75,"+
                "percentile_disc(0.25) within group (order by s_38 asc) as s38_25, percentile_disc(0.50) within group (order by s_38 asc) as s38_50, percentile_disc(0.75) within group (order by s_38 asc) as s38_75,"+
                "percentile_disc(0.25) within group (order by s_39 asc) as s39_25, percentile_disc(0.50) within group (order by s_39 asc) as s39_50, percentile_disc(0.75) within group (order by s_39 asc) as s39_75,"+
                "percentile_disc(0.25) within group (order by s_40 asc) as s40_25, percentile_disc(0.50) within group (order by s_40 asc) as s40_50, percentile_disc(0.75) within group (order by s_40 asc) as s40_75,"+
                "percentile_disc(0.25) within group (order by s_41 asc) as s41_25, percentile_disc(0.50) within group (order by s_41 asc) as s41_50, percentile_disc(0.75) within group (order by s_41 asc) as s41_75,"+
                "percentile_disc(0.25) within group (order by s_42 asc) as s42_25, percentile_disc(0.50) within group (order by s_42 asc) as s42_50, percentile_disc(0.75) within group (order by s_42 asc) as s42_75,"+
                "percentile_disc(0.25) within group (order by s_43 asc) as s43_25, percentile_disc(0.50) within group (order by s_43 asc) as s43_50, percentile_disc(0.75) within group (order by s_43 asc) as s43_75,"+
                "percentile_disc(0.25) within group (order by s_44 asc) as s44_25, percentile_disc(0.50) within group (order by s_44 asc) as s44_50, percentile_disc(0.75) within group (order by s_44 asc) as s44_75,"+
                "percentile_disc(0.25) within group (order by s_45 asc) as s45_25, percentile_disc(0.50) within group (order by s_45 asc) as s45_50, percentile_disc(0.75) within group (order by s_45 asc) as s45_75,"+
                "percentile_disc(0.25) within group (order by s_46 asc) as s46_25, percentile_disc(0.50) within group (order by s_46 asc) as s46_50, percentile_disc(0.75) within group (order by s_46 asc) as s46_75,"+
                "percentile_disc(0.25) within group (order by s_47 asc) as s47_25, percentile_disc(0.50) within group (order by s_47 asc) as s47_50, percentile_disc(0.75) within group (order by s_47 asc) as s47_75,"+
                "percentile_disc(0.25) within group (order by s_48 asc) as s48_25, percentile_disc(0.50) within group (order by s_48 asc) as s48_50, percentile_disc(0.75) within group (order by s_48 asc) as s48_75,"+
                "percentile_disc(0.25) within group (order by s_49 asc) as s49_25, percentile_disc(0.50) within group (order by s_49 asc) as s49_50, percentile_disc(0.75) within group (order by s_49 asc) as s49_75,"+
                "percentile_disc(0.25) within group (order by s_50 asc) as s50_25, percentile_disc(0.50) within group (order by s_50 asc) as s50_50, percentile_disc(0.75) within group (order by s_50 asc) as s50_75,"+
                "percentile_disc(0.25) within group (order by s_51 asc) as s51_25, percentile_disc(0.50) within group (order by s_51 asc) as s51_50, percentile_disc(0.75) within group (order by s_51 asc) as s51_75,"+
                "percentile_disc(0.25) within group (order by s_52 asc) as s52_25, percentile_disc(0.50) within group (order by s_52 asc) as s52_50, percentile_disc(0.75) within group (order by s_52 asc) as s52_75,"+
                "percentile_disc(0.25) within group (order by s_53 asc) as s53_25, percentile_disc(0.50) within group (order by s_53 asc) as s53_50, percentile_disc(0.75) within group (order by s_53 asc) as s53_75"+
                " FROM diagrama where id_municipio="+filter.id_municipio+" and ano IN("+anos+")";

            var history =  await knex.raw(sql);

            var atual = await this.getAtual(filter);

            var result = this.formataDiagrama(history.rows, atual);

            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    } 

    async obj2arr(dados){
        var result = [];
        
        let row = dados[0];
        for (const [key, value] of Object.entries(row)) {
            result[key] = value; 
        }

        return result;
    }

    async formataDiagrama(old, curr){
        var result = [['Semana','Lim Inferior','Mediana','Lim Superior','Atual']];
        
        old = await this.obj2arr(old);

        for(let i = 1; i < 53; i++) {
            let parc = [];
            let atual = curr.filter(line => line.semana == 's'+i); 
            let val = typeof atual[0] != 'undefined' ? atual[0].casos : 0;
            parc = [i, old['s'+i+'_25'], old['s'+i+'_50'], old['s'+i+'_75'], val];
            result.push(parc);
        }
        return result;
    }

    async getAtual(filter){
        try{
    
            var ano = new Date().getFullYear();
            this.strTitle += ', Ano: '+ ano;
            var result = await knex
            .column(knex.raw("CONCAT('s',TRIM(LEADING '0' FROM SUBSTR(semana,5,2))) as semana"))
            .column(knex.raw("COUNT(*)*ret_pop("+filter.id_municipio+") as casos"))
            .table("sinan as s")
            .where('id_municipio',filter.id_municipio)
            .where('id_agravo',1)
            .whereRaw('EXTRACT(year FROM dt_sintomas)='+ano)
            .whereIn('criterio',[1,3])
            .groupBy('s.semana');
    
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async getAnos(filter){
        try{
            var result =  knex
            .column(knex.raw("DISTINCT ano, s_tt"))
            .table("diagrama")
            .where('id_municipio',filter.id_municipio)
            .where('ano','>=',filter.anoini)
            .where('ano','<=',filter.anofim)
            .orderBy('ano');
    
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }
    
    async getHisto(filter){
        try{

            var mun = await knex('municipio').where('id_municipio',filter.id_municipio).first();
            this.strTitle += 'Município: ' + mun.nome.trim() + ', Ano: '+ filter.ano;

            var filtMun = filter.id_municipio < 999 ? "id_municipio=" + filter.id_municipio : "1=1";
            var ant = filter.ano - 1 + "49";
            var exibe = "semana::int>="+ filter.ano +"01 and semana::int<="+filter.ano+"53";

            var sql = "SELECT substring(semana,5) as semana, cmovel*ret_pop(" + filter.id_municipio + ") as mmovel, cmovel*ret_pop(" + filter.id_municipio + ")*ret_inc(" + filter.id_municipio + ") as inc from("+
                            "SELECT semana, AVG(casos) OVER(ORDER BY semana ROWS BETWEEN 4 PRECEDING AND CURRENT ROW) AS cmovel "+
                            "FROM (select semana, count(*) as casos from sinan where " + filtMun +
                            " and semana::int>=" + ant +" and id_agravo=1 and criterio=any('{1,3}') group by semana) x) z where " + exibe;
            
            var res = await knex.raw(sql);
            var result = [];

            if (filter.faixas){
                result = this.formataDados(res.rows);
            } else {
                result = this.organizeData(res.rows);
            }
           
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async organizeData(data){
        var result = [];
        
        result.push(['Semana','Incidência']);

        for(let i = 0; i < data.length; i++) {
            let row = data[i];
            result.push([row['semana'],row['mmovel']]);
        }

        return result;
    }

    async formataDados(dados){
        var result = [['Semana', 'Incidência', { role: 'style' } ]];

        for(let i = 0; i < dados.length; i++) {
            let row = dados[i];
            let cor = row.inc >= 100 ? 'red': (row.inc >= 20 ? 'yellow' : (row.inc >= 0) ? '#A9F5A9' : 'white');
            result.push([row['semana'], row['mmovel'], 'color:' + cor +'; stroke-color: #000000; stroke-width: 0.5;']);
        };
        return result;
        
    }

    async filterMun(mun){
        if (filter.id_municipio = 999){

        } else {
            filtros.push({field: 's.id_municipio', operator: '=', value: filter.id_municipio});

            var mun = await knex('municipio').where('id_municipio',filter.id_municipio).first();

            this.strTitle += 'Município: ' + mun.nome.trim() + ', ';
        } 
    }

    async createFilterLixo(filter) {
        var filtros = [{field: 's.id_agravo', operator: '=', value: 1}];
        

        if (filter.id_municipio && filter.id_municipio > 0){

            if (filter.id_municipio = 999){

            } else {
                filtros.push({field: 's.id_municipio', operator: '=', value: filter.id_municipio});

                var mun = await knex('municipio').where('id_municipio',filter.id_municipio).first();

                this.strTitle += 'Município: ' + mun.nome.trim() + ', ';
            } 
        } 

        if (filter.ano && filter.ano > 0){

            filtros.push({field: 's.semana::int', operator: '>=', value: filter.ano+'01'});
    
    
            this.strTitle += 'Ano: ' + filter.ano;
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