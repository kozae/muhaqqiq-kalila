#!/bin/bash

ENV=$1

if [[ -z "$ENV" || ( "$ENV" != "dev" && "$ENV" != "prod" ) ]]; then
    echo "Error: ENV argument is either missing or invalid. It should be either 'dev' or 'prod'."
    exit 1
fi


declare -a stackNames=("KalilaDataManagementStack-$ENV" "KalilaApiStack-$ENV" "KalilaAuthStack-$ENV" "KalilaDataStorageStack-$ENV"  "KalilaDataAggregationStack-$ENV")

# Check if python or python3 is available
if command -v python &> /dev/null
then
    PYTHON_CMD=python
elif command -v python3 &> /dev/null
then
    PYTHON_CMD=python3
else
    echo "Python is not installed. Please install Python and try again."
    exit 1
fi

# Collect outputs from each stack
for stackName in "${stackNames[@]}"
do
  aws cloudformation describe-stacks --stack-name $stackName --query "Stacks[0].Outputs" | $PYTHON_CMD collect_outputs.py
done

# After collecting all outputs, transform them
$PYTHON_CMD transform_outputs.py
