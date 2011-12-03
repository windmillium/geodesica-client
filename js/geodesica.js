(function($) {
  window.Block = Backbone.Model.extend({});

  window.Blocks = Backbone.Collection.extend({
    model: Block,
    url: '/game/map'
  });

  window.BlockView = Backbone.View.extend({
    tagName: 'div',
    className: 'block',
    initialize: function() {
                  _.bindAll(this, 'render');
                  this.model.bind('change', this.render);
                  this.template = _.template($('#block-template').html());
                },
    render: function() {
              var renderedContent = this.template(this.model.toJSON());
              $(this.el).html(renderedContent);
              $(this.el).css({
                "left":this.model.get("x") * 25 + "px",
                "top":this.model.get("y") * 25 + "px"
              });
              return this;
            }
  });

  window.map = new Blocks();

  window.MapView = BlockView.extend({
  });

  window.MapView = Backbone.View.extend({
    initialize: function() {
                  _.bindAll(this, 'render');
                  this.template = _.template($('#map-template').html());
                  this.collection.bind('reset', this.render);
                },
    render: function() {
              var $blocks
              var collection = this.collection;
              $(this.el).html(this.template({}));
              $blocks = this.$('.blocks');
              collection.each(function(block) {
                var view = new BlockView({
                  model: block,
                  collection: collection
                });
                $blocks.append(view.render().el);
              });
              return this;
            }
  });

  window.Geodesica = Backbone.Router.extend({
    routes: {
      '': 'home'
    },

    initialize: function() {
      this.mapView = new MapView({
        collection: window.map
      });
    },

    home: function() {
      var $container = $('#container');
      $container.empty();
      $container.append(this.mapView.render().el);
    }
  });

  $(function() {
    window.App = new Geodesica();
    Backbone.history.start();
  });

})(jQuery);
