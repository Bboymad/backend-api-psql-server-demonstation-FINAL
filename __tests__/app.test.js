const db = require('../db/connection');
const testData = require('../db/data/test-data');
const seed = require('../db/seeds/seed');
const app = require('../app');
const request = require('supertest');
const endpoints = require('../endpoints.json')

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
        test('should respond with 400 (bad request) when an invalid article id is used', () => {
            return request(app)
            .get('/api/articles/not_an_id')
            .expect(400)
            .then(({ body }) => {
                expect(body).toEqual({ msg: "Bad request" });
            });
        });
    });
});
describe('GET /api', () => {
    describe('Basic request checks', () => {
        test('returns status 200 on successful request', () => {
            return request(app)
            .get('/api')
            .expect(200);
        });
        test('response contains a JSON object that is an exact copy of all available endpoints. It contains the correct properties for each valid endpoint', () => {
            return request(app)
            .get('/api')
            .then(({ body }) => {
                expect(typeof body).toBe('object')
                expect(body).toEqual(endpoints);
            });
        });
    })
})
describe('GET /api/articles', () => {
  describe('Basic request checks', () => {
    test('returns status 200 on successful request', () => {
      return request(app)
      .get('/api/articles')
      .expect(200);
    });
    test('responds with an array of all article objects with expected properties', () => {
      return request(app)
        .get('/api/articles')
        .then(({ body }) => {
          expect(body.articles).toBeInstanceOf(Array);
          expect(body.articles.length).toBeGreaterThan(0);

          body.articles.forEach(article => {
            expect(article).toMatchObject({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            });
          });
        });
    });
    });
    test('should return an array sorted by date descending', () => {
      return request(app)
      .get('/api/articles')
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy('created_at', {
          descending: true
        })
      });
    });
    test('there should not be a body property present on any of the article objects', () => {
      return request(app)
      .get('/api/articles')
      .then(({ body }) => {
        body.articles.forEach(article => {
          expect(article).not.toHaveProperty('body');
        });
      })  
    })
});
describe('POST /api/articles/:article_id/comments', () => {
  describe('request tests', () => {
    test('Responds with status 201 on successful request', () => {
    const newComment = {
      username: 'butter_bridge',
      body: 'This is a test comment!'
    }
    return request(app)
    .post('/api/articles/2/comments')
    .send(newComment)
    .expect(201)
    })
    test('Responds with newly created object with the correct property labels representing a comment', () => {
      const newComment = {
        username: 'butter_bridge',
        body: 'This is a test comment!'
      }
      return request(app)
      .post('/api/articles/2/comments')
      .send(newComment)
      .then(({body}) => {
        expect(body.comment.article_id).toBe(2);

        expect(body.comment).toMatchObject({
          comment_id: expect.any(Number),
          body: expect.any(String),
          article_id: 2,
          author: expect.any(String),
          votes: expect.any(Number),
          created_at: expect.any(String),
        });
      })
    })
  })
  describe('errors', () => {
    test(' should respond with error 400 (bad request) and error message when using an invalid ID', () => {
      const newComment = {
        username: 'butter_bridge',
        body: 'This is a test comment!'
      }

      return request(app)
        .post('/api/articles/not_an_id/comments')
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Bad request');
        });
    });
    test('Should respond with 404 (not found) and error message when an ID supplied for an article does not exist', () => {
      const newComment = {
        username: 'butter_bridge',
        body: 'This is a test comment!'
      }

      return request(app)
        .post('/api/articles/999999/comments')
        .send(newComment)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Not found');
        });
    });
    test(' should respond with 404 status code and error message when user who does not exist tries to post', () => {
      const newComment = {
        username: 'not_A_User',
        body: 'This is a comment...',
      };

      return request(app)
        .post('/api/articles/1/comments')
        .send(newComment)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Not found');
        });
    });
    test('should respond with 400 error message when body is missing from request', () => {
      const newComment = {
        username: 'butter_bridge',
      }

      return request(app)
        .post('/api/articles/1/comments')
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Required information is missing');
        });
    });
  });
});