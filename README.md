# learn

# AWS cli: Uploading to s3

To deploy UI execute the following:

```
cd ${PROJECT_ROOT}/ui_react
aws s3 cp --recursive build/ s3://learn.noconnor.xyz
```

# IDE Setup: Cloud9

## React Setup

```
nvm install 8
npm install npm@latest -g
```

### Github Access
Create a github [personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

```
export GIT_USER=<username>
export GIT_TOKEN=<PAC>
export GIT_EMAIL=<email>

./github-setup.sh init

```
