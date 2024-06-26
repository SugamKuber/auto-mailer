import { Router } from 'express';

import passport from 'passport';
import Login from '../controllers/Login';

const router = Router();

router.get(
  '/google/login',
  passport.authenticate('google', {
    scope: ['profile', 'email', "https://www.googleapis.com/auth/gmail.readonly", "https://mail.google.com/"]
  })
);

router.get("/google/callback", Login.googleCallback);
router.get("/check", Login.checkValidUserTask);

export default router;
