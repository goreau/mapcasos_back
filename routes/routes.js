var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");

var AdminAuth = require("../middleware/AdminAuth");
const TerritorioController = require("../controllers/TerritorioController");
const GenericController = require("../controllers/GenericController");
const CasosController = require("../controllers/CasosController");
const RelatorioController = require("../controllers/RelatorioController");

router.get("/municipios/:id", AdminAuth, TerritorioController.getMunicipios);
router.get("/codsis/:id", AdminAuth, TerritorioController.getCodsis);
router.get("/area/:id", AdminAuth, TerritorioController.getSisawebArea);
router.get("/quarteirao/:id", AdminAuth, TerritorioController.getSisawebQuarteirao);
router.get("/territorios/:tipo/:id",  TerritorioController.getTerritorios);
router.put('/editpropmun', AdminAuth, TerritorioController.editPropMunicipio);

router.get('/', HomeController.index);
router.get('/validate', AdminAuth, HomeController.index);

router.get('/semanas/:filter', AdminAuth, CasosController.getSemanas);
router.get('/casos/:filter', AdminAuth, CasosController.getCasos);
router.get('/caso/:sinan', AdminAuth, CasosController.getCaso);
router.put('/caso', AdminAuth, CasosController.update);
router.get('/agravos', AdminAuth, CasosController.getAgravos);
router.get('/resultados', AdminAuth, CasosController.getResultados);

router.post("/relat/:id", AdminAuth, RelatorioController.getRelat);

router.get('/getfile/:file', AdminAuth, GenericController.getFile);
router.get('/geocode', AdminAuth, GenericController.geocode);

module.exports = router;