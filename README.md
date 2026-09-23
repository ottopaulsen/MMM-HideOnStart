# HideOnStart

Module for [MagicMirror](https://github.com/MagicMirrorOrg/MagicMirror) that hides
other modules when the mirror starts.

Useful for modules that should not be visible until something asks for them, for
example a camera view that is shown by an automation when there is motion at the
door, and hidden again afterwards.

## Installation

Go to `MagicMirror/modules` and write

    git clone https://github.com/ottopaulsen/MMM-HideOnStart

There is nothing to install, the module has no dependencies.

## Configuration

Here is an example configuration with description. Put it in the
`MagicMirror/config/config.js` file:

```javascript
{
  module: 'MMM-HideOnStart',
  config: {
    modules: ['MMM-EmbedURL'], // Names of the modules to hide on start
  }
},
```

The module itself displays nothing, so it needs no `position`.

### Configuration options

| Option    | Default | Description                                                                                                                 |
| --------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `modules` | `[]`    | Names of the modules to hide when the mirror starts. Use the module name as written in `config.js`, for example `MMM-Tibber`. |

All instances of a module with the given name are hidden.

## Showing the modules again

The modules are hidden without a lock string, so anything that shows a module
works as usual afterwards, for example
[MMM-Remote-Control](https://github.com/Jopyth/MMM-Remote-Control):

    curl http://localhost:8080/api/module/MMM-EmbedURL/show
    curl http://localhost:8080/api/module/MMM-EmbedURL/hide

## How it works

The modules are hidden when the `DOM_OBJECTS_CREATED` notification arrives.

This matters: MagicMirror sends `ALL_MODULES_STARTED` *before* it creates the
DOM elements, so hiding a module at that point only sets the module's `hidden`
flag. The element is created afterwards, and because
`updateDomWithContent()` returns early for a module that is already hidden, the
hiding is never applied to the element. The module stays on screen with
`opacity: 1` even though it reports itself as hidden. Waiting for
`DOM_OBJECTS_CREATED` means the element exists and really gets hidden.

## CSS

The module renders nothing of its own, so there is no CSS to override.
