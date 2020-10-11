import IrelandMap from '@/assets/ireland_map.svg';
import util from '@/util';
import { mapState } from 'vuex';

const LOW_INCIDENCE_RATE_COLORS = { normal: '#016118', hover: '#029324' }; // <= 25
const MEDIUM_INCIDENCE_RATE_COLORS = { normal: '#8e5506', hover: '#a66407' }; // > 25 && <= 50;
const HIGH_INCIDENCE_RATE_COLORS = { normal: '#bf3100', hover: '#d93800' }; // > 50 && <= 100;
const VERY_HIGH_INDICENCE_RATE_COLORS = { normal: '#2d044a', hover: '#460673' }; // > 100;

export default {
  name: 'CountyBreakdown',

  components: {
    IrelandMap,
  },

  data() {
    return {
      currentHoverBoundary: null,
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
    onMouseEnter(e) {
      // If we're not hovering over a path
      // We shouldnt show the tooltip anymore
      if (e.target.tagName !== 'path') {
        this.isTooltipVisible = false;

        // Also reset the old paths hover style
        if (this.currentHoverBoundary) {
          this.currentHoverBoundary.style.fill = this.incidenceRateMappingColorMapping[this.currentHoverBoundaryName].normal;
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
        this.currentHoverBoundary.style.fill = this.incidenceRateMappingColorMapping[this.currentHoverBoundaryName].normal;
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
      const { totalCases, totalCases14Days, incidenceRate14Days } = this.countyData[hoveredCounty];
      this.currentCountyCases = util.formatNumber(totalCases);
      this.currentCounty14DayCases = util.formatNumber(totalCases14Days);
      this.currentCounty14DayIncidenceRate = util.formatNumber(incidenceRate14Days);
      this.currentCountyName = `${hoveredCounty.substring(0, 1).toUpperCase()}${hoveredCounty.substring(1)}`;
      this.currentHoverBoundaryName = this.currentCountyName.toLowerCase();

      // Path hover style
      boundaryEl.style.fill = this.incidenceRateMappingColorMapping[this.currentHoverBoundaryName].hover;

      // Set the tooltips new position, somewhere centerish of the path outline
      const iconPos = textEl.getBoundingClientRect();
      this.popupLeft = `${iconPos.right + 15}px`;
      this.popupTop = `${iconPos.top + (iconPos.height / 2) - 10}px`;

      this.isTooltipVisible = true;
    },
  },

  mounted() {
    Object.keys(this.countyData).forEach((county) => {
      let result = 'l';

      const { incidenceRate14Days } = this.countyData[county];

      if (incidenceRate14Days >= 100) {
        result = VERY_HIGH_INDICENCE_RATE_COLORS;
      } else if (incidenceRate14Days >= 50) {
        result = HIGH_INCIDENCE_RATE_COLORS;
      } else if (incidenceRate14Days >= 25) {
        result = MEDIUM_INCIDENCE_RATE_COLORS;
      } else {
        result = LOW_INCIDENCE_RATE_COLORS;
      }

      this.incidenceRateMappingColorMapping[county] = result;

      const el = document.getElementById(county);

      el.style.fill = result.normal;
    });
  },
};
