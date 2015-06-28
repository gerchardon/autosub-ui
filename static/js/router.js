define(['marionette'], function (Mn) {
  'use strict';
  var controller = {
    index: function() {
      var model = new Backbone.Model({
        name: "Marionette",
      });

      var MyView = Mn.ItemView.extend({
        // tagName: 'li',
        className: 'movie',
        template: _.template('<%- name %>'),
      });
      MyApp.mainRegion.show(new MyView({model: model}));
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
