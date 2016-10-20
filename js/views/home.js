(function(exports)
{
  exports.views = exports.views || {};
  exports.views.home = 
  {
    data: function()
    {
      var data = 
      {
        oceanVisible: false
      };

      return data;
    },

    props: ['score', 'items', 'prompts'],

    template: $('#home-template').html()
  };
})(window);