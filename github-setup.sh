#!/bin/bash

if [ ${1} == "init" ]; then
    SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
    git config credential.helper "/bin/bash ${SCRIPTPATH}"
    git config --global user.name "${GIT_USER}"
    git config --global user.email "${GIT_EMAIL}"
else 
    echo username=${GIT_USERNAME}
    echo password=${GIT_TOKEN}
fi

