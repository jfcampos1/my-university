const KoaRouter = require('koa-router');

// disabled for testing purposes
// const sendLoginAlertEmail = require('../mailers/login-alert');

const router = new KoaRouter();

router.get('session.new', '/new', async ctx =>
  ctx.render('session/new', {
    createSessionPath: ctx.router.url('session.create'),
    notice: ctx.flashMessage.notice,
  }));

router.put('session.create', '/', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await ctx.orm.user.find({ where: { email } });
  const isPasswordCorrect = user && await user.checkPassword(password);
  if (isPasswordCorrect) {
    // sendLoginAlertEmail(ctx, { user });
    ctx.session.userId = user.id;
    return ctx.redirect(ctx.router.url('courses.list'));
  }
  return ctx.render('session/new', {
    email,
    createSessionPath: ctx.router.url('session.create'),
    error: 'Incorrect mail or password',
  });
});

router.delete('session.destroy', '/', (ctx) => {
  ctx.session = null;
  ctx.redirect(ctx.router.url('session.new'));
});

module.exports = router;