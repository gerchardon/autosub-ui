define(['marionette', 'underscore'], function(Mn, _){
  var IndexView = Mn.ItemView.extend({
    // tagName: 'li',
    className: 'movie',
    template: _.template('<%- name %>'),
  });
  return IndexView;
});
