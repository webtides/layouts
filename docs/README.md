# layouts

Declarative layout elements for HTML & CSS

## Introduction

`layouts` encapsulates some of the most used building blocks for web development into a set of declarative and expressive HTML tags and attributes.

-   `layouts` is pure CSS - no JavaScript
-   `layouts` is easily (and highly) customisable
-   `layouts` is easy to drop in next to any other CSS framework
-   `layouts` is compatible with every JavaScript framework (it's just HTML & CSS)

### Why layouts

When Bootstrap v4 started to introduce utility classes we quickly fell in love. Tailwind CSS took the utility approach to a whole new level. We haven't looked back since!

In most cases you can extract cluttered and repeated classes into frontend components. But sometimes - and that is especially the case for layouts like flex and grid which you can't always extract - things will get really hard to parse. It gets worse when you're also mixing it with other utility classes and have more than one responsive variant.

For example:

```html
<div class="bg-white text-grey-800 border border-grey rounded-sm shadow-sm hover:shadow-lg">
    <div class="grid grid-cols-6 gap-4">
        <div class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-5 xl:col-span-2"></div>
        <div class="col-span-3 sm:col-span-2 md:col-span-3 lg:col-span-1 xl:col-span-4"></div>
        <div class="col-span-3 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-2"></div>
        <div class="col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-4"></div>
    </div>
</div>
```

With `layouts` we can easily write this declaratively.

```html
<div class="bg-white text-grey-800 border border-grey rounded-sm shadow-sm hover:shadow-lg">
    <grid cols="6" gap="4">
        <item cols="6 sm:4 md:3 lg:5 xl:2"></item>
        <item cols="3 sm:2 md:3 lg:1 xl:4"></item>
        <item cols="3 sm:2 md:3 lg:4 xl:2"></item>
        <item cols="6 sm:4 md:3 lg:2 xl:4"></item>
    </grid>
</div>
```

## Getting Started

### Installation

1. Normally you would install `@webtides/layouts` via npm:

```sh
npm install @webtides/layouts
```

2. Since PostCSS v8 you will also have to install `postcss` as it is no longer bundled with each plugin.

```sh
npm install postcss
```

2. Add `@webtides/layouts` to your `postcss.config.js` file

```javascript
module.exports = {
    plugins: [
        // ...
        require('@webtides/layouts').default({
            //config
        }),
        require('autoprefixer')
        // ...
    ]
};
```

3. Add the `layouts` at-rule to your CSS file

```css
@layouts all;
```

4. Compile/bundle

Compile and bundle your CSS files. `layouts` is now ready to use in your HTML.

### Using via CDN

`@webtides/layouts` can be used via CDN. This is great for prototyping and testing out layouts real fast on tools like CodePen for example.

```html
<link href="https://unpkg.com/@webtides/layouts/dist/layouts.css" rel="stylesheet" />
```

> Please note that `@webtides/layouts` is highly configurable, and many features that make it really great are not possible when using it via CDN. This is only for prototyping.

## Configuration

`@webtides/layouts` is highly configurable from the start. When adding `@webtides/layouts` to your `postcss.config.js` file you can pass in an object for configuration.

The following example shows the current default settings for all global attributes and all plugins.

```javascript
module.exports = {
    plugins: [
        // ...
        require('@webtides/layouts')({
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px'
            },
            gap: {
                0: '0',
                4: '4px',
                8: '8px',
                16: '16px',
                24: '24px',
                32: '32px',
                64: '64px'
            },
            plugins: {
                container: {
                    selector: 'container',
                    center: true,
                    fixWidthToScreen: true,
                    maxWidth: '1440px',
                    defaults: {
                        gap: {
                            default: '16px'
                            // md: '24px',
                            // xl: '32px',
                        }
                    }
                },
                flex: { selector: 'flex' },
                grid: {
                    selector: 'grid',
                    defaults: {
                        gap: {
                            default: '16px'
                            // md: '24px',
                            // xl: '32px',
                        }
                    }
                },
                item: { selector: 'item' }
            }
        })
        // ...
    ]
};
```

### Is it ok to use unknown html elements?

We think so! Since the addition of custom-elements HTML will be valid not only for the initial elements added by the HTML5 spec, but also for any other elements. The browser will fallback for any unknown element to the HTMLUnknownElement. The HTMLUnknownElement is noting more or less than a HTMLDivElement. So it should be equally safe to use `container`, `flex`, `grid` and `item` as any other `div`.

If you still have concerns about using `@webtides/layouts` like this - you can of course change them to something else.

```javascript
module.exports = {
    plugins: [
        // ...
        require('@webtides/layouts')({
            plugins: {
                container: {
                    selector: '.container'
                },
                flex: { selector: '.flex' },
                grid: {
                    selector: '.grid'
                },
                item: { selector: '.item' }
            }
        })
        // ...
    ]
};
```

> When using classes as the element selector please make sure they don't clash with other CSS frameworks

Another option could be `layout` attributes.

```javascript
module.exports = {
    plugins: [
        // ...
        require('@webtides/layouts')({
            plugins: {
                container: {
                    selector: '[layout=container]'
                },
                flex: { selector: '[layout=flex]' },
                grid: {
                    selector: '[layout=grid]'
                },
                item: { selector: '[layout=item]' }
            }
        })
        // ...
    ]
};
```
