import json
from collections import namedtuple

# import requests


def lambda_handler(event, context):
    print('## EVENT')
    print(event)
    questionId = None

    try:
        questionId = int(event['pathParameters']['id'])
    except:
        pass
    Question = namedtuple("Question", "question answer")
    response = [Question('What is your name?', 'Joe'), Question(
        'How old are you?', '22'), Question('Where do you live?', 'Reynoldsburg')]

    if (questionId is not None):
        response = response[questionId-1]._asdict()
    else:
        response = [question._asdict() for question in response]

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,GET'
        },
        'body': json.dumps(response)
    }
