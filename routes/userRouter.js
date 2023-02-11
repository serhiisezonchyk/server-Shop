import Router from "express"
import * as userController from "../controllers/userController.js"
import authMiddleware from "../middleware/auth.js";
const router = new Router();

router.post('/registration',userController.registration);
router.post('/login',userController.login);
router.get('/auth',authMiddleware, userController.check);

export default router;