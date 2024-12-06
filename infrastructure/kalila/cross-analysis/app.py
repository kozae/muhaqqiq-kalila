import json
import logging
from openai import OpenAI
from app.chain import chain

# Set up logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

KEY = "sk-proj-as6wKiAvbQE2Rbn7SKpJT3BlbkFJyUme3ID5N6DBKPV2VIG0"
client = OpenAI(
    api_key=KEY,
)


def handler(event, context):

    # Log the incoming event
    logger.info("Received event: %s", json.dumps(event))

    # Return hello world response
    return {
        "statusCode": 200,
        "body": chain(client),
        "headers": {"Content-Type": "application/json"},
    }
