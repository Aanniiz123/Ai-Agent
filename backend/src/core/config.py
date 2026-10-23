import firebase_admin
from firebase_admin import credentials
import os
from dotenv import load_dotenv

load_dotenv()

service_account_key_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_KEY_PATH")
if not service_account_key_path:
    raise ValueError("FIREBASE_SERVICE_ACCOUNT_KEY_PATH environment variable is required")

cred = credentials.Certificate(service_account_key_path)
firebase_admin.initialize_app(cred)
