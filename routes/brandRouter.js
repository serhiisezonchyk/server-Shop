import Router from "express"
import * as brandController from "../controllers/brandController.js"
import roleMiddleware from "../middleware/checkRole.js";

const router = new Router();

router.post('/',roleMiddleware('ADMIN'), brandController.create);
router.get('/',brandController.getAll);
router.get('/:id',brandController.getOne);
router.delete('/:id',roleMiddleware('ADMIN'), brandController.destroy);
router.put('/:id',roleMiddleware('ADMIN'), brandController.edit);
export default router;