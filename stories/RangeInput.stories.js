import { storiesOf } from '@storybook/vue';
import { previewWrapper } from './utils';

import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import Vue from 'vue';
Vue.use(Vuetify);

storiesOf('ais-range-input', module)
  .addDecorator(previewWrapper())
  .add('default', () => ({
    template: `
      <ais-range-input attribute="price" />
    `,
  }))
  .add('with precision', () => ({
    template: `
      <ais-range-input attribute="price" :precision="3" />
    `,
  }))
  .add('with min', () => ({
    template: `
      <ais-range-input attribute="price" :min="10" />
    `,
  }))
  .add('with max', () => ({
    template: `
      <ais-range-input attribute="price" :max="40" />
    `,
  }))
  .add('with min and max', () => ({
    template: `
      <ais-range-input attribute="price" :min="10" :max="50" />
    `,
  }))
  .add('with a custom render', () => ({
    template: `
      <ais-range-input attribute="price">
        <template slot-scope="{ refine, currentRefinement }">
          <form  @submit.prevent="refine({ min, max })" >
            <label>
              <input
                type="number"
                :max="this.max"
                :placeholder="this.max"
                :value="currentRefinement.min"
                @change="min = $event.currentTarget.value"
              />
            </label>
            <span>to</span>
            <label >
              <input
                type="number"
                :min="this.min"
                :placeholder="this.max"
                :value="currentRefinement.max"
                @change="max = $event.currentTarget.value"
              />
            </label>
            <button type="submit">Go</button>
          </form>
        </template>
      </ais-range-input>
    `,
    data() {
      return {
        min: undefined,
        max: undefined,
      };
    },
  }))
  .add('with vue-slider-component', () => ({
    template: `
      <ais-range-input attribute="price">
        <template
          slot-scope="{
            refine,
            currentRefinement: { min: minValue, max: maxValue },
            range: { min: minRange, max: maxRange }
          }"
        >
          <vue-slider
            :min="minRange"
            :max="maxRange"
            :lazy="true"
            :value="[
              minValue !== null ? minValue : minRange,
              maxValue !== null ? maxValue : maxRange,
            ]"
            @change="refine({ min: $event[0], max: $event[1] })"
          />
        </template>
      </ais-range-input>
    `,
    components: { VueSlider },
  }))
  .add('with vuetify slider', () => ({
    template: `
    <v-app>
      <v-container mt-4>
        <ais-range-input attribute="price">
          <template
            slot-scope="{
              refine,
              currentRefinement: { min: minValue, max: maxValue },
              range: { min: minRange, max: maxRange }
            }"
          >
            <v-range-slider
              :min="minRange"
              :max="maxRange"
              :value="[
                minValue !== null ? minValue : minRange,
                maxValue !== null ? maxValue : maxRange,
              ]"
              @input="refine({min: $event[0], max: $event[1]})"
              thumb-label="always"
            />
          </template>
        </ais-range-input>
      </v-container>
    </v-app>
    `,
  }))
  .add('with a Panel', () => ({
    template: `
      <ais-panel>
        <template slot="header">Range Input</template>
        <ais-range-input attribute="price" />
        <template slot="footer">Footer</template>
      </ais-panel>
    `,
  }));
