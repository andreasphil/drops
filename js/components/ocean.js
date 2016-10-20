Vue.component('ocean',
{
  data: function()
  {
    var data = 
    {
      topCategory: '',
      bottomCategory: ''
    };

    return data;
  },

  props: ['visible', 'items', 'prompts'],

  computed: 
  {
    sortedItems: function()
    {
      var sortedArray = _.sortBy(this.items, 'count').reverse();
      return sortedArray;
    }
  },

  methods: 
  {
    close: function()
    {
      this.$emit('close');
    },

    removeItem: function(data)
    {
      bus.$emit('item-deleted', data);
    },

    findTopAndBottomCategories: function()
    {
      if (this.items.length < 1)
        return;

      var items = this.items;

      var categories = {};
      for(var i = 0; i < this.prompts.length; i++)
        categories[this.prompts[i].category] = 0;

      // Build sum for each category
      for (var i = 0; i < items.length; i++)
      {
        var category = items[i].category;
        categories[category] += items[i].count;
      }

      var categoryArray = [];
      for(var key in categories)
        categoryArray.push({ name: key, count: categories[key] });

      // Find max
      var max = _.max(categoryArray, function(item) { return item.count; }).name;
      var min = _.min(categoryArray, function(item) { return item.count; }).name;

      this.topCategory = _.findWhere(this.prompts, { category: max }).topCategoryName;
      this.bottomCategory = _.findWhere(this.prompts, { category: min }).bottomCategoryName;
    }
  },

  watch: 
  {
    'items': 
    {
      deep: true,
      handler: function()
      {
        this.findTopAndBottomCategories();
      }
    }
  },

  template: $('#ocean-template').html(),

  created: function()
  {
    this.findTopAndBottomCategories();
  }
});