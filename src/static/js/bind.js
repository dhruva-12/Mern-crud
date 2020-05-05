
function OnKeyDown() {
    document.addEventListener('keydown',function(key){
      if(key.which==13){
  SendMessage();
      }
    });
  }
  
  
  function SendMessage(){
    var message= <div className="row justify-content-end">
    <div className="col-6 col-sm-7 col-md-7">
      $(document.getElementById('textMessage'.value))
      </div>
    </div>
    document.getElementById('messages').innerHTML += message;
  }