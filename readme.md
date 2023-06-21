# Ataraxia README -

## About

Ataraxia is a user-friendly, customizable comic reader. It reads images in RAR
archives (CBR).

It is written in Javascript and uses Electron.

# Usage

```
    # git clone https://github.com/ccaballero/ataraxia.git
    # cd ataraxia
    # yarn install

    # to run in development mode
    # yarn run dev

    # to build
    # yarn run package
```

# Install

```bash
$ yarn
```

# Development

```bash
$ yarn dev
```

## Build

```bash
# For windows
$ yarn build:win

# For macOS
$ yarn build:mac

# For Linux
$ yarn build:linux
```

# Dependencies

Ataraxia needs unrar, and sort commands:

```
    # equery belongs unrar
     * Searching for unrar ...
    app-arch/rar-6.12 (/opt/bin/unrar -> ../rar/unrar)
    app-arch/unrar-6.1.7 (/usr/bin/unrar)

    # equery belongs sort
     * Searching for sort ...
    sys-apps/coreutils-9.1-r1 (/usr/bin/sort -> ../../bin/sort)
    sys-apps/coreutils-9.1-r1 (/bin/sort)
```

# Credits

Thanks to everyone who have contributed translations, suggestions, bug
reports, and fixes.

