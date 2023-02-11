import Router from "express"
import * as typeController from "../controllers/typeController.js"
import roleMiddleware from "../middleware/checkRole.js";
const router = new Router();

router.post('/',roleMiddleware('ADMIN'),typeController.create)
router.get('/',typeController.getAll)
router.get('/:id',typeController.getOne)
router.delete('/:id',roleMiddleware('ADMIN'), typeController.destroy)
router.put('/:id',roleMiddleware('ADMIN'), typeController.edit)
export default router;