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
              echo "Build Appliction Image: frontweb"
              def bc = openshift.selector("bc", "frontweb")
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
    stage("create tag") {
      steps {
        script {
          openshift.withCluster() {
            openshift.withProject() {
              echo "Create Tag Image: frontweb"
              openshift.tag("frontweb:1.0")
            }
          }
        }
      }
    }
  }
}
