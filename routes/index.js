import Router from "express"

import  brandRouter from "./brandRouter.js"
import  productRouter from "./productRouter.js"
import  typeRouter from "./typeRouter.js"
import  userRouter from "./userRouter.js"
import  basketRouter from "./basketRouter.js"

const router = new Router();

router.use('/brand', brandRouter);
router.use('/product',productRouter);
router.use('/type',typeRouter);
router.use('/user',userRouter);
router.use('/basket',basketRouter)

export default router;