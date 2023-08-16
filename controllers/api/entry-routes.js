const router = require('express').Router();
const { Reading_Entry } = require('../../models');
const { Op } = require('sequelize');

router.post('/', async (req, res) => {
    try {
        const userId = req.session.user_id;
        const date = req.body.date;
        const pagesRead = req.body.pages_read;
        const existingEntry = await Reading_Entry.findOne({
            where: {
                user_id: req.session.user_id,
                date: new Date(req.body.date).toISOString()
            }
        })

        if (existingEntry) {
            const entryData = await Reading_Entry.update(
                {
                  pages_read: pagesRead
                },
                {
                  where: {
                    user_id: req.session.user_id,
                    date:  new Date(req.body.date).toISOString()
                  }
                });
            res.status(200).json(entryData);
            return
        }
    
        // If no existing entry, create a new one
        const entryData = await Reading_Entry.create({
          pages_read: pagesRead,
          date: date,
          user_id: userId
        });
    
        res.status(200).json(entryData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
})

module.exports = router;