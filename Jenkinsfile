'Front-end test, build & deploy pipeline'
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'npm install --legacy-peer-deps'
                sh 'chmod +x check.sh'
                sh './check.sh test'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                sh 'sonar-scanner \
                    -Dsonar.projectKey=pis-front \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=http://localhost:9000/ \
                    -Dsonar.login=sqp_dc3ef22a2f456e54ca1df3193c3b71d4ecde30be \
                    -Dsonar.javascript.lcov.reportPaths=./coverage/lcov.info'
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
