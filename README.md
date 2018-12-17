# learn

# IDE Setup: Cloud9 github access

Create a github [personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

```
export GIT_USER=<username>
export GIT_TOKEN=<PAC>
export GIT_EMAIL=<email>

git config credential.helper "/bin/bash /home/ec2-user/environment/learn/credential-creds.sh"
git config --global user.name "${GIT_USER}"
git config --global user.email "${GIT_EMAIL}"
```

