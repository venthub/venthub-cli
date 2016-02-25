# venthub-cli
Interactive VentHub Shell, for your interactive VentHub needs

## Usage
Install the CLI via `npm i -g venthub-cli` and run the command `ventsh`.

## Available Commands
### `start [port]`
Start a new VentHub instance for this shell.

### `status`
Check your VentHub status

### `publish <type> [payload] [fragment]`
Publish through the VentHub an action of type `type`.

`payload`, if provided, should be either JSON encoded or an underscore (_), indicating a null value.

`fragment`, if provided, should be a JSON encoded plain object that will be merged into the resulting action object.