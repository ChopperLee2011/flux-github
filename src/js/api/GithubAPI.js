'use strict';

const request = require('superagent'),
    API_URL = 'https://api.github.com',
    OAUTH_TOKEN = require('../../mock/config').token,
    ServerActionCreators = require('../actions/ServerActionCreators');
let GitHub = {
    getMe() {
        return new Promise((resolve, reject)=> {
            request
                .get(API_URL + '/user')
                .auth('authorization', OAUTH_TOKEN)
                .set('Accept', 'application/json')
                .end((err, res)=> {
                    err ? reject(err) : resolve(res);
                });
        });
    },
    getOrgs() {
        return new Promise((resolve, reject) => {
            request
                .get(API_URL + '/user/orgs')
                .auth('authorization', OAUTH_TOKEN)
                .set('Accept', 'application/json')
                .end((err, res)=> {
                    err ? reject(err) : resolve(res);
                });
        });
    },
    getUserOrg() {
        let user = {};
        this.getMe().then((res)=> {
            //console.info('step 1 res', res);
            user.me = res.body.login;
            return this.getOrgs();
        }).then((res)=> {
            //console.info('step 2 res', res);
            user.orgs = res.body
        }).then(()=> {
            //console.info('step 3 user', user);
            ServerActionCreators.handleUserSuccess(user);
        }).catch(err => {
            ServerActionCreators.handleUserError(err);
        });
    },

    getUserRepo(userName) {
        return request
            .get(API_URL + '/user/repos')
            .auth('authorization', OAUTH_TOKEN)
            .set('Accept', 'application/json')
            .end((err, res)=> {
                err ? ServerActionCreators.handleRepoError(err) : ServerActionCreators.handleRepoSuccess(userName, res);
            });
    },

    getOrgRepo(orgName) {
        return request
            .get(API_URL + `/orgs/${orgName}/repos`)
            .auth('authorization', OAUTH_TOKEN)
            .set('Accept', 'application/json')
            .end((err, res)=> {
                err ? ServerActionCreators.handleRepoError(err) : ServerActionCreators.handleRepoSuccess(orgName, res);
            });
    },
    getIssue(repoUrl) {
        return request
            .get(`${repoUrl}/issues`)
            .auth('authorization', OAUTH_TOKEN)
            .set('Accept', 'application/json')
            .end((err, res)=> {
                err ? ServerActionCreators.handleIssueError(err) : ServerActionCreators.handleIssueSuccess(res);
            });
    }
};

module.exports = GitHub;