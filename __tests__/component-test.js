import React from 'react';
import renderer from 'react-test-renderer';

import Contacts from '../components/Contacts';

test('работа компонента Contacts', () => {

  const component = renderer.create(
    <Contacts />
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
    
  const elemFIO = component.root.find( el => el.type=='input' && el.props.placeholder == 'ФИО' ); 
  let fioEO = {
    target: { value: "FIO" }
  };
  elemFIO.props.onChange(fioEO);

  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  const elemEmail = component.root.find( el => el.type=='input' && el.props.placeholder == 'email' ); 
  let emailEO = {
    target: { value: "EMAIL" }
  };
  elemEmail.props.onChange(emailEO);

  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
/*
  saveName = () => {
    console.log('hello');
    this.setState ({
      name: '',
      email: '',
    })
  }

  const buttonElem = component.root.find( el => el.type=='button' ); 
  buttonElem.onClick = this.saveName;
  buttonElem.props.onClick();
  
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();*/

});
