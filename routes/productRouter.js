import Router from "express"
import * as productController from "../controllers/productController.js"
import roleMiddleware from "../middleware/checkRole.js";

const router = new Router();

router.post('/',roleMiddleware('ADMIN'),productController.create);
router.get('/',productController.getAll)
router.get('/:id',productController.getOne);
router.delete('/:id',roleMiddleware('ADMIN'), productController.destroy)
router.put('/:id',roleMiddleware('ADMIN'), productController.edit)

export default router;