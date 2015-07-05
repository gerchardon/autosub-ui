define(['marionette', 'views/all', 'models/subs'], function (Mn, Views, Subs) {
  'use strict';
  var controller = {
    index: function() {
      var v = new Views.index({collection: Subs});
      MyApp.mainRegion.show(v);
    }
  };

  var MyAppRouter = Mn.AppRouter.extend({
    controller: controller,
    appRoutes: {
      "": "index"
    },
    routes: {}
  });
  return MyAppRouter;
});
