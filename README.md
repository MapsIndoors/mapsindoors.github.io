# Docs for MapsIndoors iOS, Android, Web SDKs, and Integration API

This is the repository holding all documentation related to developing apps on the [MapsIndoors](https://www.mapspeople.com/mapsindoors/) platform.

---

## Getting started

The documentation site is built with [Jekyll](https://jekyllrb.com) and hosted on GitHub Pages.

Jekyll automatically builds and deploys from the `master` branch in this repository. Only members of this organization can approve Pull Requests into the `master` branch.

### Preview the site on your own machine

#### Prerequisites

[Install Docker](https://www.docker.com/products/docker-desktop)—the desktop app is great for this purpose.

#### Clone repository and run Jekyll in a temporary Docker container

1. Clone this repository to your machine:

    ```bash
    git clone git@github.com:MapsIndoors/mapsindoors.github.io
    cd mapsindoors.github.io
    ```

1. Install the Docker container and serve Jekyll from it:

    **In macOS:**

    ```bash
    docker run --name midocs --rm --volume="$PWD:/srv/jekyll" -p 4000:4000 -it jekyll/jekyll:4.0 jekyll serve --watch --drafts --config _config.yml,_config-dev.yml
    ```

    **In Windows:**

    ```bash
    docker run --name midocs --rm --volume="%cd%:/srv/jekyll" -p 4000:4000 -it jekyll/jekyll:4.0 jekyll serve --watch --drafts --config _config.yml,_config-dev.yml
    ```

    This command reads as "use Jekyll version 4.0, run it in a Docker container named `midocs`, remove the container after it's closed, serve Jekyll on <http://0.0.0.0> at port 4000, watch for changes in the Jekyll folder, include drafts"

1. Open `http://0.0.0.0:4000`

### Create a new guide

1. Create a feature branch:

    ```bash
    git checkout -b feature/teleportation-guide
    ```

1. Copy an existing `index.md`-file from e.g. `./collections/_ios/v3/search/` to `./collections/_ios/v3/teleportation/`.
1. Make sure the [Front matter](https://jekyllrb.com/docs/step-by-step/03-front-matter/) at the top of the file is formatted like this:

    ```yaml
    ---
    title: Teleportation
    guide_title: teleportation
    layout: guide
    nav_weight: 10
    published: true
    date: 2019-07-10
    last_modified_at: 2019-09-30
    ---
    ```

1. Update the `date:` to today's date (perhaps using [a handy Snippet in VS Code](https://marketplace.visualstudio.com/items?itemName=jsynowiec.vscode-insertdatestring))
1. `last_modified_at` is optional. If left empty, it won't be rendered on the tutorial-page.
1. The new guide is automatically displayed on the SDK's start page when the front matter is configured correctly.
1. Navigate to your new guide to check it out.
1. If all looks well, use `git` to add, commit and push your new guide:

    ```bash
    git status
    git add .
    git commit -m "Added new guide to Teleportation"
    git push -u origin feature/teleportation-guide
    ```

1. Go to [mapsindoors.github.io](https://mapsindoors.github.io) to see your new guide live.

### Create a new tutorial

1. Create a feature branch:

    ```bash
    git checkout -b feature/teleportation-tutorial
    ```

1. Copy an existing tutorial-`.md`-file from e.g. `./collections/_ios/v3/categories/` to `./collections/_ios/v3/teleportation/`.
1. Make sure the [Front matter](https://jekyllrb.com/docs/step-by-step/03-front-matter/) at the top of the file is formatted like this:

    ```yaml
    ---
    layout: tutorial
    title: Open an Inter-Universe Portal
    parent: teleportation
    nav_weight: 1
    published: true
    date: 2019-09-29
    last_modified_at: 2019-09-30
    ---
    ```

1. Update the `date:` to today's date (perhaps using [a handy Snippet in VS Code](https://marketplace.visualstudio.com/items?itemName=jsynowiec.vscode-insertdatestring) or [Atom](https://atom.io/packages/date))
1. `last_modified_at` is optional. If left empty, it won't be rendered on the tutorial-page.
1. The new tutorial is automatically displayed on the guide's start page when the front matter is configured correctly.
1. Navigate to your new tutorial to check it out.
1. If all looks well, use `git` to add, commit and push your new tutorial:

    ```bash
    git status
    git add .
    git commit -m "Added new Inter-Universe Portal tutorial"
    git push -u origin feature/teleportation-tutorial
    ```

1. Go to [mapsindoors.github.io](https://mapsindoors.github.io) to see your new guide live.

#### Tips

1. Use feature-branches. That makes it much easier to review new tutorials before they're live.
1. The folder structure determines the url structure of the platform, guide and tutorial pages, but setting the front matter is required for the links to be displayed in the right places. Look in `_config.yml` and `_layouts`-folder to familiarize with the code.

### Markdown

Jekyll uses Markdown ([cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)) for rendering posts to html.

Specifically, Jekyll uses a converter called [kramdown](https://kramdown.gettalong.org/index.html), which works the same as [Commonmark](https://commonmark.org) or [GitHub-flavored Markdown](https://help.github.com/en/articles/basic-writing-and-formatting-syntax), with some extra sprinkle on top. The [kramdown Quick Reference](https://kramdown.gettalong.org/quickref.html) gives an overview of the options. The major difference is the ability to add [block attributes](https://kramdown.gettalong.org/quickref.html#block-attributes) (aka. css classes) to elements without writing html, which we use to display tips and warnings on tutorials:

```markdown
> Tip: Drink plenty of water
{: .mi-tip}

> Careful! If you don't get enough water, you'll be hangry in no time.
{: .mi-careful}

> Warning! Drink water now.
{: .mi-warning}
```

#### Linting Markdown

To ensure consistency throughout the Markdown-files, we use a linter. The best linter for VS Code is the extension with the telling name "[VS Code Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)".

Two rules are turned off specifically:

* [MD013 - Line length](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md013)
* [MD033 - No inline HTML](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md033)

### Jekyll tips

Jekyll offers [some extra features](https://jekyllrb.com/docs/usage/) when previewing content on your own machine.

Here are a few of them:

1. Include all drafts, future and unpublished posts:

    ```bash
    jekyll serve --watch --drafts --future --unpublished
    ```

### FAQ

#### Why use Docker

Creating an identical environment for previewing on a local machine could only be done with Docker. Trying to get this to run on three machines spawned three different errors with Ruby, rvm, various Gems and their dependencies, and in the end this can be mitigated by running a container that has been tested end-to-end to work with a certain set of dependencies. Installing Docker is a small ask compared to the hours already wasted with debugging Ruby on macOS.

#### Docker Tips

1. Use bash in the Docker container:

    Run `docker run --rm --volume="$PWD:/srv/jekyll" -p 4000:4000 -it jekyll/jekyll:4.0 /bin/bash` (swap `$PWD` for `%cd%` if you're using Windows) to open a `bash shell` in the Docker container. This is helpful if you want to change the Jekyll command you're running in the container often, as it doesn't destroy the container once you close the command.
