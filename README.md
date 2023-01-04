# Dashdot React Hooks Slider

<div align="center">

# ![@dashdot/react-hooks-slider](.github/logo.png)

[![NPM Version](https://flat.badgen.net/npm/v/@dashdot/react-hooks-slider)](https://www.npmjs.com/package/@dashdot/react-hooks-slider)
[![NPM Dependents](https://flat.badgen.net/npm/dependents/@dashdot/react-hooks-slider)](https://www.npmjs.com/package/@dashdot/react-hooks-slider)
[![Build](https://img.shields.io/github/actions/workflow/status/react-hookz/web/ci-cd.yml?branch=master&style=flat-square)](https://github.com/react-hookz/web/actions)
[![Coverage](https://flat.badgen.net/codecov/c/github/react-hookz/web)](https://app.codecov.io/gh/react-hookz/web)
[![Types](https://flat.badgen.net/npm/types/@dashdot/react-hooks-slider)](https://www.npmjs.com/package/@dashdot/react-hooks-slider)

</div>

---

A slider for react based on hooks for ultimate customizability

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
## API

### useSlider
Returns the size of the browser's window.
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

## Usage
This package can be used any way. The only 2 requirements are having a container and an array of slides which are passed as reference.

You can use any sort of animation or styling.
The example below uses [tailwind](https://tailwindcss.com/) and [framer-motion](https://www.framer.com/docs/).

## Examples

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
        className={clsx(
            'whitespace-nowrap flex flex-nowrap w-full touch-pan-y',
            isDisabled ? 'justify-center' : 'cursor-move select-none',
        )}
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
