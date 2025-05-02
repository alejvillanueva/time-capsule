export default {
	ignoreFiles: [
		"dist/**/*",
		"node_modules/**/*",
		"src/styles/partials/_variables.scss",
	],
	extends: [
		"stylelint-config-standard", // Base rules
	],
	plugins: ["stylelint-scss", "stylelint-order"],
	rules: {
		// Optional cleanups
		"no-empty-source": null,
		"scss/at-rule-no-unknown": true,

		// Order of rule blocks
		"order/order": [
			"custom-properties",
			"dollar-variables",
			"at-variables",
			{
				type: "at-rule",
				name: "include",
			},
			"declarations",
			{
				type: "at-rule",
				name: "media",
			},
			"rules",
		],

		// Order of individual properties
		"order/properties-order": [
			[
				// Box model
				"display",
				"position",
				"top",
				"right",
				"bottom",
				"left",
				"z-index",
				"flex",
				"flex-grow",
				"flex-shrink",
				"flex-basis",
				"justify-content",
				"align-items",
				"gap",
				"order",
				"float",
				"clear",
				"box-sizing",

				// Dimensions
				"width",
				"min-width",
				"max-width",
				"height",
				"min-height",
				"max-height",

				// Spacing
				"margin",
				"margin-top",
				"margin-right",
				"margin-bottom",
				"margin-left",
				"padding",
				"padding-top",
				"padding-right",
				"padding-bottom",
				"padding-left",

				// Borders
				"border",
				"border-radius",
				"box-shadow",

				// Colors & background
				"background",
				"background-color",
				"color",

				// Typography
				"font",
				"font-size",
				"font-weight",
				"line-height",
				"text-align",
				"text-decoration",
				"text-transform",
				"letter-spacing",
				"white-space",
				"word-break",

				// Animation
				"transition",
				"animation",

				// Misc
				"cursor",
				"overflow",
				"visibility",
				"opacity",
				"pointer-events",
			],
			{
				unspecified: "bottomAlphabetical",
				emptyLineBeforeUnspecified: "always",
			},
		],
	},
};
