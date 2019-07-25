import React from 'react';
import { hot } from 'react-hot-loader';

import { Button, Row, Col, Image, Modal, Card, Badge} from 'react-bootstrap';
import { className } from 'postcss-selector-parser';
import text from './text.json';
import { gray } from 'ansi-colors';
import { Pie, Doughnut } from 'react-chartjs-2';


let updater = null;
const class_names = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral'];
const python_root_url = 'http://localhost:5000';


class Detection extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.switchUpdating = this.switchUpdating.bind(this);
        this.state = {
            videoSrc:'../facial.png',
            videoHash: Date.now(),
            updating: false,
            recorder: [0, 0, 0, 0, 0, 0, 0]
        }
    }


    componentDidMount(){
    }
    

    componentWillUnmount(){
        clearInterval(updater);
    }

    // when the start or stop button is pressed 
    switchUpdating(){
        console.log('switched');
        if(this.state.updating == false){
            this.setState({
                updating:  true,
                recorder: [0, 0, 0, 0, 0, 0, 0]
            });
            
            // setup a timer to periodlly push request to python server, interval is set to be 200ms 
            updater = setInterval(()=> {

                this.serverRequest = $.ajax({
                    method:'POST',
                    url: python_root_url + '/emotion/update',
                    dataType: 'json',
                    xhrFields: {'Access-Control-Allow-Origin': '*',
                                'Access-Control-Request-Method': '*',
                                'Access-Control-Allow-Methods':'OPTIONS, GET, POST',
                                'Access-Control-Allow-Headers':'Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control',
                                'withCredentials': false
                                }
                }).done((data) => {

                    const result = parseInt(data.result);
                    const updatedRecorder = this.state.recorder.slice();
                    if(result >= 0 && result < 7){
                        updatedRecorder[result] ++;  
                    }  
                    // update display image 
                    this.setState({
                        videoHash: Date.now(),
                        recorder: updatedRecorder
                    });
                    
                }).fail((jqXHR, textStatus)=>{
                    console.log( "fail: " + textStatus);
                    this.setState({
                        videoHash: Date.now()
                    });
                });
            }, 200);
            
        } else {
            clearInterval(updater);
            this.setState({
                updating:  false,
            });
        }
    }

    // main template 
    render = () => (
        <div className="main-block">
        <Row>
            <div className="yolo-intro">
                <h1 className="subtitle" style={{"textAlign":'center'}}> Real-time Facial Emotion Demo </h1>
                {/* <p className="content"> {text.emotion_intro}  </p> */}
            </div>
        </Row>
        <Row>
            <Col xs lg = "6">
                <Row className="main-Row">
                    <div className="video-holder">
                        <div className="video-holder-inner">
                        {
                            this.state.updating? (<Image src={`${this.state.videoSrc}?${this.state.videoHash}`}/> ) : 
                            (
                                <h1 style={{color: 'white',margin: '30% auto', textAlign: 'center'}}>
                                    Camera Demo
                                </h1>
                            )
                        }
                            
                        </div>
                    </div>
                </Row>
                <Row className="button-row">
                    <Button variant="dark" size="lg" onClick={this.switchUpdating} > {this.state.updating? "Stop Demo" : "Start Demo" }</Button>
                </Row>
            </Col>
            <Col xs lg = "6">
                <Doughnut id="emotion_chart" data={
                    {
                        labels:class_names,
                        datasets:[
                            {
                                data: this.state.recorder,
                                backgroundColor:['#ff5050', '#5B43D2', '#50ff50', '#FFFF50', '#50FFFF', '#DF94CB', '#505050'],
                                hoverBackgroundColor:['#ff5050', '#5B43D2', '#50ff50', '#FFFF50', '#50FFFF', '#DF94CB', '#505050'],
                            }
                        ],
                    }
                }
                />
                <h3 id="chart_label"> Emotion Distribution </h3>


            </Col>
        </Row>
        
        </div>
    );
}


export default hot(module)(Detection);