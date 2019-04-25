int ledPin = 10;
const int wait = 10000;
int upTime = wait;
int downTime = 0;


void setup() {
  // put your setup code here, to run once:
  pinMode(ledPin, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  delay(upTime/100);
  toggle();
  delay(downTime/100);
  toggle();
  upTime--;
  downTime++;

  if(upTime == 0){
    toggle();
    upTime = wait;
    downTime = 0;
  }
}

void toggle(){
  if (digitalRead(ledPin) == LOW){
    digitalWrite(ledPin,HIGH);
  }
  else{
    digitalWrite(ledPin,LOW);
  }
}
