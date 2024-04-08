const request = require('supertest');

describe('Blackjack API', () => {

    let server;

    beforeEach(() => {
        jest.resetModules();
        server = require('../../src/server');
    });

    afterEach((done) => {
        server.close(done); 
    });

    test('POST /blackjack/start should start a new game', async () => {
        const response = await request(server)
            .post('/blackjack/start')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('New game started');
    });

    test('POST /blackjack/hit should give the player one additional card', async () => {
        await request(server).post('/blackjack/start');
        await request(server)
            .post('/blackjack/player/hit')
            .expect(200);

        const responseStatus = await request(server)
            .get('/blackjack/status')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(responseStatus.body.player.hand.length).toBe(3);
    });

    test('GET /blackjack/status should return the current game status', async () => {
        await request(server).post('/blackjack/start');
        const response = await request(server)
            .get('/blackjack/status')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('player');
        expect(response.body).toHaveProperty('player.hand');
        expect(response.body).toHaveProperty('dealer');
        expect(response.body).toHaveProperty('dealer.hand');
    });

    test('POST /blackjack/player/stand should end the player turn', async () => {
        await request(server).post('/blackjack/start');
        const response = await request(server)
            .post('/blackjack/player/stand')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('player');
        expect(response.body.player).toHaveProperty('hand');
        expect(response.body.player).toHaveProperty('score');

        const responseStatus = await request(server)
            .get('/blackjack/status')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(responseStatus.body.status).not.toBe('ongoing');
    });

    test('POST /blackjack/player/hit should return an error if no game is active', async () => {
        const response = await request(server)
            .post('/blackjack/player/hit')
            .expect(400);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe("Game not found. Please start a new game.");
    });

    test('POST /blackjack/player/stand should return an error if the game is not found', async () => {
        const response = await request(server)
            .post('/blackjack/player/stand')
            .expect(400);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe("Game not found. Please start a new game.");
    });

    test('GET /blackjack/status should return an error if the game is not found', async () => {
        const response = await request(server)
            .get('/blackjack/status')
            .expect(400);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe("No active game found. Please start a new game first.");
    });
});