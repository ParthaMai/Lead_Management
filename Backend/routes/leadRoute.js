import express from "express"

const leadRouter = express.Router();
import * as leadCtrl from "../controllers/leadController.js";



leadRouter.post("/create", leadCtrl.createLead);
leadRouter.get("/list", leadCtrl.getLeads);
leadRouter.get("/:id", leadCtrl.getLead);
leadRouter.put("/:id", leadCtrl.updateLead);
leadRouter.delete("/:id", leadCtrl.deleteLead);





export default leadRouter;