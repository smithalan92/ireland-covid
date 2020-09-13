const TABS = ['cork', 'ireland'];

export default {
  name: 'Tabs',

  data() {
    return {
      tabs: TABS,
      selectedTab: TABS[0],
    };
  },

  methods: {
    onSelectTab(tab) {
      this.selectedTab = tab;
      this.$emit('selectTab', tab);
    },
  },
};
