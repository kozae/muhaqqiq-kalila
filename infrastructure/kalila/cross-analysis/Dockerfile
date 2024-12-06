# Use the official AWS Lambda Python 3.8 base image
FROM public.ecr.aws/lambda/python:3.10-x86_64

# Copy the function code
COPY app.py ${LAMBDA_TASK_ROOT}
COPY app ${LAMBDA_TASK_ROOT}/

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"

# Set the CMD to your handler (app.lambda_handler)
CMD ["app.handler"]

# ONCE: aws ecr create-repository --repository-name cross_analysis_service-dev
# aws ecr get-login-password  | docker login --username AWS --password-stdin 557976691964.dkr.ecr.eu-central-1.amazonaws.com
# docker build -t cross_analysis_service . && docker tag cross_analysis_service:latest 557976691964.dkr.ecr.eu-central-1.amazonaws.com/cross_analysis_service-dev:latest && docker push 557976691964.dkr.ecr.eu-central-1.amazonaws.com/cross_analysis_service-dev:latest
