require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');

const app = express();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(staticMiddleware);

const jsonMiddleWare = express.json();

app.use(jsonMiddleWare);

app.get('/api/users', (req, res) => {
  const sql = `
  select "userName", "password", "userId"
  from "users"
  where "userId" = '1'`;
  db.query(sql)
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occured'
      });
    });
});

app.post('/api/goals', (req, res) => {
  const { userId, goalName, goalImage, goalCount = 0 } = req.body;
  if (goalName === ' ' || goalName === null || goalImage === null) {
    res.status(400).json({
      error: 'goalName and goalImage are both required inputs'
    });
    return;
  }
  const sql = `
  insert into "dailygoals" ("userId", "goalName", "image", "goalCount")
  values ($1, $2, $3, $4)
  returning *`;
  const params = [userId, goalName, goalImage, goalCount];
  db.query(sql, params)
    .then(result => {
      const [goal] = result.rows;
      res.status(201).json(goal);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/goals/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = `
  select *
  from "dailygoals"
  where "userId" = $1`;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const goal = [...result.rows];
      res.status(201).json(goal);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.patch('/api/goals/:goalId', (req, res) => {
  const goalId = req.params.goalId;
  const { goalName, goalImage } = req.body;
  const sql = `
  update "dailygoals"
    set "goalName" = $1,
        "image" = $2
  where "goalId" = $3
  returning *`;
  const params = [goalName, goalImage, goalId];
  db.query(sql, params)
    .then(res.status(201))
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.delete('/api/delete/:goalId', (req, res) => {
  const goalId = req.params.goalId;
  const sql = `
  delete from "completedgoals"
  where "goalId" = $1`;
  const params = [goalId];
  db.query(sql, params)
    .then(() => {
      const newsql = `
      delete from "dailygoals"
      where "goalId" = $1
      `;
      const newparams = [goalId];
      db.query(newsql, newparams)
        .then(res.status(201))
        .catch(err => {
          console.error(err);
          res.status(500).json({
            error: 'an unexpected error occurred'
          });
        });
    }
    )
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/completedTime', (req, res) => {
  const { goalId } = req.body;
  const sql = `
  insert into "completedgoals" ("goalId")
  values ($1)
  returning *`;
  const params = [goalId];
  db.query(sql, params)
    .then(res.status(201))
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/getTimes', (req, res) => {
  const sql = 'select * from "completedgoals"';
  db.query(sql)
    .then(result => {
      const times = result.rows;
      res.status(201).json(times);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.patch('/api/goalcount', (req, res) => {
  const { goalId, count } = req.body;
  const sql = `
  update "dailygoals"
  set "goalCount" = $1
  where "goalId" = $2`;
  const params = [count, goalId];
  db.query(sql, params)
    .then(res.status(201))
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
