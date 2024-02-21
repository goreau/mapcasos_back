var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");

const path = require("path");
var multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'sinan/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});

var AdminAuth = require("../middleware/AdminAuth");
const TerritorioController = require("../controllers/TerritorioController");
const GenericController = require("../controllers/GenericController");
const CasosController = require("../controllers/CasosController");
const RelatorioController = require("../controllers/RelatorioController");
const PoligonoController = require("../controllers/PoligonoController");
const GraficoController = require("../controllers/GraficoController");

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

router.post("/poligono", AdminAuth, PoligonoController.create);

router.post("/relat/:id", AdminAuth, RelatorioController.getRelat);

router.post("/graficodiagrama", AdminAuth, GraficoController.getDiagrama);
router.post("/graficohisto", AdminAuth, GraficoController.getHisto);
router.post("/graficoanos", AdminAuth, GraficoController.getAnos);

router.post("/upload", [AdminAuth, upload.single('fileSinan')], GenericController.postFile);
router.get('/getfile/:file', AdminAuth, GenericController.getFile);
router.get('/geocode/:address', AdminAuth, GenericController.geocode);

module.exports = router;