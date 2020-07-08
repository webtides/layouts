# layouts

Declarative layout elements for HTML & CSS

## Introduction

`layouts` encapsulates some of the most used building blocks for web development into a set of declarative and expressive HTML tags and attributes.

* `layouts` is pure CSS - no JavaScript
* `layouts` is easily (and highly) customisable
* `layouts` is easy to drop in next to any other CSS framework
* `layouts` is compatible with every JavaScript framework (it's just HTML & CSS)

## How to use

#### Installation

`layouts` can be used via CDN:

```sh
<link rel="stylesheet" href="https://unpkg.com/@webtides/layouts@latest/css/layouts.css"/>
``` 

or via npm: 

```sh
npm install @webtides/layouts
```

#### Use

Container layout:

```html
<body>
    <container gap="16">
        Centered container with padding left & right and a max-width
    </container>
</body>
```

```html
<body>
    <container gap="16" width="fluid">
        Centered container with padding left & right and 100% width
    </container>
</body>
```

Flex layout (horizontal):
> Standard flex layout with flex-direction=row, align-items=center and justify-content=space-between

```html
<body>
    <flex align="center" justify="between">
        <item>1</item>
        <item>2</item>
        <item>3</item>
    </flex>
</body>
```

Flex layout (vertical):

```html
<body>
    <flex direction="col">
        <item>1</item>
        <item>2</item>
        <item>3</item>
    </flex>
</body>
```

Row layout:

```html
<body>
    <row gap="16">
        <item>1</item>
        <item>2</item>
        <item>3</item>
        <item>4</item>
    </row>
</body>
```

## Documentation

For detailed documentation see the [Docs](docs/README.md).

## Development

### We use eslint and prettier to ensure good code quality

Prettier will run automatically when staging files via `git`.
To run the linter manually - simply run `npm run lint`.

### Git Branching

We use a trunk-based development workflow.

> In the trunk-based development model, all developers work on a single branch with open access to it. Often it’s simply the master branch. They commit code to it and run it. It’s super simple.
> In some cases, they create short-lived feature branches. Once code on their branch compiles and passes all tests, they merge it straight to master. It ensures that development is truly continuous and prevents developers from creating merge conflicts that are difficult to resolve.

As a Release is complete the master branch will be tagged with the new release version.

### Pull Requests 

Pull requests should take place whenever a: 

- FEATURE is about to be finished
- RELEASE is about to be finished   

When all Reviewers approved a PR the feature/release may be finished locally and pushed to the remote

## License

`layouts` is open-sourced software licensed under the MIT [license](LICENSE).
