const NodeGeocoder = require("node-geocoder");
var knex = require("../database/connection");
const { DBFFile } = require("dbffile");

class Generic {
  async processFile(row) {
    try {
      var fields = [
        "nu_notific",
        "tp_not",
        "id_agravo",
        "dt_notific",
        "sem_not",
        "nu_ano",
        "sg_uf_not",
        "id_municip",
        "id_regiona",
        "id_unidade",
        "dt_sin_pri",
        "sem_pri",
        "nm_pacient",
        "dt_nasc",
        "fonetica_n",
        "soundex",
        "nu_idade_n",
        "cs_sexo",
        "cs_gestant",
        "cs_raca",
        "cs_escol_n",
        "id_cns_sus",
        "nm_mae_pac",
        "sg_uf",
        "id_mn_resi",
        "id_rg_resi",
        "id_distrit",
        "id_bairro",
        "nm_bairro",
        "id_logrado",
        "nm_logrado",
        "nu_numero",
        "nm_complem",
        "id_geo1",
        "id_geo2",
        "nm_referen",
        "nu_cep",
        "nu_ddd_tel",
        "nu_telefon",
        "cs_zona",
        "id_pais",
        "dt_invest",
        "id_ocupa_n",
        "febre",
        "mialgia",
        "cefaleia",
        "exantema",
        "vomito",
        "nausea",
        "dor_costas",
        "conjuntvit",
        "artrite",
        "artralgia",
        "petequia_n",
        "leucopenia",
        "laco",
        "dor_retro",
        "diabetes",
        "hematolog",
        "hepatopat",
        "renal",
        "hipertensa",
        "acido_pept",
        "auto_imune",
        "dt_chik_s1",
        "dt_chik_s2",
        "dt_prnt",
        "res_chiks1",
        "res_chiks2",
        "resul_prnt",
        "dt_soro",
        "resul_soro",
        "dt_ns1",
        "resul_ns1",
        "dt_viral",
        "resul_vi_n",
        "dt_pcr",
        "resul_pcr_",
        "sorotipo",
        "histopa_n",
        "imunoh_n",
        "hospitaliz",
        "dt_interna",
        "uf",
        "municipio",
        "hospital",
        "ddd_hosp",
        "tel_hosp",
        "tpautocto",
        "coufinf",
        "copaisinf",
        "comuninf",
        "codisinf",
        "co_bainf",
        "nobaiinf",
        "classi_fin",
        "criterio",
        "doenca_tra",
        "clinc_chik",
        "evolucao",
        "dt_obito",
        "dt_encerra",
        "alrm_hipot",
        "alrm_plaq",
        "alrm_vom",
        "alrm_sang",
        "alrm_hemat",
        "alrm_abdom",
        "alrm_letar",
        "alrm_hepat",
        "alrm_liq",
        "dt_alrm",
        "grav_pulso",
        "grav_conv",
        "grav_ench",
        "grav_insuf",
        "grav_taqui",
        "grav_extre",
        "grav_hipot",
        "grav_hemat",
        "grav_melen",
        "grav_metro",
        "grav_sang",
        "grav_ast",
        "grav_mioc",
        "grav_consc",
        "grav_orgao",
        "dt_grav",
        "mani_hemor",
        "epistaxe",
        "gengivo",
        "metro",
        "petequias",
        "hematura",
        "sangram",
        "laco_n",
        "plasmatico",
        "evidencia",
        "plaq_menor",
        "con_fhd",
        "complica",
        "nu_lote_i",
        "ds_obs",
        "tp_sistema",
        "nduplic_n",
        "dt_digita",
        "dt_transus",
        "dt_transdm",
        "dt_transsm",
        "dt_transrm",
        "dt_transrs",
        "dt_transse",
        "nu_lote_v",
        "nu_lote_h",
        "cs_flxret",
        "flxrecebi",
        "ident_micr",
        "migrado_w",
      ];

      var values = [
        "NU_NOTIFIC",
        "TP_NOT",
        "ID_AGRAVO",
        "DT_NOTIFIC",
        "SEM_NOT",
        "NU_ANO",
        "SG_UF_NOT",
        "ID_MUNICIP",
        "ID_REGIONA",
        "ID_UNIDADE",
        "DT_SIN_PRI",
        "SEM_PRI",
        "NM_PACIENT",
        "DT_NASC",
        "FONETICA_N",
        "SOUNDEX",
        "NU_IDADE_N",
        "CS_SEXO",
        "CS_GESTANT",
        "CS_RACA",
        "CS_ESCOL_N",
        "ID_CNS_SUS",
        "NM_MAE_PAC",
        "SG_UF",
        "ID_MN_RESI",
        "ID_RG_RESI",
        "ID_DISTRIT",
        "ID_BAIRRO",
        "NM_BAIRRO",
        "ID_LOGRADO",
        "NM_LOGRADO",
        "NU_NUMERO",
        "NM_COMPLEM",
        "ID_GEO1",
        "ID_GEO2",
        "NM_REFEREN",
        "NU_CEP",
        "NU_DDD_TEL",
        "NU_TELEFON",
        "CS_ZONA",
        "ID_PAIS",
        "DT_INVEST",
        "ID_OCUPA_N",
        "FEBRE",
        "MIALGIA",
        "CEFALEIA",
        "EXANTEMA",
        "VOMITO",
        "NAUSEA",
        "DOR_COSTAS",
        "CONJUNTVIT",
        "ARTRITE",
        "ARTRALGIA",
        "PETEQUIA_N",
        "LEUCOPENIA",
        "LACO",
        "DOR_RETRO",
        "DIABETES",
        "HEMATOLOG",
        "HEPATOPAT",
        "RENAL",
        "HIPERTENSA",
        "ACIDO_PEPT",
        "AUTO_IMUNE",
        "DT_CHIK_S1",
        "DT_CHIK_S2",
        "DT_PRNT",
        "RES_CHIKS1",
        "RES_CHIKS2",
        "RESUL_PRNT",
        "DT_SORO",
        "RESUL_SORO",
        "DT_NS1",
        "RESUL_NS1",
        "DT_VIRAL",
        "RESUL_VI_N",
        "DT_PCR",
        "RESUL_PCR_",
        "SOROTIPO",
        "HISTOPA_N",
        "IMUNOH_N",
        "HOSPITALIZ",
        "DT_INTERNA",
        "UF",
        "MUNICIPIO",
        "HOSPITAL",
        "DDD_HOSP",
        "TEL_HOSP",
        "TPAUTOCTO",
        "COUFINF",
        "COPAISINF",
        "COMUNINF",
        "CODISINF",
        "CO_BAINF",
        "NOBAIINF",
        "CLASSI_FIN",
        "CRITERIO",
        "DOENCA_TRA",
        "CLINC_CHIK",
        "EVOLUCAO",
        "DT_OBITO",
        "DT_ENCERRA",
        "ALRM_HIPOT",
        "ALRM_PLAQ",
        "ALRM_VOM",
        "ALRM_SANG",
        "ALRM_HEMAT",
        "ALRM_ABDOM",
        "ALRM_LETAR",
        "ALRM_HEPAT",
        "ALRM_LIQ",
        "DT_ALRM",
        "GRAV_PULSO",
        "GRAV_CONV",
        "GRAV_ENCH",
        "GRAV_INSUF",
        "GRAV_TAQUI",
        "GRAV_EXTRE",
        "GRAV_HIPOT",
        "GRAV_HEMAT",
        "GRAV_MELEN",
        "GRAV_METRO",
        "GRAV_SANG",
        "GRAV_AST",
        "GRAV_MIOC",
        "GRAV_CONSC",
        "GRAV_ORGAO",
        "DT_GRAV",
        "MANI_HEMOR",
        "EPISTAXE",
        "GENGIVO",
        "METRO",
        "PETEQUIAS",
        "HEMATURA",
        "SANGRAM",
        "LACO_N",
        "PLASMATICO",
        "EVIDENCIA",
        "PLAQ_MENOR",
        "CON_FHD",
        "COMPLICA",
        "NU_LOTE_I",
        "DS_OBS",
        "TP_SISTEMA",
        "NDUPLIC_N",
        "DT_DIGITA",
        "DT_TRANSUS",
        "DT_TRANSDM",
        "DT_TRANSSM",
        "DT_TRANSRM",
        "DT_TRANSRS",
        "DT_TRANSSE",
        "NU_LOTE_V",
        "NU_LOTE_H",
        "CS_FLXRET",
        "FLXRECEBI",
        "IDENT_MICR",
        "MIGRADO_W",
      ];

      //     for (let row of data) {
      var obj = {};
      for (let i = 0; i < fields.length; i++) {
        let pc = this.trataData(row[values[i]]);
        if (pc != "") {
          obj[fields[i]] = pc;
        }
      }

      var res = await knex.insert(obj).table("recebidos"); //.toSQL().toNative();
      // }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async insertCasos(path) {
    try {
      let dbf = await DBFFile.open(path);

      //console.log(`DBF file contains ${dbf.recordCount} records.`);
      //console.log(`Field names: ${dbf.fields.map(f => f.name + '-' + f.type).join(', ')}`);

      let agravo = ["A90"];
      for await (let row of dbf) {
        var prev = await this.uniqueSinan("123456");

        if (prev != undefined) {
          continue;
        }

        let mun = await this.getMun(row.ID_MUNICIP);
        if (mun == undefined) {
          this.processFile(row);
          continue;
        }
        let res = await this.getMun(row.ID_MN_RESI);
        if (res == undefined) {
          this.processFile(row);
          continue;
        }
        let nomemun = mun.nome.trim();
        nomemun = nomemun.replace("D`", "d'");
        let strgeo = row.NM_LOGRADO + ", " + row.NU_NUMERO + " - " + nomemun;

        await this.sleep(1000);
        var retGeo = await this.geocode(strgeo);

        var obs = "não codificada a geolocalização";
        var coordenadas = null;
        if (retGeo.length > 0) {
          coordenadas = knex.raw(
            `ST_GeomFromText('POINT(${retGeo[0].longitude} ${retGeo[0].latitude})',4326)`
          );
          obs = "geo codificada";
        }

        var obj = {
          id_sinan: row.NU_NOTIFIC,
          nome: row.NM_PACIENT,
          sexo: row.CS_SEXO,
          endereco: row.NM_LOGRADO + ", " + row.NU_NUMERO,
          bairro: row.NM_BAIRRO,
          id_municipio: mun.id,
          id_resultado:
            row.CLASSI_FIN == "5" ? 3 : row.CLASSI_FIN >= 10 ? 1 : 2,
          semana: row.SEM_NOT,
          lote: row.NU_LOTE_I,
          dt_sintomas: this.trataData(row.DT_SIN_PRI),
          id_agravo: row.ID_AGRAVO == "A90" ? 1 : 3,
          dt_notific: this.trataData(row.DT_NOTIFIC),
          //  'tipo_geo': ,
          //   'status': ,
          dt_invest: this.trataData(row.DT_INVEST),
          dt_encerra: this.trataData(row.DT_ENCERRA),
          id_mun_resid: res.id,
          id_distrito: row.ID_DISTRIT,
          criterio: row.CRITERIO,
          observacao: obs,
          class_orig: row.CLASSI_FIN,
          coordenadas,
        };

        try {
          var rest = await knex.insert(obj).table("sinan"); //.toSQL().toNative();
        } catch (err) {
          this.processFile(row);
          // console.log(obj);
          //  console.log(err);
          break;
        }
      }
      console.log("Recebimento finalizado");
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async uniqueSinan(sinan) {
    try {
      var result = await knex
        .select(["id_sinan as id", "nome"])
        .table("sinan")
        .where("id_sinan", sinan)
        .first();

      return result;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async insertCasosCsvSemUso(data) {
    try {
      let agravo = ["A90"];
      for (let row of data) {
        let mun = await this.getMun(row.ID_MUNICIP);
        if (mun == undefined) {
          this.processFile(row);
          continue;
        }
        let res = await this.getMun(row.ID_MN_RESI);
        if (res == undefined) {
          this.processFile(row);
          continue;
        }
        let nomemun = mun.nome.trim();
        nomemun = nomemun.replace("D`", "d'");
        let strgeo =
          row.NM_LOGRADO +
          ", " +
          row.NU_NUMERO +
          " - " +
          row.NM_BAIRRO +
          " - " +
          nomemun;

        await this.sleep(1000);
        var retGeo = await this.geocode(strgeo);

        var obs = "não codificada a geolocalização";
        var coordenadas = null;
        if (retGeo.length > 0) {
          coordenadas = knex.raw(
            `ST_GeomFromText('POINT(${retGeo[0].longitude} ${retGeo[0].latitude})',4326)`
          );
          obs = "geo codificada";
        }

        var obj = {
          id_sinan: row.NU_NOTIFIC,
          nome: row.NM_PACIENT,
          sexo: row.CS_SEXO,
          endereco: row.NM_LOGRADO + ", " + row.NU_NUMERO,
          bairro: row.NM_BAIRRO,
          id_municipio: mun.id,
          id_resultado:
            row.CLASSI_FIN == "5" ? 3 : row.CLASSI_FIN >= 10 ? 1 : 2,
          semana: row.SEM_NOT,
          lote: row.NU_LOTE_I,
          dt_sintomas: this.trataData(row.DT_SIN_PRI),
          id_agravo: agravo.indexOf(row.ID_AGRAVO),
          dt_notific: this.trataData(row.DT_NOTIFIC),
          //  'tipo_geo': ,
          //   'status': ,
          dt_invest: this.trataData(row.DT_INVEST),
          dt_encerra: this.trataData(row.DT_ENCERRA),
          id_mun_resid: res.id,
          id_distrito: row.ID_DISTRIT,
          criterio: row.CRITERIO,
          observacao: obs,
          class_orig: row.CLASSI_FIN,
          coordenadas,
        };

        try {
          var rest = await knex.insert(obj).table("sinan"); //.toSQL().toNative();
        } catch (err) {
          this.processFile(row);
          // console.log(obj);
          //  console.log(err);
          break;
        }
      }
      console.log("Recebimento finalizado");
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getMun(codigo) {
    try {
      var result = await knex
        .select(["id_municipio as id", "nome"])
        .table("municipio")
        .whereRaw("substring(codigo,1,6) = '" + codigo + "'");

      var ret = result[0];
      return ret;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  trataData(field) {
    if (field == "" || field == null) {
      return knex.raw("CAST(null AS date)");
    }

    if (field.toString().indexOf("/") >= 0) {
      return field.split("/").reverse().join("-");
    } else {
      return field;
    }
  }

  async geocode(address) {
    var result = {};
    const options = {
      provider: "locationiq",
      apiKey: process.env.GEOCODE_API,
      formatter: null,
    };

    const geocoder = NodeGeocoder(options);

    try {
      const geo = await geocoder.geocode(address);
      result = geo;
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = new Generic();
