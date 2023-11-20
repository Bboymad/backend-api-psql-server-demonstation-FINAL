const db = require('../db/connection');
const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed');
const app = require('../app');
const request = require('supertest');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/topics', () => {
    describe('Basic request checks', () => {
        test('returns status 200 on successful request', () => {
          return request(app)
            .get('/api/topics')
            .expect(200);
        });
        test('response contains an array of objects for each topic, which contains the correct properties', () => {
          return request(app)
            .get('/api/topics')
            .then(({ body }) => {
              expect(body.topics).toEqual(
                expect.objectContaining([
                  {
                    description: 'The man, the Mitch, the legend',
                    slug: 'mitch'
                  },
                  {
                    description: 'Not dogs',
                    slug: 'cats'
                  },
                  {
                    description: 'what books are made of',
                    slug: 'paper'
                  }
                ]))
            });
        });
    });
});