pipeline {
    agent any

    environment {
        FRONTEND_SERVER = "10.0.2.129"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        sonar-scanner
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build') {
            steps {
                sh 'VITE_API_URL=/api npm run build'
            }
        }

        stage('Deploy Frontend') {
            steps {
                sshagent(credentials: ['ec2-deploy-key']) {

                    sh '''
                        rsync -az --delete \
                        dist/ ubuntu@$FRONTEND_SERVER:/var/www/frontend/

                        ssh -o StrictHostKeyChecking=no ubuntu@$FRONTEND_SERVER \
                        "sudo nginx -t && sudo systemctl reload nginx"
                    '''
                }
            }
        }
    }
}