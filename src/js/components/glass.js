Vue.component('glass', 
{
  data: function()
  {
    var data = 
    {
      dropping: false
    };

    return data;
  },

  props: ['score', 'items'],

  watch:
  {
    'items': 
    {
      deep: true, 
      handler: function()
      {
        var _this = this;
        this.dropping = true;
        window.setTimeout(function()
        {
          _this.dropping = false;
        }, 500);
      }
    }
  },

  template: $('#glass-template').html()
});