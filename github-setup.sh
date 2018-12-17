#!/bin/bash

if [ "${1}" == "init" ]; then
    SCRIPTPATH="$(realpath ${0})"
    echo "${SCRIPTPATH}"
    git config credential.helper "/bin/bash ${SCRIPTPATH}"
    git config --global user.name "${GIT_USER}"
    git config --global user.email "${GIT_EMAIL}"
else 
    echo username=${GIT_USER}
    echo password=${GIT_TOKEN}
fi

