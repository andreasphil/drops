(function(exports)
{
  exports.settings = 
  {
    load: function()
    {
      var dataString = localStorage.getItem('settings');

      if (dataString)
      {
        return JSON.parse(dataString);
      }
      else
      {
        var settings = 
        {
          firstUse: true,
          lastEdit: Date.now(),
          scoreMalus: 0
        }

        return settings;
      }
    },

    save: function(data)
    {
      var dataString = JSON.stringify(data);
      localStorage.setItem('settings', dataString);
    }
  }
})(window);