import React from 'react';
import { useSelector } from 'react-redux';
import { selectAppLoadingState } from '../../slices/uiSlice.js';
import Spinner from '../../components/Spinner.jsx';
import Channels from '../../components/Channels.jsx';
import ChatHeader from '../../components/ChatHeader.jsx';
import Messages from '../../components/Messages.jsx';
import ChatForm from '../../components/ChatForm.jsx';

const Main = () => {
  const appLoadingState = useSelector(selectAppLoadingState);
  const isAppLoading = appLoadingState !== 'loaded';
  const containerClassName = (isAppLoading)
    ? 'd-none container h-100 rounded shadow'
    : 'container h-100 rounded shadow';

  return (
    <>
      {isAppLoading && <Spinner />}
      <div className={containerClassName}>
        <div className="row flex-md-row h-100">
          <div className="col-4 col-md-2 d-flex flex-column border-end p-3 h-100">
            <Channels />
          </div>
          <div className="col px-0 h-100">
            <div className="d-flex flex-column h-100">
              <header className="shadow-sm p-3">
                <ChatHeader />
              </header>
              <main className="p-3 overflow-auto">
                <Messages />
              </main>
              <div className="mt-auto">
                <ChatForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
