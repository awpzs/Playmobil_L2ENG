PennController.ResetPrefix(null); //Initiates PennController
var showProgressBar = false;
//PennController.DebugOff()
PennController.AddHost("https://raw.githubusercontent.com/awpzs/Playmobil_CHN/master/images/")

Sequence( "initRecorder", "mic_check_1", "mic_check_2", "setcounter", "information", "survey", "identification", "recording_information", "instruction", "prac", "exp_start", "block_1", "rest", "block_2", "send", "final" )

InitiateRecorder("https://localhost/pcibex/index.php", "<p>Thank you very much for your interest in participating in this study.</p><p>This experiment involves audio recording, so let us first test if your microphone is working.</p><p><strong>In the following microphone test, you’ll be asked to name aloud two images, while your responses are audio recorded.</strong></p><p>Please grant expt.pcibex.net access to your microphone, by clicking on the link below.</p><p><strong>The recording will start immediately, and you’ll be prompted to name an image aloud.</strong></p><p><strong>You will be able to listen to your response by clicking on “Playback”.</strong></p>").label("initRecorder")
//InitiateRecorder("https://langprolab.stir.ac.uk/pcibex2/index.php", "<p>Thank you very much for your interest in participating in this study.</p><p>This experiment involves audio recording, so let us first test if your microphone is working.</p><p><strong>In the following microphone test, you’ll be asked to name aloud two images, while your responses are audio recorded.</strong></p><p>Please grant expt.pcibex.net access to your microphone, by clicking on the link below.</p><p><strong>The recording will start immediately, and you’ll be prompted to name an image aloud.</strong></p><p><strong>You will be able to listen to your response by clicking on “Playback”.</strong></p>").label("initRecorder")

newTrial("mic_check_1",
    newMediaRecorder("recorder", "audio")
        .record()
    ,
    newText("<p><strong>Microphone check 1</strong></p>")
        .settings.center()
        .print()
    ,
    newText("<p>Please name this image aloud and press “Playback”.</p>")
        .settings.center()
        .print()
    ,
    newImage("apple", "apple.png")
        .settings.center()
        .print()
    ,
    newButton("Playback")
        .settings.center()
        .print()
        .wait()
    ,
    newTimer("wait", 1000)
        .start()
        .wait()
    ,
    getMediaRecorder("recorder")
        .stop()
        .play()
        .wait("playback")
    ,
    clear()
    ,
    newText("<p><strong>Microphone check 1</strong></p>")
        .settings.center()
        .print()
    ,
    newText("<p>If you clearly heard what you said, click on “Continue” to proceed.</p><p>If you could not clearly hear what you said, please check your microphone (e.g., checking Device in Settings), then click on “Continue”.</p>")
        .print()
    ,
    newButton("cont", "Continue")
        .settings.center()
        .print()
        .wait()
)
.log( "ID", PennController.GetURLParameter("id") )

newTrial("mic_check_2",
    newMediaRecorder("recorder", "audio")
        .record()
    ,
    newText("<p><strong>Microphone check 2</strong></p>")
        .settings.center()
        .print()
    ,
    newText("<p>Please name this image and press “Playback”.</p>")
        .settings.center()
        .print()
    ,
    newImage("pineapple", "pineapple.png")
        .settings.center()
        .print()
    ,
    newButton("Playback")
        .settings.center()
        .print()
        .wait()
    ,
    newTimer("wait", 1000)
        .start()
        .wait()
    ,
    getMediaRecorder("recorder")
        .stop()
        .play()
        .wait("playback")
    ,
    clear()
    ,
    newText("<p><strong>Microphone check 2</strong></p>")
        .settings.center()
        .print()
    ,
    newText("<p>If you clearly heard what you said, click on “Continue” to proceed. This will take you to the information sheet of this study.</p><p><strong>If you could not clearly hear what you said, then you cannot take part in this study, as we cannot record your responses.</strong></p><p>Please quit this experiment now, by clicking on the <strong>X</strong> on the “Experiment” page tab. Thank you very much for your interest in this study.</p>")
        .print()
    ,
    newButton("cont", "Continue")
        .settings.center()
        .print()
        .wait()
)
.log( "ID", PennController.GetURLParameter("id") )

PennController.SetCounter( "setcounter" )

newTrial( "information" ,
    newHtml("information", "information.html")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait(getHtml("information").test.complete()
            .failure(getHtml("information").warn()))
)

newTrial( "survey" ,
    newHtml("questionnaire", "survey.html")
        .print()
        .log()
    ,
    newButton("Start")
        .settings.center()
        .print()
        .wait(getHtml("questionnaire").test.complete()
            .failure(getHtml("questionnaire").warn()))
)
.log( "ID", PennController.GetURLParameter("id") )

newTrial( "identification" ,
    newText("<p>Below is your unique ID for this experiment.</p><p>Please take a note of it in case you need it as a reference.</p><p>Press <strong>Continue</strong> to proceed.</p>")
        .print()
    ,
    newTextInput("inputID", GetURLParameter("id"))
        .settings.center()
        .log("final")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait()
//    ,
//    newVar("ID")
//        .global()
//        .set( GetURLParameter("id") )
)
.log("ID", GetURLParameter("id"))

newTrial("recording_information" ,
    newText("<p><strong>Important:</strong></p><p>Your responses will be audio-recorded during the experiment, so please complete this experiment in a quiet place.</p><p>Please stay focused during the experiment, and finish it in one go. You will be able to take a brief break (1-2 mins), where specified.</p><p>You will not be able to return to this study if you closed or refreshed this webpage.</p>")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait()    
)

newTrial("instruction",
        newHtml("inst_text", "instruction.html")
            .print()
        ,
        newButton("Continue")
            .settings.center()
            .print()
            .wait(getHtml("inst_text").test.complete()
                .failure(getHtml("inst_text").warn()))
)

Template(
    GetTable("prac.csv")
        .setGroupColumn("List"), variable =>
        newTrial( "prac" ,
            newMediaRecorder("recorder", "audio")
                .record()
            ,
            newText("inst_read", "<p>Please read the sentence aloud, and then click on the sentence to see the second picture.</p>")
                .settings.center()
                .print()
            ,
            newImage("one", variable.FirstDisplay)
                .size(342,256)
                .settings.center()
                .print()
            ,
            newText("sentence", variable.sentence)
                .settings.center()
                .bold()
                .print()
            ,
            newSelector()
                .add( getText("sentence") )
                .wait()
            ,
            getText("inst_read")
                .remove()
            ,
            getText("sentence")
                .remove()
            ,
            newText('Please describe the action by saying it aloud, starting with "Now". For example, you could say:')
                .settings.center()
                .print()
            ,
            newText(variable.target1).bold().color("blue")
                .settings.after(newText("&nbsp;OR&nbsp;"))
                .settings.after(newText(variable.target2).bold().color("blue"))
                .settings.center()
                .print()
            ,
            newText("Choose referring expressions depending on situations.").bold().color("blue")
                .settings.center()
                .print()
            ,
            newImage("two", variable.SecondDisplay)
                .size(342,256)
                .settings.center()
                .print()
            ,
            newText(variable.cont)
                .settings.center()
                .print()
            ,
            newButton("Proceed")
                .settings.center()
                .print()
                .wait()
            ,
            newTimer("wait", 1000)
                .start()
                .wait()            
            ,
            getMediaRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()
                .failure(newText("Sorry, there seems to be something wrong with your microphone. Please stop the experiment, and contact the researcher.").settings.center().print())
  )
  .log("ID", GetURLParameter("id"))
  .log("List", variable.List)
  .log("Item", variable.Item)
  .log("Amb", variable.Amb)
  .log("Vis", variable.Vis)
  .log("Condition", variable.Condition)
  .log("Sentence", variable.sentence)
  )

newTrial("exp_start",
        newText("<p>This is the end of the instructions. Please click on <strong>Start</strong> to start the experiment.</p><p>No instructions or examples will be provided during the experiment.</p>")
            .settings.center()
            .print()
        ,
        newButton("Start")
            .settings.center()
            .print()
            .wait()
)
  
Template(
    GetTable("fulldesign.csv")
        .setGroupColumn("List")
        .filter(variable => variable.Order < 33)
        , variable =>
        newTrial( "block_1" ,
            newMediaRecorder(variable.recordingName+'_'+GetURLParameter("id"), "audio")
                .record()
            ,
            newImage("one", variable.FirstDisplay)
                .size(342,256)
                .settings.center()
                .print()
            ,
            newText("sentence", variable.sentence)
                .settings.center()
                .bold()
                .print()
            ,
            newSelector()
                .add( getText("sentence") )
                .wait()
            ,
            getText("sentence")
                .remove()
            ,
            newImage("two", variable.SecondDisplay)
                .size(342,256)
                .settings.center()
                .print()
            ,
            newButton("Proceed")
                .settings.center()
                .print()
                .wait()
            ,
            newTimer("wait", 1000)
                .start()
                .wait()
            ,
            getMediaRecorder(variable.recordingName+'_'+GetURLParameter("id"))
                .stop()
            ,
            getMediaRecorder(variable.recordingName+'_'+GetURLParameter("id")).test.recorded()
                .failure(newText("Sorry, there seems to be something wrong with your microphone. Please stop the experiment, and contact the researcher.").settings.center().print())
  )
  .log("ID", GetURLParameter("id"))
  .log("List", variable.List)
  .log("Item", variable.Item)
  .log("Amb", variable.Amb)
  .log("Vis", variable.Vis)
  .log("Condition", variable.Condition)
  .log("Sentence", variable.sentence)
  )  

newTrial( "rest" ,
  newText("<p>Now you can take a break (1-2 mins).</p><p>Press <strong>Continue</strong> when you are ready.</p>")
      .print()
  ,
  newButton("Continue")
      .settings.center()
      .print()
      .wait()
)

Template(
    GetTable("fulldesign.csv")
        .setGroupColumn("List")
        .filter(variable => variable.Order > 32)
        , variable =>
        newTrial( "block_2" ,
            newMediaRecorder(variable.recordingName+'_'+GetURLParameter("id"), "audio")
                .record()
            ,
            newImage("one", variable.FirstDisplay)
                .size(342,256)
                .settings.center()
                .print()
            ,
            newText("sentence", variable.sentence)
                .settings.center()
                .bold()
                .print()
            ,
            newSelector()
                .add( getText("sentence") )
                .wait()
            ,
            getText("sentence")
                .remove()
            ,
            newImage("two", variable.SecondDisplay)
                .size(342,256)
                .settings.center()
                .print()
            ,
            newButton("Proceed")
                .settings.center()
                .print()
                .wait()
            ,
            newTimer("wait", 1000)
                .start()
                .wait() 
            ,
            getMediaRecorder(variable.recordingName+'_'+GetURLParameter("id"))
                .stop()
            ,
            getMediaRecorder(variable.recordingName+'_'+GetURLParameter("id")).test.recorded()
                .failure(newText("Sorry, there seems to be something wrong with your microphone. Please stop the experiment, and contact the researcher.").settings.center().print())
  )
  .log("ID", GetURLParameter("id"))
  .log("List", variable.List)
  .log("Item", variable.Item)
  .log("Amb", variable.Amb)
  .log("Vis", variable.Vis)
  .log("Condition", variable.Condition)
  .log("Sentence", variable.sentence)
  )  
SendResults( "send" )

newTrial( "final" 
    ,
    newText("<p>Thank you very much for your participation!</p>")
        .settings.center()
        .print()
    ,
    newText("<p>If you were asked to download a copy of the recordings on the last page, please send the file and your unique ID to <strong>kumiko.fukumura[at]stir.ac.uk.</strong></p><p>Otherwise, please click on the link below to validate your participation.</p>")
        .settings.center()
        .print()
    ,
    newText("<p><a href='https://stirling.sona-systems.com/webstudy_credit.aspx?experiment_id=1949&credit_token=b48c76c8ce3b4b0b948c635266418bd1&survey_code="+GetURLParameter("id")+"'>Click here to validate your participation and finish the experiment</a></p>")
        .settings.center()
        .print()
    ,
    newText("<p>Please see below for a debriefing of this study.</p>")
        .settings.center()
        .print()
    ,
    newHtml("debriefing", "debrief.html")
        .print()
    ,
    newButton("void")
        .wait()
)
