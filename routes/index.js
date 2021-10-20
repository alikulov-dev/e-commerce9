module.exports = function (app) {
    app.use('/',require('./home/home'))
    app.use('/dashboard',require('./admin/home'))
    // app.use('/dashboard/user',require('./admin/user'))
}
