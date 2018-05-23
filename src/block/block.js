/**
 * BLOCK: guten-slider
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

// External deps

//  Import CSS.
import "./style.scss";
import "./editor.scss";

// Sub components
import { default as edit } from "./edit";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const { MediaUpload } = wp.editor;
const { Button } = wp.components;

const attributes = {
	slides: {
		type: "number",
		default: 1
	},
	imgID: {
		type: "number"
	},
	thumbs: {
		type: "array",
		default: [],
		source: "query",
		selector: ".block--slides-container li",
		query: {
			url: {
				source: "attribute",
				selector: "img",
				attribute: "src"
			},
			alt: {
				source: "attribute",
				selector: "img",
				attribute: "alt",
				default: ""
			},
			id: {
				source: "attribute",
				selector: "img",
				attribute: "data-id"
			}
		}
	}
};

registerBlockType("cgb/block-guten-slider", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Guten Slider"), // Block title.
	icon: "images-alt2", // Block icon from Dashicons.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__("guten-slider — CGB Block"),
		__("CGB Example"),
		__("create-guten-block")
	],
	attributes,

	edit,

	save: function(props) {
		const {
			attributes: { slides, thumbs, imgID },
			className
		} = props;

		return (
			<div className={className}>
				<ul className={`block--slides-container slides-${slides}`}>
					{thumbs.map((thumb, i) => (
						<li key={i}>
							<img data-id={thumb.id} src={thumb.url} alt={thumb.alt} />
						</li>
					))}
				</ul>
			</div>
		);
	}
});
