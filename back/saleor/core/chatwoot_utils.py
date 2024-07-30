import json

import requests
from django.forms import ValidationError

from ..company.error_codes import CompanyErrorCode
from ..settings import CHATWOOT_PLATFORM_TOKEN, CHATWOOT_URI

BASE_URL = CHATWOOT_URI


def create_user_chatwoot(name, email, password):
    url = BASE_URL + "/platform/api/v1/users"
    payload = {"name": name, "email": email, "password": password}
    headers = {
        "api_access_token": CHATWOOT_PLATFORM_TOKEN,
        "Content-type": "application/json",
    }

    response = requests.post(url, data=json.dumps(payload), headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        try:
            print("response status code is: ", response.status_code)
            print("response body is: ", response.json())
            raise Exception("Message Creation Failed")
        except Exception:
            raise Exception("Message Creation Failed")


def update_user_chatwoot(user_id, name, password, email):
    url = BASE_URL + "/platform/api/v1/users/" + str(user_id)

    payload = {"name": name, "email": email, "password": password}
    headers = {
        "api_access_token": CHATWOOT_PLATFORM_TOKEN,
        "Content-type": "application/json",
    }

    response = requests.patch(url, data=json.dumps(payload), headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        try:
            print("response status code is: ", response.status_code)
            print("response body is: ", response.json())
            raise Exception("Message Creation Failed")
        except Exception:
            raise Exception("Message Creation Failed")


def create_account_chatwoot(name):
    url = BASE_URL + "/platform/api/v1/accounts"

    payload = {
        "name": name + " account",
    }
    headers = {
        "api_access_token": CHATWOOT_PLATFORM_TOKEN,
        "Content-type": "application/json",
    }

    response = requests.post(url, data=json.dumps(payload), headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        try:
            print("response status code is: ", response.status_code)
            print("response body is: ", response.json())
            raise Exception("Message Creation Failed")
        except Exception:
            raise Exception("Message Creation Failed")


def create_account_user_chatwoot(account_id, user_id):
    url = BASE_URL + "/platform/api/v1/accounts/" + str(account_id) + "/account_users"

    payload = {"user_id": user_id, "role": "administrator"}
    headers = {
        "api_access_token": CHATWOOT_PLATFORM_TOKEN,
        "Content-type": "application/json",
    }

    response = requests.post(url, data=json.dumps(payload), headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        try:
            print("response status code is: ", response.status_code)
            print("response body is: ", response.json())
            raise Exception("Message Creation Failed")
        except Exception:
            raise Exception("Message Creation Failed")


def create_inbox_chatwoot(user_api_token, account_id, name, website_url):
    url = BASE_URL + "/api/v1/accounts/" + str(account_id) + "/inboxes/"

    payload = {
        "name": name,
        "channel": {
            "type": "web_widget",
            "website_url": website_url,
            "welcome_title": "Welcome to the " + name + " chat.",
            "welcome_tagline": "Hi there! Can we help you?",
            "agent_away_message": "Agent away message",
            "hmac_mandatory": True,
        },
    }
    headers = {"api_access_token": user_api_token, "Content-type": "application/json"}

    response = requests.post(url, data=json.dumps(payload), headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        try:
            print("response status code is: ", response.status_code)
            print("response body is: ", response.json())
            raise Exception("Message Creation Failed")
        except Exception:
            raise Exception("Message Creation Failed")


def validate_chatwoot_password(password):
    special_characters = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
    if not password:
        raise ValidationError(
            {
                "password": ValidationError(
                    "You have to provide a password to create an account in Chatwoot.",
                    code=CompanyErrorCode.REQUIRED,
                )
            }
        )
    elif (
        not any(char.isdigit() for char in password)
        or not any(char.isupper() for char in password)
        or not any(char.islower() for char in password)
        or not any(char in special_characters for char in password)
        or len(password) < 6
    ):
        raise ValidationError(
            {
                "password": ValidationError(
                    "Password must contain 6 characters at least, uppercase,\
                    lowercase letters, number and a special character.",
                    code=CompanyErrorCode.INVALID,
                )
            }
        )
