//Leonardus Elbert Putra - 755379
//HCI Project

'use strict';

const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');

//THE TASKS USES SSML STRUCTURE FROM : https://developers.google.com/actions/reference/ssml
//(audio source in some tasks need to be changed as this is a private account. IMPORTANT: the link needs to be https and file type .wav for audio)

//Sentiment Analysis tasks
const SENTIMENT_TASK1='<speak>'+'please determine whether the following movie review is positive or negative <break time="2" />'+'Hated it with all my being. Worst movie ever. Mentally- scarred. Help me. It was that bad.TRUST ME!!!'+'</speak>'
const SENTIMENT_TASK2='<speak>'+'please determine whether the following movie review is positive or negative <break time="2" />'+'This is a great movie.'+''+ ' Too bad it is not available on home video.'+'</speak>'
const SENTIMENT_TASK3='<speak>'+'please determine whether the following movie review is positive or negative <break time="2" />'+"Read the book, forget the movie!"+'</speak>'
const SENTIMENT_TASK4='<speak>'+'please determine whether the following movie review is positive or negative <break time="2" />'+"Well, I can safely say I'm human, Wrong. And I didn't throw up. I laughed. And laughed. If this movie made you puke, there is something wrong with you. But this movie is incredible. I bought it four days ago, and have watched it 5 times already. The animal cruelty gets my heart, but not long enough to be guilty. The movie is shocking, disgusting, and vulgar. The acting is horrific. What else do you want from a movie? I am a die-hard cult film maniac. Pink Flamingos is awesome. It makes Rocky Horror, as someone has said, look like the teletubbies."+'</speak>'
const SENTIMENT_TASK5='<speak>'+'please determine whether the following movie review is positive or negative <break time="2" />'+"It is hard to imagine anyone making a Tom Cruise film look good; hard indeed, but this one makes him look good. Very good. Actually, it makes him look like Sir John Gielgud celebrating Very Good Acting Day with a bravura performance. The acting from the entire ensemble struggled to rise above the risible and failed. The fault was, in part let us be fair, that the plot bore as much resemblance to the HG Wells original as did the butchered carcasses of the human victims in the film to their living predecessors: both were bloodied and violated remnants of more attractive predecessor. But to describe a plot such as this to be a bit holy is to say of the Colander My, this kitchen utensil has a remarkable lot of holes, unless, that is, holes are your bag; in which case this film will commend itself to you. The fault in the other part was that these were demotivated, jobbing, DVD actors who knew full well, one assumes, that this was their exhibition that would wind up on the $5 DVD shelf. And overpriced at that. So should you watch it? Why yes, of course, you should. You are a miserable sinner and deserve punishment."+'</speak>'

//Language Translation tasks
const TRANSLATION_TASK1 ='<speak>'+' Please translate the following sentence into english <audio src="https://storage.googleapis.com/xqwert24/translation/Translation1.wav">your wave file</audio> '+'</speak>'
//Djenar(2003) page 19
const TRANSLATION_TASK2 ='<speak>'+' Please translate the following sentence into english <audio src="https://storage.googleapis.com/xqwert24/translation/Translation2.wav">your wave file</audio> '+'</speak>'
//Djenar(2003) page 4
const TRANSLATION_TASK3 = '<speak>'+' Please translate the following sentence into english <audio src="https://storage.googleapis.com/xqwert24/translation/Translation3.wav">your wave file</audio> '+'</speak>'
//Djenar(2003) page 65
const TRANSLATION_TASK4 = '<speak>'+' Please translate the following sentence into english <audio src="https://storage.googleapis.com/xqwert24/translation/Translation4.wav">your wave file</audio> '+'</speak>'
//Djenar(2003) page 141
const TRANSLATION_TASK5 = '<speak>'+' Please translate the following sentence into english <audio src="https://storage.googleapis.com/xqwert24/translation/Translation5.wav">your wave file</audio> '+'</speak>'
//Djenar(2003) page 143

//Gender Recognition tasks
const GENDER_TASK1='<speak>'+' Please determine whether the speaker is male or female <audio src="https://storage.googleapis.com/xqwert24/gender/female2.wav">your wave file</audio> '+'</speak>'

const GENDER_TASK2='<speak>'+' Please determine whether the speaker is male or female <audio src="https://storage.googleapis.com/xqwert24/gender/male1.wav">your wave file</audio> '+'</speak>'

const GENDER_TASK3='<speak>'+' Please determine whether the speaker is male or female <audio soundLevel="+10dB" src="https://storage.googleapis.com/xqwert24/gender/male2.wav">your wave file</audio> '+'</speak>'

const GENDER_TASK4='<speak>'+' Please determine whether the speaker is male or female <audio src="https://storage.googleapis.com/xqwert24/gender/joey.wav">your wave file</audio> '+'</speak>'

const GENDER_TASK5='<speak>'+' Please determine whether the speaker is male or female <audio soundLevel="+10dB" src="https://storage.googleapis.com/xqwert24/gender/female1.wav">your wave file</audio> '+'</speak>'


//Emotion Analysis tasks
const EMOTION_TASK1 = '<speak>'+' From the following emotion<break time="500ms" />, happy<break time="500ms" />, sad<break time="500ms" />, anger<break time="500ms" />, disgust<break time="500ms" />, and fear<break time="500ms" />, what is the emotion that is reflected by the following audio? <audio soundLevel="+10dB" src="https://tspace.library.utoronto.ca/bitstream/1807/24500/4/YAF_yearn_sad.wav">your wave file</audio> '+'</speak>'

const EMOTION_TASK2 = '<speak>'+' From the following emotion<break time="500ms" />, happy<break time="500ms" />, sad<break time="500ms" />, anger<break time="500ms" />, disgust<break time="500ms" />, and fear<break time="500ms" />, what is the emotion that is reflected by the following audio? <audio soundLevel="+10dB" src="https://tspace.library.utoronto.ca/bitstream/1807/24498/4/YAF_yearn_disgust.wav">your wave file</audio> '+'</speak>'

const EMOTION_TASK3 = '<speak>'+' From the following emotion<break time="500ms" />, happy<break time="500ms" />, sad<break time="500ms" />, anger<break time="500ms" />, disgust<break time="500ms" />, and fear<break time="500ms" />, what is the emotion that is reflected by the following audio? <audio soundLevel="+10dB" src="https://tspace.library.utoronto.ca/bitstream/1807/24493/4/YAF_yearn_happy.wav">your wave file</audio> '+'</speak>'

const EMOTION_TASK4 = '<speak>'+' From the following emotion<break time="500ms" />, happy<break time="500ms" />, sad<break time="500ms" />, anger<break time="500ms" />, disgust<break time="500ms" />, and fear<break time="500ms" />, what is the emotion that is reflected by the following audio? <audio soundLevel="+10dB" src="https://tspace.library.utoronto.ca/bitstream/1807/24490/4/YAF_yearn_angry.wav">your wave file</audio> '+'</speak>'

const EMOTION_TASK5 = '<speak>'+' From the following emotion<break time="500ms" />, happy<break time="500ms" />, sad<break time="500ms" />, anger<break time="500ms" />, disgust<break time="500ms" />, and fear<break time="500ms" />, what is the emotion that is reflected by the following audio? <audio soundLevel="+10dB" src="https://tspace.library.utoronto.ca/bitstream/1807/24489/4/YAF_yearn_fear.wav">your wave file</audio> '+'</speak>'

const EMOTION_TASK6 = '<speak>'+' From the following emotion<break time="500ms" />, happy<break time="500ms" />, sad<break time="500ms" />, anger<break time="500ms" />, disgust<break time="500ms" />, and fear<break time="500ms" />, what is the emotion that is reflected by the following audio? <audio soundLevel="+10dB" src="https://tspace.library.utoronto.ca/bitstream/1807/24501/4/OAF_yearn_happy.wav">your wave file</audio> '+'</speak>'

const EMOTION_TASK7 = '<speak>'+' From the following emotion<break time="500ms" />, happy<break time="500ms" />, sad<break time="500ms" />, anger<break time="500ms" />, disgust<break time="500ms" />, and fear<break time="500ms" />, what is the emotion that is reflected by the following audio? <audio soundLevel="+10dB" src="https://tspace.library.utoronto.ca/bitstream/1807/24499/4/OAF_yearn_angry.wav">your wave file</audio> '+'</speak>'

const EMOTION_TASK8 = '<speak>'+' From the following emotion<break time="500ms" />, happy<break time="500ms" />, sad<break time="500ms" />, anger<break time="500ms" />, disgust<break time="500ms" />, and fear<break time="500ms" />, what is the emotion that is reflected by the following audio? <audio soundLevel="+10dB" src="https://tspace.library.utoronto.ca/bitstream/1807/24497/4/OAF_yearn_sad.wav">your wave file</audio> '+'</speak>'

const EMOTION_TASK9 = '<speak>'+' From the following emotion<break time="500ms" />, happy<break time="500ms" />, sad<break time="500ms" />, anger<break time="500ms" />, disgust<break time="500ms" />, and fear<break time="500ms" />, what is the emotion that is reflected by the following audio? <audio soundLevel="+10dB" src="https://tspace.library.utoronto.ca/bitstream/1807/24494/4/OAF_yearn_disgust.wav">your wave file</audio> '+'</speak>'

const EMOTION_TASK10 = '<speak>'+' From the following emotion<break time="500ms" />, happy<break time="500ms" />, sad<break time="500ms" />, anger<break time="500ms" />, disgust<break time="500ms" />, and fear<break time="500ms" />, what is the emotion that is reflected by the following audio? <audio soundLevel="+10dB" src="https://tspace.library.utoronto.ca/bitstream/1807/24492/4/OAF_yearn_fear.wav">your wave file</audio> '+'</speak>'

//Survey Tasks
const SURVEY_TASK1 = '<speak>'+'Have you done any data gathering task like this before?'+'</speak>'

const SURVEY_TASK2 = '<speak>'+'from 1 to 5 with 1 being  really easy and 5 being really difficult, can you rate the difficulty of using this device for answering question'+'</speak>'

const SURVEY_TASK3 = '<speak>'+'If you can choose between a computer and the google home which one would you prefer to use for doing these tasks'+'</speak>'

const SURVEY_TASK4 = '<speak>'+'If you can get paid on average 3 dollar per hour for doing these tasks on a smart speaker, would you do it?'+'</speak>'

const SURVEY_TASK5 = '<speak>'+'From all of these tasks, which category is the most difficult one for you to do?'+'</speak>'

//Help Replies
const GENERAL_HELP = '<speak>'+'you can see what tasks are available and choose one of them by saying category.<break time="300ms" /> During each task, if you do not know the answer you can always skip to the next question by saying skip<break time="300ms" />. you can also repeat the question by saying repeat<break time="300ms" />.'+'</speak>'
const SENTIMENT_HELP = '<speak>'+'In this task, you need to determine whether the sentence in each question is positive or negative.<break time="300ms" /> If you do not know the answer you can always skip to the next question by saying skip<break time="300ms" />. you can also repeat the question by saying repeat<break time="300ms" />. Finally,  if you want to change the task you can say category to look at what task is available and just say its name to me. Thank you '+'</speak>'
const TRANSLATION_HELP = '<speak>'+' In this task, you need to translate each sentences from Indonesian to English.<break time="300ms" /> If you do not know the answer you can always skip to the next question by saying skip<break time="300ms" />. you can also repeat the question by saying repeat<break time="300ms" />. Finally,  if you want to change the task you can say category to look at what task is available and just say its name to me. Thank you  '+'</speak>'
const GENDER_HELP = '<speak>'+'In this task, you need to determine the gender of the speaker of each sentences whether they are male or female.<break time="300ms" /> If you do not know the answer you can always skip to the next question by saying skip<break time="300ms" />. you can also repeat the question by saying repeat<break time="300ms" />. Finally,  if you want to change the task you can say category to look at what task is available and just say its name to me. Thank you  '+'</speak>'
const EMOTION_HELP = '<speak>'+'In this task,  you need to determine the emotion that is being conveyed by the speaker in each sentence<break time="300ms" />. You can choose between<break time="300ms" /> happy<break time="300ms" />, sad<break time="300ms" />, angry<break time="300ms" />, disgust<break time="300ms" /> or fear<break time="300ms" />.  If you do not know the answer you can always skip to the next question by saying skip<break time="300ms" />. you can also repeat the question by saying repeat<break time="300ms" />. Finally, if you want to change the task you can say category to look at what task is available and just say its name to me. Thank you  '+'</speak>'
const SURVEY_HELP = '<speak>'+'In this task, you need to answer based on your experience when using this system. If you do not know the answer you can always skip to the next question by saying skip<break time="300ms" />. you can also repeat the question by saying repeat<break time="300ms" />. Finally,  if you want to change the task you can say category to look at what task is available and just say its name to me. Thank you  '+'</speak>'


//tasks introductions
const welcomeReplies ='<speak>'+ 'Welcome to crowdsource, there are 5 types of tasks that you can choose today which are <break time="500ms" />'+' <emphasis level="strong">Sentiment analysis <break time="500ms" />, gender recognition<break time="500ms" />, emotion analysis<break time="500ms" />, survey<break time="500ms" />, and language translation. </emphasis>'+'  If you are stuck, you can also say help or instruction anytime to view the instruction of what to do<break time="300ms" />. During each task you can request to repeat or skip the question if you want but please try to answer all question.<break time="300ms" /> Finally, remember to also wait until I finish talking before answering any question so I can hear you properly.'+'So what task do you want to do?'+'</speak>';

const genderReplies = '<speak>'+'Welcome to gender recognition! Please specify whether the speaker of the following sentences is a male or female<break time="300ms" />.  There are 5 questions in this section and you can say start when you are ready to begin'+'</speak>';

const sentimentReplies = '<speak>'+'Welcome to Sentiment Analysis! Please specify each of the following sentences whether it is positive or negative<break time="300ms" />.  There are 5 questions in this section and you can say start when you are ready to begin'+'</speak>';

const translationReplies = '<speak>'+'Welcome to language translation! Please provide an english translation for the following Indonesian sentences<break time="300ms" />. There are 5 questions in this section and you can say start when you are ready to begin'+'</speak>';

const emotionReplies ='<speak>'+'Welcome to emotion analysis! please determine what emotion the speaker in this task is conveying in their words<break time="300ms" />. there are 5 choices of emotion you can use in this task which are<break time="500ms" /> happy<break time="300ms" />, sad<break time="300ms" />, anger<break time="300ms" />, disgust<break time="300ms" /> or fear<break time="300ms" />. There are 10 questions in this section and you can say start when you are ready to begin'+'</speak>'

const surveyReplies='<speak>'+'Welcome to survey! Please answer the following question based on your experience<break time="300ms" />.  There are 5 questions in this section and you can say start when you are ready to begin'+'</speak>'




const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.database();

const action = dialogflow({debug: true});

// this intent is for tasks introduction
action.intent('introduction', (conv, {task} )=>{
  conv.data.contextName='intro'
  let replyState = setReplyState(conv, task)
  let intent = getIntentName( conv );
  conv.data.taskName=task;
  sendReply( conv, intent, replyState );
});

// this intent is called wo see what categories are avilable
action.intent('category', conv=>{

  let replyState = setReplyState(conv, 'category')
  let intent = getIntentName( conv );

  //refresh current context
  conv.contexts.set(conv.data.contextName, 1)
  sendReply( conv, intent, replyState );
});

// intent to answer sentiment analysis question (must include positive or negative word)
action.intent('answer-sentiment',(conv,{sentiment})=>{
  let intent = getIntentName( conv );
  let replyState = setReplyState(conv, sentiment)

  //set context for confirming user answer
  conv.contexts.set('answer-followup', 1,{'answer':replyState});

  //keeping track of what context is active currently
  conv.data.contextName='answer-followup'
  conv.data.taskTotal=5;
  conv.data.answer=replyState;
  sendReply( conv, intent, replyState );

});


// intent to answer gender recognition question (either male or female)
action.intent('answer-gender',(conv,{gender})=>{
  let intent = getIntentName( conv );
  let replyState = setReplyState(conv, gender)

  //set context for confirming user answer
  conv.contexts.set('answer-followup', 1,{'answer':replyState});

  //keeping track of what context is active currently
  conv.data.contextName='answer-followup'
  conv.data.taskTotal=5;
  conv.data.answer=replyState;
  sendReply( conv, intent, replyState );

});

//intent to answer gender recognition question (either happy, disgust, fear, sad or anger)
action.intent('answer-emotion',(conv,{emotion})=>{
  let intent = getIntentName( conv );
  let replyState = setReplyState(conv, emotion)

  //set context for confirming user answer
  conv.contexts.set('answer-followup', 1,{'answer':replyState});

  //keeping track of what context is active currently
  conv.data.contextName='answer-followup'
  conv.data.taskTotal=10;
  conv.data.answer=replyState;
  sendReply( conv, intent, replyState );

});

//intent to answer survey question
action.intent('answer-survey',(conv,{rating})=>{
  let intent = getIntentName( conv );
  let replyState = setReplyState(conv, rating)

  //set context for confirming user answer
  conv.contexts.set('answer-followup', 1,{'answer':replyState});

  //keeping track of what context is active currently
  conv.data.contextName='answer-followup'
  conv.data.taskTotal=5;
  conv.data.answer=replyState;
  sendReply( conv, intent, replyState );

});

//intent to answer language translation question (no restriction for answering,
//participants can answer anything with parameter "any")
action.intent('answer-translation',(conv,{any})=>{
  let intent = getIntentName( conv );
  let replyState = setReplyState(conv, any)

  //set context for confirming user answer
  conv.contexts.set('answer-followup', 1,{'answer':replyState});

  //keeping track of what context is active currently
  conv.data.contextName='answer-followup'
  conv.data.taskTotal=5;
  conv.data.answer=replyState;;
  sendReply( conv, intent, replyState );

});

//intent to reprompt user if they did not answer for a while
action.intent('no-input', conv => {
  const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));

  //refresh available contexts
  conv.contexts.set(conv.data.contextName, 1);
  if (conv.contexts.get('answer-next')){
    conv.contexts.set('answer-next', 1)
  }

  //reprompts user 3 times if fail exit conversation
  if (repromptCount === 0) {
  conv.ask(`Hello, I can't hear you`);
  } else if (repromptCount === 1) {
  conv.ask(`Sorry I didn't catch that. Could you repeat yourself?`);
  } else if (conv.arguments.get('IS_FINAL_REPROMPT')) {
  conv.close(`Okay let's try this again later.`);
  }
});

// intent to start a task category and set the context to the corresponding answer intent
action.intent('task',conv=>{
  let intent = getIntentName( conv );
  let replyState = setReplyState(conv, 1)
  let taskName=conv.data.taskName;
  conv.data.taskNumber=1;
  if(taskName==='sentiment analysis'){
    conv.data.contextName='answer-sentiment'
    conv.data.help=SENTIMENT_HELP;
    conv.data.taskTotal=5;
  }
  else if (taskName==='language translation'){
    conv.data.contextName='answer-translation'
    conv.data.help=TRANSLATION_HELP;
    conv.data.taskTotal=5;
  }
  else if (taskName==='gender recognition'){
    conv.data.contextName='answer-gender'
    conv.data.help=GENDER_HELP;
    conv.data.taskTotal=5;
  }
  else if (taskName==='emotion analysis'){
    conv.data.contextName='answer-emotion'
    conv.data.help=EMOTION_HELP;
    conv.data.taskTotal=10;
  }
  else if (taskName==='survey'){
    conv.data.contextName='answer-survey'
    conv.data.help=SURVEY_HELP;
    conv.data.taskTotal=5;
  }

  conv.contexts.set(conv.data.contextName, 1)
  conv.contexts.set('answer-next', 1)
  sendReply( conv, intent, replyState );
});

//intent to repeat a conversation
action.intent('repeat', conv => {
  let replyState = setReplyState( conv, 'repeat' );
  let intent = getIntentName( conv );

  //refresh current context
  conv.contexts.set(conv.data.contextName, 1)
  if(conv.data.contextName!=="intro"){
    conv.contexts.set('answer-next', 1)
  }
  sendReply( conv, intent, replyState );

});


// intent for user to hear instruction
action.intent('help', conv => {
  let replyState = setReplyState( conv, conv.data.help );
  let intent = getIntentName( conv );

  //refresh available context
  conv.contexts.set(conv.data.contextName, 1)
  if(conv.data.contextName!=="intro"){
    conv.contexts.set('answer-next', 1)
  }

  sendReply( conv, intent, replyState );

});


// first intent after invoking the app
action.intent('welcome', conv => {

  let replyState = setReplyState( conv, 'prompt' );
  let intent = getIntentName( conv );
  conv.data.contextName='welcome';
  conv.data.help=GENERAL_HELP;
  console.log('state '+replyState+ ' intent '+intent);
  sendReply( conv, intent, replyState );
});

// confirm answer and send to database
action.intent('yes', conv => {
  let replyState = getReplyState( conv );
  let intent = getIntentName( conv );
  console.log('state '+replyState+ ' intent '+intent);

  const ref = db.ref("/"+conv.data.taskName+'/task'+conv.data.taskNumber).push({
      'answer':conv.data.answer
    });
  conv.contexts.set('answer-next', 1)

  sendReply( conv, intent, replyState );
});

// intent to skip to next question
action.intent('next',conv => {
  let taskNumber= Number(conv.data.taskNumber)+1
  conv.data.taskNumber=taskNumber
  let replyState = setReplyState( conv, taskNumber+'' );
  let intent = getIntentName( conv );
  let taskName=conv.data.taskName;
  if(taskName==='sentiment analysis'){
    conv.data.contextName='answer-sentiment'
  }
  else if (taskName==='language translation'){
    conv.data.contextName='answer-translation'
  }
  else if (taskName==='gender recognition'){
    conv.data.contextName='answer-gender'
  }
  else if (taskName==='emotion analysis'){
    conv.data.contextName='answer-emotion'
  }
  else if (taskName==='survey'){
    conv.data.contextName='answer-survey'
  }

  //check if there are still available questions
  if (taskNumber<=conv.data.taskTotal){
    conv.contexts.set(conv.data.contextName, 1)
    conv.contexts.set('answer-next', 1)
  }

  sendReply( conv, intent, replyState );
});

// intent to deny answer confirmation and answer again
action.intent('no', conv => {
  let replyState = setReplyState( conv, 'prompt' );
  let intent = getIntentName( conv );
  let taskName=conv.data.taskName;
  if(taskName==='sentiment analysis'){
    conv.data.contextName='answer-sentiment'
  }
  else if (taskName==='language translation'){
    conv.data.contextName='answer-translation'
  }
  else if (taskName==='gender recognition'){
    conv.data.contextName='answer-gender'
  }
  else if (taskName==='emotion analysis'){
    conv.data.contextName='answer-emotion'
  }
  else if (taskName==='survey'){
    conv.data.contextName='answer-survey'
  }

  //refresh context
  conv.contexts.set(conv.data.contextName, 1);
  conv.contexts.set('answer-next', 1)
  console.log('state '+replyState+ ' intent '+intent);
  sendReply( conv, intent, replyState );
});

//default fallback intent
action.intent('input.unknown',conv => {
  let replyState = setReplyState( conv, 'lost' );
  let intent = getIntentName( conv );
  conv.contexts.set(conv.data.contextName, 1);
  if (conv.contexts.get('answer-next')){
    conv.contexts.set('answer-next', 1)
  }
  sendReply( conv, intent, replyState );
});

function getReplyState( conv ){
  return conv.data['replyState'];
}

function setReplyState( conv, state ){
  conv.data['replyState'] = state;
  return state;
}

function getIntentName( conv ){
  return conv.intent;
}


//tasks list for each categories
const sentimentTasks = [
  SENTIMENT_TASK1,SENTIMENT_TASK2,SENTIMENT_TASK3,SENTIMENT_TASK4,SENTIMENT_TASK5
];

const translationTasks = [
  TRANSLATION_TASK1,TRANSLATION_TASK2,TRANSLATION_TASK3,TRANSLATION_TASK4,TRANSLATION_TASK5
];

const genderTasks = [
  GENDER_TASK1,GENDER_TASK2,GENDER_TASK3,GENDER_TASK4,GENDER_TASK5
];

const emotionTasks = [
  EMOTION_TASK1,EMOTION_TASK2,EMOTION_TASK3,EMOTION_TASK4,EMOTION_TASK5,EMOTION_TASK6,EMOTION_TASK7,EMOTION_TASK8,EMOTION_TASK9,EMOTION_TASK10
];

const surveyTasks = [
  SURVEY_TASK1,SURVEY_TASK2,SURVEY_TASK3,SURVEY_TASK4,SURVEY_TASK5
];


//send reply to user according to what intent is called, usually based on replyState
function sendReply( conv, intent, replyState ){

  let reply='Sorry, what is the task that you are going to do, say category if you want to take a look at the current available tasks?'
  if (intent==='welcome' && replyState==='prompt'){

    reply=welcomeReplies;
    conv.data.lastResponse=reply;
  }
  else if(intent==='repeat'){
    reply=conv.data.lastResponse;
  }
  else if(intent==='help'){
    reply=replyState;
  }
  else if(intent==='introduction'){
    if(replyState==='sentiment analysis'){

      reply=sentimentReplies;

    }
    else if(replyState==='language translation'){
      reply=translationReplies;
    }
    else if(replyState==='gender recognition'){
      reply=genderReplies;
    }
    else if(replyState==='emotion analysis'){
      reply=emotionReplies;
    }
    else if(replyState==='survey'){
      reply=surveyReplies;
    }
    else{

      reply="I'm sorry that task is not available yet, please say category to select an available task";
    }
    conv.data.lastResponse=reply;
  }
  else if(intent==='task'){
    //reply current question
    if (Number(replyState)<=conv.data.taskTotal && Number(replyState)>0){
      if(conv.data.taskName==='sentiment analysis'){

        reply=sentimentTasks[Number(replyState)-1];
      }
      else if(conv.data.taskName==='language translation'){

        reply=translationTasks[Number(replyState)-1];
      }
      else if(conv.data.taskName==='gender recognition'){

        reply=genderTasks[Number(replyState)-1];
      }
      else if(conv.data.taskName==='emotion analysis'){

        reply=emotionTasks[Number(replyState)-1];
      }
      else if(conv.data.taskName==='survey'){

        reply=surveyTasks[Number(replyState)-1];
      }
      else{
        reply='there is no such task, sorry, please say category to select the available tasks'
      }
    }

    else{
      reply='there is no such task, sorry, pleaase say category to select the available tasks'
    }
    conv.data.lastResponse=reply;

  }
  else if(intent==='answer-sentiment'){
    reply='are you sure it is '+replyState+'?'
  }
  else if(intent==='answer-translation'){
    reply='so the translation in english is '+replyState+'?'
  }
  else if(intent==='answer-gender'){
    reply='so the speaker is a '+replyState+'?'
  }
  else if(intent==='answer-emotion'){
    reply='so the emotion in the previous sentence is '+replyState+'?'
  }
  else if(intent==='answer-survey'){
    reply='so the answer is '+replyState+'?'
  }
  else if(intent==='yes'){
    reply='thank you for answering! If you want to go to the next task, say next '
  }
  else if(intent==='no'){
    reply='So what is the answer?'
  }
  else if (intent==='category'){
    reply='<speak>'+'There are currently 5 category of tasks which are <break time="1" />'+'<emphasis level="strong"> sentiment analysis, language translation, gender recognition, survey, and emotion analysis. </emphasis>'+' you can choose to do any one of this task by saying its name'+'</speak>'
  }
  else if (intent==='next'){
    //reply next question in current category if it is still available
    if(Number(replyState)<=conv.data.taskTotal  && Number(replyState)>0){
      if(conv.data.taskName==='sentiment analysis'){

        reply=sentimentTasks[Number(replyState)-1];
      }
      else if(conv.data.taskName==='language translation'){

        reply=translationTasks[Number(replyState)-1];
      }
      else if(conv.data.taskName==='gender recognition'){

        reply=genderTasks[Number(replyState)-1];
      }
      else if(conv.data.taskName==='emotion analysis'){

        reply=emotionTasks[Number(replyState)-1];
      }
      else if(conv.data.taskName==='survey'){

        reply=surveyTasks[Number(replyState)-1];
      }
      else{
        reply='there is no such task, sorry, pleaase say category to select the available tasks'
      }
    }
    else{
      reply='You have done all tasks in this category thanks for participating! say category to choose for another task category'
    }
    conv.data.lastResponse=reply;
  }
  else if(intent==='input.unknown'){
    reply='sorry, I did not get that'
  }
  else{
    reply='<speak>'+'Sorry I did not get that.  There are 5 task categories that you can choose which are <break time="1" />'+'<emphasis level="strong"> Sentiment Analysis, Language Translation, Gender Recognition, Emotion Analysis, and survey. </emphasis>'+' Which one are you going to choose?'+'</speak>';
  }


  conv.add(reply);

}


exports.dialogflowFirebaseFulfillment = functions.https.onRequest(action);
