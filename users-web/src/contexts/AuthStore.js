import React, { Component } from 'react';

const AuthContext = React.createContext();

class AuthStore extends Component {
  state = {
    user: {}
  }
  
  handleUserChange = (user) => {
    this.setState({ user: user });
  }

  isAuthenticated = () => this.state.user && this.state.user.email;

  isAdmin = () => this.state.user && this.state.user.role === 'admin';

  render() {
    return (
      <AuthContext.Provider value={{
        user: this.state.user,
        onUserChanged: this.handleUserChange,
        isAuthenticated: this.isAuthenticated,
        isAdmin: this.isAdmin
      }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }

}

// HOC
const withAuthConsumer = (Component) => {
  return (props) => (
    <AuthContext.Consumer>
      { (storeProps) => <Component {...props} {...storeProps}/> }
    </AuthContext.Consumer>
  );
}

export { AuthContext, AuthStore, withAuthConsumer }