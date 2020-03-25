import 'dotenv';
import request from 'supertest';

import app from '../../src/app';

describe('Ongs', () => {
  describe('Store', () => {
    it('passing the correct parameters, allow registering a new ONG', async () => {
      const json = {
        name: 'APAD',
        email: 'contato@apad.com.br',
        whatsapp: '15981270952',
        city: 'Sorocaba',
        uf: 'SP',
      };

      const { body, status } = await request(app)
        .post('/ongs')
        .send(json);

      expect(status).toBe(200);
      expect(body).toHaveProperty('id');
    });
  });

  describe('Index', () => {
    it('returns all ONGS', async () => {
      const {
        body: [ong],
        status,
      } = await request(app)
        .get('/ongs')
        .send();

      expect(status).toBe(200);
      expect(ong).toHaveProperty('id');
    });
  });
});
