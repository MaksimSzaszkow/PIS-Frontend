'Front-end test, build & deploy pipeline'
pipeline {
    agent any
    stages {
        stage('SonarQube Analysis') {
            sonar-scanner \
                -Dsonar.projectKey=pis-front \
                -Dsonar.sources=. \
                -Dsonar.host.url=https://ed63-194-29-160-174.eu.ngrok.io/ \
                -Dsonar.login=sqp_dc3ef22a2f456e54ca1df3193c3b71d4ecde30be
        }
        stage('Test') {
            steps {
                sh 'chmod +x check.sh'
                sh './check.sh test'
            }
        }
        stage('Build') {
            steps {
                sh 'chmod +x check.sh'
                sh './check.sh check-image'
                sh 'docker build --tag front .'
            }
        }
        stage('Deploy') {
            steps {
                sh 'chmod +x check.sh'
                sh './check.sh check-ps'
                sh 'docker run -d -p 3000:3000 --name front front'
            }
        }
    }
}
