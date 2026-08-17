pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out StudyBud repository'
            }
        }

        stage('Backend CI') {
            steps {
                echo 'Running Django CI'
            }
        }

        stage('Frontend CI') {
            steps {
                echo 'Running React CI'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker images'
            }
        }

        stage('Push to ECR') {
            steps {
                echo 'Pushing Docker images to ECR'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying StudyBud to EC2 using SSM'
            }
        }
    }
}
