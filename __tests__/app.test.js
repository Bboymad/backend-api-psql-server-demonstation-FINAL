const db = require('../db/connection');
const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed');
const app = require('../app');
const request = require('supertest');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('General errors', () => {
    test('should respond with 404 when request route is unavailable', () => {
      return request(app)
      .get('/api/topicsxxx')
      .expect(404)
      .then(({ body }) => {
      expect(body.msg).toEqual("Invalid endpoint");
      });
    });
  })

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
describe('GET /api/articles/:article_id', () => {
    describe('Basic request checks', () => {
        test('returns status 200 on successful request', () => {
            return request(app)
            .get('/api/articles/1')
            .expect(200);
        });
        test('response contains an object of 1 expected article with correct properties', () => {
            return request(app)
            .get('/api/articles/1')
            .then(({ body }) => {
                expect(body.article).toMatchObject({
                    article_id: 1,
                    title: 'Living in the shadow of a great man',
                    topic: 'mitch',
                    author: 'butter_bridge',
                    body: 'I find this existence challenging',
                    created_at: '2020-07-09T20:11:00.000Z',
                    votes: 100,
                    article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
                })
            });
        });
    });
    describe('errors', () => {
        test('should respond with 404 (not found) when a legit but non-existent article is not found', () => {
            return request(app)
            .get('/api/articles/99999999')
            .expect(404)
            .then(({ body }) => {
                expect(body).toEqual({ msg: 'Article not found' });
            });
        });
        test.only('should respond with 400 (bad request) when an invalid article id is used', () => {
            return request(app)
            .get('/api/articles/not_an_id')
            .expect(400)
            .then(({ body }) => {
                expect(body).toEqual({ msg: "Bad request" });
            });
        });
    });
});
