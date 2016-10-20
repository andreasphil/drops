(function(exports)
{
  exports.persistence = 
  {
    load: function()
    {
      var dataString = localStorage.getItem('gratitudeLog') || '[]';
      return JSON.parse(dataString);
    },

    save: function(data)
    {
      var dataString = JSON.stringify(data);
      localStorage.setItem('gratitudeLog', dataString);
    }
  };
})(window);