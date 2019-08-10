# Voice-Crowdsourcing

A prototype google home application that can be used to gather data from users (crowdsourcing) using voice input only. It includes 5 types of crowdsourcing tasks to test its performance which are: Sentiment Analysis, Gender Recognition, Language Translation, Emotion Analysis, and Survey. A report reviewing the results of the study and how to design this application is included in the folder.

To Setup:

- go to dialogflow console
- create new agent
- go to settings and go to export and import
- restore from zip (dialogflow intent.zip)

On local:
- open cmd
- install node.js and firebase.cli
- firebase login with your account
- go to to functions directory in the HCI2 folder through CMD
- Run firebase deploy --project {PROJECT_ID} to deploy the function
  (Project ID is in dialogflow console settings under general tab)

On dialogflow console:
- go to fulfillment
- enable webhook
- Set URL to the Function URL that was returned after the deploy command
- save

-run the sample in the simulator
