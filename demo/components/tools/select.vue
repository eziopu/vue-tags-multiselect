<template>
  <!-- demo form https://codepen.io/udyux/pen/KzJQea -->
  <ul class="select" :class="disabled">
    <li>
      <input class="select_close" type="radio" name="awesomeness" id="awesomeness-close" value=""/>
      <span class="select_label select_label-placeholder"> {{ placeholder || label }}</span>
    </li>

    <li class="select_items">
      <input class="select_expand" type="radio" name="awesomeness" id="awesomeness-opener"/>
      <label class="select_closeLabel" for="awesomeness-close"></label>
      
      <ul class="select_options">
        <li class="select_option" v-for="item in values" :key="item">
          <input class="select_input"
            type="radio"
            name="awesomeness"
            :id="`${label}-${item}`"
            @click="yyy(item)"
          />
          <label class="select_label" :for="`${label}-${item}`">
            {{ item }}
          </label>
        </li>
      </ul>
      <label class="select_expandLabel" for="awesomeness-opener"></label>
    </li>
  </ul>
</template>

<script>
export default {
  name: "label-and-select",
  props: {
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    label: {
      type: String,
      default: () => {
        return "";
      },
    },
    placeholder: {
      type: String,
      default: () => {
        return "";
      },
    },
    values: {
      type: Array,
      default: () => {
        return ["true", "false"];
      },
    },
    modelValue: {
      type: String,
      default: () => {
        return "false";
      },
    },
  },
  data() {
    return {};
  },
  model: {
    prop: "value",
    event: "update:modelValue",
  },
  methods: {
    yyy(val) {
      console.log(val);
    }
  },
  computed: {
    newValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.select {
	width: 225px;
	height: 40px;
	cursor: pointer;
	background-color: white;
	box-shadow: 0 2px 0 white;
	border-radius: 2px;
	
	&_expand {
		width: 0;
		height: 40px;
		position: absolute;
		top: 0;
		right: 0;
		
		&::after {
			content: '\003E';
			position: absolute;
			top: 50%;
			right: 0;
			transform: translate(-50%, -50%) rotate(90deg) scaleY(1.75);
			color: #3e3e3e;
			font-size: 28px;
			pointer-events: none;
			z-index: 2;
			transition: all 250ms cubic-bezier(.4,.25,.3,1);
			opacity: .6;
		}
		
		&:hover::after {opacity: 1}

		&:checked::after {transform: translate(-50%, -50%) rotate(90deg) scaleX(-1) scaleY(1.75);}
	}
	
	&_expandLabel {
		display: block;
		width: 100%;
		height: 40px;
		position: absolute;
		top: 0;
		left: 0;
		cursor: pointer;
	}
	
	&_close {display: none}
	
	&_closeLabel {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		display: none;
	}
	
	&_items {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		border: 2px solid #2fb5d1;
		border-radius: 2px;
		padding-top: 40px;
	}
	
	&_input {display: none}
	
	&_label {
		transition: all 250ms cubic-bezier(.4,.25,.3,1);
		display: block;
		height: 0;
		font-size: 1.2rem;
		line-height: 40px;
		overflow: hidden;
		color: #3e3e3e;
		background-color: #fff;
		cursor: pointer;
		padding-left: 20px;
		
		&-placeholder {
			height: 40px;
			vertical-align: middle;
			position: absolute;
			top: 0;
			left: 0;
			opacity: .6;
			background-color: transparent;
		}
	}
	
	&_expand:checked {
		+ .select_closeLabel {
			display: block;
			
			+ .select_options {
				.select_label {
					height: 40px;
					&:hover {background-color: #f7f7f7}
				}
				
				+ .select_expandLabel {display: none}
			}
		}
	}
	
	&_input:checked + .select_label {
		height: 40px;
		margin-top: -40px;
	}
}
</style>