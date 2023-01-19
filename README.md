# Dashdot React Hooks Slider

<div align="center">

# ![@dashdot/react-hooks-slider](.github/logo.png)

[![NPM Version](https://flat.badgen.net/npm/v/@dashdot/react-hooks-slider)](https://www.npmjs.com/package/@dashdot/react-hooks-slider)
[![GitHub release](https://img.shields.io/github/release/wappla/react-hooks-slider.svg?style=flat-square)](https://github.com/wappla/react-hooks-slider/releases/)  [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/react-hooks-slider/blob/master/LICENSE)  [![GitHub pull-requests](https://img.shields.io/github/issues-pr/wappla/react-hooks-slider.svg?style=flat-square)](https://GitHub.com/wappla/react-hooks-slider/pull/)  [![GitHub issues](https://img.shields.io/github/issues/wappla/react-hooks-slider.svg?style=flat-square)](https://GitHub.com/wappla/react-hooks-slider/issues/)
<!-- Add this back when build workflow is complete  -->
<!-- [![Build](https://img.shields.io/github/actions/workflow/status/react-hooks-slider/web/ci-cd.yml?branch=main&style=flat-square)](https://github.com/react-hooks-slider/web/actions) -->
<!-- Add this back when tests are added -->
<!-- [![Coverage](https://flat.badgen.net/codecov/c/github/react-hooks-slider/web)](https://app.codecov.io/gh/react-hooks-slider/web) -->

</div>

---

A headless, customizable slider for React using hooks.

## Getting Started

To get started, add `@dashdot/react-hooks-slider` to your project:

Using npm:
```shell
npm install --save @dashdot/react-hooks-slider
```

Using yarn:
```shell
yarn add @dashdot/react-hooks-slider
```

Please note that `@dashdot/react-hooks-slider` requires `react@^16.0.0` as a peer dependency.
## Usage

The package exports a single hook, useSlider, which can be used to control a slider. The hook returns an object containing various state values and functions for controlling the slider. The only requirements for using the hook are a container element and an array of slide elements, which are passed as refs.

```jsx
const {
    /* Basic usage */
    activeSlide,
    totalSlides,
    position, // returns the position using percentage
    isDisabled, // happens when slides are smaller than container
    hasPreviousSlide,
    hasNextSlide,

    /* Handlers */
    handleNextSlide, // go to next slide
    handlePreviousSlide, // go to previous slide
    handleSlideSelect, // navigate to specific slide

    /* Swiping (when using framer-motion) */
    isSwiping,
    swipingProps

    /* Refs */
    containerRef,
    slideRefs,
} = useSlider(
    initialSlideIndex, // defaults to 0
    autoplaySpeed, // time in ms to go to next slide. Defaults to 0 = inactive
    slidesAreRendered, // passes if the slides are rendered. This fixes layout issues with conditional rendering. Defaults to true
}
```


## Examples

### Basic usage

```jsx
import { useSlider } from '@dashdot/react-hooks-slider';


const {
    position,
    containerRef,
    slideRefs,
} = useSlider();

return (
    <div ref={containerRef}
        style={{
            whiteSpace: 'nowrap',
            display: 'flex',
            flexWrap: 'nowrap',
            width: '100%',
        }}
        >
        {slides.map((slide, index) => (
            <div
                key={slide.id}
                ref={(ref) => { slideRefs.current[index] = ref }}
                style={{
                    x: position,
                    width: '25rem',
                    height: '25rem',
                }}
            >
                {slide.content}
            </div>
        ))}
    </div>
);
```

### 3rd party animation / styling

You can use any sort of animation or styling.
The example below uses [tailwind](https://tailwindcss.com/) and [framer-motion](https://www.framer.com/docs/).

```jsx
const {
    position,
    hasPreviousSlide,
    hasNextSlide,
    handleNextSlide,
    handlePreviousSlide,
    slideRefs,
    containerRef,
    isDisabled,
    swipingProps,
} = useCarousel()

return (
    <motion.div
        ref={containerRef}
        animate={{ x: isDisabled || position === null ? 0 : `${position}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="whitespace-nowrap flex flex-nowrap w-full touch-pan-y"
        {...swipingProps}
    >
        {images.map((image, index) => (
            <div
                key={image.filename}
                ref={(ref) => { slideRefs.current[index] = ref }}
                className="pr-4 lg:pr-6 last:pr-0 flex-grow-0 flex-shrink-0 w-[365px] h-[288px] relative"
            >
                <div className="relative w-full h-full">
                    <Image
                        maxWidth={640}
                        src={image.filename}
                        alt={image.alt}
                        layout="fill"
                        objectFit="cover"
                        draggable={false}
                    />
                </div>
            </div>
        ))}
    </motion.div>
)
```

## Contributing

Please read [CONTRIBUTING.md](https://github.com/wappla/react-hooks-slider) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/wappla/react-hooks-slider/tags).

## Authors

* **Kevin Hurts** - *Initial work* - [Kevin Hurts](https://github.com/KevinHurts)

See also the list of [contributors](https://github.com/wappla/react-hooks-slider/graphs/contributors) who participated in this project.

## About us

[Dashdot](https://www.dashdot.be/)
We shape, build and grow ambitious digital products.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/wappla/react-hooks-slider/blob/main/LICENSE) file for details
