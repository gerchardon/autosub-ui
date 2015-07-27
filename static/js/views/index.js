define(['marionette', 'lodash',
'text!views/table.html',
'text!views/sub.html',
'text!views/empty.html'],
function(Mn, _, TableHtml, SubHtml, EmptyHtml){
  var ipc = require('ipc');
  var ItemView = Mn.ItemView.extend({
    tagName: 'tr',
    // className: 'sub',
    template: _.template(SubHtml),
    events: {
      'click button': function(){
        ipc.send('autosub-download', this.model.get('id'));
      }
    }
  });
  var EmptyView = Mn.ItemView.extend({
    template: _.template(EmptyHtml),
  });
  var IndexView = Mn.CompositeView.extend({
    childView: ItemView,
    emptyView: EmptyView,

    template: _.template(TableHtml),
    childViewContainer: 'tbody',
  });

  return IndexView;
});
