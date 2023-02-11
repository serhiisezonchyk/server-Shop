import Router from "express"
import * as basketProductController from "../controllers/basketProductController.js"

const router = new Router();

router.post('/',basketProductController.create);
router.get('/',basketProductController.getAll);
router.get('/:id',basketProductController.getOne);
router.delete('/:id',basketProductController.destroy);

export default router;