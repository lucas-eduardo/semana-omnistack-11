import 'dotenv';
import request from 'supertest';

import app from '../../src/app';

describe('Sessions', () => {
  describe('Store', () => {
    it('passing the correct data, allow to login', async () => {
      const json = {
        name: 'APAD',
        email: 'contato@apad.com.br',
        whatsapp: '15981270952',
        city: 'Sorocaba',
        uf: 'SP',
      };

      const {
        body: { id },
      } = await request(app)
        .post('/ongs')
        .send(json);

      const { body, status } = await request(app)
        .post('/sessions')
        .send({ id });

      expect(status).toBe(200);
      expect(body).toHaveProperty('name');
    });

    it('non-existent user, do not allow login', async () => {
      const { body, status } = await request(app)
        .post('/sessions')
        .send({ id: 'bshjuj' });

      expect(status).toBe(400);
      expect(body).toHaveProperty('error');
    });
  });
});
