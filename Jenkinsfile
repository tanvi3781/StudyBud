```groovy
pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-southeast-2'
        AWS_ACCOUNT_ID = '637417025050'
        ECR_REGISTRY = '637417025050.dkr.ecr.ap-southeast-2.amazonaws.com'
        APP_INSTANCE_ID = 'i-0dd979833c77556f0'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                sh '''
                    echo "Repository checked out successfully"
                    pwd
                    git log -1 --oneline
                '''
            }
        }

        stage('Backend CI') {
            steps {
                sh '''
                    docker run --rm \
                      -v "$WORKSPACE:/app" \
                      -w /app \
                      python:3.14-slim \
                      bash -c "
                        pip install --no-cache-dir -r requirements.txt &&
                        python manage.py check &&
                        python manage.py test
                      "
                '''
            }
        }

        stage('Frontend CI') {
            steps {
                sh '''
                    docker run --rm \
                      -v "$WORKSPACE:/app" \
                      -w /app/frontend \
                      node:22 \
                      bash -c "
                        npm ci &&
                        npm run build
                      "
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    echo "Building backend image..."
                    docker build -t studybud-web:${IMAGE_TAG} .

                    echo "Building frontend image..."
                    docker build -t studybud-frontend:${IMAGE_TAG} ./frontend

                    docker images | grep studybud
                '''
            }
        }

        stage('Push Images to ECR') {
            steps {
                sh '''
                    set -e

                    echo "Logging in to ECR..."

                    aws ecr get-login-password \
                      --region ${AWS_REGION} | \
                    docker login \
                      --username AWS \
                      --password-stdin ${ECR_REGISTRY}

                    echo "Tagging images..."

                    docker tag studybud-web:${IMAGE_TAG} \
                      ${ECR_REGISTRY}/studybud-web:${IMAGE_TAG}

                    docker tag studybud-frontend:${IMAGE_TAG} \
                      ${ECR_REGISTRY}/studybud-frontend:${IMAGE_TAG}

                    echo "Pushing backend..."
                    docker push \
                      ${ECR_REGISTRY}/studybud-web:${IMAGE_TAG}

                    echo "Pushing frontend..."
                    docker push \
                      ${ECR_REGISTRY}/studybud-frontend:${IMAGE_TAG}

                    echo "ECR push completed."
                '''
            }
        }

        stage('Deploy to EC2 using SSM') {
            steps {
                sh '''
                    set -e

                    echo "Starting deployment on application EC2..."

                    COMMAND_ID=$(aws ssm send-command \
                      --region ${AWS_REGION} \
                      --instance-ids ${APP_INSTANCE_ID} \
                      --document-name "AWS-RunShellScript" \
                      --parameters "commands=[
                        \\"cd /home/ec2-user/StudyBud\\",
                        \\"docker pull ${ECR_REGISTRY}/studybud-web:${IMAGE_TAG}\\",
                        \\"docker pull ${ECR_REGISTRY}/studybud-frontend:${IMAGE_TAG}\\",
                        \\"docker tag ${ECR_REGISTRY}/studybud-web:${IMAGE_TAG} ${ECR_REGISTRY}/studybud-web:latest\\",
                        \\"docker tag ${ECR_REGISTRY}/studybud-frontend:${IMAGE_TAG} ${ECR_REGISTRY}/studybud-frontend:latest\\",
                        \\"docker compose down\\",
                        \\"docker compose up -d\\",
                        \\"docker compose ps\\"
                      ]" \
                      --query "Command.CommandId" \
                      --output text)

                    echo "SSM Command ID: ${COMMAND_ID}"

                    echo "Waiting for deployment..."

                    for i in {1..30}; do

                        STATUS=$(aws ssm get-command-invocation \
                          --region ${AWS_REGION} \
                          --command-id ${COMMAND_ID} \
                          --instance-id ${APP_INSTANCE_ID} \
                          --query "Status" \
                          --output text)

                        echo "Deployment status: ${STATUS}"

                        if [ "${STATUS}" = "Success" ]; then

                            echo "Deployment successful!"

                            aws ssm get-command-invocation \
                              --region ${AWS_REGION} \
                              --command-id ${COMMAND_ID} \
                              --instance-id ${APP_INSTANCE_ID} \
                              --query "StandardOutputContent" \
                              --output text

                            exit 0

                        elif [ "${STATUS}" = "Failed" ] || \
                             [ "${STATUS}" = "Cancelled" ] || \
                             [ "${STATUS}" = "TimedOut" ]; then

                            echo "Deployment failed!"

                            aws ssm get-command-invocation \
                              --region ${AWS_REGION} \
                              --command-id ${COMMAND_ID} \
                              --instance-id ${APP_INSTANCE_ID} \
                              --query "StandardErrorContent" \
                              --output text

                            exit 1
                        fi

                        sleep 5
                    done

                    echo "Deployment timed out."
                    exit 1
                '''
            }
        }
    }

    post {
        success {
            echo "StudyBud CI/CD pipeline completed successfully!"
        }

        failure {
            echo "StudyBud CI/CD pipeline failed."
        }
    }
}
```
