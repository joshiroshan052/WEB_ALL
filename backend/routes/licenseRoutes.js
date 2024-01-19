const router = require('express').Router();
const licenseController = require('../controllers/licenseController');
const {authGuard,authGuardAdmin} = require('../middleware/authGuard');


router.post('/create_license',licenseController.createLicense)

router.get('/get_license',licenseController.getLicense)

router.post('/get_license/:id',licenseController.getSingleLicense)

router.put("/update_license/:id",authGuardAdmin,licenseController.updateLicense)

router.delete("/delete_license/:id",authGuardAdmin,licenseController.deleteLicense)

module.exports = router;