Vue.component('gratitude-prompt',
{
  data: function()
  {
    var data = 
    {
      inputValue: '',
      currentPrompt: ''
    };

    return data;
  },

  props: ['prompts'],

  methods:
  {
    submit: function()
    {
      if (this.inputValue !== '')
      {
        bus.$emit('gratitude-prompt-answered', this.inputValue, this.currentPrompt);
        this.inputValue = '';
        this.currentPrompt = this.prompts[this.getRandomPrompt()].category;
      }
    },

    getRandomPrompt: function()
    {
      return _.random(0, (this.prompts.length - 1));
    }
  },

  template: $('#gratitude-prompt-template').html(),

  created: function()
  {
    this.currentPrompt = this.prompts[this.getRandomPrompt()].category;
  }
});