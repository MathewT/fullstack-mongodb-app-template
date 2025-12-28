#!/bin/bash
rm -f function.zip
zip -r function.zip node_modules/ 

cd src
zip -r ../function.zip *
cd ..


docker run --rm -it -v $HOME/.aws:/root/.aws  -v "$(pwd)":/aws amazon/aws-cli:latest --profile=<profile-name> \
	--region=us-east-1 lambda update-function-code \
	--function-name fullstack-mongodb-app \
 	--zip-file=fileb://function.zip