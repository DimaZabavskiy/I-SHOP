import React from 'react';
import PersonalCabinet from '../PersonalCabinet';
import Registration from '../Registration';
import {connect} from 'react-redux';
import {add_user_from_localstorage} from '../../redux/userAC';

class Page_Registration extends React.PureComponent {

  componentWillMount () {
    if (JSON.parse(localStorage.user).userName) {
      this.props.dispatch(add_user_from_localstorage ( JSON.parse(localStorage.user) ) );
    }
  }
          
  render() {
    console.log('render Page_Registration');
    return (
        <div>
            {!this.props.user.status && <Registration />}
            {this.props.user.status && <PersonalCabinet />}
        </div>
    );
    
  }

}

const mapStateToProps = function (state) {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Page_Registration);
    