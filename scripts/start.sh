#!/bin/sh

####################################################################################

UID=$(id -u);
GID=$(id -g);

SCRIPT_DIR=$(dirname "$(realpath "$0")");
PROJ_ROOT_DIR=$(dirname "$SCRIPT_DIR");

NPM_FE_CACHE_FOLDER="cache/fe";
ERR_LOG_FILE=compose_err_logs.txt;

####################################################################################

check_prerequisites() {
    if ! docker --version 1> /dev/null 2> /dev/null; then
        printf "\nDocker engine not installed, you may follow this: https://docs.docker.com/engine/install";
        printf "\n\n";
        exit 1;
    fi
    if ! docker compose version 1> /dev/null 2> /dev/null; then
        printf "\nDocker compose not installed, you may follow this: https://docs.docker.com/compose/install/linux/#install-the-plugin-manually";
        printf "\n\n";
        exit 1;
    fi

    return 0;
}

start() {
    rm "$ERR_LOG_FILE" 1> /dev/null 2> /dev/null;

    # When a folder exists and is only populated the permissions of the populated
    # file(s) take on the permission of the root folder, hence the current user
    mkdir -p "$NPM_FE_CACHE_FOLDER";

    printf "Building Application...\n\n";

    printf "Do you wish to recreate the images? (y/n) ";
    read -r opn;
    if [ "${opn:-n}" = "y" ]; then
        if ! UID="$UID" GID="$GID" docker compose build; then
            printf "\nDocker build failed. Solve the errors displayed above and try again\n";
            exit 1;
        fi
    fi

    if ! UID="$UID" GID="$GID" docker compose up -d --wait; then
        for service in $(UID="$UID" GID="$GID" docker compose config --services); do
            health_status=$(docker inspect --format '{{.State.Health.Status}}' "$service");
            if [ "$health_status" != "healthy" ]; then
                docker logs "$service" 2>> "$ERR_LOG_FILE";
            fi
        done
        cat "$ERR_LOG_FILE";
        printf "\n\nDocker run failed. The logs are displayed above. Use them to solve the issue(s) and try again\n\n";
        exit 1;
    fi

    return 0;
}

####################################################################################

cd "$SCRIPT_DIR" || exit 1;

check_prerequisites;
start;

printf "\nApplication is running\n\n";
