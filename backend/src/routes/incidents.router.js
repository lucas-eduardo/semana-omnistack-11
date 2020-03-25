import { Router } from 'express';

import incidentsController from '../app/controllers/incidents.controller';

class IncidentsRouter {
  constructor() {
    this.router = Router();

    this.setRoutes();
  }

  setRoutes() {
    this.router
      .route('/incidents')
      .get(incidentsController.index)
      .post(incidentsController.store);

    this.router.route('/incidents/:id').delete(incidentsController.destroy);
  }
}

export default new IncidentsRouter().router;
