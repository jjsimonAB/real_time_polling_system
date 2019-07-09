 const express = require('express');
 const router = express.Router();
 const Pusher = require('pusher');
 const mongoose = require('mongoose');
 const Vote = require('../models/Vote');
 const Config = require('../config');


 let pusher = new Pusher({
    appId: Config.pusherConfig.appId,
    key: Config.pusherConfig.key,
    secret: Config.pusherConfig.secret,
    cluster: Config.pusherConfig.cluster,
    encrypted: Config.pusherConfig.encrypted
 })

 router.get('/', (req, res) => {
    Vote.find()
        .then(votes => res.json({
            success: true,
            votes: votes
        }))
 })

 router.post('/', (req, res) => {

    const newVote = {
        os: req.body.os,
        points: 1
    };

    new Vote(newVote)
        .save()
        .then(vote => {
            pusher.trigger('os-poll', 'os-vote', {
                points: parseInt(vote.points),
                os: vote.os
              });
        
            return res.json({
                success: true,
                message: "thank you for voting"
            })
        })
 });

 module.exports = router;