pipeline {
    agent any
    environment { 
        DOCKERHUB_CREDENTIALS = credentials('mingy1206-dockerhub')
        dockerImage = '' 
    }
	tools {
        nodejs "node"
        }
    stages {
        stage('Git Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'mingy1206-github', url: "${GITHUB_ADDRESS_FE}"]])
            }
        }
        stage('Build App') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
			post {
				success {
					withCredentials([string(credentialsId: 'jenkins-fe-webhook', variable: 'DISCORD')]) {
					discordSend description: "Jenkins CI/CD Trigger Alarm", 
					footer: "이거 완전 럭키비키잖아!", 
					link: env.BUILD_URL, result: currentBuild.currentResult, 
					title: "Jenkins CI/CD Build Success", 
					webhookURL: "$DISCORD"
				}
			}
				failure {
					withCredentials([string(credentialsId: 'jenkins-fe-webhook', variable: 'DISCORD')]) {
					discordSend description: "Jenkins CI/CD Trigger Alarm", 
					footer: "이거 완전 럭키비키니시티잖아...", 
					link: env.BUILD_URL, result: currentBuild.currentResult, 
					title: "Jenkins CI/CD Build Failed", 
					webhookURL: "$DISCORD"
					}
				}
			}
        }
		stage('Login Docker') {
            steps {
                sh "docker login ${CR_ADDRESS} --username ${ACCESS_ID} --password ${ACCESS_PW}"
            }
        }
        stage('Build Image') {
            steps {    
                script {
                    sh "docker build -t ${FRONTEND_CR_ADDRESS}frontend:latest ."
					sh "docker build -t ${FRONTEND_CR_ADDRESS}frontend:${BUILD_NUMBER} ."
                }
            }
			post {
				success {
					withCredentials([string(credentialsId: 'jenkins-fe-webhook', variable: 'DISCORD')]) {
					discordSend description: "Jenkins CI/CD Trigger Alarm", 
					footer: "이거 완전 럭키비키잖아!", 
					link: env.BUILD_URL, result: currentBuild.currentResult, 
					title: "Jenkins CI/CD Image Build Success", 
					webhookURL: "$DISCORD"
				}
			}
				failure {
					withCredentials([string(credentialsId: 'jenkins-fe-webhook', variable: 'DISCORD')]) {
					discordSend description: "Jenkins CI/CD Trigger Alarm", 
					footer: "이거 완전 럭키비키니시티잖아...", 
					link: env.BUILD_URL, result: currentBuild.currentResult, 
					title: "Jenkins CI/CD Image Build Failed", 
					webhookURL: "$DISCORD"
					}
				}
			}
        }
        stage('Push & Clean Image') {
            steps {
                script {
                    sh "docker push ${FRONTEND_CR_ADDRESS}frontend:latest"
                    sh "docker push ${FRONTEND_CR_ADDRESS}frontend:${BUILD_NUMBER}"

					
                    sh "docker rmi ${FRONTEND_CR_ADDRESS}frontend:latest"
                    sh "docker rmi ${FRONTEND_CR_ADDRESS}frontend:${BUILD_NUMBER}"

                }
            }
			post {
				success {
					withCredentials([string(credentialsId: 'jenkins-fe-webhook', variable: 'DISCORD')]) {
					discordSend description: "Jenkins CI/CD Trigger Alarm", 
					footer: "이거 완전 럭키비키잖아!", 
					link: env.BUILD_URL, result: currentBuild.currentResult, 
					title: "Jenkins CI/CD Image Push Success", 
					webhookURL: "$DISCORD"
				}
			}
				failure {
					withCredentials([string(credentialsId: 'jenkins-fe-webhook', variable: 'DISCORD')]) {
					discordSend description: "Jenkins CI/CD Trigger Alarm", 
					footer: "이거 완전 럭키비키니시티잖아...", 
					link: env.BUILD_URL, result: currentBuild.currentResult, 
					title: "Jenkins CI/CD Image Push Failed", 
					webhookURL: "$DISCORD"
					}
				}
			}
        }
        stage('Canary Deployment to Instance A') {
            steps {
                script {
                    sshagent(['kc-enter-be-a']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ubuntu@${KC_ENTER_FE_A_IP} '
							sudo docker login ${CR_ADDRESS} --username ${ACCESS_ID} --password ${ACCESS_PW} &&
                            sudo docker pull ${FRONTEND_CR_ADDRESS}frontend:latest &&
                            sudo docker stop app || true &&
                            sudo docker rm app || true &&
                            sudo docker run -d --name app -p ${FRONTEND_APP_PORT}:${FRONTEND_APP_PORT} ${FRONTEND_CR_ADDRESS}frontend:latest
                            '
                        """
                    }
                }
            }
			post {
				success {
					withCredentials([string(credentialsId: 'jenkins-fe-webhook', variable: 'DISCORD')]) {
					discordSend description: "Jenkins CI/CD Trigger Alarm", 
					footer: "이거 완전 럭키비키잖아!", 
					link: env.BUILD_URL, result: currentBuild.currentResult, 
					title: "Jenkins CI/CD Image Deploy 1/2 -> Next Stage 1M Wait", 
					webhookURL: "$DISCORD"
				}
			}
				failure {
					withCredentials([string(credentialsId: 'jenkins-fe-webhook', variable: 'DISCORD')]) {
					discordSend description: "Jenkins CI/CD Trigger Alarm", 
					footer: "이거 완전 럭키비키니시티잖아...", 
					link: env.BUILD_URL, result: currentBuild.currentResult, 
					title: "Jenkins CI/CD Image Deploy 1/2 Failed", 
					webhookURL: "$DISCORD"
					}
				}
			}
        }
        stage('Waitting') {
            steps {
				script {
					def delay = 60 // seconds
					sleep(delay)
                }
            }
        }
        stage('Canary Deployment to other Instance') {
            steps {
                script {	
                    // input message: 'Proceed with full deployment?', ok: 'Deploy '

                    sshagent(['kc-enter-be-b']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ubuntu@${KC_ENTER_FE_B_IP} '
							sudo docker login ${CR_ADDRESS} --username ${ACCESS_ID} --password ${ACCESS_PW} &&
                            sudo docker pull ${FRONTEND_CR_ADDRESS}frontend:latest &&
                            sudo docker stop app || true &&
                            sudo docker rm app || true &&
                            sudo docker run -d --name app -p ${FRONTEND_APP_PORT}:${FRONTEND_APP_PORT} ${FRONTEND_CR_ADDRESS}frontend:latest
                            '
                        """
                    }
                }
            }
			post {
				success {
					withCredentials([string(credentialsId: 'jenkins-fe-webhook', variable: 'DISCORD')]) {
					discordSend description: "Jenkins CI/CD Trigger Alarm", 
					footer: "이거 완전 럭키비키잖아!", 
					link: env.BUILD_URL, result: currentBuild.currentResult, 
					title: "Jenkins CI/CD Image Deploy 2/2 Success", 
					webhookURL: "$DISCORD"
				}
			}
				failure {
					withCredentials([string(credentialsId: 'jenkins-fe-webhook', variable: 'DISCORD')]) {
					discordSend description: "Jenkins CI/CD Trigger Alarm", 
					footer: "이거 완전 럭키비키니시티잖아...", 
					link: env.BUILD_URL, result: currentBuild.currentResult, 
					title: "Jenkins CI/CD Image Deploy 2/2 Failed", 
					webhookURL: "$DISCORD"
					}
				}
			}
        }
    }
}




