import userRouter from './users-route.js';
import jobPostsRouter from './job-posts-route.js';
import reviewRouter from './reviews-route.js';
import jobApplicationsRouter from './job-applications-route.js';
import catagoryRouter from './category-route.js';
import conversationRouter from './conversations-route.js';
import messagesRouter from './messages-route.js';
import authenticationRoute from './authentication-route.js';

export default (app) => {
    app.use('/users', userRouter)
    app.use('/job-posts', jobPostsRouter)
    app.use('/reviews',reviewRouter)
    app.use('/job-applications', jobApplicationsRouter)
    app.use('/category',catagoryRouter)
    app.use('/conversations',conversationRouter)
    app.use('/messages',messagesRouter)
    app.use('/',authenticationRoute)
}