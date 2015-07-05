(function(){
  define(['backbone', 'models/sub'], function(Backbone, Sub) {
    var Subs = Backbone.Collection.extend({
      model: Sub
    });
    return new Subs();
  });
})();
