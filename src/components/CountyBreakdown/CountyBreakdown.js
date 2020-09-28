import IrelandMap from '@/assets/ireland_map.svg';
import util from '@/util';
import { mapState } from 'vuex';

export default {
  name: 'CountyBreakdown',

  components: {
    IrelandMap,
  },

  data() {
    return {
      currentHoverBoundary: null,
      currentCountyName: '',
      isTooltipVisible: false,
      currentCountyCases: 0,
      popupLeft: '0',
      popupTop: '0',
    };
  },

  computed: {
    ...mapState([
      'countyData',
      'latestCorkDataDateTime',
    ]),
  },

  methods: {
    onMouseEnter(e) {
      // If we're not hovering over a path
      // We shouldnt show the tooltip anymore
      if (e.target.tagName !== 'path') {
        this.isTooltipVisible = false;

        // Also reset the old paths hover style
        if (this.currentHoverBoundary) {
          this.currentHoverBoundary.style.fill = '#6f6f6f';
          this.currentHoverBoundary = null;
        }
        return;
      }

      // Quick sort of parent node children to arrange the text path and boundary correctly
      const [textEl, boundaryEl] = Array.from(e.target.parentNode.children).sort((a) => {
        if (a.id) return 1;
        return -1;
      });

      // Remove path "hover" style from previous path
      if (this.currentHoverBoundary) {
        this.currentHoverBoundary.style.fill = '#6f6f6f';
      }

      // If were hovering over Northern Ireland, hide the tooltip
      // We dont have data for NI
      if (boundaryEl.id === 'ni') {
        this.currentHoverBoundary = null;
        this.isTooltipVisible = false;
        boundaryEl.parentNode.style.cursor = 'not-allowed';
        return;
      }

      // I shouldnt do this....but...
      this.currentHoverBoundary = boundaryEl;

      // Get the county name ( id of the path )
      const hoveredCounty = boundaryEl.id;

      // Setup tooltip data
      this.currentCountyCases = util.formatNumber(this.countyData[hoveredCounty]);
      this.currentCountyName = `${hoveredCounty.substring(0, 1).toUpperCase()}${hoveredCounty.substring(1)}`;

      // Path hover style
      boundaryEl.style.fill = '#2e2e2e';

      // Set the tooltips new position, somewhere centerish of the path outline
      const iconPos = textEl.getBoundingClientRect();
      this.popupLeft = `${iconPos.right + 15}px`;
      this.popupTop = `${iconPos.top + (iconPos.height / 2) - 10}px`;

      this.isTooltipVisible = true;
    },
  },
};
