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
                    # --- Start Debugging ---
                    echo "Jenkins is running in this directory:"
                    pwd
                    echo "---"
                    echo "Listing all files in the workspace:"
                    ls -lR
                    echo "--- End Debugging ---"

                    # Original commands
                    # This command now also removes old images (--rmi all) and volumes (-v)
                    docker-compose down --rmi all -v || true
                    # This command now forces containers to be recreated
                    docker-compose up -d --build --force-recreate
                '''
            }
        }

      stage('Test Backend') {
            steps {
                sh '''
                 echo "Waiting for services to stabilize..."
                    # Wait 10 seconds for the database to be ready
                    sleep 10

                    echo "--- Displaying Backend Logs ---"
                    docker logs mern-backend-localtest || echo "Could not get logs, container may have failed to start."
                    echo "--- End of Logs ---"

                    echo "Running tests..."
                    docker exec mern-backend-localtest npm test
                '''
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