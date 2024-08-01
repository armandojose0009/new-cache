import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import RecordsList from './components/RecordsList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <h1 className="mt-4">Records Management</h1>
        <RecordsList />
      </div>
    </Provider>
  );
};

export default App;
