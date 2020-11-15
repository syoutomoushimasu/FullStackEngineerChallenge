## Assumptions

1. Login in as admin
  
Admin can create/edit/delete employee.
- Employee's name should be unique.
- Employee's email can be edited.
- didn't do the email input validation.
- Employee table
  - id
  - name
  - email

Admin can create/edit/view performance reivew
- one employee could have serval performance reviews but title should be different.
- select the employee first, and then set the reviewers of the performance review. 
- only the performance reivew's title can be edited.
- view feedbacks submited by reviewers.
- Performance table
  - id 
  - title
  - employee_id(id in employee table)
- Review table
  - id
  - performance_id(id in performance table)
  - employee_id(the performance reviewer's id in employee table, one performance id could has serval records each record one reviewer's id of the performance review)

2. Login in as employee
   
- employee should be created by admin first
- employee only see the performance reivew records which the employee need to submit.
- after feedback employee can no longer see the performance review record again.
- Feedback table
  - id
  - performance_id(the feedback belongs to which performance)
  - reviewer_id(the feedback submited by whom)
  - feedback(feedback text)

## How to start the test

1. git clone && yarn install(or use npx)
2. start frontend: yarn dev(default localhost://8080)
3. link local mysql config: /server/database/index.ts
4. create database `fullstack-challenge` mannully
5. start backend: yarn dev:server

## How I completed the test

- Day 1
  - yarn init
  - add react && typescript
  - webpack config
  - webpack dev server
- Day 2
  - antd
  - react router
  - login ui
  - admin ui
  - koa && ts-node && nodemon
  - koa router && postman test
- Day 3
  - connect mysql
  - create table
  - route middleware
  - fectch api
  - employee services
- Day 4
  - employee list
  - employee edit && delete
  - performance create
- Day 5
  - performance list
  - performance update title
  - admin children router
  - employees route
- Day 6
  - feedback view
  - feedback create && list endpoint
  - performance view ui
  - get feedbacks endpoint
- Day 7
  - complete the document

## What can be improved in the test

The following should be used in this test. I would do it Later.

- ts-jest
- prettifier
- redux(maybe not necessary)

## Idea

Something I thought worth to have a try, and improve my skill.

- graphQL
- Rxjs
- esbuild
- Server Side Rendering
