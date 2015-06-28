define(['marionette'], function (Mn) {
  'use strict';
  var controller = {
    someMethod: function() {
      console.log('javascript call');
      console.log(this);
      console.log('AppRouter.someMethod()');
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
      "": "someMethod"
    },
    someMethod: function() {

    },

    /* standard routes can be mixed with appRoutes/Controllers above */
    routes : {
      "" : "someMethod"
    }
    // someOtherMethod : function(){
    //   // do something here.
    // }

  });
  return MyAppRouter;
});
