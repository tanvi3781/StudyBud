pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/tanvi3781/StudyBud.git'
            }
        }

        stage('Backend - Install') {
            steps {
                sh '''
                    python3.14 --version
                    rm -rf env
                    python3.14 -m venv env
                    env/bin/python -m pip install --upgrade pip
                    env/bin/pip install -r requirements.txt
                '''
            }
        }

        stage('Backend - Django Check') {
            steps {
                sh '''
                    env/bin/python manage.py check
                '''
            }
        }

        stage('Backend - Tests') {
            steps {
                sh '''
                    env/bin/python manage.py test
                '''
            }
        }

        stage('Frontend - Install') {
            steps {
                dir('frontend') {
                    sh '''
                        node --version
                        npm --version
                        npm ci
                    '''
                }
            }
        }

        stage('Frontend - Build') {
            steps {
                dir('frontend') {
                    sh '''
                        npm run build
                    '''
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker compose build
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker compose down --remove-orphans || true
                    docker compose up -d
                    docker compose ps
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 10

                    echo "Checking Docker containers..."
                    docker compose ps

                    echo "Checking Django..."
                    curl -f http://localhost:8000/api/home/ || exit 1

                    echo "Checking React..."
                    curl -f http://localhost:3000/ || exit 1
                '''
            }
        }
    }

    post {
        success {
            echo '======================================'
            echo 'StudyBud Pipeline SUCCESS'
            echo '======================================'
        }

        failure {
            echo '======================================'
            echo 'StudyBud Pipeline FAILED'
            echo '======================================'
        }
    }
}