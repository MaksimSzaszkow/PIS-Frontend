"Front-end build, test & deploy pipeline"
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh "chmod +x check.sh"
                sh "./check.sh test"
            }
        }
        stage('Build') {
            steps {
                sh "./check.sh check-image"
                docker build --tag front .
            }
        }
        stage('Deploy') {
            steps {
                sh "./check check-ps"
                docker run -p 3000:3000 --name front front
            }
        }
    }
}