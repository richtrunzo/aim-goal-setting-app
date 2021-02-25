require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');

const app = express();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

db.on('error', (err, client) => {
  console.error('Unexpected error', err);
});

app.use(staticMiddleware);

const jsonMiddleWare = express.json();

app.use(jsonMiddleWare);

app.post('/api/newuser', (req, res) => {
  const { username, password } = req.body;
  const sql = `
  insert into "users" ("userName", "password")
  values ($1, $2)`;
  const params = [username, password];
  db.query(sql, params)
    .then(result => res.status(201).json(result))
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occured'
      });
    });
});

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
    .then(result => res.status(201).json(result))
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
      const notessql = `
        delete from "dailynotes"
        where "goalId" = $1`;
      const notesparams = [goalId];
      db.query(notessql, notesparams)
        .then(() => {
          const newsql = `
            delete from "dailygoals"
            where "goalId" = $1`;
          const newparams = [goalId];
          db.query(newsql, newparams)
            .then(result => {
              res.status(201).json(result);
            })
            .catch(err => {
              console.error(err);
              res.status(500).json({
                error: 'an unexpected error occurred'
              });
            })
            .catch(err => {
              console.error(err);
              res.status(500).json({
                error: 'an unexpected error occurred'
              });
            });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({
            error: 'an unexpected error occurred'
          });
        });
    });
});

app.patch('/api/updategoal', (req, res) => {
  const { goalId, goalCount } = req.body;
  const sql = `
insert into "completedgoals" ("goalId")
values ($1)
on conflict ("goalId")
do update set "timeCompleted" = now()`;
  const params = [goalId];
  db.query(sql, params)
    .then(() => {
      const sql = `
      update "dailygoals"
      set "goalCount" = $2
      where "goalId" = $1`;
      const params = [goalId, goalCount];
      db.query(sql, params)
        .then(result => res.status(201).json(result))
        .catch(err => {
          console.error(err);
          res.status(500).json({
            error: 'an unexpected error occurred'
          });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/notes', (req, res) => {
  const { goalId, note } = req.body;
  const sql = `
  insert into "dailynotes" ("goalId", "note")
  values ($1, $2)
  returning *`;
  const params = [goalId, note];
  db.query(sql, params)
    .then(result => res.status(201).json(result))
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/notes', (req, res) => {
  const sql = `
  select *
  from "dailynotes"`;
  db.query(sql)
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

app.get('/api/goals/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = `
  select *
  from "dailygoals"
  where "userId" = $1
  order by "goalId"`;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      const goal = [...result.rows];
      const sql = 'select * from "completedgoals"';
      db.query(sql)
        .then(result => {
          const times = result.rows;
          goal.map((value, index) => {
            times.map((newvalue, newindex) => {
              if (value.goalId === newvalue.goalId) {
                goal[index].timeCompleted = times[newindex].timeCompleted;
              }
            });
          });
          res.status(201).json(goal);
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({
            error: 'an unexpected error occurred'
          });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.delete('/api/deletenote/:noteId', (req, res) => {
  const noteId = req.params.noteId;
  const sql = `
  delete from "dailynotes"
  where "noteId" = $1`;
  const params = [noteId];
  db.query(sql, params)
    .then(result => res.status(201).json(result))
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occured'
      });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
