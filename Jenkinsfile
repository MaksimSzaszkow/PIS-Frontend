'Front-end test, build & deploy pipeline'
pipeline {
    agent any
    stages {
        stage('SCM') {
            checkout scm
        }
        stage('SonarQube Analysis') {
            def scannerHome = tool 'SonarScanner'
            withSonarQubeEnv() {
                sh "${scannerHome}/bin/sonar-scanner"
            }
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
