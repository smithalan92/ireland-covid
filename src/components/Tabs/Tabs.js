import { ref, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';

const tabs = [
  {
    label: 'Summary',
    route: 'ireland',
  },
  {
    label: 'Cork Cases',
    route: 'cork',
  },
  {
    label: 'Incidence Rates',
    route: 'counties',
  },
];

export default {
  name: 'Tabs',

  setup(props, { emit }) {
    const { name } = toRefs(useRoute());

    const selectedTab = ref(tabs[0]);

    watch(name, (newRoute) => {
      selectedTab.value = tabs.find((t) => t.route === newRoute);
    });

    const onSelectTab = (tab) => {
      selectedTab.value = tab;
      emit('select-tab', tab);
    };

    return {
      selectedTab,
      onSelectTab,
      tabs,
    };
  },
};
