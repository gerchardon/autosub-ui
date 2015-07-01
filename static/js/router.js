define(['marionette', 'views/all'], function (Mn, Views) {
  'use strict';
  var controller = {
    index: function() {
      var model = new Backbone.Model({
        name: "Marionette",
      });
      var v = new Views.index({model: model});
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
