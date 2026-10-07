pipeline {
  agent any
  triggers { githubPush() }

  environment {
    FRONTEND_IP = '10.0.2.138'
  }

  stages {
    stage('Build') {
      steps {
        sh 'npm ci'
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      steps {
        sshagent(['ec2-deploy-key']) {
          sh '''
            rsync -az --delete -e "ssh -o StrictHostKeyChecking=no" \
              dist/ ubuntu@$FRONTEND_IP:/var/www/frontend/
          '''
        }
      }
    }
  }
}