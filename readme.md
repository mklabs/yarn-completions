# yarn-completions

[tabtab](https://github.com/mklabs/node-tabtab) completion handler for
[Yarn](https://github.com/yarnpkg/yarn). Supports bash, zsh or fish.

---

## Install

**with npm**

    npm i -g yarn-completions

On install, the package will add a line to source a SHELL specific config file,
into either `~/.bashrc`, `~/.zshrc` or `~/.config/fish/config.fish`.

On uninstall, these lines will be removed.

    npm uninstall yarn-completions -g

**with yarn**

    yarn global add yarn-completions

Uninstall, with

    yarn global remove yarn-completions

## Description

Example of completion results for zsh:

**list all available commands and flags**

    $ yarn
    config               clean            check      cache
    dedupe               prune            help
    generate-lock-entry  global           init       info
    --global-folder      access           bin        add
    licenses             install          login      link
    lockfile             version          upgrade    why
    outdated             logout           owner      ls
    --prefer-offline     --strict-semver  --offline  --json
    publish              remove           pack       run
    self-update          unlink           team       tag     --
    --help               -h                                  -- output usage information
    --modules-folder                                         -- rather than installing modules into the node_modules folder relat
    --mutex                                                  -- use a mutex to ensure only one yarn instance is executing
    --packages-root                                          -- rather than storing modules into a global packages root, store th
    --version            -V                                  -- output the version number

**list subcommands and command specific option**

    $ yarn global
    --global-folder   --strict-semver  --json
    --prefer-offline  --offline        remove  bin  add  ls  --
    --help            -h                                     -- output usage information
    --modules-folder                                         -- rather than installing modules into the node_modules folder relat
    --mutex                                                  -- use a mutex to ensure only one yarn instance is executing
    --packages-root                                          -- rather than storing modules into a global packages root, store th
    --version         -V                                     -- output the version number

    $ yarn install
    --flat                                                         -- only allow one version of a package
    --global-folder    --json
    --ignore-optional  --ignore-scripts  --force        --prod
    --prefer-offline   --strict-semver    --production  --offline  --
    --har                                                          -- save HAR output of network traffic
    --help             -h                                          -- output usage information
    --ignore-engines                                               -- ignore engines check
    --modules-folder                                               -- rather than installing modules into the node_modules folder
    --mutex                                                        -- use a mutex to ensure only one yarn instance is executing
    --no-lockfile                                                  -- don't read or generate a lockfile
    --packages-root                                                -- rather than storing modules into a global packages root, st
    --pure-lockfile                                                -- don't generate a lockfile
     --save            -S                                          -- DEPRECATED - save package to your `dependencies`
     --save-dev        -D                                          -- DEPRECATED - save package to your `devDependencies`
     --save-exact       --global         -E             -g
     --save-tilde      -T                                          -- DEPRECATED
     --save-optional   -O                                          -- DEPRECATED - save package to your `optionalDependencies`
     --save-peer       -P                                          -- DEPRECATED - save package to your `peerDependencies`
    --version          -V                                          -- output the version number

Some commands have more granular completion handlers defined in their own
completion file (in [lib/completions](./lib/completions)).  Slightly more
elaborated completion handlers may be developped for each specific command that
would make sense.

`yarn config get` or `yarn config set`

    $ yarn config set
    ignore-optional      ignore-scripts    save-prefix
    user-agent           registry
    version-git-message  init-license      init-version
    version-tag-prefix   version-git-sign  version-git-tag  --

`yarn run` that completes with package.json's script fields for instance.

    $ yarn run
    postuninstall  postinstall  prepublish  babel  test
    watch                                                --

`yarn link` completes based off the links found in `~/.yarn-cache/.link`.

    $ yarn link
    yarn-completions  tiny-lr  tabtab  --

`yarn unlink` completes based off the links found in `node_modules` folder, and
the one found in `~/.yarn-cache/.link`

    $ yarn unlink
    tabtab    --

`yarn outdated` completes based off dependencies and devDependencies found in project's package.json

    $ yarn outdated
    babel-preset-es2015  npm-watch  babel-cli  yarn
    lodash.intersection  user-home  tabtab     lodash  --

same goes for `yarn remove`, completing based off dependencies and
devDependencies found in project's package.json

    $ yarn remove
    babel-preset-es2015  npm-watch  babel-cli  yarn
    lodash.intersection  user-home  tabtab     lodash  --
