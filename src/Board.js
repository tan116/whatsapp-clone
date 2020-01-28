import React, { Component } from 'react';
import './App.css';
import questionMark from './assets/question.png';
import diamond from './assets/diamond.png';
import cross from './assets/close.png';

class Board extends Component {

    constructor() {
      super();
      this.state ={
          data: [],
          contacts: [],
          focusedContactKey: '-1',
          messageInput: '',
          searchValue: '',
      }
    }
  
    focusContact(key) {
        this.setState({focusedContactKey: key, searchValue: ''});
    }

    renderContacts() {
        return this.state.contacts.map((data, key) => {
            if(this.state.searchValue == '') {
                if(this.state.focusedContactKey == key) {
                    return (
                        <div className="ContactListItem"
                                style={{backgroundColor: '#dedede'}}
                                key = {key}
                                onClick={() => this.focusContact(key)}>
                            <image className="ContactImage"></image>
                            <div className="ContactItemTextContainer">
                                <div className="ContactName">{this.state.contacts[key]}</div>
                                <div className="ContactItemSubtext">{this.state.data[key]['messages'][this.state.data[key]['messages'].length-1]['text']}</div>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="ContactListItem"
                                key = {key}
                                onClick={() => this.focusContact(key)}>
                            <image className="ContactImage"></image>
                            <div className="ContactItemTextContainer">
                                <div className="ContactName">{this.state.contacts[key]}</div>
                                <div className="ContactItemSubtext">{this.state.data[key]['messages'][this.state.data[key]['messages'].length-1]['text']}</div>
                            </div>
                        </div>
                    )
                }
            } else {
                if(this.state.data[key]['contact'].toLowerCase().indexOf(this.state.searchValue.toLowerCase()) != -1) {
                    return (
                        <div className="ContactListItem"
                                key = {key}
                                onClick={() => this.focusContact(key)}>
                            <image className="ContactImage"></image>
                            <div className="ContactItemTextContainer">
                                <div className="ContactName">{this.state.contacts[key]}</div>
                                <div className="ContactItemSubtext">{this.state.data[key]['messages'][this.state.data[key]['messages'].length-1]['text']}</div>
                            </div>
                        </div>
                    )
                }
            }
          })
    }

    renderMessages() {
        var focusedContactKey = this.state.focusedContactKey;
        if(this.state.focusedContactKey != '-1') {
            return this.state.data[focusedContactKey]['messages'].map((data, key) => {
                var message = this.state.data[focusedContactKey]['messages'][key];
                if (message['creator'] == 'you') {
                    return (
                        <div className="MessageByYou"
                                key = {key}>
                            <div className="MessageText">{message.text}</div>
                        </div>
                    )
                } else if (message['creator'] == 'them') {
                    return (
                        <div className="MessageByOther"
                                key = {key}>
                            <div className="MessageText">{message.text}</div>
                        </div>
                    )
                }
            })
        }
    }

    handleTextInputChange = (text) => {
        this.setState({messageInput: text.target.value});
    }

    renderContactHeader() {
        var focusedContactKey = this.state.focusedContactKey;
        if (focusedContactKey != undefined && focusedContactKey != '-1') {
            // console.log(this.state.contacts[focusedContactKey]);
            return (
                <div className="MessagesHeaderContainer">
                    <image className="MessagesHeaderImage"></image>
                    <div className="MessagesHeaderName">{this.state.contacts[focusedContactKey]}</div>
                </div>
            )
        }
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter' && this.state.focusedContactKey != '-1'){
            // console.log('enter press here! ');
            // console.log(this.state.messageInput);
            this.sendMessage();
        }
    }

    sendMessage() {
        var focusedContactKey = this.state.focusedContactKey;
        var messageInput = this.state.messageInput;
        // console.log(messageInput);
        var data = this.state.data;
        var contactMessages = data[focusedContactKey]['messages'];
        contactMessages.push({creator: 'you', text: messageInput});
        data[focusedContactKey]['messages'] = contactMessages;
        this.setState({data: data, messageInput: ''});
    }

    renderTextInput() {
        var focusedContactKey = this.state.focusedContactKey;
        if (focusedContactKey != undefined && focusedContactKey != '-1') {
            return (
                <div className="MessageInputContainer">
                    <input type="text"
                                name="body"
                                className="MessageInput"
                                onChange={(text) => {
                                    this.setState({messageInput: text.target.value}, function() {
                                        // console.log(this.state.messageInput);
                                    });
                                }}
                                onKeyPress={this.handleKeyPress}
                                value={this.state.messageInput}/>
                </div>
            )
        }
    }

    render() {
        return (
        <div className="Board">
            <div className="ContactsContainer" style={{overflowY: 'auto'}}>
                <div className="ContactsHeaderContainer">
                    <input type="text"
                            name="body"
                            className="SearchInput"
                            onChange={(text) => {
                                this.setState({searchValue: text.target.value}, function() {
                                    // console.log(this.state.messageInput);
                                });
                            }}
                            onKeyPress={this.handleKeyPress}
                            value={this.state.searchValue}/>
                </div>
                <div className="ContactListContainer">{this.renderContacts()}</div>
            </div>
            <div className="MessagesContainer">
                {this.renderContactHeader()}
                <div className="MessageListContainer">{this.renderMessages()}</div>
                {this.renderTextInput()}
            </div>
        </div>
        );
    }

    componentDidMount() {
        // init contacts
        var data = [
            {contact: "Nathanial Hammond", messages: [{creator: "them", text: "lalala"}, {creator: "you", text: "jajaja"}]},
            {contact: "Corbin Baldwin", messages: [{creator: "them", text: "lalala"}, {creator: "you", text: "jajaja"}]},
            {contact: "Natalya Lawson", messages: [{creator: "them", text: "lalala"}, {creator: "you", text: "jajaja"}]},
            {contact: "Kiera Zhang", messages: [{creator: "them", text: "lalala"}, {creator: "you", text: "jajaja"}]},
            {contact: "Gilberto Roberson", messages: [{creator: "them", text: "lalala"}, {creator: "you", text: "jajaja"}]},
            {contact: "Larry Torres", messages: [{creator: "them", text: "lalala"}, {creator: "you", text: "jajaja"}]},
            {contact: "Yael Wall", messages: [{creator: "them", text: "lalala"}, {creator: "you", text: "jajaja"}]},
            {contact: "Serena Gay", messages: [{creator: "them", text: "lalala"}, {creator: "you", text: "jajaja"}]},
            {contact: "Yusuf Haney", messages: [{creator: "them", text: "lalala"}, {creator: "you", text: "jajaja"}]},
            {contact: "Casey Alexander", messages: [{creator: "them", text: "lalala"}, {creator: "you", text: "jajaja"}]},
            {contact: "Josephine Bruce", messages: [{creator: "them", text: "lalala"}, {creator: "you", text: "jajaja"}]},
            {contact: "Kaleigh Daugherty", messages: [{creator: "them", text: "lalala"}, {creator: "you", text: "jajaja"}]},
        ];

        var contacts = [];
        for (var i = 0; i< data.length; i++) {
            contacts.push(data[i]['contact']);
        }
        this.setState({data: data, contacts: contacts});
        // console.log(contacts);
    }
  }
  
  export default Board;