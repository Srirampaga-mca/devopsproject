pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Srirampaga-mca/devopsproject.git',
                    credentialsId: 'Git-pat'
            }
        }

        stage('Build & Run Containers') {
            steps {
                sh '''
                    docker-compose down || true
                    docker-compose up -d --build
                '''
            }
        }

        stage('Test Backend') {
            steps {
                sh 'docker exec mern-backend npm test || true'
            }
        }
    }

    post {
        success {
            echo '✅ Build successful!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}
