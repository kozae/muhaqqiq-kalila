#!/bin/bash

declare -a stackNames=("KalilaDataManagementStack" "KalilaApiStack" "KalilaAuthStack" "KalilaDataStorageStack" "KalilaFrontendStack" "KalilaDataAggregationStack")


# Collect outputs from each stack
for stackName in "${stackNames[@]}"
do
  aws cloudformation describe-stacks --stack-name $stackName --query "Stacks[0].Outputs" | python collect_outputs.py
done

# After collecting all outputs, transform them
python transform_outputs.py