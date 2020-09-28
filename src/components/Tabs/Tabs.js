import { ref, toRefs, watch } from 'vue';
import { useRoute } from 'vue-router';

const tabs = ['cork', 'ireland', 'counties'];

export default {
  name: 'Tabs',

  setup(props, { emit }) {
    const { name } = toRefs(useRoute());

    const selectedTab = ref('cork');

    watch(name, (newRoute) => {
      selectedTab.value = newRoute;
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
