pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t saikiran2233/magicworld:latest .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker-cred',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker push saikiran2233/magicworld:latest
                    '''
                }
            }
        }

        stage('Deploy To Kubernetes') {
            steps {
                withKubeCredentials(kubectlCredentials: [[
                    credentialsId: 'k8-token',
                    namespace: 'myapps',
                    serverUrl: 'https://95D37A4004FF46A6DAD589E8675E611B.gr7.us-east-1.eks.amazonaws.com'
                ]]) {
                    sh 'kubectl apply -f k8s/'
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                withKubeCredentials(kubectlCredentials: [[
                    credentialsId: 'k8-token',
                    namespace: 'myapps',
                    serverUrl: 'https://95D37A4004FF46A6DAD589E8675E611B.gr7.us-east-1.eks.amazonaws.com'
                ]]) {
                    sh 'kubectl get pods -n myapps'
                    sh 'kubectl get svc -n myapps'
                }
            }
        }
    }
}
