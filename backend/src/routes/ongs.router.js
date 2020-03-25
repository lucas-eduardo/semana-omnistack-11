import { Router } from 'express';

import ongsController from '../app/controllers/ongs.controller';

class OngsRouter {
  constructor() {
    this.router = Router();

    this.setRoutes();
  }

  setRoutes() {
    this.router
      .route('/ongs')
      .get(ongsController.index)
      .post(ongsController.store);
  }
}

export default new OngsRouter().router;
