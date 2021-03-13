# layouts

> IMPORTANT: The layouts are work in progress and subject to major (& breaking) changes until the 1.0 release. Until then, we would encourage everyone to use a pinned version and not rely on semantic versioning.

Declarative layout elements for HTML & CSS

## Introduction

`layouts` encapsulates some of the most used building blocks for web development into a set of declarative and expressive HTML tags and attributes.

-   `layouts` is pure CSS - no JavaScript
-   `layouts` is easily (and highly) customisable
-   `layouts` is easy to drop in next to any other CSS framework
-   `layouts` is compatible with every JavaScript framework (it's just HTML & CSS)

## How to use

#### Installation

install `@webtides/layouts`

```sh
npm install --save @webtides/layouts
```

#### Using via CDN

`@webtides/layouts` can be used via CDN. This is great for prototyping and testing out layouts real fast on tools like CodePen for example.

```html
<link href="https://unpkg.com/@webtides/layouts/dist/layouts.css" rel="stylesheet" />
```

#### Use

Container layout:

```html
<container gap="16" width="fluid|contained">
    Centered container with padding left & right and 100% width or a max-width
</container>
```

Flex layout:

> Standard flex layout with flex-direction=row, align-items=center and justify-content=space-between

```html
<flex direction="row|col" align="center" justify="between">
    <item>1</item>
    <item>2</item>
    <item>3</item>
</flex>
```

Grid layout:

> Grid layout with one column on mobile and three columns starting from tablet viewports, and a gap of 16px. The second item will occupy 2 columns, and the last item will be shown first.

```html
<grid cols="1 md:3" gap="16">
    <item>1</item>
    <item cols="2">2</item>
    <item>3</item>
    <item order="first">4</item>
</grid>
```

## Documentation

For detailed documentation see the [docs](docs/README.md).

## Contributing & Development

For contributions and development see [contributing docs](.github/CONTRIBUTING.md)

## License

`layouts` is open-sourced software licensed under the MIT [license](LICENSE).
