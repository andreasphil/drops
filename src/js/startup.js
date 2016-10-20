(function(exports)
{
  exports.bus = new Vue();

  exports.drops = new Vue(
  {
    data: 
    {
      settings: settings.load(),
      currentView: views.landing,
      items: persistence.load(),
      prompts: []
    },

    computed:
    {
      score: function()
      {
        var now = new Date();
        var today = now.getDate();
        var step = 1.4;
        var base = 55;

        var score = base + (this.items.length * step);
        score = (score > 100) ? 100 : score;

        // Substract malus
        score = score - this.settings.scoreMalus;
        if (score <= 0)
        {
          score = 0;
          this.settings.scoreMalus = 55;
        }
        
        return score + '%';
      }
    },

    methods: 
    {
      createGratitudeItem: function(text, category)
      {
        // Check if there's an item with the same text
        var item = _.findWhere(this.items, { text: text, category: category });

        if (item)
        {
          item.count = item.count + 1;
          item.date = Date.now;
        }
        else
        {
          item = new GratitudeItem();
          item.text = text;
          item.category = category;
          this.items.push(item);
        }

        this.settings.lastEdit = Date.now();
      },

      deleteGratitudeItem: function(data)
      {
        var item = _.findWhere(this.items, { text: data });

        if (item)
        {
          if (item.count === 1)
          {
            var index = this.items.indexOf(item);
            this.items.splice(index, 1);
          }
          else
          {
            item.count = item.count - 1;
          }
        }
      },

      closeLanding: function()
      {
        this.settings.firstUse = false;
        this.currentView = views.home;
      }
    },

    watch: 
    {
      'items': 
      {
        deep: true,
        handler: function()
        {
          persistence.save(this.items);
        }
      },

      'settings':
      {
        deep: true,
        handler: function()
        {
          settings.save(this.settings);
        }
      }
    },

    el: '#application',

    created: function()
    {
      bus.$on('gratitude-prompt-answered', this.createGratitudeItem);
      bus.$on('item-deleted', this.deleteGratitudeItem);
      bus.$on('landing-closed', this.closeLanding);

      // Gratitude prompts
      this.prompts.push(new GratitudePrompt('What food did you enjoy today?', 'Food', 'having a lot of tasty food', 'eating something tasty'));
      this.prompts.push(new GratitudePrompt('Which nice person have you enjoyed meeting today?', 'Person', 'meeting a lot of nice persons', 'meeting someone nice'));
      this.prompts.push(new GratitudePrompt('What useful or fun item do you own?', 'Item', 'owning some useful stuff', 'buying something useful'));
      this.prompts.push(new GratitudePrompt('What experience are you grateful for?', 'Experience', 'having a lot of great experiences', 'planning an interesting activity'));
      this.prompts.push(new GratitudePrompt('What\'s an interesting thing you\'ve learned today?', 'Insight', 'learning a lot of interesting things', 'learning something new'));
      this.prompts.push(new GratitudePrompt('What great opportunity did you have today?', 'Opportunity', 'never missing a good opportunity', 'catching at an opportunity'));
      this.prompts.push(new GratitudePrompt('What\'s nice at the place where you are right now?', 'Surroundings', 'in a nice environment', 'making your surroundings a bit nicer'));
      this.prompts.push(new GratitudePrompt('Which exciting challenge did you face today?', 'Growth', 'challenging yourself often', 'taking on a challenge'));
      this.prompts.push(new GratitudePrompt('What are you looking forward to?', 'Future', 'having a lot of things to look forward to', 'planning something to look forward to'));
      this.prompts.push(new GratitudePrompt('What\'s the most awesome song you\'ve heard today?', 'Music', 'listening to awesome songs frequently', 'listening to a great song'));
      this.prompts.push(new GratitudePrompt('What good memories did you have on your mind today?', 'Memory', 'having a lot of good memories', 'recalling a nice event in the past'));
      this.prompts.push(new GratitudePrompt('What are you grateful for today?', 'Other', 'having so much to be grateful for', 'appreciating something your\'re grateful for'));
    
      // Apply settings
      this.currentView = (this.settings.firstUse === true) ? views.landing : views.home;

      // Calculate malus
      var lastDate = new Date(this.settings.lastEdit);
      var currentDate = new Date();
      var timespan = (currentDate - lastDate) / (1000 * 60 * 60);
      this.settings.scoreMalus += 5 * Math.floor(timespan / 6);
    }
  });
})(window);