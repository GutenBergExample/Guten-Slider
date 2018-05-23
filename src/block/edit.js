// pick so we can grab only certain properties from our image
import pick from "lodash/pick";
import times from "lodash/times";

const { Component, Fragment } = wp.element;

const { MediaUpload, InspectorControls } = wp.editor;
const { Button, PanelBody, PanelRow, RangeControl } = wp.components;

const { __ } = wp.i18n;

export default class SliderEdit extends Component {
	// 1. Get teh existing thumbs attr (in case saved)
	// 2. Use times to create a blank arr for each column

	constructor() {
		super(...arguments);
		this.onSelectImage = this.onSelectImage.bind(this);
		this.onChangeNumberSlides = this.onChangeNumberSlides.bind(this);

		this.state = {
			thumbs: []
		};
	}

	componentDidMount() {
		const { thumbs, slides } = this.props.attributes;

		// if there is no thumbs i.e. a new block the length will be 0

		if (thumbs.length) {
			this.setState({
				thumbs
			});
		} else {
			// lets make a new array with -ve id's
			times(slides, index => {
				const thumb = {
					alt: "",
					id: -1,
					url: ""
				};

				this.setState({
					thumbs: [...thumbs, thumb]
				});
				console.log("one thumb found" + index);
			});
		}
	}

	onSelectImage(index, image) {
		// we need to update the state at that particular index
		const THUMBS = this.state.thumbs;

		// pick gets only certain properties
		THUMBS[index] = pick(image, ["alt", "id", "url"]);

		this.setState({
			thumbs: THUMBS
		});

		this.props.setAttributes({
			thumbs: THUMBS
		});
	}

	onChangeNumberSlides(slides) {
		const prevSlideIndex = this.props.attributes.slides - 1;

		console.log("prev index: " + prevSlideIndex);

		this.props.setAttributes({
			slides
		});

		const index = slides - 1;
		console.log("current index: " + index);

		// in this case the number of columns has been reduced
		// so lets remove from the array
		if (prevSlideIndex > index) {
			const THUMBS = this.state.thumbs.slice(0, -1);

			this.setState({
				thumbs: THUMBS
			});

			this.props.setAttributes({
				thumbs: THUMBS
			});
		} else {
			const thumb = {
				alt: "",
				id: -1,
				url: ""
			};

			const THUMBS = this.state.thumbs;
			THUMBS[index] = thumb;

			this.setState({
				thumbs: THUMBS
			});

			this.props.setAttributes({
				thumbs: THUMBS
			});
		}
	}

	render() {
		const {
			attributes: { slides, thumbs, imgID },
			className,
			isSelected,
			onChangeNumberSlides
		} = this.props;

		return (
			<div className={className}>
				<InspectorControls key="inspector">
					<PanelBody title={__("Slider Options")}>
						<RangeControl
							label={__("Number of Slides")}
							value={slides}
							onChange={this.onChangeNumberSlides}
							min={1}
							max={8}
						/>
					</PanelBody>
				</InspectorControls>

				{JSON.stringify(thumbs)}

				<ul className={`editor--slides-container columns-${slides}`}>
					{this.state.thumbs.map((thumb, i) => (
						<li key={i}>
							{!thumb.id || thumb.id == -1 ? (
								<MediaUpload
									onSelect={this.onSelectImage.bind(this, i)}
									type="image"
									value={thumb.id}
									render={({ open }) => (
										<Button className={"button button-large"} onClick={open}>
											{__(" Upload Image", "jsforwpblocks")}
										</Button>
									)}
								/>
							) : (
								<img src={thumb.url} alt={thumb.alt} />
							)}
						</li>
					))}
				</ul>
			</div>
		);
	}
}
