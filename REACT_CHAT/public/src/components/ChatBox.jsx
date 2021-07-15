/**@jsx React.DOM */

'use strict';

var ChatBox = React.createClass({

    getInitialState: function () {
        return{
            users: []
        }
    },

    componentDidMount: function () {
        this.chatEmitter= this.props.chatProxy;
        this.chatEmitter.connect(this.props.username);
        this.chatEmitter.onMessage(this.AddMessage.bind(this));
        this.chatEmitter.onUserConnected(this.UserConnected.bind(this));
        this.chatEmitter.onUserDisconnected(this.UserDisconnected.bind(this));
    },

    UserConnected: function(user){
        var users= this.state.users;
        users.push(user);
        this.setState(
            {
                users: users
            }
        )
    },

    UserDisconnected: function(user){
        var users = this.state.users;
        users.splice(users.indexOf(user),1);
        this.setState({
                users: users
    });
    },

    AddMessage: function (message) {
        if(message){
      console.log(message);
        }  
    },

    render :function () {
        console.log(this.props);
        console.log(this);
        return(
            <div className="chat-box" ref="root">
                <div className="chat-header">REACT CHAT</div>
                <div>
                    <UsersList users={this.state.users} ref="usersList"></UsersList>
                </div>   
            </div>
        )
    }
})