import React from 'react';

export default class GoogleLogin extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    (function(d, s, id){
     var js, gs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = 'https://apis.google.com/js/platform.js'
     gs.parentNode.insertBefore(js, gs);
   }(document, 'script', 'google-platform'));
    gapi.load('auth2', initAuth)
  }

  checkLoginState (response) {
    if (auth2.isSignedIn.get()) {
      var profile = auth2.currentUser.get().getBasicProfile();
    } else {
      if(this.props.responseHandler) {
        this.props.responseHandler({status: response.status});
      }
    }
  }

  initAuth() {
    gapi.auth2.init({
      client_id: socialId,
        fetch_basic_profile: false,
        scope: scope
      }).then(function() {
        auth2 = gapi.auth2.getAuthInstance();

        auth2.isSignedIn.listen(checkLoginState);
      })
  }

  clickHandler () {
    var socialId = this.props.socialId,
        responseHandler = this.props.responseHandler,
        scope = this.props.scope,
        signin_configs = this.props.signin_configs || {};

    gapi.load('auth2', function() {
      var auth2 = gapi.auth2.init({
        client_id: socialId,
        fetch_basic_profile: false,
        scope: scope
      });
      auth2.signIn(signin_configs).then(function(googleUser) {
        responseHandler(googleUser);
      });
    });
  }

  render () {
    return (
      <div>
        <button className={this.props.class} onClick={ this.clickHandler.bind(this) }>
            {this.props.buttonText}
        </button>
      </div>
    )
  }
}
