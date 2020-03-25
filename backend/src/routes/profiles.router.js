import { Router } from 'express';

import profilesController from '../app/controllers/profiles.controller';

class ProfilesRouter {
  constructor() {
    this.router = Router();

    this.setRoutes();
  }

  setRoutes() {
    this.router.route('/profiles').get(profilesController.index);
  }
}

export default new ProfilesRouter().router;
