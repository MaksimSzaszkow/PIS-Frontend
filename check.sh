#!/bin/bash
case "$1" in
    test)
        npm run test:coverage
        ;;

    check-image)
        if docker image list | grep front; then
            docker rmi front
        fi
        ;;

    check-ps)
        if docker ps -a | grep front; then
            docker rm front --force
        fi
        ;;
esac
exit 0