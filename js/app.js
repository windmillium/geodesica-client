(function($) {
  window.World = Backbone.Model.extend({});

  window.Worlds = Backbone.Collection.extend({
    model: World,
    url: '/worlds'
  });

  window.WorldView = Backbone.View.extend({
    tagName: 'li',
    classname: 'world',
    initialize: function() {
                  _.bindAll(this, 'render');
                  this.model.bind('change', this.render);
                  this.template = _.template($('#world-template').html());
                },
    render: function() {
              var renderedContent = this.template(this.model.toJSON());
              $(this.el).html(renderedContent);
              return this;
            }
  });

  window.UniverseWorldView = WorldView.extend({
  });

  window.UniverseView = Backbone.View.extend({
    initialize: function() {
                  _.bindAll(this, 'render');
                  this.template = _.template($('#universe-template').html());
                  this.collection.bind('reset', this.render);
                },
    render: function() {
              var $worlds,
                collections = this.collection;
              $(this.el).html(this.template({}));
              $worlds = this.$('.albums');
              collection.each(function(album) {
                var view = new UniverseWorldView({
                  model: album,
                  collection: collection
                });
                $albums.append(view.render().el);
              });
              return this;
            }
  });
})(jQuery);
