"Front-end build, test & deploy pipeline"
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                npm run test:coverage
            }
        }
        stage('Build') {
            steps {
                if docker image list | grep front; then
                    docker rmi front
                fi

                docker build --tag front .
            }
        }
        stage('Deploy') {
            steps {
                if docker ps -a | grep front; then
                    docker rm front --force
                fi
                docker run -p 3000:3000 --name front front
            }
        }
    }
}