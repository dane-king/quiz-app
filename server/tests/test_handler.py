import json

import pytest

from quiz_questions import app


@pytest.fixture()
def apigw_event():
    return {
        "path": "/questions",
        "pathParameters": {
            "id": "1"
        }
    }


def test_lambda_handler(apigw_event):
    ret = app.lambda_handler(apigw_event, "")
    data = json.loads(ret["body"])
    print('here is the data', data)
    assert ret["statusCode"] == 200
    assert data == {'answer': 'Joe', 'question': 'What is your name?'}
