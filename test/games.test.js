const mocha = require('mocha');
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');

describe("Apps path", () => {
    it('should return all apps when no genre is specified', () => {
        return request(app)
            .get('/games')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                const item = res.body[0]
               expect(item).to.have.all.keys('App', 'Category', 'Rating', 'Reviews', 'Size', 'Installs', 'Type', 'Price', 'Content Rating', 'Genres', 'Last Updated', 'Current Ver', 'Android Ver')
            })
    })

    it('should be 400 if sort is incorrect', () => {
        return request(app)
            .get('/games')
            .query({sort: 'MISTAKE'})
            .expect(400, 'Sort must be one of rating or app')
    })
})
