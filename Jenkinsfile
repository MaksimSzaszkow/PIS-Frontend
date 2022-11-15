"Front-end build, test & deploy pipeline"
pipeline {
    agent any
    stages {
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
                sh 'docker run -p 3000:3000 --name front front'
                //sh 'ls'
            }
        }
    // agent { dockerfile true }
    // stages {
    //     stage('Test') {
    //         steps {
    //             sh 'node --version'
    //             sh 'svn --version'
    //         }
    //     }
    // }
    }
}