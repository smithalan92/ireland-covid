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
      currentHoverBoundaryName: '',
      currentCountyName: '',
      isTooltipVisible: false,
      currentCountyCases: 0,
      currentCounty14DayCases: 0,
      currentCounty14DayIncidenceRate: 0,
      popupLeft: '0',
      popupTop: '0',
      incidenceRateMappingColorMapping: {},
    };
  },

  computed: {
    ...mapState([
      'countyData',
      'latestCorkDataDateTime',
    ]),
  },

  methods: {
    applyLevelClassToEl(el, level) {
      const classesToApply = [];

      if (level) {
        classesToApply.push(`county--${level}-cases`);
      }

      // eslint-disable-next-line no-param-reassign
      el.classList = classesToApply;
    },

    onMouseEnter(e) {
      // If we're not hovering over a path
      // We shouldnt show the tooltip anymore
      if (e.target.tagName !== 'path') {
        this.isTooltipVisible = false;
        return;
      }

      // Quick sort of parent node children to arrange the text path and boundary correctly
      const [textEl, boundaryEl] = Array.from(e.target.parentNode.children).sort((a) => {
        if (a.id) return 1;
        return -1;
      });

      // If were hovering over Northern Ireland, hide the tooltip
      // We dont have data for NI
      if (boundaryEl.id === 'ni') {
        this.isTooltipVisible = false;
        return;
      }

      // Get the county name ( id of the path )
      const hoveredCounty = boundaryEl.id;

      // Setup tooltip data
      const { totalCases, totalCases14Days, incidenceRate14Days } = this.countyData[hoveredCounty];
      this.currentCountyCases = util.formatNumber(totalCases);
      this.currentCounty14DayCases = util.formatNumber(totalCases14Days);
      this.currentCounty14DayIncidenceRate = util.formatNumber(incidenceRate14Days);
      this.currentCountyName = `${hoveredCounty.substring(0, 1).toUpperCase()}${hoveredCounty.substring(1)}`;
      this.currentHoverBoundaryName = this.currentCountyName.toLowerCase();

      // Set the tooltips new position, somewhere centerish of the path outline
      const textPos = textEl.getBoundingClientRect();
      console.log(textPos);
      this.popupLeft = `${textPos.right + 30}px`;
      this.popupTop = `${(textPos.top + window.scrollY) + (textPos.height / 2) - 40}px`;

      this.isTooltipVisible = true;
    },
  },

  mounted() {
    Object.keys(this.countyData).forEach((county) => {
      let result = 'low';

      const { incidenceRate14Days } = this.countyData[county];

      if (incidenceRate14Days >= 100) {
        result = 'very-high';
      } else if (incidenceRate14Days >= 50) {
        result = 'high';
      } else if (incidenceRate14Days >= 25) {
        result = 'medium';
      } else {
        result = 'low';
      }

      this.incidenceRateMappingColorMapping[county] = result;

      const el = document.getElementById(`g-${county}`);

      this.applyLevelClassToEl(el, result);
    });
  },
};
