const request = require('supertest');
const app = require('../../src/index');

describe('Blackjack API', () => {

    test('POST /blackjack/start should start a new game', async () => {
        const response = await request(app)
            .post('/blackjack/start')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('player');
        expect(response.body).toHaveProperty('dealer');
        expect(response.body.player.hand.length).toBe(2);
        expect(response.body.dealer.hand.length).toBe(2);
    });

    test('POST /blackjack/hit should give the player one additional card', async () => {
        await request(app).post('/blackjack/start');
        const response = await request(app)
            .post('/blackjack/hit')
            .expect(200);

        expect(response.body.player.hand.length).toBe(3); 
    });

    test('GET /blackjack/status should return the current game status', async () => {
        await request(app).post('/blackjack/start');
        const response = await request(app)
            .get('/blackjack/status')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('player');
        expect(response.body).toHaveProperty('player.hand');
        expect(response.body).toHaveProperty('dealer');
        expect(response.body).toHaveProperty('dealer.hand');
    });
});