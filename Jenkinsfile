pipeline {
  agent {
    node {
      label 'nodejs'
    }
  }
  stages {
    stage("project") {
      steps {
        script {
          openshift.withCluster() {
            openshift.withProject() {
              echo "Using project: ${openshift.project()}"
            }
          }
        }
      }
    }
    stage("build image") {
     steps {
        script {
          openshift.withCluster() {
            openshift.withProject() {
              echo "Build Appliction Image: finder"
              def bc = openshift.selector("bc", "finder-v10")
              bc.startBuild().logs("-f")
              def bb = bc.narrow("bc").related("builds")
              timeout(10) {
                bb.untilEach(1) {
                  return (it.object().status.phase == "Complete")
                }
              }
            }
          }
        }
      }
    }
    stage('deploy') {
      steps {
        script {
          openshift.withCluster() {
            openshift.withProject() {
              sh "oc rollout restart deployment/finder-v10"
                timeout(10) {
              }
            }
          }
        }
      }
    }
  }
}
