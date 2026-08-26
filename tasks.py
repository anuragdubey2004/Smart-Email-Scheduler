import os
from dotenv import load_dotenv
from celery import Celery
import time

load_dotenv()
redis_url = os.getenv("REDIS_URL")

celery_app = Celery(
    "email_worker",
    broker=redis_url,
    backend=redis_url
)


celery_app.conf.enable_utc = True
celery_app.conf.timezone = 'UTC'

@celery_app.task
def send_email_task(email_to: str, subject: str, body: str):
    print(f"Starting to send email to {email_to}...")
    time.sleep(5)

    print(f"Success! Email sent to {email_to}.")
    return "Done"