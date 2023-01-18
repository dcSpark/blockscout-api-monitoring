/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/blockscout';
const router = express.Router();

router.get('/timestampdiff', controller.getTimestamp);

export = router;
