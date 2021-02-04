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
  select "goalName", "image"
  from "dailygoals"
  where "userId" = $1`;
  const params = [userId];
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

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
