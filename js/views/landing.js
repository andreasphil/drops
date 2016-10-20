(function(exports)
{
  exports.views = exports.views || {};
  exports.views.landing = 
  {
    methods: 
    {
      close: function()
      {
        bus.$emit('landing-closed');
      }
    },

    template: $('#landing-template').html()
  };
})(window);