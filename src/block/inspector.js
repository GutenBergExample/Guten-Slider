/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.editor;
const { PanelBody, PanelRow, RangeControl } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const {
			attributes: { slides },
			onChangeNumberSlides
		} = this.props;

		return (
			<InspectorControls key="inspector">
				<PanelBody title={__("Slider Options")}>
					<RangeControl
						label={__("Number of Slides")}
						value={slides}
						onChange={onChangeNumberSlides}
						min={1}
						max={6}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
