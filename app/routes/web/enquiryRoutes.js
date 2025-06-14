import express from 'express';
import { enquiryInsert, enquiryList, enquirySingleRow, enquiryUpdate, enquiryDelete } from '../../controllers/web/enquiryController.js';

const enquiryRouter = express.Router();

enquiryRouter.post("/insert", enquiryInsert);
enquiryRouter.get("/view", enquiryList);
enquiryRouter.delete("/delete/:id", enquiryDelete);
enquiryRouter.get("/single/:id", enquirySingleRow);
enquiryRouter.put("/update/:id", enquiryUpdate);

export default enquiryRouter;
