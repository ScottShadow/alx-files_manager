import express from 'express';
import Appcontroller from '../controllers/AppController.js';

const router = express.Router();

router.get('/status', (req, res) => {
  Appcontroller.getStatus(req, res);
});
router.get('/stats', (req, res) => {
  Appcontroller.getStats(req, res);
})

export default router
