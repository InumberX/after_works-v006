# After Works.

## Development with Docker

Start a shell such as PoworShell and navigate to the root of the project.

### Launching Containers

The container is started by executing the following command.

```shell
docker compose up -d
```

### Installing packages

Install the Node.js package.

```shell
docker compose exec frontend yarn install
```

### Execution of development tasks

Execute the following command.

```shell
docker compose exec frontend yarn dev
```

The following URL will take you to the screen.

http://localhost:3000/

- Press "Ctrl + C" to stop

### Stopping Containers

Execute the following command to stop the container.

```shell
docker compose down
```

### Syntax Check

```shell
docker compose exec frontend yarn lint
```

### Formatter

#### Check

```shell
docker compose exec frontend yarn prettier
```

#### Check and Format

```shell
docker compose exec frontend yarn prettier:fix
```

### Formatter (SCSS)

#### Check

```shell
docker compose exec frontend yarn stylelint
```

#### Check and Format

```shell
docker compose exec frontend yarn stylelint:fix
```
