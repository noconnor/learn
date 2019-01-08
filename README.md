# Explorer app

Analyse, store and aggregate uploaded data sources. 
Group by common themes and provide an interface to explore these sources.

### Environment: Cloud9
Create a github [personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

```
export GIT_USER=<username>
export GIT_TOKEN=<PAC>
export GIT_EMAIL=<email>

./github-setup.sh init # init github access
./c9-resize 20 # resize instance to 20GB disk

```

### Setting up a project from scratch

* [NPM setup](#setup-latest-npm-version) - setting up the NPM environment
* [Create React App](#create-a-react-app) - creating a basic react app
* [Configure Amplify](#configure-aws-amplify) - installing an configuring amplify
* [Create Cognito user pool](#add-cognito-user-pool) - creating a cognito user pool for auth
* [Create a lambda](#create-a-python-lambda) - creating and publishing an aws lambda
* [Create AWS API Gateway](#create-aws-api-gateway) - creating an API Gateway and linking to an existing lambda
* [Deploy lambda code](#deploy-python-lambda ) - deploying/updating a lambda
* [Deploy react APP to s3](#deploy-react-app-to-s3) - deploy react app to s3

<br />

##### Setup latest npm version

```
nvm ls
npm install npm@latest -g
nvm alias default stable
```
<br />

##### Create a react app

Create a basic react app ([full docs](https://facebook.github.io/create-react-app/docs/getting-started#npm))

```
export REACT_APP=ui_react
mkdir ${REACT_APP} & cd ${REACT_APP}

npx create-react-app ${REACT_APP}
npm start # start ui
```

See `package.json` for custom settings (i.e. setting `NODE_PATH=./src/` to allow import relative to project root)

<br />

##### Configure AWS amplify

AWS Amplify can be used to create Cognito pools and API Gateways required to suport your app ([full docs](https://aws-amplify.github.io/docs/))

Amplify workflow: https://aws-amplify.github.io/docs/cli/multienv?sdk=js

```
cat ~/.aws/credentials 
export AWS_ACCESS_KEY_ID=*****************
export AWS_SECRET_ACCESS_KEY=*****************

npm install -g @aws-amplify/cli
npm install -g @aws-amplify/cli@multienv
npm install --save aws-amplify aws-amplify-react

amplify init
amplify configure
```
<br />

##### Add cognito user pool

Create a AWS Cognito userpool

```
# run commands and follow console prompts
amplify add auth
amplify push
amplify status
```
<br />

##### Create a python lambda
Create a basic python lambda WITH _api gateway_ ([full docs](https://serverless.com/framework/docs/providers/aws/))

_NOTE: this api gateway links to existing cognito user pool created above ([see stackoverflow](https://stackoverflow.com/a/41664843))_

```
export LAMBDA_DIR=url_manager/lambda
export LAMBDA_NAME=urls
export SERVICE_NAME=urls
export HANDLER=handler.doSomething
export COGNITO_ARN=arn:aws:cognito-idp:eu-west-1:...:userpool/eu-west-...

mkdir -p ${LAMBDA_DIR} && cd ${LAMBDA_DIR}

npm install -g serverless
serverless create --template aws-python3 --name ${LAMBDA_NAME}

# edit serverless.yml 
echo "
service: ${SERVICE_NAME}

custom:
    authorizer:
        arn: ${COGNITO_ARN}
        resultTtlInSeconds: 0
        identitySource: method.request.header.Authorization
        identityValidationExpression: '.*'

provider:
  name: aws
  runtime: python3.7
  stage: prod
  region: eu-west-1

functions:
  ${LAMBDA_NAME}:
    handler: ${HANDLER}
    events:
      - http:
          path: /${LAMBDA_NAME}
          method: POST
          cors: true
          authorizer: ${self:custom.authorizer}
      - http:
          path: /${LAMBDA_NAME}
          method: OPTIONS
          cors: true
    
" > serverless.yml

```
<br />


##### Deploy python lambda


```
export LAMBDA_NAME=urls

serverless deploy

# or

serverless deploy function -f ${LAMBDA_NAME}

# to remove an lambda run:
serverless remove
```
<br />

##### Deploy react APP to s3
This will deploy a react app to an S3 bucket.
It is assumed there is an existing domain and cloudfront setup in place to access your s3 site.

```
export BUCKET=explorer.noconnor.xyz
export REACT_APP=ui_react

cd ${REACT_APP}

npm run build
aws s3 sync --delete build/ s3://${BUCKET}
```
<br />
