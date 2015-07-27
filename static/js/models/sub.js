(function(){
  define(['backbone'], function(Backbone){
    var Sub = Backbone.Model.extend({defaults: {
      language: 'None',
      team: 'None'
    }});
    return Sub;
  });
})();
