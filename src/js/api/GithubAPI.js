'use strict';

const request = require('superagent'),
    API_URL = 'https://api.github.com',
    OAUTH_TOKEN = require('../../mock/config').token;


export default {
    getUser() {
        this.orgs = () =>
            new Promise((resolve, reject)=> {
                request
                    .get(API_URL + '/user/orgs')
                    .auth('authorization', OAUTH_TOKEN)
                    .set('Accept', 'application/json')
                    .end((err, res)=> {
                        err ? reject(err) : resolve(res);
                    });

            });
    }

}