import React, { useState, useCallback, useMemo } from 'react';

import SignatureVideo from '../components/SignatureVideo';
import DisplayData from '../components/DisplayData';

const App = () => {
  const [videoURL, setVideoURL] = useState(null);
  const [signaturePadURL, setSignaturePadURL] = useState(null);

  const displayData = useMemo(() => (
    Boolean(videoURL) && Boolean(signaturePadURL)
  ), [videoURL, signaturePadURL])

  const onStop = useCallback((_videoBlob, _signaturePadURL) => {
    setVideoURL(URL.createObjectURL(_videoBlob));
    setSignaturePadURL(_signaturePadURL);
  }, []);

  return (
    <div>
      {
        displayData
          ? <DisplayData signatureURL={signaturePadURL} videoURL={videoURL} />
          : <SignatureVideo onStop={onStop} />
      }
    </div>
  )
};

export default App;
