(function ($) {
  window.Job = Backbone.Model.extend({});
  window.JobView = Backbone.View.extend({
    tagName: 'div',
    className: 'job',
    events: {
      'click': 'handleClick'
    },
    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
      this.template = _.template($('#job-template').html());
    },
    render: function() {
      var renderedContent = this.template(this.model.toJSON());
      $(this.el).html(renderedContent);
      cssOptions = {
        "left":(this.model.get("x") ) * 25 + "px",
        "top":(this.model.get("y") ) * 25 + "px"
      }
      $(this.el).css(cssOptions);
      $(this.el).addClass(this.model.get("type"));
      return this;
    },
    handleClick: function(){
    }
  });
  window.Jobs = Backbone.Collection.extend({
    initialize: function() {
    },
    model: window.Job,
    url: "/game/jobs"
  });

  window.JobsView = Backbone.View.extend({
    id: "jobs",
    events:{
      'click':'handleClick'
    },
    initialize: function() {
      _.bindAll(this, 'render');
      this.template = _.template($('#jobs-template').html());
      this.collection.bind('reset', this.render);
      this.collection.bind('add', this.render);
    },
    render: function() {
      var $jobs
      var collection = this.collection;
      $(this.el).html(this.template({}));
      $jobs = this.$('.jobs');
      collection.each(function(job) {
        var view = new JobView({
          model: job,
          collection: collection
        });
        $jobs.append(view.render().el);
      });
      return this;
    },
    handleClick: function(e){
      var x = Math.floor((e.pageX - $(this.el).offset().left)/25);
      var y = Math.floor((e.pageY - $(this.el).offset().top)/25);

      if( window.building ) {
        var job = "build"
        var what = window.building;
      } else {
        var job = "dig";
        var what = "";
      }

      this.collection.create({
        x:x,
        y:y,
        z:0,
        job:job,
        what:what
      });
    }
  });

  window.Building = Backbone.Model.extend({});
  window.BuildingView = Backbone.View.extend({
    tagName: 'div',
    className: 'building',
    events: {
      'click': 'handleClick'
    },
    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
      this.template = _.template($('#building-template').html());
    },
    render: function() {
      var renderedContent = this.template(this.model.toJSON());
      $(this.el).html(renderedContent);
      return this;
    },
    handleClick: function(){
      window.building = this.model.get("name");
      $('#jobs').mousemove(function(e){
        $("#buildingmarker").css({
          top:e.pageY-12+"px",
          left:e.pageX-12+"px"
        });
      });
    }
  });

  window.Buildings = Backbone.Collection.extend({
    initialize: function() {
    },
    model: window.Building,
    url: "/game/templates"
  });

  window.BuildingsView = Backbone.View.extend({
    id: "buildings",
    initialize: function() {
      _.bindAll(this, 'render');
      this.template = _.template($('#buildings-template').html());
      this.collection.bind('reset', this.render);
    },
    render: function() {
      var $buildings
      var collection = this.collection;
      $(this.el).html(this.template({}));
      $buildings = this.$('#buildings');
      collection.each(function(building) {
        var view = new BuildingView({
          model: building,
          collection: collection
        });
        $buildings.append(view.render().el);
      });
      return this;
    }
  });


  window.Mobile = Backbone.Model.extend({});
  window.MobileDetailView = Backbone.View.extend({
    tagName: 'div',
    className: 'mobileDetail',
    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
      this.template = _.template($('#mobile-detail-template').html());
    },
    render: function() {
      var renderedContent = this.template(this.model.toJSON());
      $(this.el).html(renderedContent);
      return this;
    }
  });
  window.MobileView = Backbone.View.extend({
    tagName: 'div',
    className: 'mobile',
    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
      this.template = _.template($('#mobile-template').html());
    },
    render: function() {
      var renderedContent = this.template(this.model.toJSON());
      $(this.el).html(renderedContent);
      cssOptions = {
        "left":(this.model.get("x") - this.offsetX) * 25 + "px",
        "top":(this.model.get("y") - this.offsetY) * 25 + "px"
      }
      $(this.el).css(cssOptions);
      return this;
    }
  });

  window.Mobiles = Backbone.Collection.extend({
    initialize: function() {
      this.startX = 0;
      this.startY = 0;
      this.width  = 50;
      this.height = 25;
    },
    model: window.Mobile,
    url: function() {
      return '/game/mobiles?startx='+this.startX+
        '&starty='+this.startY+
        '&width='+this.width+
        '&height='+this.height
    }
  });

  window.MobilesDetailView = Backbone.View.extend({
    id: "mobs-detail",
    initialize: function() {
      _.bindAll(this, 'render');
      this.template = _.template($('#mobiles-detail-template').html());
      this.collection.bind('reset', this.render);
    },
    render: function() {
      var $mobiles
      var collection = this.collection;
      $(this.el).html(this.template({}));
      $mobiles = this.$('.mobiles');
      collection.each(function(mobile) {
        var view = new MobileDetailView({
          model: mobile,
          collection: collection
        });
        $mobiles.append(view.render().el);
      });
      return this;
    }
  });
  window.MobilesView = Backbone.View.extend({
    id: "mobs",
    initialize: function() {
      _.bindAll(this, 'render');
      this.template = _.template($('#mobiles-template').html());
      this.collection.bind('reset', this.render);
    },
    render: function() {
      var $mobiles
      var collection = this.collection;
      $(this.el).html(this.template({}));
      $mobiles = this.$('.mobiles');
      collection.each(function(mobile) {
        var view = new MobileView({
          model: mobile,
          collection: collection
        });
        view.offsetX = window.map.startX;
        view.offsetY = window.map.startY;
        $mobiles.append(view.render().el);
      });
      return this;
    }
  });


  window.Block = Backbone.Model.extend({});

  window.Blocks = Backbone.Collection.extend({
    initialize: function() {
      this.startX = 0;
      this.startY = 0;
      this.width  = 50;
      this.height = 25;
    },
    model: window.Block,
    url: function() {
      return '/game/map?startx='+this.startX+
        '&starty='+this.startY+
        '&width='+this.width+
        '&height='+this.height
    }
  });

  window.BlockView = Backbone.View.extend({
    tagName: 'div',
    className: 'block',
    events: {
      'click': 'handleClick'
    },
    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
      this.template = _.template($('#block-template').html());
    },
    render: function() {
      var renderedContent = this.template(this.model.toJSON());
      $(this.el).html(renderedContent);
      cssOptions = {
        "left":(this.model.get("x") - this.offsetX) * 25 + "px",
        "top":(this.model.get("y") - this.offsetY) * 25 + "px"
      }
      $(this.el).css(cssOptions);
      if(this.model.get("selected")) {
        $(this.el).addClass('selected');
      } else {
        $(this.el).removeClass('selected');
      }
      if(parseInt(this.model.get("plants")) > 0) {
        $(this.el).addClass('plant');
      }
      if(parseInt(this.model.get("objects")) > 0) {
        $(this.el).addClass('object');
      }

      return this;
    },
    handleClick: function(){
      if(window.building) {
        alert("place building!");
      }
      if( this.model.get("selected")) {
        this.model.set({selected: false});
      } else {
        this.model.set({selected: true});
      }
      this.model.save({selected:this.model.get("selected")}, {
        success: function(model, response) {
          console.log(response);
        },
        error: function(model, response) {
          alert('wrong');
        }
      });
    }
  });

  window.map = new Blocks();
  window.mobiles = new Mobiles();
  window.buildings = new Buildings();
  window.jobs = new Jobs();

  window.MapView = Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, 'render');
      this.template = _.template($('#map-template').html());
      this.collection.bind('reset', this.render);
      $(document).bind('keydown', this.handleInput);
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
        view.offsetX = window.map.startX;
        view.offsetY = window.map.startY;
        $blocks.append(view.render().el);
      });
      return this;
    },
    handleInput: function(e) {
      console.log(window.map.startX);
      console.log(window.map.startY);
      switch(e.keyCode) {
        case 38:
          window.map.startY++;
          break;
        case 40:
          window.map.startY = Math.max(window.map.startY-1,0);
          break;
        case 37:
          window.map.startX = Math.max(window.map.startX-1,0);
          break;
        case 39:
          window.map.startX++;
          break;
      }
      window.map.fetch();
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
      this.mobilesDetailView = new MobilesDetailView({
        collection: window.mobiles
      });
      this.mobilesView = new MobilesView({
        collection: window.mobiles
      });
      this.buildingsView = new BuildingsView({
        collection: window.buildings
      });
      this.jobsView = new JobsView({
        collection: window.jobs
      });
    },

    home: function() {
      var $container = $('#container');
      $container.empty();
      $container.append(this.mapView.render().el);
      $container.append(this.mobilesView.render().el);
      $container.append(this.mobilesDetailView.render().el);
      $container.append(this.buildingsView.render().el);
      $container.append(this.jobsView.render().el);
    }
  });

  $(function() {
    window.App = new Geodesica();
    Backbone.history.start();
  });

})(jQuery);
